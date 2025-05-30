// src/components/photos/SharePhoto.tsx
// (Previously SharePhotoDialog.tsx, renamed and potentially tweaked)

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import { Share as ShareIcon, Close as CloseIcon } from "@mui/icons-material";
import type { AppDispatch } from "../../store/store";
import { sharePhoto, clearMessage } from "../../slices/photoSlice"; // Ensure clearMessage is in your photoSlice

interface SharePhotoProps {
  open: boolean;
  onClose: () => void;
  photoId: number; // photoId is now non-nullable as per your PhotoCard
  photoName?: string; // Optional photo name to display in dialog
}

const SharePhoto: React.FC<SharePhotoProps> = ({
  open,
  onClose,
  photoId,
  photoName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = sessionStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [isSharing, setIsSharing] = useState(false); // Local loading state for the share action
  
  // Use Redux state for messages and global loading if preferred,
  // but local state for error/success within the dialog can be simpler.
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Optional: Listen to global messages from Redux store if your slice sets them
  const { msg: reduxMessage, loading: reduxLoading } = useSelector(
    (state: { photo: { msg: string; loading: boolean } }) => state.photo
  );

  useEffect(() => {
    if (open) {
      // Reset state when dialog opens
      setEmail("");
      setError(null);
      setSuccessMessage(null);
      if (reduxMessage) { // Clear any global message that might have been set by previous actions
        dispatch(clearMessage());
      }
    }
  }, [open, dispatch, reduxMessage]);

  // Effect to handle messages from Redux store after dispatching sharePhoto
   useEffect(() => {
    if (!reduxLoading && reduxMessage && isSharing) { // only react if this component initiated an action
      if (reduxMessage.toLowerCase().includes("success") || reduxMessage.toLowerCase().includes("shared")) {
        setSuccessMessage(reduxMessage);
        // setEmail(""); // Optionally clear email on success
      } else {
        setError(reduxMessage);
      }
      setIsSharing(false); // Action completed
    }
  }, [reduxMessage, reduxLoading, isSharing]);


  const handleShare = async () => {
    if (!token || !email) {
      setError("Token or Email is missing.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsSharing(true);
    dispatch(clearMessage()); // Clear previous messages before new attempt

    try {
      await dispatch(
        sharePhoto({ token, photoId, userEmailForSharing: email })
      ).unwrap();
      // Success message will be set by the useEffect listening to reduxMessage
      // or you can set a generic one here if your thunk doesn't provide a detailed message
      // setSuccessMessage("Photo shared successfully!");
    } catch (err: any) {
      // Error message will also be set by useEffect, or set a generic one
      // setError(err.message || "Failed to share photo.");
      console.error("Failed to share photo:", err);
    } 
    // No finally setIsSharing(false) here, it's handled by the useEffect
  };

  const handleActualClose = () => {
    // This function will be called by Dialog's onClose or Cancel button
    if (reduxMessage) { // Clear message from photoSlice when dialog actually closes
        dispatch(clearMessage());
    }
    onClose(); // Call the original onClose passed from PhotoCard
  };


  return (
    <Dialog
      open={open}
      onClose={handleActualClose} // Use the new handler
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          minWidth: "320px",
          maxWidth: "500px",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg, #1e88e5, #1565c0)", // Blue gradient
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1.5,
          pt: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ShareIcon sx={{ mr: 1.5 }} />
          Share Photo
        </Box>
        <IconButton onClick={handleActualClose} size="small" sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ background: "#f5f5f5", pt: "20px !important" }}>
        {photoName && (
          <Typography variant="body1" sx={{ mb: 2, fontWeight: "500" }}>
            Sharing: <span style={{ fontStyle: "italic" }}>{photoName}</span>
          </Typography>
        )}
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Recipient's Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSharing || !!successMessage} // Disable if sharing or if already successfully shared
          sx={{ mb: 1 }}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary" variant="body2" sx={{ mt: 1, color: "green" }}>
            {successMessage}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ background: "#f5f5f5", p: 2 }}>
        <Button
          onClick={handleActualClose}
          sx={{
            color: "#1565c0",
            "&:hover": { backgroundColor: "rgba(21, 101, 192, 0.05)" },
          }}
          disabled={isSharing && !successMessage && !error} // disable cancel only during active sharing before result
        >
          Cancel
        </Button>
        <Button
          onClick={handleShare}
          variant="contained"
          disabled={isSharing || !email || !!successMessage} // Disable if sharing, no email, or already succeeded
          startIcon={isSharing ? <CircularProgress size={20} color="inherit" /> : <ShareIcon />}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": { backgroundColor: "#1565c0" },
            "&.Mui-disabled": {
              backgroundColor: "rgba(25, 118, 210, 0.5)",
              color: "rgba(255, 255, 255, 0.7)",
            },
          }}
        >
          {isSharing ? "Sharing..." : "Share"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharePhoto;