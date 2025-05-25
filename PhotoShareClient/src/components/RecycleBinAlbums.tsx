// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card, CardContent, Typography, Grid, CircularProgress, Button } from '@mui/material';
// import { fetchRecycleAlbums, restoreAlbum, deleteAlbum } from '../slices/albumSlice';
// import { AppDispatch } from '../store/store';
// import { Album } from '../types/album';
// import { useNavigate } from 'react-router-dom';

// const RecycleBinAlbums: React.FC = () => {
//     const { recycledAlbums, loading, msg } = useSelector((state: { album: { recycledAlbums: Album[], loading: boolean, msg: string } }) => state.album);
//     const dispatch = useDispatch<AppDispatch>();
//     const token = sessionStorage.getItem('token');
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (token) {
//             console.log("use effect פח מיחזור אלבומים");
            
//             dispatch(fetchRecycleAlbums({ token }));
//         } else {
//             navigate('/auth');
//         }
//     }, [dispatch, token]);

//     if (loading) {
//         return <CircularProgress />;
//     }

//     if (msg) {
//         return <Typography variant="h6" color="error">{msg}</Typography>;
//     }

//     const handleRestore = (albumId: number) => {
//         if (token) {
//             dispatch(restoreAlbum({ token, albumId }));
//         } else {
//             navigate('/auth');
//         }
//     };

//     const handleDelete = (albumId: number) => {
//         if (token) {
//             dispatch(deleteAlbum({ token, albumId }));
//         } else {
//             navigate('/auth');
//         }
//     };

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>סל מיחזור - אלבומים</Typography>
//             <Grid container spacing={2}>
//                 {recycledAlbums.length === 0 ? (
//                     <Typography variant="body1">אין אלבומים שנמחקו.</Typography>
//                 ) : (
//                     recycledAlbums.map((album) => (
//                         <Grid size={{ xs: 12, sm: 6, md: 4 }} key={album.id}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography variant="h5">{album.title}</Typography>
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         onClick={() => handleRestore(album.id!)}
//                                         sx={{ marginTop: 2 }}
//                                     >
//                                         שחזר אלבום
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         color="secondary"
//                                         onClick={() => handleDelete(album.id!)}
//                                         sx={{ marginTop: 2, marginLeft: 2 }}
//                                     >
//                                         מחק אלבום
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

// export default RecycleBinAlbums;
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  CardContent,
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
import { fetchRecycleAlbums, restoreAlbum, deleteAlbum } from "../slices/albumSlice"
import type { AppDispatch } from "../store/store"
import type { Album } from "../types/album"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Folder as FolderIcon,
  RestoreFromTrash as RestoreIcon,
  DeleteForever,
  Warning as WarningIcon,
  CalendarToday,
} from "@mui/icons-material"

const RecycleBinAlbums: React.FC = () => {
  const { recycledAlbums, loading, msg } = useSelector(
    (state: { album: { recycledAlbums: Album[]; loading: boolean; msg: string } }) => state.album,
  )
  const dispatch = useDispatch<AppDispatch>()
  const token = sessionStorage.getItem("token")||''
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(fetchRecycleAlbums({ token }))
    } else {
      navigate("/auth")
    }
  }, [dispatch, token, navigate])

  const handleRestore = async (albumId: number) => {
    if (token) {
      setActionLoading(true)
      try {
        await dispatch(restoreAlbum({ token, albumId }))
      } finally {
        setActionLoading(false)
      }
    } else {
      navigate("/auth")
    }
  }

  const handleOpenDeleteDialog = (albumId: number) => {
    setSelectedAlbumId(albumId)
    setDeleteDialogOpen(true)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setSelectedAlbumId(null)
  }

  const handleDelete = async () => {
    if (token && selectedAlbumId) {
      setActionLoading(true)
      try {
        await dispatch(deleteAlbum({ token, albumId: selectedAlbumId }))
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
          {[1, 2, 3].map((item) => (
            <Grid size={{xs:12 , sm:6 ,md:4}} key={item}>
              <Skeleton variant="rounded" width="100%" height={200} />
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
      {recycledAlbums.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <FolderIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
            No deleted albums
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Albums that you delete will appear here
          </Typography>
        </Box>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3}>
            {recycledAlbums.map((album) => (
              <Grid size={{xs:12 , sm:6 ,md:4}} key={album.id}>
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
                    <Box
                      sx={{
                        height: 120,
                        backgroundColor: "rgba(244, 67, 54, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <FolderIcon sx={{ fontSize: 60, color: "#f44336" }} />
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
                        {album.title}
                      </Typography>
                      {album.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {album.description}
                        </Typography>
                      )}

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarToday sx={{ fontSize: 18, color: "text.secondary", mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Deleted: {new Date(album.deletedAt || Date.now()).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>

                    <Box sx={{ p: 2, pt: 0, display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<RestoreIcon />}
                        onClick={() => handleRestore(album.id!)}
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
                        onClick={() => handleOpenDeleteDialog(album.id!)}
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
            Are you sure you want to permanently delete this album?
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            This action cannot be undone. All photos in this album will also be permanently deleted.
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

export default RecycleBinAlbums
