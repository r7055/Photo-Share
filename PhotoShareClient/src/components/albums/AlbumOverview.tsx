// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch } from '../../store/store';
// // import { Album } from '../../types/album';
// // import { deleteAlbum, fetchAlbumsByParent, shareAlbum } from '../../slices/albumSlice';
// // import { Box, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import MoreVertIcon from '@mui/icons-material/MoreVert';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import ShareIcon from '@mui/icons-material/Share';
// // import { User } from '../../types/user';
// // import EditAlbum from './EditAlbum';

// // const AlbumOverview: React.FC<{ onSelectAlbum: (albumId: number) => void }> = ({ onSelectAlbum }) => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const navigate = useNavigate();
// //     const { myAlbums, loading, msg } = useSelector((state: { album: { myAlbums: Album[], loading: boolean, msg: string } }) => state.album);
// //     const { user } = useSelector((state: { user: { user: User } }) => state.user);
// //     const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
// //     const { albumId } = useParams<{ albumId: string }>();

// //     const token = sessionStorage.getItem('token');

// //     const [path, setPath] = useState<string[]>(['']);
// //     const [clickCount, setClickCount] = useState(0);
// //     const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
// //     const [isEditDialogOpen, setEditDialogOpen] = useState(false);
// //     const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

// //     useEffect(() => {
// //         if (token) {
// //             dispatch(fetchAlbumsByParent({ token, albumId: albumId ? parseInt(albumId) : 0 }));
// //         }
// //     }, [dispatch, token, albumId]);

// //     const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
// //         setAnchorEl(prev => ({ ...prev, [albumId]: event.currentTarget }));
// //     };

// //     const handleMenuClose = (albumId: number) => {
// //         setAnchorEl(prev => ({ ...prev, [albumId]: null }));
// //     };

// //     const handleDeleteAlbum = (albumId: number) => {
// //         handleMenuClose(albumId);
// //         if (token) {
// //             dispatch(deleteAlbum({ token, albumId }));
// //         }
// //     };

// //     const handleEditAlbum = (album: Album) => {
// //         handleMenuClose(album.id!);
// //         setSelectedAlbum(album);
// //         setEditDialogOpen(true);
// //     };

// //     const handleShareAlbum = (albumId: number) => {
// //         const UserEmailForSharing = prompt("הכנס כתובת אימייל לשיתוף:");
// //         handleMenuClose(albumId);
// //         if (UserEmailForSharing) {
// //             const shareData = { albumId, UserEmailForSharing };
// //             dispatch(shareAlbum({ token, albumShareData: shareData }));
// //         }
// //     };

// //     const handleAlbumClick = (albumId: number, albumTitle: string) => {
// //         setClickCount(prev => prev + 1);
// //         console.log(albumId, albumTitle);

// //         if (clickTimeout) {
// //             clearTimeout(clickTimeout);
// //         }

// //         const newTimeout = setTimeout(() => {
// //             setClickCount(0);
// //         }, 300);

// //         setClickTimeout(newTimeout);

// //         if (clickCount === 1) {
// //             onSelectAlbum(albumId); // Set the selected album ID
// //             navigate(`/albums/${albumId}`);
// //         }
// //     };

// //     const springProps = {
// //         initial: { opacity: 0, scale: 0.9 },
// //         animate: { opacity: 1, scale: 1 },
// //         exit: { opacity: 0, scale: 0.9 },
// //         transition: { tension: 200, friction: 20 },
// //     };

// //     if (loading) return <div>Loading...</div>;
// //     if (msg) return <div>{msg}</div>;

// //     return (
// //         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
// //             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// //                 <Typography variant="body1" sx={{ color: '#3f51b5', mr: 1 }}>
// //                     {user.firstName}
// //                 </Typography>
// //                 {path.map((name, index) => {
// //                     const albumIdToNavigate = index === 0 ? 0 : myAlbums.find(album => album.title === name)?.id;
// //                     return (
// //                         <Typography
// //                             key={index}
// //                             variant="body1"
// //                             sx={{ cursor: 'pointer', color: '#3f51b5', mr: 1 }}
// //                             onClick={() => {
// //                                 if (albumIdToNavigate) {
// //                                     setPath(path.slice(0, index + 1)); // Update path
// //                                     navigate(`/albums/${albumIdToNavigate}`); // Navigate to album
// //                                 }
// //                             }}
// //                         >
// //                             {name} {index < path.length - 1 ? '>' : ''}
// //                         </Typography>
// //                     );
// //                 })}
// //             </Box>
// //             {Array.isArray(myAlbums) && myAlbums.length > 0 ? myAlbums.map(album => (
// //                 <motion.div {...springProps} key={album.id}>
// //                     <Card
// //                         sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
// //                         onClick={() => handleAlbumClick(album.id!, album.title)}
// //                     >
// //                         <FolderIcon sx={{ fontSize: 70, color: '#3f51b5' }} />
// //                         <Typography variant="h6" sx={{ textAlign: 'center', mt: 1, color: '#3f51b5' }}>{album.title}</Typography>
// //                         <IconButton sx={{ position: 'absolute', top: 5, right: 5 }} onClick={(event) => handleMenuOpen(event, album.id!)}>
// //                             <MoreVertIcon />
// //                         </IconButton>
// //                         <Menu
// //                             anchorEl={anchorEl[album.id!]}
// //                             open={Boolean(anchorEl[album.id!])}
// //                             onClose={() => handleMenuClose(album.id!)}
// //                         >
// //                             <MenuItem onClick={() => handleEditAlbum(album)}>
// //                                 <EditIcon sx={{ mr: 1 }} /> עריכה
// //                             </MenuItem>
// //                             <MenuItem onClick={() => handleDeleteAlbum(album.id!)}>
// //                                 <DeleteIcon sx={{ mr: 1, color: 'red' }} /> מחיקה
// //                             </MenuItem>
// //                             <MenuItem onClick={() => handleShareAlbum(album.id!)}>
// //                                 <ShareIcon sx={{ mr: 1, color: 'green' }} /> שתף
// //                             </MenuItem>
// //                         </Menu>
// //                         <EditAlbum
// //                             open={isEditDialogOpen}
// //                             onClose={() => setEditDialogOpen(false)}
// //                             album={selectedAlbum!}
                            
// //                             />
// //                     </Card>
// //                 </motion.div>
// //             )) : <Typography>לא נמצאו תקיות.</Typography>}
// //         </Box>
// //     );
// // };

// // export default AlbumOverview;

// import type React from "react"

// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch } from "../../store/store"
// import type { Album } from "../../types/album"
// import { deleteAlbum, fetchAlbumsByParent, shareAlbum } from "../../slices/albumSlice"
// import {
//   Box,
//   Card,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
//   Grid,
//   Tooltip,
//   Breadcrumbs,
//   Link,
//   Skeleton,
//   useTheme,
//   alpha,
// } from "@mui/material"
// import { useParams, useNavigate } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import FolderIcon from "@mui/icons-material/Folder"
// import MoreVertIcon from "@mui/icons-material/MoreVert"
// import EditIcon from "@mui/icons-material/Edit"
// import DeleteIcon from "@mui/icons-material/Delete"
// import ShareIcon from "@mui/icons-material/Share"
// import HomeIcon from "@mui/icons-material/Home"
// // import type { User } from "../../types/user"
// import EditAlbum from "./EditAlbum"
// import EmptyState from "../EmptyState"

// const AlbumOverview: React.FC<{ onSelectAlbum: (albumId: number) => void }> = ({ onSelectAlbum }) => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const theme = useTheme()

//   const { myAlbums, loading, } = useSelector(
//     (state: { album: { myAlbums: Album[]; loading: boolean; msg: string } }) => state.album,
//   )
// //   const { user } = useSelector((state: { user: { user: User } }) => state.user)

//   const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({})
//   const { albumId } = useParams<{ albumId: string }>()
//   const token = sessionStorage.getItem("token")
//   const [path, setPath] = useState<{ id: number; title: string }[]>([{ id: 0, title: "Home" }])
//   const [clickCount, setClickCount] = useState(0)
//   const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)
//   const [isEditDialogOpen, setEditDialogOpen] = useState(false)
//   const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchAlbumsByParent({ token, albumId: albumId ? Number.parseInt(albumId) : 0 }))

//       // Update breadcrumb path when albumId changes
//       if (albumId && Number.parseInt(albumId) !== 0) {
//         // Here you would ideally fetch the full path from your API
//         // For now, we'll just add the current album to the path
//         const currentAlbum = myAlbums.find((album) => album.id === Number.parseInt(albumId))
//         if (currentAlbum) {
//           // Check if this album is already in the path
//           if (!path.some((item) => item.id === currentAlbum.id)) {
//             setPath([...path, { id: currentAlbum.id!, title: currentAlbum.title }])
//           }
//         }
//       } else {
//         // Reset to home when no albumId
//         setPath([{ id: 0, title: "Home" }])
//       }
//     }
//   }, [dispatch, token, albumId])

//   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
//     event.stopPropagation()
//     setAnchorEl((prev) => ({ ...prev, [albumId]: event.currentTarget }))
//   }

//   const handleMenuClose = (albumId: number) => {
//     setAnchorEl((prev) => ({ ...prev, [albumId]: null }))
//   }

//   const handleDeleteAlbum = (albumId: number) => {
//     handleMenuClose(albumId)
//     if (token) {
//       dispatch(deleteAlbum({ token, albumId }))
//     }
//   }

//   const handleEditAlbum = (album: Album) => {
//     handleMenuClose(album.id!)
//     setSelectedAlbum(album)
//     setEditDialogOpen(true)
//   }

//   const handleShareAlbum = (albumId: number) => {
//     const UserEmailForSharing = prompt("Enter email address to share with:")
//     handleMenuClose(albumId)
//     if (UserEmailForSharing) {
//       const shareData = { albumId, UserEmailForSharing }
//       dispatch(shareAlbum({ token, albumShareData: shareData }))
//     }
//   }

//   const handleAlbumClick = (albumId: number, albumTitle: string) => {
//     setClickCount((prev) => prev + 1)

//     if (clickTimeout) {
//       clearTimeout(clickTimeout)
//     }

//     const newTimeout = setTimeout(() => {
//       setClickCount(0)
//     }, 300)

//     setClickTimeout(newTimeout)

//     if (clickCount === 1) {
//       onSelectAlbum(albumId)
//       navigate(`/albums/${albumId}`)

//       // Update breadcrumb path
//       const newPathItem = { id: albumId, title: albumTitle }
//       if (!path.some((item) => item.id === albumId)) {
//         setPath([...path, newPathItem])
//       }
//     }
//   }

//   const handleBreadcrumbClick = (id: number, index: number) => {
//     // Navigate to the selected breadcrumb and update the path
//     navigate(id === 0 ? "/albums" : `/albums/${id}`)
//     setPath(path.slice(0, index + 1))

//     if (id === 0) {
//       onSelectAlbum(0)
//     } else {
//       onSelectAlbum(id)
//     }
//   }

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
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
//       <Box>
//         <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
//         <Grid container spacing={3}>
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <Grid size={{ xs:12 , sm:6, md:4, lg:3}} key={item}>
//               <Skeleton variant="rounded" width="100%" height={180} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     )
//   }

//   return (
//     <Box>
//       <Breadcrumbs
//         aria-label="breadcrumb"
//         sx={{
//           mb: 4,
//           "& .MuiBreadcrumbs-ol": {
//             flexWrap: "nowrap",
//             overflow: "auto",
//             msOverflowStyle: "none",
//             scrollbarWidth: "none",
//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//           },
//         }}
//       >
//         {path.map((item, index) => {
//           const isLast = index === path.length - 1

//           return isLast ? (
//             <Typography
//               key={item.id}
//               color="text.primary"
//               sx={{
//                 fontWeight: 600,
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               {index === 0 && <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />}
//               {item.title}
//             </Typography>
//           ) : (
//             <Link
//               key={item.id}
//               component="button"
//               underline="hover"
//               color="inherit"
//               onClick={() => handleBreadcrumbClick(item.id, index)}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               {index === 0 && <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />}
//               {item.title}
//             </Link>
//           )
//         })}
//       </Breadcrumbs>

//       {Array.isArray(myAlbums) && myAlbums.length > 0 ? (
//         <motion.div variants={containerVariants} initial="hidden" animate="visible">
//           <Grid container spacing={3}>
//             <AnimatePresence>
//               {myAlbums.map((album) => (
//                 <Grid size={{ xs:12, sm:6, md:4, lg:3}} key={album.id}>
//                   <motion.div variants={itemVariants}>
//                     <Card
//                       sx={{
//                         height: 180,
//                         borderRadius: "16px",
//                         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
//                         backdropFilter: "blur(5px)",
//                         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
//                         transition: "all 0.3s ease",
//                         position: "relative",
//                         overflow: "hidden",
//                         cursor: "pointer",
//                         "&:hover": {
//                           transform: "translateY(-5px)",
//                           boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
//                           "& .album-actions": {
//                             opacity: 1,
//                           },
//                         },
//                       }}
//                       onClick={() => handleAlbumClick(album.id!, album.title)}
//                     >
//                       <Box
//                         sx={{
//                           height: "100%",
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           p: 2,
//                           position: "relative",
//                           zIndex: 1,
//                         }}
//                       >
//                         <FolderIcon
//                           sx={{
//                             fontSize: 70,
//                             color: theme.palette.primary.main,
//                             mb: 2,
//                           }}
//                         />

//                         <Typography
//                           variant="h6"
//                           sx={{
//                             textAlign: "center",
//                             fontWeight: 600,
//                             color: theme.palette.text.primary,
//                           }}
//                         >
//                           {album.title}
//                         </Typography>

//                         {album.description && (
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               textAlign: "center",
//                               color: theme.palette.text.secondary,
//                               mt: 0.5,
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               display: "-webkit-box",
//                               WebkitLineClamp: 2,
//                               WebkitBoxOrient: "vertical",
//                             }}
//                           >
//                             {album.description}
//                           </Typography>
//                         )}

//                         <Box
//                           className="album-actions"
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             opacity: 0,
//                             transition: "opacity 0.2s ease",
//                           }}
//                         >
//                           <Tooltip title="Album Options">
//                             <IconButton
//                               size="small"
//                               onClick={(event) => handleMenuOpen(event, album.id!)}
//                               sx={{
//                                 bgcolor: "background.paper",
//                                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//                                 "&:hover": {
//                                   bgcolor: "background.paper",
//                                 },
//                               }}
//                             >
//                               <MoreVertIcon fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </Box>

//                       <Menu
//                         anchorEl={anchorEl[album.id!]}
//                         open={Boolean(anchorEl[album.id!])}
//                         onClose={() => handleMenuClose(album.id!)}
//                         PaperProps={{
//                           elevation: 3,
//                           sx: {
//                             borderRadius: "12px",
//                             minWidth: 180,
//                             overflow: "visible",
//                             mt: 1.5,
//                             "&:before": {
//                               content: '""',
//                               display: "block",
//                               position: "absolute",
//                               top: 0,
//                               right: 14,
//                               width: 10,
//                               height: 10,
//                               bgcolor: "background.paper",
//                               transform: "translateY(-50%) rotate(45deg)",
//                               zIndex: 0,
//                             },
//                           },
//                         }}
//                         transformOrigin={{ horizontal: "right", vertical: "top" }}
//                         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                       >
//                         <MenuItem onClick={() => handleEditAlbum(album)} sx={{ borderRadius: "8px", mx: 0.5, my: 0.3 }}>
//                           <EditIcon sx={{ mr: 1.5, fontSize: 18, color: theme.palette.info.main }} />
//                           <Typography variant="body2">Edit</Typography>
//                         </MenuItem>

//                         <MenuItem
//                           onClick={() => handleShareAlbum(album.id!)}
//                           sx={{ borderRadius: "8px", mx: 0.5, my: 0.3 }}
//                         >
//                           <ShareIcon sx={{ mr: 1.5, fontSize: 18, color: theme.palette.success.main }} />
//                           <Typography variant="body2">Share</Typography>
//                         </MenuItem>

//                         <MenuItem
//                           onClick={() => handleDeleteAlbum(album.id!)}
//                           sx={{
//                             borderRadius: "8px",
//                             mx: 0.5,
//                             my: 0.3,
//                             color: theme.palette.error.main,
//                           }}
//                         >
//                           <DeleteIcon sx={{ mr: 1.5, fontSize: 18 }} />
//                           <Typography variant="body2">Delete</Typography>
//                         </MenuItem>
//                       </Menu>
//                     </Card>
//                   </motion.div>
//                 </Grid>
//               ))}
//             </AnimatePresence>
//           </Grid>
//         </motion.div>
//       ) : (
//         <EmptyState
//           title="No Albums Found"
//           description="Create your first album to start organizing your photos"
//           icon={<FolderIcon sx={{ fontSize: 80 }} />}
//         />
//       )}

//       <EditAlbum open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)} album={selectedAlbum!} />
//     </Box>
//   )
// }

// export default AlbumOverview


"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../../store/store"
import type { Album } from "../../types/album"
import { deleteAlbum, fetchAlbumsByParent, shareAlbum } from "../../slices/albumSlice"
import {
  Box,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Folder as FolderIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material"
import EditAlbum from "./EditAlbum"
// import type { User } from "../../types/user"

interface AlbumPath {
  id: number
  title: string
}

const AlbumOverview: React.FC<{ onSelectAlbum: (albumId: number) => void }> = ({ onSelectAlbum }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { myAlbums, loading } = useSelector(
    (state: { album: { myAlbums: Album[]; loading: boolean; msg: string } }) => state.album,
  )
//   const { user } = useSelector((state: { user: { user: User } }) => state.user)
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({})
  const { albumId } = useParams<{ albumId: string }>()
  const token = sessionStorage.getItem("token")
  const [albumPath, setAlbumPath] = useState<AlbumPath[]>([])
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareEmail, setShareEmail] = useState("")
  const [sharingAlbumId, setSharingAlbumId] = useState<number | null>(null)
  const [shareLoading, setShareLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

  // Fetch albums when albumId changes
  useEffect(() => {
    if (token && albumId) {
      dispatch(fetchAlbumsByParent({ token, albumId: Number.parseInt(albumId) }))
      fetchAlbumPath(Number.parseInt(albumId))
    }
  }, [dispatch, token, albumId])

  // Fetch the path to the current album
  const fetchAlbumPath = useCallback(
    async (currentAlbumId: number) => {
      if (currentAlbumId === 0) {
        setAlbumPath([{ id: 0, title: "Root" }])
        return
      }

      // This is a simplified approach. In a real app, you'd fetch the path from the server
      // or build it by traversing parent albums
      const path: AlbumPath[] = [{ id: 0, title: "Root" }]

      // For demo purposes, we'll just add the current album to the path
      if (currentAlbumId > 0) {
        // Find the current album in myAlbums
        const currentAlbum = myAlbums.find((album) => album.id === currentAlbumId)
        if (currentAlbum) {
          path.push({ id: currentAlbumId, title: currentAlbum.title })
        }
      }

      setAlbumPath(path)
    },
    [myAlbums],
  )

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
    setAnchorEl((prev) => ({ ...prev, [albumId]: event.currentTarget }))
  }

  const handleMenuClose = (albumId: number) => {
    setAnchorEl((prev) => ({ ...prev, [albumId]: null }))
  }

  const handleDeleteAlbum = async (albumId: number) => {
    handleMenuClose(albumId)
    if (token) {
      await dispatch(deleteAlbum({ token, albumId }))
      setSnackbar({
        open: true,
        message: "Album moved to recycle bin",
        severity: "success",
      })
    }
  }

  const handleEditAlbum = (album: Album) => {
    handleMenuClose(album.id!)
    setSelectedAlbum(album)
    setEditDialogOpen(true)
  }

  const handleShareAlbum = (albumId: number) => {
    handleMenuClose(albumId)
    setSharingAlbumId(albumId)
    setShareDialogOpen(true)
  }

  const handleShareSubmit = async () => {
    if (!shareEmail || !sharingAlbumId || !token) return

    setShareLoading(true)
    try {
      const shareData = { albumId: sharingAlbumId, UserEmailForSharing: shareEmail }
      await dispatch(shareAlbum({ token, albumShareData: shareData })).unwrap()
      setSnackbar({
        open: true,
        message: "Album shared successfully",
        severity: "success",
      })
      setShareDialogOpen(false)
      setShareEmail("")
      setSharingAlbumId(null)
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to share album",
        severity: "error",
      })
    } finally {
      setShareLoading(false)
    }
  }

  const handleAlbumClick = (albumId: number) => {
    onSelectAlbum(albumId)
    navigate(`/albums/${albumId}`)
  }

  const handleBreadcrumbClick = (albumId: number) => {
    onSelectAlbum(albumId)
    navigate(`/albums/${albumId}`)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Animation variants for the album cards
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

  // Render loading skeletons
  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid size={{xs:12, sm:6 , md:4 , lg:3}} key={item}>
              <Skeleton variant="rounded" width="100%" height={180} />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: "text.secondary" }} />}
        aria-label="album navigation"
        sx={{
          mb: 3,
          p: 2,
          borderRadius: "12px",
          backgroundColor: "background.paper",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Link
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.primary",
            cursor: "pointer",
            fontWeight: albumId === "0" ? "bold" : "normal",
          }}
          onClick={() => handleBreadcrumbClick(0)}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
          Home
        </Link>

        {albumPath.slice(1).map((album, _) => (
          <Link
            key={album.id}
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.primary",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => handleBreadcrumbClick(album.id)}
          >
            <FolderIcon sx={{ mr: 0.5, fontSize: 20, color: "#3f51b5" }} />
            {album.title}
          </Link>
        ))}
      </Breadcrumbs>

      {/* Album Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Grid container spacing={3}>
          {Array.isArray(myAlbums) && myAlbums.length > 0 ? (
            myAlbums.map((album) => (
              <Grid size={{xs:12, sm:6 , md:4 , lg:3}} key={album.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: 200,
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
                      cursor: "pointer",
                      background: "linear-gradient(145deg, #2a3052, #1a1f36)",
                    }}
                    onClick={() => handleAlbumClick(album.id!)}
                  >
                    <Box
                      sx={{
                        height: 120,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, rgba(0, 198, 255, 0.1), rgba(114, 9, 183, 0.1))",
                        position: "relative",
                      }}
                    >
                      <FolderIcon sx={{ fontSize: 80, color: "#3f51b5" }} />

                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          },
                        }}
                        onClick={(event) => {
                          event.stopPropagation()
                          handleMenuOpen(event, album.id!)
                        }}
                      >
                        <MoreVertIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {album.title}
                      </Typography>

                      {album.description && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
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
                      <MenuItem onClick={() => handleEditAlbum(album)}>
                        <EditIcon sx={{ mr: 1, color: "#3f51b5" }} /> Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleShareAlbum(album.id!)}>
                        <ShareIcon sx={{ mr: 1, color: "#4caf50" }} /> Share
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteAlbum(album.id!)}>
                        <DeleteIcon sx={{ mr: 1, color: "#f44336" }} /> Delete
                      </MenuItem>
                    </Menu>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid size={{ xs:12}}>
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: "16px",
                  backgroundColor: "background.paper",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <FolderIcon sx={{ fontSize: 60, color: "#3f51b5", opacity: 0.5, mb: 2 }} />
                <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
                  No albums found
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                  Create your first album to start organizing your photos
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<FolderIcon />}
                  onClick={() => document.getElementById("add-album-button")?.click()}
                  sx={{
                    background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(100deg, #0072ff, #7209b7, #d400ff)",
                    },
                  }}
                >
                  Create Album
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </motion.div>

      {/* Edit Album Dialog */}
      {selectedAlbum && (
        <EditAlbum open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)} album={selectedAlbum} />
      )}

      {/* Share Album Dialog */}
      <Dialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
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
          <ShareIcon sx={{ mr: 1.5, color: "#4caf50" }} />
          Share Album
        </DialogTitle>
        <DialogContent sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", pt: 3 }}>
          <Typography variant="body2" sx={{ color: "white", mb: 2 }}>
            Enter the email address of the person you want to share this album with.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
              },
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", p: 2 }}>
          <Button onClick={() => setShareDialogOpen(false)} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={handleShareSubmit}
            variant="contained"
            disabled={!shareEmail || shareLoading}
            startIcon={shareLoading ? <CircularProgress size={20} /> : <ShareIcon />}
            sx={{
              background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(100deg, #0072ff, #7209b7, #d400ff)",
              },
            }}
          >
            {shareLoading ? "Sharing..." : "Share"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AlbumOverview
