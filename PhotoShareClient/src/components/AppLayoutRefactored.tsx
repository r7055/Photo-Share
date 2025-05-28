"use client"
import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { User } from "../types/user"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme as useMuiTheme } from "@mui/material/styles"
import { useTheme } from "./themeProvider"
import Header from "./layout/header"
import Sidebar from "./Sidebar"
import Footer from "./layout/footer"
import AddAlbum from "./albums/AddAlbum"
import UploadPhotoComponent from "./photos/UploadPhotoComponent"

const AppLayoutRefactored = () => {
  const { theme } = useTheme()
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
  const [drawerOpen, setDrawerOpen] = useState(!isMobile)
  //   const navigate = useNavigate()
  const { user } = useSelector((state: { user: { user: User } }) => state.user)
  const [addAlbumOpen, setAddAlbumOpen] = useState(false)
  const [uploadPhotoOpen, setUploadPhotoOpen] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false)
    }
  }, [isMobile])

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
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

  return (
    <>
      {/* // <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}> */}
      <Header toggleSidebar={handleDrawerToggle} user={user} />

    <Sidebar
      open={drawerOpen}
      onClose={handleDrawerToggle}
      onOpenAddAlbum={handleOpenAddAlbum}
      onOpenUploadPhoto={handleOpenUploadPhoto}
    />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? 250 : 0}px)` },
          ml: { sm: drawerOpen ? "250px" : 0 },
          mt: "64px",
          transition: "margin 0.2s ease-in-out",
          background: theme === "dark" ? "linear-gradient(90deg, #1a1f36, #252a4b)" : "#f5f5f5",
          minHeight: "calc(100vh - 120px)", // Adjust for header and footer
        }}
      >
        <Outlet />
      </Box>
      <Footer />


      {/* Dialogs */}
      <AddAlbum open={addAlbumOpen} onClose={handleCloseAddAlbum} />
      <UploadPhotoComponent open={uploadPhotoOpen} onClose={handleCloseUploadPhoto} />
      {/* </Box> */}
    </>
  )
}

export default AppLayoutRefactored
