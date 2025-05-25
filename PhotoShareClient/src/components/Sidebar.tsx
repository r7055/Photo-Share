// // import { Box, Button } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import AddIcon from '@mui/icons-material/Add';
// // import UploadFileIcon from '@mui/icons-material/UploadFile';
// // import UploadDirectoryIcon from '@mui/icons-material/FolderOpen';

// // const Sidebar: React.FC<{ onOpenAddAlbum: () => void, onOpenUploadPhoto: () => void, onOpenUploadDirectory: () => void, onRecycleBinClick: () => void }> = ({ onOpenAddAlbum, onOpenUploadPhoto, onOpenUploadDirectory, onRecycleBinClick }) => {

// //     return (
// //         <Box sx={{ padding: 2, borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
// //             <Button variant="contained" color="primary" onClick={onOpenAddAlbum} startIcon={<AddIcon />} sx={{ marginBottom: 2 }}>
// //                 הוספת תיקייה
// //             </Button>
// //             <Button variant="contained" color="primary" onClick={onOpenUploadDirectory} startIcon={<UploadDirectoryIcon />} sx={{ marginBottom: 2 }}>
// //                 העלאת תיקייה
// //             </Button>
// //             <Button variant="contained" color="primary" onClick={onOpenUploadPhoto} startIcon={<UploadFileIcon />} sx={{ marginBottom: 2 }}>
// //                 העלאת קובץ
// //             </Button>
// //             <Button
// //                 variant="contained"
// //                 color="secondary"
// //                 onClick={onRecycleBinClick}
// //                 startIcon={<DeleteIcon />}
// //                 sx={{
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     backgroundColor: '#f44336',
// //                     '&:hover': {
// //                         backgroundColor: '#d32f2f',
// //                     },
// //                 }}
// //             >
// //                 סל מיחזור
// //             </Button>
            
// //         </Box>
// //     );
// // };

// // export default Sidebar;

// import type React from "react"
// import { Box, Button, Typography, Divider, useTheme } from "@mui/material"
// import AddIcon from "@mui/icons-material/Add"
// import UploadFileIcon from "@mui/icons-material/UploadFile"
// import FolderOpenIcon from "@mui/icons-material/FolderOpen"
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
// import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
// import ShareIcon from "@mui/icons-material/Share"
// import { motion } from "framer-motion"
// import { useNavigate } from "react-router-dom"

// interface SidebarProps {
//   onOpenAddAlbum: () => void
//   onOpenUploadPhoto: () => void
//   onOpenUploadDirectory: () => void
//   onRecycleBinClick: () => void
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   onOpenAddAlbum,
//   onOpenUploadPhoto,
//   onOpenUploadDirectory,
//   onRecycleBinClick,
// }) => {
//   const theme = useTheme()
//   const navigate = useNavigate()

//   const buttonVariants = {
//     hover: {
//       scale: 1.03,
//       transition: { duration: 0.2 },
//     },
//     tap: {
//       scale: 0.97,
//       transition: { duration: 0.1 },
//     },
//   }

//   const handleNavigateToShared = () => {
//     navigate("/shared-albums")
//   }

//   const handleNavigateToAlbums = () => {
//     navigate("/albums")
//   }

//   return (
//     <Box
//       sx={{
//         height: "100%",
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         // background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,242,245,0.9) 100%)",
//         borderRadius: "16px",
//         boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
//         backdropFilter: "blur(5px)",
//         padding: 3,
//         overflow: "hidden",
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{
//           fontWeight: 600,
//           mb: 3,
//           color: theme.palette.primary.main,
//           textAlign: "center",
//         }}
//       >
//         <PhotoLibraryIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//         Photo Gallery
//       </Typography>

//       <Divider sx={{ mb: 3 }} />

//       <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary", fontWeight: 500 }}>
//         Albums
//       </Typography>

//       {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
//         <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleNavigateToAlbums}
//             startIcon={<PhotoLibraryIcon />}
//             sx={{
//               py: 1.5,
//               borderRadius: "12px",
//               textTransform: "none",
//               justifyContent: "flex-start",
//               backgroundColor: theme.palette.primary.main,
//               "&:hover": {
//                 backgroundColor: theme.palette.primary.dark,
//               },
//             }}
//           >
//             My Albums ffff
//           </Button>
//         </motion.div>

//         <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={handleNavigateToShared}
//             startIcon={<ShareIcon />}
//             sx={{
//               py: 1.5,
//               borderRadius: "12px",
//               textTransform: "none",
//               justifyContent: "flex-start",
//               borderColor: theme.palette.primary.main,
//               color: theme.palette.primary.main,
//             }}
//           >
//             Shared With Me
//           </Button>
//         </motion.div>
//       </Box> */}

//       <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary", fontWeight: 500 }}>
//         Actions
//       </Typography>
// {/* 
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: "auto" }}>
//         <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={onOpenAddAlbum}
//             startIcon={<AddIcon />}
//             sx={{
//               py: 1.5,
//               borderRadius: "12px",
//               textTransform: "none",
//               justifyContent: "flex-start",
//               borderColor: "#4caf50",
//               color: "#4caf50",
//               "&:hover": {
//                 borderColor: "#388e3c",
//                 backgroundColor: "rgba(76, 175, 80, 0.04)",
//               },
//             }}
//           >
//             New Album
//           </Button>
//         </motion.div>

//         <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={onOpenUploadPhoto}
//             startIcon={<UploadFileIcon />}
//             sx={{
//               py: 1.5,
//               borderRadius: "12px",
//               textTransform: "none",
//               justifyContent: "flex-start",
//               borderColor: "#2196f3",
//               color: "#2196f3",
//               "&:hover": {
//                 borderColor: "#1976d2",
//                 backgroundColor: "rgba(33, 150, 243, 0.04)",
//               },
//             }}
//           >
//             Upload Photo
//           </Button>
//         </motion.div>

//         <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={onOpenUploadDirectory}
//             startIcon={<FolderOpenIcon />}
//             sx={{
//               py: 1.5,
//               borderRadius: "12px",
//               textTransform: "none",
//               justifyContent: "flex-start",
//               borderColor: "#ff9800",
//               color: "#ff9800",
//               "&:hover": {
//                 borderColor: "#f57c00",
//                 backgroundColor: "rgba(255, 152, 0, 0.04)",
//               },
//             }}
//           >
//             Upload Folder
//           </Button>
//         </motion.div>
//       </Box> */}

//       <Divider sx={{ my: 3 }} />

//       <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//         <Button
//           fullWidth
//           variant="outlined"
//           onClick={onRecycleBinClick}
//           startIcon={<DeleteOutlineIcon />}
//           sx={{
//             py: 1.5,
//             borderRadius: "12px",
//             textTransform: "none",
//             justifyContent: "flex-start",
//             borderColor: "#f44336",
//             color: "#f44336",
//             "&:hover": {
//               borderColor: "#d32f2f",
//               backgroundColor: "rgba(244, 67, 54, 0.04)",
//             },
//           }}
//         >
//           Recycle Bin
//         </Button>
//       </motion.div>
//     </Box>
//   )
// }

// export default Sidebar

"use client"
import type React from "react"
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Home,
  PhotoAlbum,
  Share,
  Delete,
  DarkMode,
  LightMode,
  AddPhotoAlternate,
  CreateNewFolder,
} from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { useTheme as useAppTheme } from './themeProvider'; // ייבוא ההוק
import { useEffect } from "react"

interface SidebarProps {
  open: boolean
  onClose: () => void
  onOpenAddAlbum: () => void
  onOpenUploadPhoto: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onOpenAddAlbum, onOpenUploadPhoto }) => {
  const { theme, setTheme } = useAppTheme(); 
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

 useEffect(() => {
    // ניתן להוסיף לוגיקה כאן אם צריך להגיב לשינוי ב-theme
    console.log(`Theme changed to: ${theme}`);
  }, [theme]); // האזנה לשינויים ב-theme


  const menuItems = [
    { text: "Home", icon: <Home />, path: "/about" },
    { text: "My Albums", icon: <PhotoAlbum />, path: "/albums/0" },
    { text: "Shared Albums", icon: <Share />, path: "/myShares" },
    { text: "Recycle Bin", icon: <Delete />, path: "/recycle-bin" },
  ];

  const isActive = (path: string) => {
    if (path === "/albums/0" && location.pathname.startsWith("/albums/")) {
      return true;
    }
    return location.pathname === path;
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        background: "linear-gradient(180deg, #1a1f36, #252a4b)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
       
      // sx={{
      //   width: 250,
      //   height: "100%",
      //   background: theme === "dark" ? "#1a1f36" : "#ffffff", // שינוי צבע לפי theme
      //   color: theme === "dark" ? "white" : "black", // שינוי צבע טקסט לפי theme
      //   display: "flex",
      //   flexDirection: "column",
      // }}
    >
    
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <img src="/logo-blue-small.jpg" alt="PhotoShare Logo" style={{ height: "60px", marginBottom: "10px" }} />
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <span style={{ color: "white" }}>Photo</span>
          <span
            style={{
              background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontSize: "30px",
              display: "inline-block",
            }}
          >
            Share
          </span>
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#d1e0ff", mb: 2 }}>
          my moment
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<CreateNewFolder />}
          onClick={onOpenAddAlbum}
          sx={{
            mb: 2,
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(135deg, #0072ff, #00c6ff)",
            },
          }}
        >
          New Album
        </Button>

        <Button
          variant="contained"
          fullWidth
          startIcon={<AddPhotoAlternate />}
          onClick={onOpenUploadPhoto}
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #7209b7, #d400ff)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(135deg, #d400ff, #7209b7)",
            },
          }}
        >
          Upload Photo
        </Button>
      </Box>

      <List sx={{ p: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
          // component="button"
            component="circle"
            key={item.text}
            onClick={() => handleNavigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: "8px",
              backgroundColor: isActive(item.path) ? "rgba(255, 255, 255, 0.1)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? "#00c6ff" : "white", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? "bold" : "normal",
                color: isActive(item.path) ? "#00c6ff" : "white",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          mt: "auto",
          p: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          startIcon={theme === "dark" ? <LightMode /> : <DarkMode />}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          sx={{
            width: "100%",
            background: "rgba(255, 255, 255, 0.1)",
            color: "white",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={onClose}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Sidebar;
