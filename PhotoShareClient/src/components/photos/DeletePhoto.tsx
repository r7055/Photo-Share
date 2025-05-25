// // import React from 'react';
// // import { IconButton, Tooltip } from "@mui/material";
// // import DeleteIcon from '@mui/icons-material/Delete'; // Import the DeleteIcon
// // import { useDispatch } from "react-redux";
// // import { deletePhoto } from '../../slices/photoSlice'; // Adjust the import path as needed
// // import { AppDispatch } from '../../store/store';

// // interface DeletePhotoProps {
// //     photoId: number;
// //     albumId: number;    
// // }

// // const DeletePhoto: React.FC<DeletePhotoProps> = ({ photoId ,albumId}) => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const token = sessionStorage.getItem('token');


// //     const handleDelete = async (id: number,albumId:number) => {
// //         if (token) {
// //             try {
// //                 await dispatch(deletePhoto({ token, id ,albumId})).unwrap();
// //                 // Optionally, you can add logic to refresh the photo list or show a success message
// //             } catch (error) {
// //                 console.error('Error deleting photo:', error);
// //             }
// //         } else {
// //             console.error('Token is not available');
// //         }
// //     };

// //     return (
// //         <Tooltip title="מחק תמונה">
// //             <IconButton onClick={() => handleDelete(photoId,albumId)}>
// //                 <DeleteIcon />
// //             </IconButton>
// //         </Tooltip>
// //     );
// // }

// // export default DeletePhoto;

// import type React from "react"
// import { useState } from "react"
// import {
//   IconButton,
//   Tooltip,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
// } from "@mui/material"
// import DeleteIcon from "@mui/icons-material/Delete"
// import { useDispatch } from "react-redux"
// import { deletePhoto } from "../../slices/photoSlice"
// import type { AppDispatch } from "../../store/store"

// interface DeletePhotoProps {
//   photoId: number
//   albumId: number
// }

// const DeletePhoto: React.FC<DeletePhotoProps> = ({ photoId, albumId }) => {
//   const dispatch = useDispatch<AppDispatch>()
//   const token = sessionStorage.getItem("token")
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [confirmOpen, setConfirmOpen] = useState(false)

//   const handleOpenConfirm = (event: React.MouseEvent) => {
//     event.stopPropagation()
//     setConfirmOpen(true)
//   }

//   const handleCloseConfirm = () => {
//     setConfirmOpen(false)
//   }

//   const handleDelete = async () => {
//     if (token) {
//       try {
//         setIsDeleting(true)
//         await dispatch(deletePhoto({ token, id: photoId, albumId })).unwrap()
//         handleCloseConfirm()
//       } catch (error) {
//         console.error("Error deleting photo:", error)
//       } finally {
//         setIsDeleting(false)
//       }
//     } else {
//       console.error("Token is not available")
//     }
//   }

//   return (
//     <>
//       <Tooltip title="Delete Photo">
//         <IconButton
//           onClick={handleOpenConfirm}
//           size="small"
//           sx={{
//             bgcolor: "rgba(255,255,255,0.2)",
//             backdropFilter: "blur(5px)",
//             color: "white",
//             "&:hover": {
//               bgcolor: "rgba(255,255,255,0.3)",
//             },
//           }}
//         >
//           <DeleteIcon fontSize="small" />
//         </IconButton>
//       </Tooltip>

//       <Dialog
//         open={confirmOpen}
//         onClose={handleCloseConfirm}
//         PaperProps={{
//           sx: {
//             borderRadius: "16px",
//             padding: 1,
//           },
//         }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography variant="h6" fontWeight={600}>
//             Delete Photo
//           </Typography>
//         </DialogTitle>

//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to delete this photo? This action cannot be undone.
//           </Typography>
//         </DialogContent>

//         <DialogActions sx={{ px: 3, pb: 3 }}>
//           <Button onClick={handleCloseConfirm} variant="outlined" sx={{ borderRadius: "10px" }}>
//             Cancel
//           </Button>

//           <Button
//             onClick={handleDelete}
//             variant="contained"
//             color="error"
//             disabled={isDeleting}
//             sx={{
//               borderRadius: "10px",
//               minWidth: "100px",
//             }}
//           >
//             {isDeleting ? (
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
//                 <span>Deleting</span>
//               </Box>
//             ) : (
//               "Delete"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   )
// }

// export default DeletePhoto
"use client"

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
