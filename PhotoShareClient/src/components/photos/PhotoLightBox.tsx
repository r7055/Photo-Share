import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import { Download as DownloadIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { Photo } from "../../types/photo";

interface PhotoLightboxProps {
  open: boolean;
  photo: Photo | null;
  onClose: () => void;
  onDelete: (photoId: number) => void;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ open, photo, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent sx={{ p: 0, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {photo && (
          <Box sx={{ position: "relative", maxHeight: "85vh", maxWidth: "100%" }}>
            <img
              src={photo.url || "/placeholder.svg"}
              alt={photo.name}
              style={{
                maxHeight: "85vh",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                  },
                }}
                onClick={() => {
                  const downloadLink = document.createElement("a");
                  downloadLink.href = photo.url;
                  downloadLink.download = photo.name || "photo";
                  downloadLink.click();
                }}
              >
                <DownloadIcon />
              </IconButton>
              {photo.id !== undefined && (
                <IconButton
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                    },
                  }}
                  onClick={() => onDelete(photo.id!)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhotoLightbox;
