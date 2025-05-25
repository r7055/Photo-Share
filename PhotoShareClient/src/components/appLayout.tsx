// // // // import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
// // // // import { Outlet, useNavigate } from 'react-router-dom';
// // // // import logo from '../assets/logo-blue-small.jpg';
// // // // // import { useSelector } from 'react-redux';
// // // // // import { User } from '../types/user';
// // // // import { useEffect } from 'react';

// // // // const AppLayout = () => {
// // // //     // const userState = useSelector((state: { User: { user: User, loading: boolean, msg: string } }) => state.User);
// // // //     const navigate = useNavigate();
// // // //     const token = sessionStorage.getItem('token');

// // // //     useEffect(() => {
// // // //         navigate('/about');
// // // //     }, []);

// // // //     const handleShareAlbum = () => {
// // // //         navigate('/myShares');
// // // //     };

// // // //     const handleAlbumOverview = () => {
// // // //         navigate('/albums/0');
// // // //     };

// // // //     const handlePrivacyPolicy = () => {
// // // //         navigate('/privacy-policy'); // ניווט למדיניות פרטיות
// // // //     };
   

// // // //     return (
// // // //         <>
// // // //          <div style={{ background: 'linear-gradient(90deg, #1a1f36,#252a4b)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
// // // //             <AppBar position="static" sx={{ background: 'linear-gradient(90deg,rgb(26, 31, 54), #3a4276, #8a2be2)' }}>
// // // //                 <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // //                         <img src={logo} alt="PhotoShare Logo" style={{ height: '50px', marginRight: '10px' }} />
// // // //                         <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px', padding: 0 }}>
// // // //                             <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
// // // //                                 <span style={{ color: 'white' }}>Photo</span>
// // // //                                 <span style={{
// // // //                                     background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
// // // //                                     backgroundClip: 'text',
// // // //                                     WebkitBackgroundClip: 'text',
// // // //                                     WebkitTextFillColor: 'transparent',
// // // //                                     fontWeight: 'bold',
// // // //                                     fontSize: '30px',
// // // //                                     display: 'inline-block'
// // // //                                 }}>
// // // //                                     Share
// // // //                                 </span>
// // // //                             </Typography>
// // // //                             <Typography variant="subtitle2" sx={{ color: 'white', margin: 0, padding: 0 }}>
// // // //                                 my moment
// // // //                             </Typography>
// // // //                         </Box>
// // // //                     </Box>
// // // //                     <Box sx={{ display: 'flex', alignItems: 'center' }}> 
// // // //                         {token && <Button 
// // // //                             variant="contained" 
// // // //                             onClick={handleShareAlbum} 
// // // //                             sx={{
// // // //                                 background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
// // // //                                 color: 'white',
// // // //                                 margin: '10px',
// // // //                                 '&:hover': {
// // // //                                     background: 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
// // // //                                 },
// // // //                             }}
// // // //                         >
// // // //                             Share Album
// // // //                         </Button>}
// // // //                         {token && <Button 
// // // //                             variant="contained" 
// // // //                             onClick={handleAlbumOverview} 
// // // //                             sx={{
// // // //                                 background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
// // // //                                 color: 'white',
// // // //                                 margin: '10px',
// // // //                                 '&:hover': {
// // // //                                     background: 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
// // // //                                 },
// // // //                             }}
// // // //                         >
// // // //                             Albums
// // // //                         </Button>}
// // // //                         {!token && <Typography variant="subtitle1" sx={{ color: '#d1d1e0' }}>
// // // //                             ניהול תמונות חכם באמצעות AI - ארגון, תיוג, שיתוף וזיהוי פנים
// // // //                         </Typography>}
// // // //                     </Box>
// // // //                 </Toolbar>
// // // //             </AppBar>

// // // //             <main style={{ flexGrow: 1 }}>
// // // //                 <Outlet />
// // // //             </main>

// // // //             <AppBar position="static" sx={{ top: 'auto', bottom: 0, background: 'linear-gradient(90deg, #1a1f36, #3a4276, #8a2be2)' }}>
// // // //                 <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // //                     <Typography variant="body1" color="inherit">
// // // //                         © 2025 PhotoShare. כל הזכויות שמורות.
// // // //                     </Typography>
// // // //                     <Typography variant="body2" color="inherit" onClick={handlePrivacyPolicy} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
// // // //                         מדיניות פרטיות
// // // //                     </Typography>
// // // //                 </Toolbar>
// // // //             </AppBar>
// // // //         </div>
// // // //         </>
// // // //     );
// // // // };

// // // // export default AppLayout;
// // // "use client"

// // // import type React from "react"
// // // import { useState, useEffect } from "react"
// // // import {
// // //   AppBar,
// // //   Toolbar,
// // //   Typography,
// // //   Box,
// // //   Button,
// // //   IconButton,
// // //   Drawer,
// // //   List,
// // //   ListItem,
// // //   ListItemIcon,
// // //   ListItemText,
// // //   Avatar,
// // //   Menu,
// // //   MenuItem,
// // //   Divider,
// // //   useMediaQuery,
// // //   useTheme as useMuiTheme,
// // // } from "@mui/material"
// // // import {
// // //   Menu as MenuIcon,
// // //   Home,
// // //   PhotoAlbum,
// // //   Share,
// // //   Delete,
// // //   Logout,
// // //   Settings,
// // //   Person,
// // //   DarkMode,
// // //   LightMode,
// // // } from "@mui/icons-material"
// // // import { Outlet, useNavigate, useLocation } from "react-router-dom"
// // // import { useSelector } from "react-redux"
// // // import type { User } from "../types/user"
// // // import logo from "../assets/logo-blue-small.jpg"
// // // import { useTheme } from "./themeProvider"

// // // const AppLayout = () => {
// // //   const { theme, setTheme } = useTheme()
// // //   const muiTheme = useMuiTheme()
// // //   const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
// // //   const [drawerOpen, setDrawerOpen] = useState(!isMobile)
// // //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
// // //   const navigate = useNavigate()
// // //   const location = useLocation()
// // //   const token = sessionStorage.getItem("token")
// // //   const { user } = useSelector((state: { user: { user: User } }) => state.user)

// // //   useEffect(() => {
// // //     if (isMobile) {
// // //       setDrawerOpen(false)
// // //     }
// // //   }, [isMobile])

// // //   const handleDrawerToggle = () => {
// // //     setDrawerOpen(!drawerOpen)
// // //   }

// // //   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// // //     setAnchorEl(event.currentTarget)
// // //   }

// // //   const handleProfileMenuClose = () => {
// // //     setAnchorEl(null)
// // //   }

// // //   const handleLogout = () => {
// // //     sessionStorage.removeItem("token")
// // //     navigate("/auth")
// // //     handleProfileMenuClose()
// // //   }

// // //   const handleNavigate = (path: string) => {
// // //     navigate(path)
// // //     if (isMobile) {
// // //       setDrawerOpen(false)
// // //     }
// // //   }

// // //   const menuItems = [
// // //     { text: "Home", icon: <Home />, path: "/about" },
// // //     { text: "My Albums", icon: <PhotoAlbum />, path: "/albums/0" },
// // //     { text: "Shared Albums", icon: <Share />, path: "/myShares" },
// // //     { text: "Recycle Bin", icon: <Delete />, path: "/recycle-bin" },
// // //   ]

// // //   const isActive = (path: string) => {
// // //     if (path === "/albums/0" && location.pathname.startsWith("/albums/")) {
// // //       return true
// // //     }
// // //     return location.pathname === path
// // //   }

// // //   // Generate avatar text from user name
// // //   const getAvatarText = () => {
// // //     if (user?.firstName && user?.lastName) {
// // //       return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
// // //     }
// // //     return user?.firstName?.charAt(0) || "U"
// // //   }

// // //   const drawer = (
// // //     <Box
// // //       sx={{
// // //         width: 250,
// // //         height: "100%",
// // //         background: "linear-gradient(180deg, #1a1f36, #252a4b)",
// // //         color: "white",
// // //       }}
// // //     >
// // //       <Box
// // //         sx={{
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           alignItems: "center",
// // //           p: 2,
// // //           borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
// // //         }}
// // //       >
// // //         <img src={logo || "/placeholder.svg"} alt="PhotoShare Logo" style={{ height: "60px", marginBottom: "10px" }} />
// // //         <Typography
// // //           variant="h6"
// // //           sx={{
// // //             display: "flex",
// // //             alignItems: "center",
// // //             margin: 0,
// // //             padding: 0,
// // //           }}
// // //         >
// // //           <span style={{ color: "white" }}>Photo</span>
// // //           <span
// // //             style={{
// // //               background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
// // //               backgroundClip: "text",
// // //               WebkitBackgroundClip: "text",
// // //               WebkitTextFillColor: "transparent",
// // //               fontWeight: "bold",
// // //               fontSize: "30px",
// // //               display: "inline-block",
// // //             }}
// // //           >
// // //             Share
// // //           </span>
// // //         </Typography>
// // //         <Typography variant="subtitle2" sx={{ color: "#d1e0ff", mb: 2 }}>
// // //           my moment
// // //         </Typography>
// // //       </Box>

// // //       <List sx={{ p: 2 }}>
// // //         {menuItems.map((item) => (
// // //           <ListItem
// // //             component="button"
// // //             key={item.text}
// // //             onClick={() => handleNavigate(item.path)}
// // //             sx={{
// // //               mb: 1,
// // //               borderRadius: "8px",
// // //               backgroundColor: isActive(item.path) ? "rgba(255, 255, 255, 0.1)" : "transparent",
// // //               "&:hover": {
// // //                 backgroundColor: "rgba(255, 255, 255, 0.05)",
// // //               },
// // //             }}
// // //           >
// // //             <ListItemIcon sx={{ color: isActive(item.path) ? "#00c6ff" : "white", minWidth: 40 }}>
// // //               {item.icon}
// // //             </ListItemIcon>
// // //             <ListItemText
// // //               primary={item.text}
// // //               primaryTypographyProps={{
// // //                 fontWeight: isActive(item.path) ? "bold" : "normal",
// // //                 color: isActive(item.path) ? "#00c6ff" : "white",
// // //               }}
// // //             />
// // //           </ListItem>
// // //         ))}
// // //       </List>

// // //       <Box
// // //         sx={{
// // //           mt: "auto",
// // //           p: 2,
// // //           borderTop: "1px solid rgba(255, 255, 255, 0.1)",
// // //           display: "flex",
// // //           justifyContent: "center",
// // //         }}
// // //       >
// // //         <Button
// // //           variant="contained"
// // //           startIcon={theme === "dark" ? <LightMode /> : <DarkMode />}
// // //           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
// // //           sx={{
// // //             width: "100%",
// // //             background: "rgba(255, 255, 255, 0.1)",
// // //             color: "white",
// // //             "&:hover": {
// // //               background: "rgba(255, 255, 255, 0.2)",
// // //             },
// // //           }}
// // //         >
// // //           {theme === "dark" ? "Light Mode" : "Dark Mode"}
// // //         </Button>
// // //       </Box>
// // //     </Box>
// // //   )

// // //   return (
// // //     <Box sx={{ display: "flex", minHeight: "100vh" }}>
// // //       <AppBar
// // //         position="fixed"
// // //         sx={{
// // //           zIndex: (theme) => theme.zIndex.drawer + 1,
// // //           background: "linear-gradient(90deg, #1a1f36, #3a4276, #8a2be2)",
// // //           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
// // //         }}
// // //       >
// // //         <Toolbar>
// // //           <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
// // //             <MenuIcon />
// // //           </IconButton>

// // //           <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
// // //             <img
// // //               src={logo || "/placeholder.svg"}
// // //               alt="PhotoShare Logo"
// // //               style={{ height: "40px", marginRight: "10px" }}
// // //             />
// // //             <Typography
// // //               variant="h6"
// // //               sx={{
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 margin: 0,
// // //                 padding: 0,
// // //               }}
// // //             >
// // //               <span style={{ color: "white" }}>Photo</span>
// // //               <span
// // //                 style={{
// // //                   background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
// // //                   backgroundClip: "text",
// // //                   WebkitBackgroundClip: "text",
// // //                   WebkitTextFillColor: "transparent",
// // //                   fontWeight: "bold",
// // //                   fontSize: "24px",
// // //                   display: "inline-block",
// // //                 }}
// // //               >
// // //                 Share
// // //               </span>
// // //             </Typography>
// // //           </Box>

// // //           <Box sx={{ flexGrow: 1 }} />

// // //           {token ? (
// // //             <Box sx={{ display: "flex", alignItems: "center" }}>
// // //               <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, ml: 2 }}>
// // //                 <Avatar
// // //                   sx={{
// // //                     background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
// // //                     color: "white",
// // //                     fontWeight: "bold",
// // //                   }}
// // //                 >
// // //                   {getAvatarText()}
// // //                 </Avatar>
// // //               </IconButton>
// // //               <Menu
// // //                 anchorEl={anchorEl}
// // //                 open={Boolean(anchorEl)}
// // //                 onClose={handleProfileMenuClose}
// // //                 PaperProps={{
// // //                   sx: {
// // //                     background: "linear-gradient(90deg, #1a1f36, #252a4b)",
// // //                     color: "white",
// // //                     mt: 1.5,
// // //                     minWidth: 180,
// // //                     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
// // //                     borderRadius: "12px",
// // //                     "& .MuiMenuItem-root": {
// // //                       px: 2,
// // //                       py: 1.5,
// // //                       "&:hover": {
// // //                         backgroundColor: "rgba(255, 255, 255, 0.05)",
// // //                       },
// // //                     },
// // //                   },
// // //                 }}
// // //                 transformOrigin={{ horizontal: "right", vertical: "top" }}
// // //                 anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
// // //               >
// // //                 <Box sx={{ px: 2, py: 1.5, textAlign: "center" }}>
// // //                   <Avatar
// // //                     sx={{
// // //                       width: 60,
// // //                       height: 60,
// // //                       mx: "auto",
// // //                       mb: 1,
// // //                       background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
// // //                       color: "white",
// // //                       fontWeight: "bold",
// // //                       fontSize: 24,
// // //                     }}
// // //                   >
// // //                     {getAvatarText()}
// // //                   </Avatar>
// // //                   <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
// // //                     {user?.firstName} {user?.lastName}
// // //                   </Typography>
// // //                   <Typography variant="body2" sx={{ color: "#d1e0ff", fontSize: "0.8rem" }}>
// // //                     {user?.email}
// // //                   </Typography>
// // //                 </Box>
// // //                 <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
// // //                 <MenuItem
// // //                   onClick={() => {
// // //                     handleProfileMenuClose()
// // //                     navigate("/profile")
// // //                   }}
// // //                 >
// // //                   <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
// // //                     <Person fontSize="small" />
// // //                   </ListItemIcon>
// // //                   <ListItemText>Profile</ListItemText>
// // //                 </MenuItem>
// // //                 <MenuItem
// // //                   onClick={() => {
// // //                     handleProfileMenuClose()
// // //                     navigate("/settings")
// // //                   }}
// // //                 >
// // //                   <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
// // //                     <Settings fontSize="small" />
// // //                   </ListItemIcon>
// // //                   <ListItemText>Settings</ListItemText>
// // //                 </MenuItem>
// // //                 <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
// // //                 <MenuItem onClick={handleLogout}>
// // //                   <ListItemIcon sx={{ color: "#ff5252", minWidth: 36 }}>
// // //                     <Logout fontSize="small" />
// // //                   </ListItemIcon>
// // //                   <ListItemText sx={{ color: "#ff5252" }}>Logout</ListItemText>
// // //                 </MenuItem>
// // //               </Menu>
// // //             </Box>
// // //           ) : (
// // //             <Button
// // //               variant="contained"
// // //               onClick={() => navigate("/auth")}
// // //               sx={{
// // //                 background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
// // //                 color: "white",
// // //                 "&:hover": {
// // //                   background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
// // //                 },
// // //               }}
// // //             >
// // //               Sign In
// // //             </Button>
// // //           )}
// // //         </Toolbar>
// // //       </AppBar>

// // //       {/* <Drawer
// // //         variant={isMobile ? "temporary" : "persistent"}
// // //         open={drawerOpen}
// // //         onClose={handleDrawerToggle}
// // //         sx={{
// // //           width: 250,
// // //           flexShrink: 0,
// // //           "& .MuiDrawer-paper": {
// // //             width: 250,
// // //             boxSizing: "border-box",
// // //             border: "none",
// // //           },
// // //         }}
// // //       >
// // //         {drawer}
// // //       </Drawer>  */}

// // //       <Box
// // //         component="main"
// // //         sx={{
// // //           flexGrow: 1,
// // //           p: 3,
// // //           width: { sm: `calc(100% - ${drawerOpen ? 250 : 0}px)` },
// // //           ml: { sm: drawerOpen ? "250px" : 0 },
// // //           mt: "64px",
// // //           transition: "margin 0.2s ease-in-out",
// // //           background: theme === "dark" ? "linear-gradient(90deg, #1a1f36, #252a4b)" : "#f5f5f5",
// // //           minHeight: "calc(100vh - 64px)",
// // //         }}
// // //       >
// // //         <Outlet />
// // //       </Box>
// // //     </Box>
// // //   )
// // // }

// // // export default AppLayout


// // "use client"
// // import { useState, useEffect } from "react"
// // import { Box, useMediaQuery, useTheme } from "@mui/material"
// // import { Outlet, useNavigate } from "react-router-dom"
// // import { useSelector } from "react-redux"
// // import type { User } from "../types/user"
// // import Header from "./layout/header"
// // import Footer from "./layout/footer"
// // import { ThemeProvider } from "./themeProvider"
// // import Sidebar from "./Sidebar"
// // import AddAlbum from "./albums/AddAlbum"
// // import UploadPhotoComponent from "./photos/UploadPhotoComponent"

// // const AppLayout = () => {
// //   const theme = useTheme()
// //   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
// //   const [drawerOpen, setDrawerOpen] = useState(!isMobile)
// //   const [openAddAlbum, setOpenAddAlbum] = useState(false)
// //   const [openUploadPhoto, setOpenUploadPhoto] = useState(false)
// //   const navigate = useNavigate()
// //   const { user } = useSelector((state: { user: { user: User } }) => state.user)

// //   useEffect(() => {
// //     if (isMobile) {
// //       setDrawerOpen(false)
// //     }
// //   }, [isMobile])

// //   useEffect(() => {
// //     navigate("/about")
// //   }, [])

// //   const handleDrawerToggle = () => {
// //     setDrawerOpen(!drawerOpen)
// //   }

// //   return (
// //     <ThemeProvider>
// //       <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
// //         <Header toggleSidebar={handleDrawerToggle} user={user} />

// //         <Box sx={{ display: "flex", flexGrow: 1 }}>
// //           <Sidebar
// //             open={drawerOpen}
// //             onClose={() => setDrawerOpen(false)}
// //             onOpenAddAlbum={() => setOpenAddAlbum(true)}
// //             onOpenUploadPhoto={() => setOpenUploadPhoto(true)}
// //           />

// //           <Box
// //             component="main"
// //             sx={{
// //               flexGrow: 1,
// //               p: 3,
// //               width: { sm: `calc(100% - ${drawerOpen ? 250 : 0}px)` },
// //               ml: { sm: drawerOpen ? "250px" : 0 },
// //               mt: "64px",
// //               transition: "margin 0.2s ease-in-out",
// //               background: theme.palette.mode === "dark" ? "linear-gradient(90deg, #1a1f36, #252a4b)" : "#f5f5f5",
// //               minHeight: "calc(100vh - 64px - 48px)", // Subtract header and footer heights
// //             }}
// //           >
// //             <Outlet />
// //           </Box>
// //         </Box>

// //         <Footer />

// //         {/* Dialogs */}
// //         <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
// //         <UploadPhotoComponent open={openUploadPhoto} onClose={() => setOpenUploadPhoto(false)} />
// //       </Box>
// //     </ThemeProvider>
// //   )
// // }

// // export default AppLayout


// "use client"
// import { useState, useEffect } from "react"
// import { Box, useMediaQuery, useTheme } from "@mui/material"
// import { Outlet, useNavigate } from "react-router-dom"
// import { useSelector } from "react-redux"
// import type { User } from "../types/user"
// import { ThemeProvider } from "./themeProvider"
// import Header from "./layout/header"
// import Sidebar from "./Sidebar"
// import Footer from "./layout/footer"
// import AddAlbum from "./albums/AddAlbum"
// import UploadPhotoComponent from "./photos/UploadPhotoComponent"

// const AppLayout = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//   const [drawerOpen, setDrawerOpen] = useState(!isMobile)
//   const [openAddAlbum, setOpenAddAlbum] = useState(false)
//   const [openUploadPhoto, setOpenUploadPhoto] = useState(false)
//   const navigate = useNavigate()
//   const { user } = useSelector((state: { user: { user: User } }) => state.user)

//   useEffect(() => {
//     if (isMobile) {
//       setDrawerOpen(false)
//     }
//   }, [isMobile])

//   useEffect(() => {
//     navigate("/about")
//   }, [])

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen)
//   }

//   return (
//     <ThemeProvider>
//       <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//         <Header toggleSidebar={handleDrawerToggle} user={user} />

//         <Box sx={{ display: "flex", flexGrow: 1 }}>
//           <Sidebar
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             onOpenAddAlbum={() => setOpenAddAlbum(true)}
//             onOpenUploadPhoto={() => setOpenUploadPhoto(true)}
//           />

//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               p: 3,
//               width: { sm: `calc(100% - ${drawerOpen ? 250 : 0}px)` },
//               ml: { sm: drawerOpen ? "250px" : 0 },
//               mt: "64px",
//               transition: "margin 0.2s ease-in-out",
//               background: theme.palette.mode === "dark" ? "linear-gradient(90deg, #1a1f36, #252a4b)" : "#f5f5f5",
//               minHeight: "calc(100vh - 64px - 48px)", // Subtract header and footer heights
//             }}
//           >
//             <Outlet />
//           </Box>
//         </Box>

//         <Footer />

//         {/* Dialogs */}
//         <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
//         <UploadPhotoComponent open={openUploadPhoto} onClose={() => setOpenUploadPhoto(false)} />
//       </Box>
//     </ThemeProvider>
//   )
// }

// export default AppLayout

