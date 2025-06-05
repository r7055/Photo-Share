// // import  { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
// // import { fetchSharedAlbums } from '../slices/albumSlice';
// // import { AppDispatch } from '../store/store';
// // import { Album } from '../types/album';
// // import { useNavigate } from 'react-router-dom';

// // const SharedAlbums = () => {
// //     const { sharedAlbums, loading, msg } = useSelector((state: { album: { sharedAlbums: Album[], loading: boolean, msg: string } }) => state.album);
// //     const dispatch = useDispatch<AppDispatch>();
// //     const token = sessionStorage.getItem('token');
// //     const navigate=useNavigate();

// //     useEffect(() => {
// //         console.log("sharedAlbums",sharedAlbums,token);
// //         if (token) {
// //             dispatch(fetchSharedAlbums({ token }));
// //         }
// //         else(
// //             navigate('/auth')
// //         )
// //     }, [dispatch,token]);

// //     if (loading) {
// //         return <CircularProgress />;
// //     }

// //     if (msg) {
// //         return <Typography variant="h6" color="error">{msg}</Typography>;
// //     }

// //     return (
// //         <div>
// //             <Typography variant="h4" gutterBottom>אלבומים ששיתפו אותי</Typography>
// //             <Grid container spacing={2}>
// //                 {sharedAlbums.length === 0 ? (
// //                     <Typography variant="body1">אין אלבומים ששיתפו אותי.</Typography>
// //                 ) : (
// //                     sharedAlbums.map((album) => (
// //                         <Grid size={{ xs: 12, sm: 6, md: 4}} key={album.id}>
// //                             <Card>
// //                                 <CardContent>
// //                                     <Typography variant="h5">{album.title}</Typography>
// //                                     <Typography variant="body2" color="textSecondary">{album.description}</Typography>
// //                                     {/* כאן תוכל להוסיף את התמונות של האלבום */}
// //                                     {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
// //                                         {album.photos.map((photo) => (
// //                                             <img key={photo.id} src={photo.url} alt={photo.title} style={{ width: '100%', borderRadius: '5px' }} />
// //                                         ))}
// //                                     </div> */}
// //                                 </CardContent>
// //                             </Card>
// //                         </Grid>
// //                     ))
// //                 )}
// //             </Grid>
// //         </div>
// //     );
// // };

// // export default SharedAlbums;
// "use client"

// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Box, Typography, Grid, Card, CardContent, Container, Skeleton, useTheme, alpha, Button } from "@mui/material"
// import { fetchSharedAlbums } from "../slices/albumSlice"
// import type { AppDispatch } from "../store/store"
// import type { Album } from "../types/album"
// import { useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import FolderSharedIcon from "@mui/icons-material/FolderShared"
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"
// import EmptyState from "./EmptyState"

// const SharedAlbums = () => {
//   const { sharedAlbums, loading, } = useSelector(
//     (state: { album: { sharedAlbums: Album[]; loading: boolean; msg: string } }) => state.album,
//   )
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const token = sessionStorage.getItem("token")

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchSharedAlbums({ token }))
//     } else {
//       navigate("/auth")
//     }
//   }, [dispatch, token, navigate])

//   const handleAlbumClick = (albumId: number) => {
//     navigate(`/shared-albums/${albumId}`)
//   }

//   const handleBackClick = () => {
//     navigate("/albums")
//   }

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.4 },
//     },
//   }

//   if (loading) {
//     return (
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
//           <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
//           <Skeleton variant="text" width="40%" height={40} />
//         </Box>

//         <Grid container spacing={3}>
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <Grid size={{ xs:12, sm:6,md:4, lg:3}} key={item}>
//               <Skeleton variant="rounded" width="100%" height={200} />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     )
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       <motion.div variants={containerVariants} initial="hidden" animate="visible">
//         <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
//           <motion.div variants={itemVariants}>
//             <Button startIcon={<ArrowBackIcon />} onClick={handleBackClick} sx={{ mr: 2 }}>
//               Back
//             </Button>
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <Typography
//               variant="h4"
//               component="h1"
//               sx={{
//                 fontWeight: 700,
//                 background: "linear-gradient(90deg, #3f51b5, #2196f3)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <FolderSharedIcon sx={{ mr: 2, fontSize: 32 }} />
//               Shared With Me
//             </Typography>
//           </motion.div>
//         </Box>

//         {sharedAlbums.length > 0 ? (
//           <Grid container spacing={3}>
//             {sharedAlbums.map((album) => (
//               <Grid size={{ xs:12, sm:6, md:4,lg:3}} key={album.id}>
//                 <motion.div variants={itemVariants}>
//                   <Card
//                     onClick={() => handleAlbumClick(album.id!)}
//                     sx={{
//                       height: 200,
//                       borderRadius: "16px",
//                       background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
//                       backdropFilter: "blur(5px)",
//                       boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
//                       transition: "all 0.3s ease",
//                       cursor: "pointer",
//                       overflow: "hidden",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "translateY(-5px)",
//                         boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
//                       },
//                     }}
//                   >
//                     <CardContent
//                       sx={{
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         p: 3,
//                       }}
//                     >
//                       <FolderSharedIcon
//                         sx={{
//                           fontSize: 70,
//                           color: theme.palette.secondary.main,
//                           mb: 2,
//                         }}
//                       />

//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: 600,
//                           textAlign: "center",
//                           color: theme.palette.text.primary,
//                         }}
//                       >
//                         {album.title}
//                       </Typography>

//                       {album.description && (
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             mt: 1,
//                             textAlign: "center",
//                             color: theme.palette.text.secondary,
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             display: "-webkit-box",
//                             WebkitLineClamp: 2,
//                             WebkitBoxOrient: "vertical",
//                           }}
//                         >
//                           {album.description}
//                         </Typography>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <EmptyState
//             title="No Shared Albums"
//             description="Albums shared with you will appear here"
//             icon={<FolderSharedIcon sx={{ fontSize: 80 }} />}
//           />
//         )}
//       </motion.div>
//     </Container>
//   )
// }

// export default SharedAlbums

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
  Box,
  Button,
  Skeleton,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import { fetchSharedAlbums } from "../../slices/albumSlice"
import type { AppDispatch } from "../../store/store"
import type { Album } from "../../types/album"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Share as ShareIcon,
  Folder as FolderIcon,
  MoreVert as MoreVertIcon,
  PhotoLibrary,
  Person,
  CalendarToday,
  Visibility,
} from "@mui/icons-material"

const SharedAlbums = () => {
  const { sharedAlbums, loading, msg } = useSelector(
    (state: { album: { sharedAlbums: Album[]; loading: boolean; msg: string } }) => state.album,
  )
  const dispatch = useDispatch<AppDispatch>()
  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({})

  useEffect(() => {
    if (token) {
      dispatch(fetchSharedAlbums({ token }))
    } else {
      navigate("/auth")
    }
  }, [dispatch, token, navigate])

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
    setAnchorEl((prev) => ({ ...prev, [albumId]: event.currentTarget }))
  }

  const handleMenuClose = (albumId: number) => {
    setAnchorEl((prev) => ({ ...prev, [albumId]: null }))
  }

  const handleViewAlbum = (albumId: number) => {
    console.log("Viewing album with ID:", albumId)
    navigate(`/photos/${albumId}`);
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
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" width="40%" height={60} sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
              <Skeleton variant="rounded" width="100%" height={300} />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  if (msg) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: "16px",
          backgroundColor: "background.paper",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" color="error">
          {msg}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <ShareIcon sx={{ fontSize: 32, color: "#00c6ff", mr: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
          Shared Albums
        </Typography>
      </Box>

      {sharedAlbums.length === 0 ? (
        <Box
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "16px",
            backgroundColor: "background.paper",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "rgba(0, 198, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 3,
            }}
          >
            <ShareIcon sx={{ fontSize: 60, color: "#00c6ff" }} />
          </Box>
          <Typography variant="h5" sx={{ color: "text.primary", mb: 2 }}>
            No shared albums yet
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 500, mx: "auto" }}>
            When someone shares an album with you, it will appear here. You can view and download photos from shared
            albums.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/albums/0")}
            sx={{
              background: "linear-gradient(135deg, #00c6ff, #0072ff)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #0072ff, #00c6ff)",
              },
            }}
          >
            Go to My Albums
          </Button>
        </Box>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3}>
            {sharedAlbums.map((album) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={album.id}>
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
                      position: "relative",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="div"
                        sx={{
                          height: 200,
                          backgroundColor: "rgba(0, 198, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FolderIcon sx={{ fontSize: 80, color: "#3f51b5" }} />
                      </CardMedia>
                      <Chip
                        icon={<ShareIcon />}
                        label="Shared with you"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          "& .MuiChip-icon": {
                            color: "#00c6ff",
                          },
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                          },
                        }}
                        onClick={(event) => handleMenuOpen(event, album.id!)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}>
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

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Person sx={{ fontSize: 18, color: "text.secondary", mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Shared by: {album.owner?.firstName || "Unknown"}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <PhotoLibrary sx={{ fontSize: 18, color: "text.secondary", mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {album.photoCount || 0} photos
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarToday sx={{ fontSize: 18, color: "text.secondary", mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(album.createdAt || Date.now()).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>

                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Visibility />}
                        onClick={() => handleViewAlbum(album.id!)}
                        sx={{
                          background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                          color: "white",
                          "&:hover": {
                            background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                          },
                        }}
                      >
                        View Album
                      </Button>
                    </Box>

                    <Menu
                      anchorEl={anchorEl[album.id!]}
                      open={Boolean(anchorEl[album.id!])}
                      onClose={() => handleMenuClose(album.id!)}
                      PaperProps={{
                        sx: {
                          backgroundColor: "background.paper",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          borderRadius: "12px",
                          minWidth: 180,
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleViewAlbum(album.id!)}>
                        <Visibility sx={{ mr: 1, fontSize: 20 }} /> View Album
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuClose(album.id!)}>
                        <ShareIcon sx={{ mr: 1, fontSize: 20 }} /> Share Link
                      </MenuItem>
                    </Menu>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
    </Box>
  )
}

export default SharedAlbums
