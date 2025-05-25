// import { useEffect, useState } from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import AddAlbum from './albums/AddAlbum';
// import AlbumOverview from './albums/AlbumOverview';
// import Sidebar from './Sidebar';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import UploadPhotoComponent from './photos/UploadPhotoComponent';
// import UploadDirectoryComponent from './photos/UploadDirectoryComponent';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Grid } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import PhotoGallery from './photos/PhotoGallery'; 

// const PersonalArea: React.FC = () => {
//     const [openAddAlbum, setOpenAddAlbum] = useState(false);
//     const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
//     const [openUploadDirectory, setOpenUploadDirectory] = useState(false);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null); // State to hold selected album ID
//     const { albumId } = useParams<{ albumId: string }>();

//     const navigate = useNavigate();

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     useEffect(() => {
//         if (albumId) {
//             setSelectedAlbumId(Number(albumId)); // Set the selected album ID from the URL
//         }
//     }, [albumId]);

//     const handleRecycleBinClick = () => {
//         navigate('/recycle-bin');
//     };

//     return (
//         <Box>
//             <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
//                 <EmojiEmotionsIcon sx={{ mr: 1, fontSize: 40, color: '#ff9800' }} /> ברוכים הבאים לאזור האישי
//             </Typography>
//             <Button onClick={toggleSidebar}>
//                 {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
//             </Button>

//             <Grid container spacing={isSidebarOpen ? 2 : 1}>
//                 {isSidebarOpen && <Grid size={{xs:12,md:3}}>
//                     <Sidebar
//                         onOpenAddAlbum={() => setOpenAddAlbum(true)}
//                         onOpenUploadPhoto={() => setOpenUploadPhoto(true)}
//                         onOpenUploadDirectory={() => setOpenUploadDirectory(true)}
//                         onRecycleBinClick={handleRecycleBinClick}
//                     />
//                 </Grid>}
//                 <Grid size={{xs:12,md:9}}>
//                     <AlbumOverview onSelectAlbum={setSelectedAlbumId} /> {/* Pass the function to set selected album ID */}
//                     {selectedAlbumId && <PhotoGallery albumId={selectedAlbumId} />} {/* Render PhotoGallery if an album is selected */}
//                 </Grid>
//             </Grid>
//             <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
//             <UploadPhotoComponent open={openUploadPhoto} onClose={() => setOpenUploadPhoto(false)} />
//             <UploadDirectoryComponent open={openUploadDirectory} onClose={() => setOpenUploadDirectory(false)} />
//         </Box>
//     );
// }

// export default PersonalArea;


import type React from "react"

import { useEffect, useState } from "react"
import { Box, Button, Typography, Container, Grid, useMediaQuery, useTheme, Paper } from "@mui/material"
import AlbumOverview from "./albums/AlbumOverview"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import PhotoGallery from "./photos/PhotoGallery"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"

const PersonalArea: React.FC = () => {
  // const [openAddAlbum, setOpenAddAlbum] = useState(false)
  // const [openUploadPhoto, setOpenUploadPhoto] = useState(false)
  // const [openUploadDirectory, setOpenUploadDirectory] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null)
  const { albumId } = useParams<{ albumId: string }>()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  // const navigate = useNavigate()
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    if (albumId) {
      setSelectedAlbumId(Number(albumId))
    }

    // Auto-close sidebar on mobile
    if (isMobile) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [albumId, isMobile])

  // const handleRecycleBinClick = () => {
  //   navigate("/recycle-bin")
  // }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(90deg, #3f51b5, #2196f3)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              My Photo Gallery
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              onClick={toggleSidebar}
              variant="outlined"
              sx={{
                minWidth: "auto",
                p: 1,
                borderRadius: "12px",
                display: { md: "none" },
              }}
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </motion.div>
        </Box>

        {/* <Grid container spacing={2}> */}
          {/* {(isSidebarOpen || !isMobile) && (
            <Fade in={isSidebarOpen} timeout={300}>
              <Grid size={{ xs:12, md:3, lg:2.5}}>
                <motion.div variants={itemVariants}>
                  <Sidebar
                    onOpenAddAlbum={() => setOpenAddAlbum(true)}
                    onOpenUploadPhoto={() => setOpenUploadPhoto(true)}
                    // onOpenUploadDirectory={() => setOpenUploadDirectory(true)}
                    // onRecycleBinClick={handleRecycleBinClick}
                  />
                  
                </motion.div>
              </Grid>
            </Fade>
          )} */}

          <Grid size={{ xs:12, md:isSidebarOpen ? 9 : 12,lg:isSidebarOpen ? 9.5 : 12}}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,242,245,0.9) 100%)",
                  backdropFilter: "blur(5px)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
                  height: "100%",
                  minHeight: "80vh",
                }}
              >
                <AlbumOverview onSelectAlbum={setSelectedAlbumId} />

                {selectedAlbumId && (
                  <Box sx={{ mt: 4 }}>
                    <PhotoGallery albumId={selectedAlbumId} />
                  </Box>
                )}
              </Paper>
            </motion.div>
          </Grid>
        {/* </Grid> */}
      </motion.div>

      {/* <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
      <UploadPhotoComponent open={openUploadPhoto} onClose={() => setOpenUploadPhoto(false)} />
      <UploadDirectoryComponent open={openUploadDirectory} onClose={() => setOpenUploadDirectory(false)} /> */}
         {/* <AddAlbum open={addAlbumOpen} onClose={handleCloseAddAlbum} /> */}
      {/* <UploadPhotoComponent open={uploadPhotoOpen} onClose={handleCloseUploadPhoto} /> */}
    </Container>
  )
}

export default PersonalArea
