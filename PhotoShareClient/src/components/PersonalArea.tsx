// import type React from "react"

// import { useEffect, useState } from "react"
// import { Box, Button, Typography, Container, useMediaQuery, useTheme, Paper } from "@mui/material"
// import AlbumOverview from "./albums/AlbumOverview"
// import MenuIcon from "@mui/icons-material/Menu"
// import CloseIcon from "@mui/icons-material/Close"
// import PhotoGallery from "./photos/PhotoGallery"
// import { motion } from "framer-motion"
// import { useParams } from "react-router-dom"

// const PersonalArea: React.FC = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)
//   const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null)
//   const { albumId } = useParams<{ albumId: string }>()
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen)
//   }

//   useEffect(() => {
//     if (albumId) {
//       setSelectedAlbumId(Number(albumId))
//     }

//     // Auto-close sidebar on mobile
//     if (isMobile) {
//       setIsSidebarOpen(false)
//     } else {
//       setIsSidebarOpen(true)
//     }
//   }, [albumId, isMobile])

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
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
//       transition: { duration: 0.5 },
//     },
//   }

//   // הסרת גלילה רוחבית גלובלית
//   useEffect(() => {
//     // הסרת גלילה רוחבית מכל הדף
//     document.body.style.overflowX = 'hidden'
//     document.documentElement.style.overflowX = 'hidden'
//     document.body.style.maxWidth = '100vw'
//     document.documentElement.style.maxWidth = '100vw'

//     // ניקוי בעת unmount
//     return () => {
//       document.body.style.overflowX = ''
//       document.documentElement.style.overflowX = ''
//       document.body.style.maxWidth = ''
//       document.documentElement.style.maxWidth = ''
//     }
//   }, [])

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 64, // גובה ההדר
//         bottom: 64, // גובה הפוטר
//         left: 0,
//         right: 0,
//         paddingLeft: isMobile ? 0 : (isSidebarOpen ? "250px" : 0),
//         transition: "padding-left 0.3s ease",
//         overflow: "hidden",
//         width: "100%",
//         maxWidth: "100%",
//         boxSizing: "border-box",
//       }}
//     >
//       {/* Main Content */}
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           overflowY: "auto",
//           overflowX: "hidden",
//           boxSizing: "border-box",
//         }}
//       >
//         <Box 
//           sx={{ 
//             p: { xs: 2, sm: 3, md: 4 },
//             width: "100%",
//             maxWidth: "100%",
//             boxSizing: "border-box",
//           }}
//         >
//           <motion.div initial="hidden" animate="visible" variants={containerVariants}>
//             <Box sx={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               mb: 3,
//               width: "100%",
//               maxWidth: "100%",
//               boxSizing: "border-box",
//             }}>
//               <motion.div variants={itemVariants}>
//                 <Typography
//                   variant="h4"
//                   component="h1"
//                   sx={{
//                     fontWeight: 700,
//                     background: "linear-gradient(90deg, #3f51b5, #2196f3)",
//                     backgroundClip: "text",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     textAlign: { xs: "center", md: "left" },
//                     fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
//                   }}
//                 >
//                   My Photo Gallery
//                 </Typography>
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <Button
//                   onClick={toggleSidebar}
//                   variant="outlined"
//                   sx={{
//                     minWidth: "auto",
//                     p: 1,
//                     borderRadius: "12px",
//                     display: { md: "none" },
//                     flexShrink: 0,
//                   }}
//                 >
//                   {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
//                 </Button>
//               </motion.div>
//             </Box>

//             <motion.div variants={itemVariants}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: { xs: 2, sm: 3 },
//                   borderRadius: "16px",
//                   background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,242,245,0.9) 100%)",
//                   backdropFilter: "blur(5px)",
//                   boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
//                   height: "calc(100vh - 240px)", // מותאם לגובה הנכון
//                   width: "100%",
//                   maxWidth: "100%",
//                   boxSizing: "border-box",
//                   overflow: "hidden",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     flexGrow: 1,
//                     overflowY: "auto",
//                     overflowX: "hidden",
//                     width: "100%",
//                     maxWidth: "100%",
//                     boxSizing: "border-box",
//                   }}
//                 >
//                   <AlbumOverview onSelectAlbum={setSelectedAlbumId} />

//                   {selectedAlbumId != null && (
//                     <Box sx={{ mt: 4, width: "100%", maxWidth: "100%" }}>
//                       <PhotoGallery albumId={selectedAlbumId} />
//                     </Box>
//                   )}
//                 </Box>
//               </Paper>
//             </motion.div>
//           </motion.div>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

// export default PersonalArea

import type React from "react"
import { useEffect, useState } from "react"
import { Box, Button, Typography, useMediaQuery, useTheme, Paper } from "@mui/material"
import AlbumOverview from "./albums/AlbumOverview"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import PhotoGallery from "./photos/PhotoGallery"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"

const PersonalArea: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null)
  const { albumId } = useParams<{ albumId: string }>()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    if (albumId) {
      setSelectedAlbumId(Number(albumId))
      // navigate('/photos/' + albumId)
    }

    // Auto-close sidebar on mobile
    if (isMobile) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [albumId, isMobile])

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
    <Box 
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <Box sx={{
          p: { xs: 2, sm: 3, md: 4 },
          pb: 0,
          width: "100%",
          flexShrink: 0,
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}>
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
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
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
                  flexShrink: 0,
                }}
              >
                {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
              </Button>
            </motion.div>
          </Box>
        </Box>

        {/* Content Area */}
          <motion.div variants={itemVariants} style={{ height: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: "16px",
                background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,242,245,0.9) 100%)",
                backdropFilter: "blur(5px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
                height: "100%",
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ flexShrink: 0 }}>
                  <AlbumOverview onSelectAlbum={setSelectedAlbumId} />
                </Box>

                {selectedAlbumId != null && (
                  <Box sx={{
                    mt: 4,
                    flex: 1,
                    overflow: "hidden",
                    width: "100%",
                  }}>
                    <PhotoGallery />
                  </Box>
                )}
              </Box>
            </Paper>
          </motion.div>
      </motion.div>
    </Box>
  )
}

export default PersonalArea