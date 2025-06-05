// "use client"
// import { useState, useEffect } from "react"
// import { Box } from "@mui/material"
// import { Outlet } from "react-router-dom"
// import { useSelector } from "react-redux"
// import type { User } from "../types/user"
// import useMediaQuery from "@mui/material/useMediaQuery"
// import { useTheme as useMuiTheme } from "@mui/material/styles"
// import { useTheme } from "./themeProvider"
// import Header from "./layout/header"
// import Sidebar from "./Sidebar"
// import Footer from "./layout/footer"
// import AddAlbum from "./albums/AddAlbum"
// import UploadPhotoComponent from "./photos/UploadPhotoComponent"

// const AppLayoutRefactored = () => {
//   const { theme } = useTheme()
//   const muiTheme = useMuiTheme()
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
//   const [drawerOpen, setDrawerOpen] = useState(!isMobile)
//   //   const navigate = useNavigate()
//   const { user } = useSelector((state: { user: { user: User } }) => state.user)
//   const [addAlbumOpen, setAddAlbumOpen] = useState(false)
//   const [uploadPhotoOpen, setUploadPhotoOpen] = useState(false)

//   useEffect(() => {
//     if (isMobile) {
//       setDrawerOpen(false)
//     }
//   }, [isMobile])

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen)
//   }

//   const handleOpenAddAlbum = () => {
//     setAddAlbumOpen(true)
//   }

//   const handleCloseAddAlbum = () => {
//     setAddAlbumOpen(false)
//   }

//   const handleOpenUploadPhoto = () => {
//     setUploadPhotoOpen(true)
//   }

//   const handleCloseUploadPhoto = () => {
//     setUploadPhotoOpen(false)
//   }

//   return (
//     <>
//       {/* // <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}> */}
//       <Header toggleSidebar={handleDrawerToggle} user={user} />


//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerOpen ? 250 : 0}px)` },
//           ml: { sm: drawerOpen ? "250px" : 0 },
//           mt: "64px",
//           transition: "margin 0.2s ease-in-out",
//           background: theme === "dark" ? "linear-gradient(90deg, #1a1f36, #252a4b)" : "#f5f5f5",
//           minHeight: "calc(100vh - 120px)", // Adjust for header and footer
//         }}
//       >
//         <Sidebar
//           open={drawerOpen}
//           onClose={handleDrawerToggle}
//           onOpenAddAlbum={handleOpenAddAlbum}
//           onOpenUploadPhoto={handleOpenUploadPhoto}
//         />
//         <Outlet />
//       </Box>
//       <Footer />

//       {/* Dialogs */}
//       <AddAlbum open={addAlbumOpen} onClose={handleCloseAddAlbum} />
//       <UploadPhotoComponent open={uploadPhotoOpen} onClose={handleCloseUploadPhoto} />
//       {/* </Box> */}
//     </>
//   )
// }

// export default AppLayoutRefactored

"use client"
import { useState, useEffect } from "react"
import { Box, Drawer, useMediaQuery, Backdrop } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { User } from "../types/user"
import { useTheme as useMuiTheme } from "@mui/material/styles"
import { useTheme } from "./themeProvider"
import Header from "./layout/header"
import Sidebar from "./Sidebar"
import Footer from "./layout/footer"
import AddAlbum from "./albums/AddAlbum"
import UploadPhotoComponent from "./photos/UploadPhotoComponent"

const SIDEBAR_WIDTH = 280;
const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 60;

const AppLayoutRefactored = () => {
  const { theme } = useTheme()
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("lg"))
  const [drawerOpen, setDrawerOpen] = useState(!isMobile)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  
  const { user } = useSelector((state: { user: { user: User } }) => state.user)
  const [addAlbumOpen, setAddAlbumOpen] = useState(false)
  const [uploadPhotoOpen, setUploadPhotoOpen] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false)
    } else {
      setMobileDrawerOpen(false)
      setDrawerOpen(true)
    }
  }, [isMobile])

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen)
    } else {
      setDrawerOpen(!drawerOpen)
    }
  }

  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false)
  }

  const handleOpenAddAlbum = () => {
    setAddAlbumOpen(true)
  }

  const handleCloseAddAlbum = () => {
    setAddAlbumOpen(false)
  }

  const handleOpenUploadPhoto = () => {
    setUploadPhotoOpen(true)
  }

  const handleCloseUploadPhoto = () => {
    setUploadPhotoOpen(false)
  }

  const sidebarContent = (
    <Sidebar
      open={true}
      onClose={handleDrawerToggle}
      onOpenAddAlbum={handleOpenAddAlbum}
      onOpenUploadPhoto={handleOpenUploadPhoto}
    />
  )

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: `${HEADER_HEIGHT}px 1fr ${FOOTER_HEIGHT}px`,
        gridTemplateColumns: isMobile 
          ? '1fr' 
          : drawerOpen 
            ? `${SIDEBAR_WIDTH}px 1fr` 
            : '1fr',
        minHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden',
        background: theme === "dark" 
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
          : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          gridColumn: '1 / -1',
          zIndex: muiTheme.zIndex.appBar,
          boxShadow: theme === "dark" 
            ? "0 4px 20px rgba(0, 0, 0, 0.3)"
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Header toggleSidebar={handleDrawerToggle} user={user} />
      </Box>

      {/* Desktop Sidebar */}
      {!isMobile && drawerOpen && (
        <Box
          // sx={{
          //   gridRow: '2',
          //   gridColumn: '1',
          //   overflow: 'hidden',
          //   borderRight: `1px solid ${theme === "dark" ? '#334155' : '#e2e8f0'}`,
          //   background: theme === "dark"
          //     ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
          //     : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          //   backdropFilter: 'blur(10px)',
          //   boxShadow: theme === "dark"
          //     ? "4px 0 20px rgba(0, 0, 0, 0.3)"
          //     : "4px 0 20px rgba(0, 0, 0, 0.1)",
          // }}
        >
          {sidebarContent}
        </Box>
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileDrawerOpen}
            onClose={handleMobileDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: SIDEBAR_WIDTH,
                background: theme === "dark"
                  ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
                  : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                backdropFilter: 'blur(20px)',
                borderRight: `1px solid ${theme === "dark" ? '#334155' : '#e2e8f0'}`,
                boxShadow: theme === "dark"
                  ? "0 0 30px rgba(0, 0, 0, 0.5)"
                  : "0 0 30px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {sidebarContent}
          </Drawer>
          
          {/* Mobile Backdrop */}
          <Backdrop
            open={mobileDrawerOpen}
            onClick={handleMobileDrawerClose}
            sx={{
              zIndex: muiTheme.zIndex.drawer - 1,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(4px)',
            }}
          />
        </>
      )}

      {/* Main Content */}
      <Box
        component="main"
        // sx={{
        //   gridRow: '2',
        //   gridColumn: isMobile ? '1' : drawerOpen ? '2' : '1',
        //   overflow: 'auto',
        //   padding: {
        //     xs: 2,
        //     sm: 3,
        //     md: 4,
        //   },
        //   background: 'transparent',
        //   position: 'relative',
        //   '&::-webkit-scrollbar': {
        //     width: '8px',
        //   },
        //   '&::-webkit-scrollbar-track': {
        //     background: theme === "dark" ? '#0f172a' : '#f1f5f9',
        //     borderRadius: '4px',
        //   },
        //   '&::-webkit-scrollbar-thumb': {
        //     background: theme === "dark" ? '#475569' : '#cbd5e1',
        //     borderRadius: '4px',
        //     '&:hover': {
        //       background: theme === "dark" ? '#64748b' : '#94a3b8',
        //     },
        //   },
        // }}
      >
        {/* Content Container */}
        <Box
          sx={{
            maxWidth: '100%',
            margin: '0 auto',
            background: theme === "dark"
              ? 'rgba(30, 41, 59, 0.4)'
              : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            padding: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            border: `1px solid ${theme === "dark" ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
            boxShadow: theme === "dark"
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
            minHeight: 'calc(100% - 32px)',
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          gridColumn: '1 / -1',
          borderTop: `1px solid ${theme === "dark" ? '#334155' : '#e2e8f0'}`,
          background: theme === "dark"
            ? "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)"
            : "linear-gradient(90deg, #ffffff 0%, #f8fafc 100%)",
          backdropFilter: 'blur(10px)',
          boxShadow: theme === "dark"
            ? "0 -4px 20px rgba(0, 0, 0, 0.3)"
            : "0 -4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Footer />
      </Box>

      {/* Dialogs */}
      <AddAlbum open={addAlbumOpen} onClose={handleCloseAddAlbum} />
      <UploadPhotoComponent open={uploadPhotoOpen} onClose={handleCloseUploadPhoto} />
    </Box>
  )
}

export default AppLayoutRefactored
