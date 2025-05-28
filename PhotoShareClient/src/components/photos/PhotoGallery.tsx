// // // import React, { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { AppDispatch } from '../../store/store';
// // // import { getPhotosByAlbumId } from '../../slices/photoSlice';
// // // import { Box, Grid, Card, Typography} from '@mui/material';
// // // import { Photo } from '../../types/photo';
// // // import { useNavigate } from 'react-router-dom';
// // // import DeletePhoto from './DeletePhoto'; // Import the DeletePhoto component
// // // import { Masonry } from '@mui/lab';
// // // import DownloadPhoto from './DownloadPhoto';

// // // interface PhotoGalleryProps {
// // //     albumId: number;
// // // }

// // // const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
// // //     const dispatch = useDispatch<AppDispatch>();
// // //     const { photos, loading, msg } = useSelector((state: { photo: { photos: Photo[], loading: boolean, msg: string } }) => state.photo);
// // //     const token = sessionStorage.getItem('token');
// // //     const navigate = useNavigate();

// // //     useEffect(() => {
// // //         if (token) {
// // //             dispatch(getPhotosByAlbumId({ token, albumId }));
// // //         } else {
// // //             navigate('/auth');
// // //         }
// // //     }, [dispatch, token, albumId, navigate]);

// // //     if (loading) return <div>Loading...</div>;
// // //     if (msg) return <div>{msg}</div>;


// // //         return (
// // //         <Box sx={{ mt: 3 }}>
// // //             <Typography variant="h5" sx={{ mb: 2 }}>תמונות מהאלבום</Typography>
// // //             <Masonry columns={3} spacing={2} sx={{ mt: 4 }}>
// // //                 {photos.map(photo => (
// // //                     <Grid size={{ xs: 12, sm: 6, md: 4 }} key={photo.id}>
// // //                         <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
// // //                             <img src={photo.url} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
// // //                             <DownloadPhoto photo={photo} />
// // //                             {photo.id !== undefined && (
// // //                                 <DeletePhoto photoId={photo.id} albumId={albumId} />
// // //                             )}
// // //                         </Card>
// // //                     </Grid>
// // //                 ))}
// // //             </Masonry>
// // //         </Box>
// // //     );
// // // };

// // // export default PhotoGallery;

// // "use client"

// // import type React from "react"

// // import { useEffect, useState } from "react"
// // import { useDispatch, useSelector } from "react-redux"
// // import type { AppDispatch } from "../../store/store"
// // import { getPhotosByAlbumId } from "../../slices/photoSlice"
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Card,
// //   IconButton,
// //   Skeleton,
// //   Tooltip,
// //   Fade,
// //   Zoom,
// //   Dialog,
// //   DialogContent,
// //   useTheme,
// //   alpha,
// // } from "@mui/material"
// // import type { Photo } from "../../types/photo"
// // import { useNavigate } from "react-router-dom"
// // import DeletePhoto from "./DeletePhoto"
// // import DownloadPhoto from "./DownloadPhoto"
// // import { Masonry } from "@mui/lab"
// // import { motion, AnimatePresence } from "framer-motion"
// // import ZoomInIcon from "@mui/icons-material/ZoomIn"
// // import CloseIcon from "@mui/icons-material/Close"
// // import PhotoIcon from "@mui/icons-material/Photo"
// // import EmptyState from "../EmptyState"

// // interface PhotoGalleryProps {
// //   albumId: number
// // }

// // const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
// //   const dispatch = useDispatch<AppDispatch>()
// //   const navigate = useNavigate()
// //   const theme = useTheme()

// //   const { photos, loading, msg } = useSelector(
// //     (state: { photo: { photos: Photo[]; loading: boolean; msg: string } }) => state.photo,
// //   )
// //   const token = sessionStorage.getItem("token")

// //   const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
// //   const [openLightbox, setOpenLightbox] = useState(false)

// //   useEffect(() => {
// //     if (token) {
// //       dispatch(getPhotosByAlbumId({ token, albumId }))
// //     } else {
// //       navigate("/auth")
// //     }
// //   }, [dispatch, token, albumId, navigate])

// //   const handleOpenLightbox = (photo: Photo, event: React.MouseEvent) => {
// //     event.stopPropagation()
// //     setSelectedPhoto(photo)
// //     setOpenLightbox(true)
// //   }

// //   const handleCloseLightbox = () => {
// //     setOpenLightbox(false)
// //   }

// //   // Animation variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.05,
// //       },
// //     },
// //   }

// //   const itemVariants = {
// //     hidden: { scale: 0.9, opacity: 0 },
// //     visible: {
// //       scale: 1,
// //       opacity: 1,
// //       transition: { duration: 0.4 },
// //     },
// //   }

// //   if (loading) {
// //     return (
// //       <Box sx={{ mt: 4 }}>
// //         <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3 }} />
// //         <Grid container spacing={2}>
// //           {[1, 2, 3, 4, 5, 6].map((item) => (
// //             <Grid size={{ xs:12, sm:6, md:4}} key={item}>
// //               <Skeleton variant="rounded" width="100%" height={240} />
// //             </Grid>
// //           ))}
// //         </Grid>
// //       </Box>
// //     )
// //   }

// //   if (msg) {
// //     return (
// //       <Box sx={{ mt: 4 }}>
// //         <Typography variant="body1" color="error">
// //           {msg}
// //         </Typography>
// //       </Box>
// //     )
// //   }

// //   return (
// //     <Box sx={{ mt: 6 }}>
// //       <Typography
// //         variant="h5"
// //         sx={{
// //           mb: 4,
// //           fontWeight: 600,
// //           display: "flex",
// //           alignItems: "center",
// //           "&::before": {
// //             content: '""',
// //             display: "block",
// //             width: "3px",
// //             height: "24px",
// //             backgroundColor: theme.palette.primary.main,
// //             marginRight: "12px",
// //             borderRadius: "4px",
// //           },
// //         }}
// //       >
// //         Photos
// //       </Typography>

// //       {photos.length > 0 ? (
// //         <motion.div variants={containerVariants} initial="hidden" animate="visible">
// //           <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
// //             <AnimatePresence>
// //               {photos.map((photo) => (
// //                 <motion.div key={photo.id} variants={itemVariants}>
// //                   <Card
// //                     sx={{
// //                       position: "relative",
// //                       overflow: "hidden",
// //                       borderRadius: "16px",
// //                       boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
// //                       transition: "all 0.3s ease",
// //                       "&:hover": {
// //                         transform: "translateY(-5px)",
// //                         boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
// //                         "& .photo-overlay": {
// //                           opacity: 1,
// //                         },
// //                       },
// //                     }}
// //                   >
// //                     <Box sx={{ position: "relative" }}>
// //                       <img
// //                         src={photo.url || "/placeholder.svg"}
// //                         alt={photo.name}
// //                         style={{
// //                           width: "100%",
// //                           height: "auto",
// //                           display: "block",
// //                           borderRadius: "16px",
// //                         }}
// //                       />

// //                       <Box
// //                         className="photo-overlay"
// //                         sx={{
// //                           position: "absolute",
// //                           top: 0,
// //                           left: 0,
// //                           right: 0,
// //                           bottom: 0,
// //                           background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.7)} 0%, ${alpha(theme.palette.common.black, 0.2)} 50%, transparent 100%)`,
// //                           display: "flex",
// //                           flexDirection: "column",
// //                           justifyContent: "flex-end",
// //                           padding: 2,
// //                           opacity: 0,
// //                           transition: "opacity 0.3s ease",
// //                           borderRadius: "16px",
// //                         }}
// //                       >
// //                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //                           <Typography
// //                             variant="body2"
// //                             sx={{
// //                               color: "white",
// //                               fontWeight: 500,
// //                               textShadow: "0 1px 3px rgba(0,0,0,0.3)",
// //                               overflow: "hidden",
// //                               textOverflow: "ellipsis",
// //                               whiteSpace: "nowrap",
// //                               maxWidth: "70%",
// //                             }}
// //                           >
// //                             {photo.name}
// //                           </Typography>

// //                           <Box sx={{ display: "flex", gap: 1 }}>
// //                             <Tooltip title="View Full Size">
// //                               <IconButton
// //                                 size="small"
// //                                 onClick={(e) => handleOpenLightbox(photo, e)}
// //                                 sx={{
// //                                   bgcolor: "rgba(255,255,255,0.2)",
// //                                   backdropFilter: "blur(5px)",
// //                                   color: "white",
// //                                   "&:hover": {
// //                                     bgcolor: "rgba(255,255,255,0.3)",
// //                                   },
// //                                 }}
// //                               >
// //                                 <ZoomInIcon fontSize="small" />
// //                               </IconButton>
// //                             </Tooltip>

// //                             <DownloadPhoto photo={photo} />

// //                             {photo.id !== undefined && <DeletePhoto photoId={photo.id} albumId={albumId} />}
// //                           </Box>
// //                         </Box>
// //                       </Box>
// //                     </Box>
// //                   </Card>
// //                 </motion.div>
// //               ))}
// //             </AnimatePresence>
// //           </Masonry>
// //         </motion.div>
// //       ) : (
// //         <EmptyState
// //           title="No Photos Found"
// //           description="Upload photos to this album to see them here"
// //           icon={<PhotoIcon sx={{ fontSize: 80 }} />}
// //         />
// //       )}

// //       {/* Lightbox Dialog */}
// //       <Dialog
// //         open={openLightbox}
// //         onClose={handleCloseLightbox}
// //         maxWidth="xl"
// //         TransitionComponent={Zoom}
// //         PaperProps={{
// //           sx: {
// //             bgcolor: "rgba(0,0,0,0.9)",
// //             boxShadow: "none",
// //             borderRadius: "16px",
// //             overflow: "hidden",
// //             maxHeight: "90vh",
// //             maxWidth: "90vw",
// //           },
// //         }}
// //       >
// //         <IconButton
// //           onClick={handleCloseLightbox}
// //           sx={{
// //             position: "absolute",
// //             top: 16,
// //             right: 16,
// //             color: "white",
// //             bgcolor: "rgba(0,0,0,0.3)",
// //             zIndex: 1,
// //             "&:hover": {
// //               bgcolor: "rgba(0,0,0,0.5)",
// //             },
// //           }}
// //         >
// //           <CloseIcon />
// //         </IconButton>

// //         <DialogContent
// //           sx={{ p: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}
// //         >
// //           {selectedPhoto && (
// //             <Fade in={openLightbox}>
// //               <img
// //                 src={selectedPhoto.url || "/placeholder.svg"}
// //                 alt={selectedPhoto.name}
// //                 style={{
// //                   maxWidth: "100%",
// //                   maxHeight: "85vh",
// //                   objectFit: "contain",
// //                 }}
// //               />
// //             </Fade>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </Box>
// //   )
// // }

// // export default PhotoGallery
// "use client"
// import type React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch } from "../../store/store";
// import { getPhotosByAlbumId } from "../../slices/photoSlice";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardActions,
//   IconButton,
//   Tooltip,
//   Skeleton,
//   Dialog,
//   DialogContent,
//   Fade,
//   Backdrop,
//   Chip,
//   TextField,
// } from "@mui/material";
// import {
//   Delete as DeleteIcon,
//   Download as DownloadIcon,
//   ZoomIn as ZoomInIcon,
//   Share as ShareIcon,
//   Info as InfoIcon,
//   Tag as TagIcon,
// } from "@mui/icons-material";
// import type { Photo } from "../../types/photo";
// import { useNavigate } from "react-router-dom";
// import { Masonry } from "@mui/lab";
// import { motion } from "framer-motion";
// import DownloadPhoto from "./DownloadPhoto";
// import DeletePhoto from "./DeletePhoto";

// interface PhotoGalleryProps {
//   albumId: number;
// }

// const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { photos, loading } = useSelector(
//     (state: { photo: { photos: Photo[]; loading: boolean; msg: string } }) => state.photo
//   );
//   const token = sessionStorage.getItem("token");
//   const navigate = useNavigate();
//   const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
//   const [openLightbox, setOpenLightbox] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     if (token) {
//       dispatch(getPhotosByAlbumId({ token, albumId }));
//     } else {
//       navigate("/auth");
//     }
//   }, [dispatch, token, albumId, navigate]);

//   const handleOpenLightbox = (photo: Photo) => {
//     setSelectedPhoto(photo);
//     setOpenLightbox(true);
//   };

//   const handleCloseLightbox = () => {
//     setOpenLightbox(false);
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <Box sx={{ mt: 4 }}>
//         <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
//         <Grid container spacing={2}>
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
//               <Skeleton variant="rounded" width="100%" height={250} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     );
//   }

//   // Filter photos based on search term
//   const filteredPhotos = photos.filter((photo) =>
//     photo.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography
//         variant="h5"
//         sx={{
//           mb: 3,
//           fontWeight: "bold",
//           display: "flex",
//           alignItems: "center",
//           color: "text.primary",
//         }}
//       >
//         <Box
//           component="span"
//           sx={{
//             background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//             width: 4,
//             height: 24,
//             display: "inline-block",
//             mr: 2,
//             borderRadius: 1,
//           }}
//         />
//         Album Photos
//         <Chip
//           label={`${filteredPhotos.length} photos`}
//           size="small"
//           sx={{
//             ml: 2,
//             backgroundColor: "rgba(63, 81, 181, 0.1)",
//             color: "#3f51b5",
//             fontWeight: "bold",
//           }}
//         />
//       </Typography>

//       <TextField
//         label="Search Photos"
//         variant="outlined"
//         fullWidth
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ mb: 3 }}
//       />

//       {filteredPhotos.length === 0 ? (
//         <Box
//           sx={{
//             p: 4,
//             textAlign: "center",
//             borderRadius: "16px",
//             backgroundColor: "background.paper",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           }}
//         >
//           <Box
//             component="img"
//             src="/placeholder.svg?height=120&width=120"
//             alt="No photos"
//             sx={{
//               width: 120,
//               height: 120,
//               opacity: 0.5,
//               mb: 2,
//             }}
//           />
//           <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
//             No photos in this album
//           </Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
//             Upload photos to start building your collection
//           </Typography>
//         </Box>
//       ) : (
//         <motion.div variants={containerVariants} initial="hidden" animate="visible">
//           <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
//             {filteredPhotos.map((photo) => (
//               <motion.div key={photo.id} variants={itemVariants}>
//                 <Card
//                   sx={{
//                     borderRadius: "12px",
//                     overflow: "hidden",
//                     boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                     transition: "transform 0.3s, box-shadow 0.3s",
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
//                     },
//                   }}
//                 >
//                   <Box sx={{ position: "relative" }}>
//                     <CardMedia
//                       component="img"
//                       image={photo.url}
//                       alt={photo.name}
//                       sx={{
//                         width: "100%",
//                         cursor: "pointer",
//                         transition: "transform 0.3s ease",
//                         "&:hover": {
//                           transform: "scale(1.02)",
//                         },
//                       }}
//                       onClick={() => handleOpenLightbox(photo)}
//                     />
//                     <IconButton
//                       onClick={() => handleOpenLightbox(photo)}
//                       sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                         color: "white",
//                         "&:hover": {
//                           backgroundColor: "rgba(0, 0, 0, 0.7)",
//                         },
//                         opacity: 0,
//                         transition: "opacity 0.3s",
//                         ".MuiCard-root:hover &": {
//                           opacity: 1,
//                         },
//                       }}
//                     >
//                       <ZoomInIcon />
//                     </IconButton>

//                     {photo.tags && photo.tags.length > 0 && (
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           bottom: 8,
//                           left: 8,
//                           display: "flex",
//                           flexWrap: "wrap",
//                           gap: 0.5,
//                         }}
//                       >
//                         {photo.tags.slice(0, 3).map((tag, index) => (
//                           <Chip
//                             key={index}
//                             icon={<TagIcon sx={{ fontSize: "0.8rem" }} />}
//                             label={tag.name}
//                             size="small"
//                             sx={{
//                               backgroundColor: "rgba(0, 0, 0, 0.6)",
//                               color: "white",
//                               fontSize: "0.7rem",
//                               height: 24,
//                               "& .MuiChip-icon": {
//                                 color: "white",
//                               },
//                             }}
//                           />
//                         ))}
//                         {photo.tags.length > 3 && (
//                           <Chip
//                             label={`+${photo.tags.length - 3}`}
//                             size="small"
//                             sx={{
//                               backgroundColor: "rgba(0, 0, 0, 0.6)",
//                               color: "white",
//                               fontSize: "0.7rem",
//                               height: 24,
//                             }}
//                           />
//                         )}
//                       </Box>
//                     )}
//                   </Box>

//                   <CardActions
//                     sx={{
//                       justifyContent: "space-between",
//                       backgroundColor: "background.paper",
//                       p: 1,
//                     }}
//                   >
//                     <Box>
//                       <Tooltip title="View Details">
//                         <IconButton size="small" sx={{ color: "#3f51b5" }}>
//                           <InfoIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Share Photo">
//                         <IconButton size="small" sx={{ color: "#4caf50" }}>
//                           <ShareIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>

//                     <Box>
//                       <DownloadPhoto photo={photo} />
//                       {photo.id !== undefined && <DeletePhoto photoId={photo.id} albumId={albumId} />}
//                     </Box>
//                   </CardActions>
//                 </Card>
//               </motion.div>
//             ))}
//           </Masonry>
//         </motion.div>
//       )}

//       {/* Lightbox Dialog */}
//       <Dialog
//         open={openLightbox}
//         onClose={handleCloseLightbox}
//         maxWidth="lg"
//         fullWidth
//         TransitionComponent={Fade}
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//         PaperProps={{
//           sx: {
//             backgroundColor: "transparent",
//             boxShadow: "none",
//             overflow: "hidden",
//             maxHeight: "90vh",
//             maxWidth: "90vw",
//             width: "auto",
//             m: 0,
//           },
//         }}
//       >
//         <DialogContent
//           sx={{ p: 0, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}
//         >
//           {selectedPhoto && (
//             <Box sx={{ position: "relative", maxHeight: "85vh", maxWidth: "100%" }}>
//               <img
//                 src={selectedPhoto.url || "/placeholder.svg"}
//                 alt={selectedPhoto.name}
//                 style={{
//                   maxHeight: "85vh",
//                   maxWidth: "100%",
//                   objectFit: "contain",
//                   borderRadius: "8px",
//                 }}
//               />
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 16,
//                   left: 0,
//                   right: 0,
//                   display: "flex",
//                   justifyContent: "center",
//                   gap: 2,
//                 }}
//               >
//                 <IconButton
//                   sx={{
//                     backgroundColor: "rgba(0, 0, 0, 0.7)",
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor: "rgba(0, 0, 0, 0.9)",
//                     },
//                   }}
//                   onClick={() => {
//                     if (selectedPhoto) {
//                       const downloadLink = document.createElement("a");
//                       downloadLink.href = selectedPhoto.url;
//                       downloadLink.download = selectedPhoto.name || "photo";
//                       downloadLink.click();
//                     }
//                   }}
//                 >
//                   <DownloadIcon />
//                 </IconButton>
//                 {selectedPhoto.id !== undefined && (
//                   <IconButton
//                     sx={{
//                       backgroundColor: "rgba(0, 0, 0, 0.7)",
//                       color: "white",
//                       "&:hover": {
//                         backgroundColor: "rgba(0, 0, 0, 0.9)",
//                       },
//                     }}
//                     onClick={() => {
//                       handleCloseLightbox();
//                       // Add a small delay to ensure the dialog is closed before deleting
//                       setTimeout(() => {
//                         if (selectedPhoto.id !== undefined) {
//                           const deleteButton = document.querySelector(`[data-photo-id="${selectedPhoto.id}"]`);
//                           if (deleteButton) {
//                             (deleteButton as HTMLElement).click();
//                           }
//                         }
//                       }, 300);
//                     }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 )}
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default PhotoGallery;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosByAlbumId } from "../../slices/photoSlice";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Masonry } from "@mui/lab";
import PhotoCard from "./PhotoCard";
import PhotoSearch from "./PhotoSearch";
import type { AppDispatch } from "../../store/store";
import type { Photo } from "../../types/photo";
import PhotoLightbox from "./PhotoLightBox";

interface PhotoGalleryProps {
  albumId: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { photos, loading } = useSelector(
    (state: { photo: { photos: Photo[]; loading: boolean } }) => state.photo
  );
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(getPhotosByAlbumId({ token, albumId }));
    } else {
      navigate("/auth");
    }
  }, [dispatch, token, albumId, navigate]);

  const handleOpenLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  const handleDeletePhoto = (photoId: number) => {
    // לוגיקה למחיקת התמונה
    handleCloseLightbox();
  };

  if (loading) {
    return (
      <Box sx={{ mt: 4 }}>
        {/* ניתן להוסיף קוד לסקלטון כאן */}
      </Box>
    );
  }

  const filteredPhotos = photos.filter((photo) =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Album Photos
      </Typography>

      <PhotoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredPhotos.length === 0 ? (
        <Box>
          <Typography variant="h6">No photos in this album</Typography>
        </Box>
      ) : (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
          {filteredPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} onOpenLightbox={handleOpenLightbox} />
          ))}
        </Masonry>
      )}

      <PhotoLightbox open={openLightbox} photo={selectedPhoto} onClose={handleCloseLightbox} onDelete={handleDeletePhoto} />
    </Box>
  );
};

export default PhotoGallery;
