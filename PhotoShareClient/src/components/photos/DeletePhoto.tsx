import type React from "react"
import { useState } from "react"
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material"
import { Delete as DeleteIcon, Warning as WarningIcon } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { deletePhoto } from "../../slices/photoSlice"
import type { AppDispatch } from "../../store/store"

interface DeletePhotoProps {
  photoId: number
  albumId: number
}

const DeletePhoto: React.FC<DeletePhotoProps> = ({ photoId, albumId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const token = sessionStorage.getItem("token")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpenConfirm = (e: React.MouseEvent) => {
    e.stopPropagation()
    setConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setConfirmOpen(false)
  }

  const handleDelete = async () => {
    if (token) {
      setLoading(true)
      try {
        await dispatch(deletePhoto({ token, id: photoId, albumId })).unwrap()
        handleCloseConfirm()
      } catch (error) {
        console.error("Error deleting photo:", error)
      } finally {
        setLoading(false)
      }
    } else {
      console.error("Token is not available")
    }
  }

  return (
    <>
      <Tooltip title="Delete Photo">
        <IconButton size="small" onClick={handleOpenConfirm} data-photo-id={photoId} sx={{ color: "#f44336" }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={confirmOpen}
        onClose={handleCloseConfirm}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #1a1f36, #252a4b)",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <WarningIcon sx={{ mr: 1.5, color: "#f44336" }} />
          Confirm Deletion
        </DialogTitle>

        <DialogContent sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", pt: 3 }}>
          <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
            Are you sure you want to move this photo to the recycle bin?
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            You can restore it later from the recycle bin if needed.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", p: 2 }}>
          <Button
            onClick={handleCloseConfirm}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(244, 67, 54, 0.5)",
              },
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeletePhoto
