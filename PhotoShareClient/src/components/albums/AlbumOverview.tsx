// import type React from "react"
// import { useEffect, useState, useCallback } from "react"
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
//   Breadcrumbs,
//   Link,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Skeleton,
// } from "@mui/material"
// import { useParams, useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import {
//   Folder as FolderIcon,
//   MoreVert as MoreVertIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Share as ShareIcon,
//   Home as HomeIcon,
//   NavigateNext as NavigateNextIcon,
// } from "@mui/icons-material"
// import EditAlbum from "./EditAlbum"
// // import type { User } from "../../types/user"

// interface AlbumPath {
//   id: number
//   title: string
//   parentId?: number
// }

// const AlbumOverview: React.FC<{ onSelectAlbum: (albumId: number) => void }> = ({ onSelectAlbum }) => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const { myAlbums, loading } = useSelector(
//     (state: { album: { myAlbums: Album[]; loading: boolean; msg: string } }) => state.album,
//   )
// //   const { user } = useSelector((state: { user: { user: User } }) => state.user)
//   const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({})
//   const { albumId } = useParams<{ albumId: string }>()
//   const token = sessionStorage.getItem("token")
//   const [albumPath, setAlbumPath] = useState<AlbumPath[]>([])
//   const [isEditDialogOpen, setEditDialogOpen] = useState(false)
//   const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
//   const [shareDialogOpen, setShareDialogOpen] = useState(false)
//   const [shareEmail, setShareEmail] = useState("")
//   const [sharingAlbumId, setSharingAlbumId] = useState<number | null>(null)
//   const [shareLoading, setShareLoading] = useState(false)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

//   // Store navigation history
//   const [navigationHistory, setNavigationHistory] = useState<AlbumPath[]>([{ id: 0, title: "Root" }])

//   // Fetch albums when albumId changes
//   useEffect(() => {
//     if (token && albumId) {
//       dispatch(fetchAlbumsByParent({ token, albumId: Number.parseInt(albumId) }))
//       updateNavigationPath(Number.parseInt(albumId))
//     }
//   }, [dispatch, token, albumId])

//   // Function to fetch album details by ID
//   const fetchAlbumDetails = useCallback(async (albumId: number): Promise<Album | null> => {
//     if (!token || albumId === 0) return null
    
//     try {
//       // This should be replaced with your actual API call to get album by ID
//       // For now, we'll try to find it in myAlbums or you'll need to add a specific API call
//       const album = myAlbums.find(a => a.id === albumId)
//       return album || null
//     } catch (error) {
//       console.error('Error fetching album details:', error)
//       return null
//     }
//   }, [token, myAlbums])

//   // Build complete path by fetching parent albums recursively
//   const buildCompletePath = useCallback(async (targetAlbumId: number): Promise<AlbumPath[]> => {
//     if (targetAlbumId === 0) {
//       return [{ id: 0, title: "Root" }]
//     }

//     const path: AlbumPath[] = []
//     let currentId = targetAlbumId

//     // Traverse up the hierarchy
//     while (currentId !== 0) {
//       const albumDetails = await fetchAlbumDetails(currentId)
//       if (!albumDetails) break

//       path.unshift({
//         id: albumDetails.id!,
//         title: albumDetails.title,
//         parentId: albumDetails.parentId
//       })

//       currentId = albumDetails.parentId || 0
//     }

//     // Add root at the beginning
//     path.unshift({ id: 0, title: "Root" })
    
//     return path
//   }, [fetchAlbumDetails])

//   // Update navigation path based on current album
//   const updateNavigationPath = useCallback(async (currentAlbumId: number) => {
//     if (currentAlbumId === 0) {
//       setNavigationHistory([{ id: 0, title: "Root" }])
//       setAlbumPath([{ id: 0, title: "Root" }])
//       return
//     }

//     // Check if we're navigating deeper (child of current path)
//     const lastPathItem = navigationHistory[navigationHistory.length - 1]
//     const currentAlbum = myAlbums.find(album => album.id === currentAlbumId)
    
//     if (currentAlbum) {
//       // If this album's parent is the last item in our path, we're going deeper
//       if (currentAlbum.parentId === lastPathItem.id) {
//         const newPath = [...navigationHistory, {
//           id: currentAlbumId,
//           title: currentAlbum.title,
//           parentId: currentAlbum.parentId
//         }]
//         setNavigationHistory(newPath)
//         setAlbumPath(newPath)
//       } else {
//         // We're navigating to a different branch or jumping around
//         // Build the complete path from scratch
//         try {
//           const completePath = await buildCompletePath(currentAlbumId)
//           setNavigationHistory(completePath)
//           setAlbumPath(completePath)
//         } catch (error) {
//           console.error('Error building path:', error)
//           // Fallback: just show root and current
//           const fallbackPath = [
//             { id: 0, title: "Root" },
//             { id: currentAlbumId, title: currentAlbum.title, parentId: currentAlbum.parentId }
//           ]
//           setNavigationHistory(fallbackPath)
//           setAlbumPath(fallbackPath)
//         }
//       }
//     }
//   }, [navigationHistory, myAlbums, buildCompletePath])

//   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
//     event.stopPropagation() // מנע מהאירוע לעבור לכרטיס
//     setAnchorEl((prev) => ({ ...prev, [albumId]: event.currentTarget }))
//   }

//   const handleMenuClose = (albumId: number) => {
//     setAnchorEl((prev) => ({ ...prev, [albumId]: null }))
//   }

//   const handleDeleteAlbum = async (albumId: number) => {
//     handleMenuClose(albumId)
//     if (token) {
//       await dispatch(deleteAlbum({ token, albumId }))
//       setSnackbar({
//         open: true,
//         message: "Album moved to recycle bin",
//         severity: "success",
//       })
//       if (albumId) {
//         dispatch(fetchAlbumsByParent({ token, albumId: albumId }))
//       }
//     }
//   }

//   const handleEditAlbum = (album: Album) => {
//     console.log("Editing album:", album)
//     handleMenuClose(album.id!)
//     setSelectedAlbum(album)
//     setEditDialogOpen(true)
//   }

//   const handleShareAlbum = (albumId: number) => {
//     handleMenuClose(albumId)
//     setSharingAlbumId(albumId)
//     setShareDialogOpen(true)
//   }

//   const handleShareSubmit = async () => {
//     if (!shareEmail || !sharingAlbumId || !token) return

//     setShareLoading(true)
//     try {
//       const shareData = { albumId: sharingAlbumId, UserEmailForSharing: shareEmail }
//       await dispatch(shareAlbum({ token, albumShareData: shareData })).unwrap()
//       setSnackbar({
//         open: true,
//         message: "Album shared successfully",
//         severity: "success",
//       })
//       setShareDialogOpen(false)
//       setShareEmail("")
//       setSharingAlbumId(null)
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: "Failed to share album",
//         severity: "error",
//       })
//     } finally {
//       setShareLoading(false)
//     }
//   }

//   const handleAlbumClick = (albumId: number) => {
//     onSelectAlbum(albumId)
//     navigate(`/albums/${albumId}`)
//   }

//   const handleBreadcrumbClick = (albumId: number, clickedIndex: number) => {
//     // Trim the navigation history to the clicked level
//     const newPath = navigationHistory.slice(0, clickedIndex + 1)
//     setNavigationHistory(newPath)
//     setAlbumPath(newPath)
    
//     onSelectAlbum(albumId)
//     navigate(`/albums/${albumId}`)
//   }

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false })
//   }

//   // פונקציה לטיפול בסגירת דיאלוג העריכה
//   const handleEditDialogClose = () => {
//     setEditDialogOpen(false)
//     setSelectedAlbum(null)
//     // רענן את הרשימה לאחר עדכון
//     if (token && albumId) {
//       dispatch(fetchAlbumsByParent({ token, albumId: Number.parseInt(albumId) }))
//     }
//   }

//   // Animation variants for the album cards
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
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     },
//   }

//   // Render loading skeletons
//   if (loading) {
//     return (
//       <Box sx={{ width: "100%" }}>
//         <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
//         <Grid container spacing={3}>
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <Grid size={{xs:12, sm:6 , md:4 , lg:3}} key={item}>
//               <Skeleton variant="rounded" width="100%" height={180} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     )
//   }

//   return (
//     <Box sx={{ width: "100%" }}>
//       {/* Breadcrumb Navigation */}
//       <Breadcrumbs
//         separator={<NavigateNextIcon fontSize="small" sx={{ color: "text.secondary" }} />}
//         aria-label="album navigation"
//         sx={{
//           mb: 3,
//           p: 2,
//           borderRadius: "12px",
//           backgroundColor: "background.paper",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         {albumPath.map((album, index) => {
//           const isLast = index === albumPath.length - 1
//           const isRoot = album.id === 0
          
//           return (
//             <Link
//               key={album.id}
//               underline="hover"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 color: "text.primary",
//                 cursor: "pointer",
//                 fontWeight: isLast ? "bold" : "normal",
//                 opacity: isLast ? 1 : 0.8,
//               }}
//               onClick={() => handleBreadcrumbClick(album.id, index)}
//             >
//               {isRoot ? (
//                 <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
//               ) : (
//                 <FolderIcon sx={{ mr: 0.5, fontSize: 20, color: "#3f51b5" }} />
//               )}
//               {album.title}
//             </Link>
//           )
//         })}
//       </Breadcrumbs>

//       {/* Album Grid */}
//       <motion.div variants={containerVariants} initial="hidden" animate="visible">
//         <Grid container spacing={3}>
//           {Array.isArray(myAlbums) && myAlbums.length > 0 ? (
//             myAlbums.map((album) => (
//               <Grid size={{xs:12, sm:6 , md:4 , lg:3}} key={album.id}>
//                 <motion.div variants={itemVariants}>
//                   <Card
//                     sx={{
//                       height: 200,
//                       display: "flex",
//                       flexDirection: "column",
//                       borderRadius: "16px",
//                       overflow: "hidden",
//                       boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                       transition: "transform 0.3s, box-shadow 0.3s",
//                       "&:hover": {
//                         transform: "translateY(-5px)",
//                         boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
//                       },
//                       position: "relative",
//                       cursor: "pointer",
//                       background: "linear-gradient(145deg, #2a3052, #1a1f36)",
//                     }}
//                     onClick={() => handleAlbumClick(album.id!)}
//                   >
//                     <Box
//                       sx={{
//                         height: 120,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         background: "linear-gradient(135deg, rgba(0, 198, 255, 0.1), rgba(114, 9, 183, 0.1))",
//                         position: "relative",
//                       }}
//                     >
//                       <FolderIcon sx={{ fontSize: 80, color: "#3f51b5" }} />

//                       <IconButton
//                         sx={{
//                           position: "absolute",
//                           top: 8,
//                           right: 8,
//                           backgroundColor: "rgba(255, 255, 255, 0.1)",
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 255, 255, 0.2)",
//                           },
//                         }}
//                         onClick={(event) => handleMenuOpen(event, album.id!)}
//                       >
//                         <MoreVertIcon sx={{ color: "white" }} />
//                       </IconButton>
//                     </Box>

//                     <Box
//                       sx={{
//                         p: 2,
//                         flexGrow: 1,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           color: "white",
//                           fontWeight: "bold",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {album.title}
//                       </Typography>

//                       {album.description && (
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             color: "rgba(255, 255, 255, 0.7)",
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
//                     </Box>

//                     <Menu
//                       anchorEl={anchorEl[album.id!]}
//                       open={Boolean(anchorEl[album.id!])}
//                       onClose={() => handleMenuClose(album.id!)}
//                       PaperProps={{
//                         sx: {
//                           backgroundColor: "background.paper",
//                           boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//                           borderRadius: "12px",
//                           minWidth: 180,
//                         },
//                       }}
//                     >
//                       <MenuItem onClick={() => handleEditAlbum(album)}>
//                         <EditIcon sx={{ mr: 1, color: "#3f51b5" }} /> Edit
//                       </MenuItem>
//                       <MenuItem onClick={() => handleShareAlbum(album.id!)}>
//                         <ShareIcon sx={{ mr: 1, color: "#4caf50" }} /> Share
//                       </MenuItem>
//                       <MenuItem onClick={() => handleDeleteAlbum(album.id!)}>
//                         <DeleteIcon sx={{ mr: 1, color: "#f44336" }} /> Delete
//                       </MenuItem>
//                     </Menu>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))
//           ) : (
//             <Grid size={{ xs:12}}>
//               <Box
//                 sx={{
//                   p: 4,
//                   textAlign: "center",
//                   borderRadius: "16px",
//                   backgroundColor: "background.paper",
//                   boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <FolderIcon sx={{ fontSize: 60, color: "#3f51b5", opacity: 0.5, mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
//                   No albums found
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
//                   Create your first album to start organizing your photos
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   startIcon={<FolderIcon />}
//                   onClick={() => document.getElementById("add-album-button")?.click()}
//                   sx={{
//                     background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//                     color: "white",
//                     "&:hover": {
//                       background: "linear-gradient(100deg, #0072ff, #7209b7, #d400ff)",
//                     },
//                   }}
//                 >
//                   Create Album
//                 </Button>
//               </Box>
//             </Grid>
//           )}
//         </Grid>
//       </motion.div>
      
//       {/* Edit Album Dialog */}
//       {selectedAlbum && (
//         <EditAlbum 
//           open={isEditDialogOpen} 
//           onClose={handleEditDialogClose} 
//           album={selectedAlbum} 
//         />
//       )}

//       {/* Share Album Dialog */}
//       <Dialog
//         open={shareDialogOpen}
//         onClose={() => setShareDialogOpen(false)}
//         PaperProps={{
//           sx: {
//             borderRadius: "16px",
//             overflow: "hidden",
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             background: "linear-gradient(90deg, #1a1f36, #252a4b)",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <ShareIcon sx={{ mr: 1.5, color: "#4caf50" }} />
//           Share Album
//         </DialogTitle>
//         <DialogContent sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", pt: 3 }}>
//           <Typography variant="body2" sx={{ color: "white", mb: 2 }}>
//             Enter the email address of the person you want to share this album with.
//           </Typography>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="outlined"
//             value={shareEmail}
//             onChange={(e) => setShareEmail(e.target.value)}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//                 "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
//                 "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
//               },
//               "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
//               "& .MuiInputBase-input": { color: "white" },
//             }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", p: 2 }}>
//           <Button onClick={() => setShareDialogOpen(false)} sx={{ color: "white" }}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleShareSubmit}
//             variant="contained"
//             disabled={!shareEmail || shareLoading}
//             startIcon={shareLoading ? <CircularProgress size={20} /> : <ShareIcon />}
//             sx={{
//               background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//               color: "white",
//               "&:hover": {
//                 background: "linear-gradient(100deg, #0072ff, #7209b7, #d400ff)",
//               },
//             }}
//           >
//             {shareLoading ? "Sharing..." : "Share"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
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
import { useTheme } from "../themeProvider"
// import type { User } from "../../types/user"

interface AlbumPath {
  id: number
  title: string
  parentId?: number
}

const AlbumOverview: React.FC<{ onSelectAlbum: (albumId: number) => void }> = ({ onSelectAlbum }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { theme } = useTheme()
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

  // Store navigation history
  const [navigationHistory, setNavigationHistory] = useState<AlbumPath[]>([{ id: 0, title: "Root" }])

  // Fetch albums when albumId changes
  useEffect(() => {
    if (token && albumId) {
      dispatch(fetchAlbumsByParent({ token, albumId: Number.parseInt(albumId) }))
      updateNavigationPath(Number.parseInt(albumId))
    }
  }, [dispatch, token, albumId])

  // Function to fetch album details by ID
  const fetchAlbumDetails = useCallback(
    async (albumId: number): Promise<Album | null> => {
      if (!token || albumId === 0) return null

      try {
        // This should be replaced with your actual API call to get album by ID
        // For now, we'll try to find it in myAlbums or you'll need to add a specific API call
        const album = myAlbums.find((a) => a.id === albumId)
        return album || null
      } catch (error) {
        console.error("Error fetching album details:", error)
        return null
      }
    },
    [token, myAlbums],
  )

  // Build complete path by fetching parent albums recursively
  const buildCompletePath = useCallback(
    async (targetAlbumId: number): Promise<AlbumPath[]> => {
      if (targetAlbumId === 0) {
        return [{ id: 0, title: "Root" }]
      }

      const path: AlbumPath[] = []
      let currentId = targetAlbumId

      // Traverse up the hierarchy
      while (currentId !== 0) {
        const albumDetails = await fetchAlbumDetails(currentId)
        if (!albumDetails) break

        path.unshift({
          id: albumDetails.id!,
          title: albumDetails.title,
          parentId: albumDetails.parentId,
        })

        currentId = albumDetails.parentId || 0
      }

      // Add root at the beginning
      path.unshift({ id: 0, title: "Root" })

      return path
    },
    [fetchAlbumDetails],
  )

  // Update navigation path based on current album
  const updateNavigationPath = useCallback(
    async (currentAlbumId: number) => {
      if (currentAlbumId === 0) {
        setNavigationHistory([{ id: 0, title: "Root" }])
        setAlbumPath([{ id: 0, title: "Root" }])
        return
      }

      // Check if we're navigating deeper (child of current path)
      const lastPathItem = navigationHistory[navigationHistory.length - 1]
      const currentAlbum = myAlbums.find((album) => album.id === currentAlbumId)

      if (currentAlbum) {
        // If this album's parent is the last item in our path, we're going deeper
        if (currentAlbum.parentId === lastPathItem.id) {
          const newPath = [
            ...navigationHistory,
            {
              id: currentAlbumId,
              title: currentAlbum.title,
              parentId: currentAlbum.parentId,
            },
          ]
          setNavigationHistory(newPath)
          setAlbumPath(newPath)
        } else {
          // We're navigating to a different branch or jumping around
          // Build the complete path from scratch
          try {
            const completePath = await buildCompletePath(currentAlbumId)
            setNavigationHistory(completePath)
            setAlbumPath(completePath)
          } catch (error) {
            console.error("Error building path:", error)
            // Fallback: just show root and current
            const fallbackPath = [
              { id: 0, title: "Root" },
              { id: currentAlbumId, title: currentAlbum.title, parentId: currentAlbum.parentId },
            ]
            setNavigationHistory(fallbackPath)
            setAlbumPath(fallbackPath)
          }
        }
      }
    },
    [navigationHistory, myAlbums, buildCompletePath],
  )

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
    event.stopPropagation() // מנע מהאירוע לעבור לכרטיס
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
      if (albumId) {
        dispatch(fetchAlbumsByParent({ token, albumId: albumId }))
      }
    }
  }

  const handleEditAlbum = (album: Album) => {
    console.log("Editing album:", album)
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

  const handleBreadcrumbClick = (albumId: number, clickedIndex: number) => {
    // Trim the navigation history to the clicked level
    const newPath = navigationHistory.slice(0, clickedIndex + 1)
    setNavigationHistory(newPath)
    setAlbumPath(newPath)

    onSelectAlbum(albumId)
    navigate(`/albums/${albumId}`)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // פונקציה לטיפול בסגירת דיאלוג העריכה
  const handleEditDialogClose = () => {
    setEditDialogOpen(false)
    setSelectedAlbum(null)
    // רענן את הרשימה לאחר עדכון
    if (token && albumId) {
      dispatch(fetchAlbumsByParent({ token, albumId: Number.parseInt(albumId) }))
    }
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
        <Skeleton
          variant="text"
          width="60%"
          height={40}
          sx={{
            mb: 2,
            bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          }}
        />
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item}>
              <Skeleton
                variant="rounded"
                width="100%"
                height={180}
                sx={{
                  bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Breadcrumb Navigation */}
      {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: "text.secondary" }} />}
        aria-label="album navigation"
        sx={{
          mb: 3,
          p: 2,
          borderRadius: "12px",
          backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
          border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          boxShadow: theme === "dark" ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {albumPath.map((album, index) => {
          const isLast = index === albumPath.length - 1
          const isRoot = album.id === 0

          return (
            <Link
              key={album.id}
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "#374151",
                cursor: "pointer",
                fontWeight: isLast ? "bold" : "normal",
                opacity: isLast ? 1 : 0.8,
                "&:hover": {
                  color: theme === "dark" ? "#00c6ff" : "#3b82f6",
                },
              }}
              onClick={() => handleBreadcrumbClick(album.id, index)}
            >
              {isRoot ? (
                <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
              ) : (
                <FolderIcon
                  sx={{
                    mr: 0.5,
                    fontSize: 20,
                    color: theme === "dark" ? "#00c6ff" : "#3b82f6",
                  }}
                />
              )}
              {album.title}
            </Link>
          )
        })}
      </Breadcrumbs> */}

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
        {albumPath.map((album, index) => {
          const isLast = index === albumPath.length - 1
          const isRoot = album.id === 0
          
          return (
            <Link
              key={album.id}
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.primary",
                cursor: "pointer",
                fontWeight: isLast ? "bold" : "normal",
                opacity: isLast ? 1 : 0.8,
              }}
              onClick={() => handleBreadcrumbClick(album.id, index)}
            >
              {isRoot ? (
                <HomeIcon sx={{ mr: 0.5, fontSize: 20 ,color: theme === "dark" ? "#00c6ff" : "#3b82f6"}} />
              ) : (
                <FolderIcon sx={{ mr: 0.5, fontSize: 20, color: theme === "dark" ? "#00c6ff" : "#3b82f6" }} />
              )}
              {album.title}
            </Link>
          )
        })}
      </Breadcrumbs>

      {/* Album Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Grid container spacing={3}>
          {Array.isArray(myAlbums) && myAlbums.length > 0 ? (
            myAlbums.map((album) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={album.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: theme === "dark" ? "0 8px 20px rgba(0,0,0,0.4)" : "0 8px 20px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: theme === "dark" ? "0 12px 28px rgba(0,0,0,0.5)" : "0 12px 28px rgba(0,0,0,0.2)",
                      },
                      position: "relative",
                      cursor: "pointer",
                      background:
                        theme === "dark"
                          ? "linear-gradient(145deg, #2a3052, #1a1f36)"
                          : "linear-gradient(145deg, #f8fafc, #e2e8f0)",
                      border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                    }}
                    onClick={() => handleAlbumClick(album.id!)}
                  >
                    <Box
                      sx={{
                        height: 120,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          theme === "dark"
                            ? "linear-gradient(135deg, rgba(0, 198, 255, 0.1), rgba(114, 9, 183, 0.1))"
                            : "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                        position: "relative",
                      }}
                    >
                      <FolderIcon
                        sx={{
                          fontSize: 80,
                          color: theme === "dark" ? "#00c6ff" : "#3b82f6",
                        }}
                      />

                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                          "&:hover": {
                            backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        onClick={(event) => handleMenuOpen(event, album.id!)}
                      >
                        <MoreVertIcon
                          sx={{
                            color: theme === "dark" ? "white" : "#1e293b",
                          }}
                        />
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
                          color: theme === "dark" ? "white" : "#1e293b",
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
                            color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)",
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
                          backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                          boxShadow: theme === "dark" ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.2)",
                          borderRadius: "12px",
                          minWidth: 180,
                          border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => handleEditAlbum(album)}
                        sx={{
                          color: theme === "dark" ? "white" : "#1e293b",
                          "&:hover": {
                            backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                          },
                        }}
                      >
                        <EditIcon
                          sx={{
                            mr: 1,
                            color: theme === "dark" ? "#00c6ff" : "#3b82f6",
                          }}
                        />{" "}
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleShareAlbum(album.id!)}
                        sx={{
                          color: theme === "dark" ? "white" : "#1e293b",
                          "&:hover": {
                            backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                          },
                        }}
                      >
                        <ShareIcon
                          sx={{
                            mr: 1,
                            color: theme === "dark" ? "#4caf50" : "#16a34a",
                          }}
                        />{" "}
                        Share
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeleteAlbum(album.id!)}
                        sx={{
                          color: theme === "dark" ? "white" : "#1e293b",
                          "&:hover": {
                            backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                          },
                        }}
                      >
                        <DeleteIcon sx={{ mr: 1, color: "#f44336" }} /> Delete
                      </MenuItem>
                    </Menu>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: "16px",
                  backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
                  border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                  boxShadow: theme === "dark" ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <FolderIcon
                  sx={{
                    fontSize: 60,
                    color: theme === "dark" ? "#00c6ff" : "#3b82f6",
                    opacity: 0.5,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                    mb: 2,
                  }}
                >
                  No albums found
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.6)",
                    mb: 3,
                  }}
                >
                  Create your first album to start organizing your photos
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </motion.div>

      {/* Edit Album Dialog */}
      {selectedAlbum && <EditAlbum open={isEditDialogOpen} onClose={handleEditDialogClose} album={selectedAlbum} />}

      {/* Share Album Dialog */}
      <Dialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            background:
              theme === "dark"
                ? "linear-gradient(145deg, #1e293b, #334155)"
                : "linear-gradient(145deg, #f8fafc, #e2e8f0)",
            boxShadow: theme === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              theme === "dark"
                ? "linear-gradient(90deg, #1a1f36, #252a4b)"
                : "linear-gradient(90deg, #e2e8f0, #cbd5e1)",
            color: theme === "dark" ? "white" : "#1e293b",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ShareIcon
            sx={{
              mr: 1.5,
              color: theme === "dark" ? "#4caf50" : "#16a34a",
            }}
          />
          Share Album
        </DialogTitle>
        <DialogContent
          sx={{
            background:
              theme === "dark"
                ? "linear-gradient(90deg, #1a1f36, #252a4b)"
                : "linear-gradient(90deg, #f8fafc, #e2e8f0)",
            pt: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme === "dark" ? "white" : "#1e293b",
              mb: 2,
            }}
          >
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
                "& fieldset": {
                  borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme === "dark" ? "#00c6ff" : "#3b82f6",
                },
                backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
              },
              "& .MuiInputLabel-root": {
                color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)",
              },
              "& .MuiInputBase-input": {
                color: theme === "dark" ? "white" : "#1e293b",
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            background:
              theme === "dark"
                ? "linear-gradient(90deg, #1a1f36, #252a4b)"
                : "linear-gradient(90deg, #f8fafc, #e2e8f0)",
            p: 2,
          }}
        >
          <Button
            onClick={() => setShareDialogOpen(false)}
            sx={{
              color: theme === "dark" ? "white" : "#1e293b",
              border: `2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
              "&:hover": {
                backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                border: `2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"}`,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleShareSubmit}
            variant="contained"
            disabled={!shareEmail || shareLoading}
            startIcon={shareLoading ? <CircularProgress size={20} /> : <ShareIcon />}
            sx={{
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, #00c6ff, #0072ff)"
                  : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "white",
              boxShadow: theme === "dark" ? "0 4px 15px rgba(0, 198, 255, 0.3)" : "0 4px 15px rgba(59, 130, 246, 0.3)",
              "&:hover": {
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, #0072ff, #00c6ff)"
                    : "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                transform: "translateY(-1px)",
                boxShadow:
                  theme === "dark" ? "0 6px 20px rgba(0, 198, 255, 0.4)" : "0 6px 20px rgba(59, 130, 246, 0.4)",
              },
              transition: "all 0.2s ease-in-out",
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
