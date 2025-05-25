// // import React, { useState } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { AppDispatch } from '../../store/store';
// // import { createAlbum } from '../../slices/albumSlice';
// // import { Album } from '../../types/album';
// // import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
// // import { useParams } from 'react-router-dom';

// // interface AddAlbumProps {
// //     open: boolean; 
// //     onClose: () => void;
// // }

// // const AddAlbum: React.FC<AddAlbumProps> = ({ open, onClose }) => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const [title, setTitle] = useState('');
// //     const [description, setDescription] = useState('');
// //     const { albumId } = useParams<{ albumId: string }>();

// //     const handleAddAlbum = () => {
// //         const token = sessionStorage.getItem('token');
// //         if (token) {
// //             const newAlbum: Album = { title, description, parentId: Number(albumId) };
// //             dispatch(createAlbum({ token, album: newAlbum }));
// //             setTitle('');
// //             setDescription('');
// //             onClose(); // Close the dialog after adding the album
// //         }
// //     };

// //     if (!open) return null;

// //     return (
// //         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
// //             <DialogTitle sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)', color: 'white' }}>
// //                 <Typography variant="h6">Add New Album</Typography>
// //             </DialogTitle>
// //             <DialogContent sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
// //                 <TextField
// //                     autoFocus
// //                     margin="dense"
// //                     label="Title"
// //                     type="text"
// //                     fullWidth
// //                     variant="outlined"
// //                     value={title}
// //                     onChange={(e) => setTitle(e.target.value)}
// //                     sx={{ backgroundColor: 'white', marginBottom: '10px' }}
// //                 />
// //                 <TextField
// //                     margin="dense"
// //                     label="Description"
// //                     type="text"
// //                     fullWidth
// //                     variant="outlined"
// //                     value={description}
// //                     onChange={(e) => setDescription(e.target.value)}
// //                     sx={{ backgroundColor: 'white', marginBottom: '10px' }}
// //                 />
// //             </DialogContent>
// //             <DialogActions sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
// //                 <Button onClick={onClose} variant="contained" sx={{ background: 'linear-gradient(100deg,#00ffff,#1709b7,#d400ff)', color: 'white' }}>
// //                     Cancel
// //                 </Button>
// //                 <Button onClick={handleAddAlbum} variant="contained" sx={{ background: 'linear-gradient(100deg,#00c6ff,#0072ff,#7209b7,#d400ff)', color: 'white' }}>
// //                     Add
// //                 </Button>
// //             </DialogActions>
// //         </Dialog>
// //     );
// // };

// // export default AddAlbum;

// import type React from "react"
// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import type { AppDispatch } from "../../store/store"
// import { createAlbum } from "../../slices/albumSlice"
// import type { Album } from "../../types/album"
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
//   Box,
//   CircularProgress,
//   useTheme,
//   alpha,
// } from "@mui/material"
// import { useParams } from "react-router-dom"
// import { motion } from "framer-motion"
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"

// interface AddAlbumProps {
//   open: boolean
//   onClose: () => void
// }

// const AddAlbum: React.FC<AddAlbumProps> = ({ open, onClose }) => {
//   const dispatch = useDispatch<AppDispatch>()
//   const theme = useTheme()
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { albumId } = useParams<{ albumId: string }>()

//   const handleAddAlbum = async () => {
//     const token = sessionStorage.getItem("token")
//     if (token) {
//       try {
//         setIsSubmitting(true)
//         const newAlbum: Album = {
//           title,
//           description,
//           parentId: Number(albumId) || 0,
//         }

//         await dispatch(createAlbum({ token, album: newAlbum })).unwrap()
//         setTitle("")
//         setDescription("")
//         onClose()
//       } catch (error) {
//         console.error("Error creating album:", error)
//       } finally {
//         setIsSubmitting(false)
//       }
//     }
//   }

//   const isFormValid = title.trim() !== ""

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "16px",
//           overflow: "hidden",
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
//           color: "white",
//           py: 3,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <CreateNewFolderIcon sx={{ mr: 1.5, fontSize: 28 }} />
//           <Typography variant="h5" fontWeight={600}>
//             Create New Album
//           </Typography>
//         </Box>
//       </DialogTitle>

//       <DialogContent
//         sx={{
//           py: 3,
//           px: { xs: 2, sm: 3 },
//           background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
//         }}
//       >
//         <Box
//           component={motion.div}
//           initial={{ y: 10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Album Title"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             sx={{
//               mb: 3,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "12px",
//               },
//             }}
//           />

//           <TextField
//             margin="dense"
//             label="Description (Optional)"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             multiline
//             rows={4}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "12px",
//               },
//             }}
//           />
//         </Box>
//       </DialogContent>

//       <DialogActions
//         sx={{
//           px: { xs: 2, sm: 3 },
//           py: 2,
//           background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
//         }}
//       >
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           sx={{
//             borderRadius: "10px",
//             px: 3,
//           }}
//         >
//           Cancel
//         </Button>

//         <Button
//           onClick={handleAddAlbum}
//           variant="contained"
//           disabled={!isFormValid || isSubmitting}
//           sx={{
//             borderRadius: "10px",
//             px: 3,
//             background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             "&:hover": {
//               background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//             },
//           }}
//         >
//           {isSubmitting ? (
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
//               <span>Creating...</span>
//             </Box>
//           ) : (
//             "Create Album"
//           )}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default AddAlbum


"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { createAlbum } from "../../slices/albumSlice"
import type { Album } from "../../types/album"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material"
import { useParams } from "react-router-dom"
import { Close, CreateNewFolder, Description } from "@mui/icons-material"

interface AddAlbumProps {
  open: boolean
  onClose: () => void
}

const AddAlbum: React.FC<AddAlbumProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { albumId } = useParams<{ albumId: string }>()
  const [loading, setLoading] = useState(false)

  const handleAddAlbum = async () => {
    if (!title.trim()) return

    setLoading(true)
    const token = sessionStorage.getItem("token")
    if (token) {
      const newAlbum: Album = {
        title,
        description,
        parentId: Number(albumId),
        photoCount: 0
      }

      await dispatch(createAlbum({ token, album: newAlbum }))
      setTitle("")
      setDescription("")
      setLoading(false)
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg, #1a1f36, #252a4b)",
          color: "white",
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CreateNewFolder sx={{ mr: 1.5, color: "#00c6ff" }} />
          <Typography variant="h6">Add New Album</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          background: "linear-gradient(90deg, #1a1f36, #252a4b)",
          p: 3,
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          label="Album Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreateNewFolder sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
              "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          margin="dense"
          label="Album Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Description sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
              "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputAdornment-root": {
              color: "rgba(255, 255, 255, 0.7)",
              alignSelf: "flex-start",
              mt: 2,
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          background: "linear-gradient(90deg, #1a1f36, #252a4b)",
          p: 3,
          pt: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.3)",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddAlbum}
          variant="contained"
          disabled={!title.trim() || loading}
          sx={{
            ml: 2,
            background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(100deg, #0072ff, #7209b7, #d400ff)",
            },
            "&.Mui-disabled": {
              background: "rgba(255, 255, 255, 0.12)",
              color: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          {loading ? "Creating..." : "Create Album"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddAlbum
