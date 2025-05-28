import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { sharePhoto } from "../../slices/photoSlice";
import { AppDispatch } from "../../store/store";

interface SharePhotoModalProps {
    open: boolean;
    onClose: () => void;
    photoId: number;
}

const SharePhoto: React.FC<SharePhotoModalProps> = ({ open, onClose, photoId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [userEmail, setUserEmail] = useState<string>("");
    const token = sessionStorage.getItem('token') ?? "";

    const handleShare = async () => {
        try {
            await dispatch(sharePhoto({ token, photoId, userEmailForSharing: userEmail })).unwrap();
            alert("Photo shared successfully!");
            onClose(); 
        } catch (error) {
            alert("Failed to share photo: " + error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Share Photo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="User Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleShare} color="primary">
                    Share
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SharePhoto;
