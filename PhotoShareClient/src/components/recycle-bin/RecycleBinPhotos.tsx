// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card, CardContent, Typography, Grid, CircularProgress, Button } from '@mui/material';
// import { AppDispatch } from '../store/store';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Photo } from '../types/photo';
// import { deletePhoto, getRecyclePhotos, restorePhoto } from '../slices/photoSlice';

// const RecycleBinPhotos: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const token = sessionStorage.getItem('token');
//     const navigate = useNavigate();
//     const { albumId } = useParams<{ albumId: string }>();


//     const { recycledPhotos, loading, msg } = useSelector((state: { photo: { recycledPhotos: Photo[], loading: boolean, msg: string } }) => state.photo);
    
//     useEffect(() => {
//         console.log("use effect פח מיחזור תמונות");
        
//         if (token) {
//             dispatch(getRecyclePhotos({ token }));
//             console.log("recycledPhotos", recycledPhotos);
            
//         } else {
//             navigate('/auth');
//         }
//     }, [dispatch, token, navigate]);

//     if (loading) {
//         return <CircularProgress />;
//     }

//     if (msg) {
//         return <Typography variant="h6" color="error">{msg}</Typography>;
//     }

//     const handleRestore = (photoId: number, albumId: number) => {
//         if (token) {
//             dispatch(restorePhoto({ token, photoId, albumId }));
//         } else {
//             navigate('/auth');
//         }
//     };

//     const handleDelete = (photoId: number,albumId:number) => {
//         if (token) {
//             dispatch(deletePhoto({ token, id: photoId, albumId:albumId }));
//         } else {
//             navigate('/auth');
//         }
//     };

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>סל מיחזור תמונות</Typography>
//             <Grid container spacing={2}>
//                 dfa
//                <div> {recycledPhotos.length}</div>
//                 fdsa
//                 {recycledPhotos.length === 0 ? (
//                     <Typography variant="body1">אין תמונות שנמחקו.</Typography>
//                 ) : (
//                     recycledPhotos.map((photo) => (
//                         <Grid size={{ xs: 12, sm: 6, md: 4}} key={photo.id}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography variant="h5">{photo.name}</Typography>
//                                     <img src={photo.url} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         onClick={() => handleRestore(photo.id!, Number(photo.albumId)!)} 
//                                         sx={{ marginTop: 2 }}
//                                     >
//                                         שחזר תמונה
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         color="secondary"
//                                         onClick={() => albumId && handleDelete(photo.id!, Number(albumId))}
//                                         sx={{ marginTop: 2, marginLeft: 2 }}
//                                     >
//                                         מחק תמונה
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))
//                 )}
//             </Grid>
//         </div>
//     );
// };

// export default RecycleBinPhotos;
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Box,
  Skeleton,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { deletePhoto, getRecyclePhotos, restorePhoto } from "../../slices/photoSlice"
import type { AppDispatch } from "../../store/store"
import type { Photo } from "../../types/photo"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Photo as PhotoIcon,
  RestoreFromTrash as RestoreIcon,
  DeleteForever,
  Warning as WarningIcon,
  CalendarToday,
  Folder,
} from "@mui/icons-material"

const RecycleBinPhotos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()
  // const { albumId } = useParams<{ albumId: string }>()
  const { recycledPhotos, loading, msg } = useSelector(
    (state: { photo: { recycledPhotos: Photo[]; loading: boolean; msg: string } }) => state.photo,
  )
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null)
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(getRecyclePhotos({ token }))
    } else {
      navigate("/auth")
    }
  }, [dispatch, token, navigate])

  const handleRestore = async (photoId: number, albumId: number) => {
    if (token) {
      setActionLoading(true)
      try {
        await dispatch(restorePhoto({ token, photoId, albumId }))
      } finally {
        setActionLoading(false)
      }
    } else {
      navigate("/auth")
    }
  }

  const handleOpenDeleteDialog = (photoId: number, albumId: number) => {
    setSelectedPhotoId(photoId)
    setSelectedAlbumId(albumId)
    setDeleteDialogOpen(true)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setSelectedPhotoId(null)
    setSelectedAlbumId(null)
  }

  const handleDelete = async () => {
    if (token && selectedPhotoId && selectedAlbumId) {
      setActionLoading(true)
      try {
        await dispatch(deletePhoto({ token, id: selectedPhotoId, albumId: selectedAlbumId }))
        handleCloseDeleteDialog()
      } finally {
        setActionLoading(false)
      }
    } else {
      navigate("/auth")
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid size={{ xs:12, sm:6, md:4}} key={item}>
              <Skeleton variant="rounded" width="100%" height={250} />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  if (msg) {
    return (
      <Typography variant="h6" color="error">
        {msg}
      </Typography>
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      {recycledPhotos.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <PhotoIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
            No deleted photos
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Photos that you delete will appear here
          </Typography>
        </Box>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3}>
            {recycledPhotos.map((photo) => (
              <Grid size={{ xs:12, sm:6,md:4}} key={photo.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        image={photo.url}
                        alt={photo.name}
                        sx={{
                          height: 200,
                          objectFit: "cover",
                        }}
                      />
                      <Chip
                        label="Deleted"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(244, 67, 54, 0.8)",
                          color: "white",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
                        {photo.name}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Folder sx={{ fontSize: 18, color: "text.secondary", mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Album ID: {photo.albumId}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarToday sx={{ fontSize: 18, color: "text.secondary", mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Deleted: {new Date(photo.deletedAt || Date.now()).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>

                    <Box sx={{ p: 2, pt: 0, display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<RestoreIcon />}
                        onClick={() => handleRestore(photo.id!, Number(photo.albumId)!)}
                        disabled={actionLoading}
                        sx={{
                          borderColor: "#4caf50",
                          color: "#4caf50",
                          "&:hover": {
                            borderColor: "#4caf50",
                            backgroundColor: "rgba(76, 175, 80, 0.1)",
                          },
                        }}
                      >
                        Restore
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<DeleteForever />}
                        onClick={() => handleOpenDeleteDialog(photo.id!, Number(photo.albumId)!)}
                        disabled={actionLoading}
                        sx={{
                          borderColor: "#f44336",
                          color: "#f44336",
                          "&:hover": {
                            borderColor: "#f44336",
                            backgroundColor: "rgba(244, 67, 54, 0.1)",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
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
          Confirm Permanent Deletion
        </DialogTitle>

        <DialogContent sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", pt: 3 }}>
          <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
            Are you sure you want to permanently delete this photo?
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            This action cannot be undone. The photo will be permanently removed from your account.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", p: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
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
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} /> : <DeleteForever />}
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
            {actionLoading ? "Deleting..." : "Delete Permanently"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RecycleBinPhotos
