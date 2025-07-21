// import React from "react"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   } from "@mui/material"
// import { Menu as MenuIcon, Person, Settings, Logout } from "@mui/icons-material"
// import { useNavigate } from "react-router-dom"
// import type { User } from "../../types/user"

// interface HeaderProps {
//   toggleSidebar: () => void
//   user: User | null
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar, user }) => {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
//   const navigate = useNavigate()
//   const token = sessionStorage.getItem("token")

//   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     sessionStorage.removeItem("token")
//     navigate("/auth")
//     handleProfileMenuClose()
//   }

//   // Generate avatar text from user name
//   const getAvatarText = () => {
//     if (user?.firstName && user?.lastName) {
//       return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
//     }
//     return user?.firstName?.charAt(0) || "U"
//   }

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #334155 100%)",
//         backdropFilter: 'blur(10px)',
//         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
//         width: "100%",
//         maxWidth: "100vw",
//         overflowX: "hidden",
//         top: 0,
//         left: 0,
//         right: 0,
//         border: 'none',
//         borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
//       }}
//     >
//       <Toolbar
//         sx={{
//           width: "100%",
//           maxWidth: "100%",
//           px: { xs: 1, sm: 2 },
//           boxSizing: "border-box",
//           overflowX: "hidden",
//         }}
//       >
//         <IconButton 
//           color="inherit" 
//           aria-label="open drawer" 
//           edge="start" 
//           onClick={toggleSidebar} 
//           sx={{ 
//             mr: 2,
//             flexShrink: 0,
//             color: 'white',
//             '&:hover': {
//               backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             },
//           }}
//         >
//           <MenuIcon />
//         </IconButton>

//         {/* Logo and Title Section */}
//         <Box sx={{ 
//           display: "flex", 
//           alignItems: "center",
//           flexShrink: 1,
//           minWidth: 0,
//           overflow: "hidden",
//         }}>
//           <img 
//             src="/logo-blue-small.jpg" 
//             alt="PhotoShare Logo" 
//             style={{ 
//               height: "40px", 
//               marginRight: "12px",
//               flexShrink: 0,
//             }} 
//           />
//           <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 margin: 0,
//                 padding: 0,
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 minWidth: 0,
//                 lineHeight: 1,
//               }}
//             >
//               <span style={{ color: "white" }}>Photo</span>
//               <span
//                 style={{
//                   background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontWeight: "bold",
//                   fontSize: "24px",
//                   display: "inline-block",
//                 }}
//               >
//                 Share
//               </span>
//             </Typography>
//             <Typography 
//               variant="caption" 
//               sx={{ 
//                 color: "rgba(255, 255, 255, 0.7)", 
//                 fontSize: "0.7rem",
//                 lineHeight: 1,
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 mt: -0.5,
//               }}
//             >
//               my moment
//             </Typography>
//           </Box>
//         </Box>

//         <Box sx={{ flexGrow: 1 }} />

//         {token ? (
//           <Box sx={{ 
//             display: "flex", 
//             alignItems: "center",
//             flexShrink: 0,
//           }}>
//             <IconButton 
//               onClick={handleProfileMenuOpen} 
//               sx={{ 
//                 p: 0, 
//                 ml: 2,
//                 flexShrink: 0,
//               }}
//             >
//               <Avatar
//                 sx={{
//                   background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//                   color: "white",
//                   fontWeight: "bold",
//                   width: { xs: 36, sm: 40 },
//                   height: { xs: 36, sm: 40 },
//                 }}
//               >
//                 {getAvatarText()}
//               </Avatar>
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleProfileMenuClose}
//               PaperProps={{
//                 sx: {
//                   background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
//                   backdropFilter: 'blur(20px)',
//                   color: "white",
//                   mt: 1.5,
//                   minWidth: 180,
//                   maxWidth: "90vw",
//                   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
//                   borderRadius: "12px",
//                   border: "1px solid rgba(71, 85, 105, 0.3)",
//                   "& .MuiMenuItem-root": {
//                     px: 2,
//                     py: 1.5,
//                     "&:hover": {
//                       backgroundColor: "rgba(255, 255, 255, 0.1)",
//                     },
//                   },
//                 },
//               }}
//               transformOrigin={{ horizontal: "right", vertical: "top" }}
//               anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//             >
//               <Box sx={{ px: 2, py: 1.5, textAlign: "center" }}>
//                 <Avatar
//                   sx={{
//                     width: 60,
//                     height: 60,
//                     mx: "auto",
//                     mb: 1,
//                     background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//                     color: "white",
//                     fontWeight: "bold",
//                     fontSize: 24,
//                   }}
//                 >
//                   {getAvatarText()}
//                 </Avatar>
//                 <Typography 
//                   variant="subtitle1" 
//                   sx={{ 
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   {user?.firstName} {user?.lastName}
//                 </Typography>
//                 <Typography 
//                   variant="body2" 
//                   sx={{ 
//                     color: "rgba(255, 255, 255, 0.7)", 
//                     fontSize: "0.8rem",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   {user?.email}
//                 </Typography>
//               </Box>
//               <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
//               <MenuItem
//                 onClick={() => {
//                   handleProfileMenuClose()
//                   navigate("/profile")
//                 }}
//                 sx={{ whiteSpace: "nowrap" }}
//               >
//                 <Person sx={{ mr: 1.5, fontSize: 20, color: "white" }} />
//                 <Typography>Profile</Typography>
//               </MenuItem>
//               <MenuItem
//                 onClick={() => {
//                   handleProfileMenuClose()
//                   navigate("/settings")
//                 }}
//                 sx={{ whiteSpace: "nowrap" }}
//               >
//                 <Settings sx={{ mr: 1.5, fontSize: 20, color: "white" }} />
//                 <Typography>Settings</Typography>
//               </MenuItem>
//               <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
//               <MenuItem 
//                 onClick={handleLogout}
//                 sx={{ whiteSpace: "nowrap" }}
//               >
//                 <Logout sx={{ mr: 1.5, fontSize: 20, color: "#ff5252" }} />
//                 <Typography sx={{ color: "#ff5252" }}>Logout</Typography>
//               </MenuItem>
//             </Menu>
//           </Box>
//         ) : (
//           <Button
//             variant="contained"
//             onClick={() => navigate("/auth")}
//             sx={{
//               background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//               color: "white",
//               flexShrink: 0,
//               whiteSpace: "nowrap",
//               minWidth: "auto",
//               px: { xs: 1.5, sm: 2 },
//               fontSize: { xs: "0.8rem", sm: "0.875rem" },
//               "&:hover": {
//                 background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
//               },
//             }}
//           >
//             Sign In
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default Header

"use client"

import React from "react"
import { LightMode, DarkMode } from "@mui/icons-material"
import type { ReactElement } from "react"
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar, Menu, MenuItem, Divider } from "@mui/material"
import { Menu as MenuIcon, Person, Settings, Logout } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import type { User } from "../../types/user"
import { useTheme } from "../themeProvider"

interface HeaderProps {
  toggleSidebar: () => void
  user: User | null
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, user }): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token")
  const { theme, setTheme } = useTheme()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    navigate("/auth")
    handleProfileMenuClose()
  }

  // Generate avatar text from user name
  const getAvatarText = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    }
    return user?.firstName?.charAt(0) || "U"
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #334155 100%)"
            : "linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 30%, #81d4fa 70%, #4fc3f7 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: theme === "dark" ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "0 4px 20px rgba(79, 195, 247, 0.2)",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        top: 0,
        left: 0,
        right: 0,
        border: "none",
        borderBottom: `1px solid ${theme === "dark" ? "rgba(71, 85, 105, 0.3)" : "rgba(79, 195, 247, 0.4)"}`,
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "100%",
          px: { xs: 1, sm: 2 },
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{
            mr: 2,
            flexShrink: 0,
            color: theme === "dark" ? "white" : "#01579b",
            "&:hover": {
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(79, 195, 247, 0.15)",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo and Title Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <img
            src="../../public/logo.png"
            alt="PhotoShare Logo"
            style={{
              height: "40px",
              marginRight: "12px",
              flexShrink: 0,
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                margin: 0,
                padding: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                minWidth: 0,
                lineHeight: 1,
              }}
            >
              <span style={{ color: theme === "dark" ? "white" : "#01579b" }}>Photo</span>
              <span
                style={{
                  background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                  fontSize: "24px",
                  display: "inline-block",
                }}
              >
                Share
              </span>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "#0277bd",
                fontSize: "0.7rem",
                lineHeight: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                mt: -0.5,
              }}
            >
              my moment
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {token ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >

            <IconButton
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              sx={{
                ml: 1,
                color: theme === "dark" ? "#ffeb3b" : "#0f172a",
                "&:hover": {
                  backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(79, 195, 247, 0.15)",
                },
              }}
            >
              {theme === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>

            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                p: 0,
                ml: 2,
                flexShrink: 0,
              }}
            >
              <Avatar
                sx={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)"
                      : "linear-gradient(135deg, #3b82f6, #1d4ed8, #8b5cf6, #a855f7)",
                  color: "white",
                  fontWeight: "bold",
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                }}
              >
                {getAvatarText()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              PaperProps={{
                sx: {
                  background:
                    theme === "dark"
                      ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
                      : "linear-gradient(180deg, #ffffff 0%, #e1f5fe 50%, #b3e5fc 100%)",
                  backdropFilter: "blur(20px)",
                  color: theme === "dark" ? "white" : "#1e293b",
                  mt: 1.5,
                  minWidth: 180,
                  maxWidth: "90vw",
                  boxShadow: theme === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  border: `1px solid ${theme === "dark" ? "rgba(71, 85, 105, 0.3)" : "rgba(79, 195, 247, 0.4)"}`,
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(79, 195, 247, 0.1)",
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ px: 2, py: 1.5, textAlign: "center" }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 1,
                    background:
                      theme === "dark"
                        ? "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)"
                        : "linear-gradient(135deg, #3b82f6, #1d4ed8, #8b5cf6, #a855f7)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 24,
                  }}
                >
                  {getAvatarText()}
                </Avatar>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: theme === "dark" ? "white" : "#1e293b",
                  }}
                >
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)",
                    fontSize: "0.8rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user?.email}
                </Typography>
              </Box>
              <Divider
                sx={{
                  my: 1,
                  borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                }}
              />
              <MenuItem
                onClick={() => {
                  handleProfileMenuClose()
                  navigate("/profile")
                }}
                sx={{ whiteSpace: "nowrap" }}
              >
                <Person
                  sx={{
                    mr: 1.5,
                    fontSize: 20,
                    color: theme === "dark" ? "#00c6ff" : "#0277bd",
                  }}
                />
                <Typography sx={{ color: theme === "dark" ? "white" : "#1e293b" }}>Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleProfileMenuClose()
                  navigate("/settings")
                }}
                sx={{ whiteSpace: "nowrap" }}
              >
                <Settings
                  sx={{
                    mr: 1.5,
                    fontSize: 20,
                    color: theme === "dark" ? "#00c6ff" : "#0277bd",
                  }}
                />
                <Typography sx={{ color: theme === "dark" ? "white" : "#1e293b" }}>Settings</Typography>
              </MenuItem>
              <Divider
                sx={{
                  my: 1,
                  borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                }}
              />
              <MenuItem onClick={handleLogout} sx={{ whiteSpace: "nowrap" }}>
                <Logout sx={{ mr: 1.5, fontSize: 20, color: "#ff5252" }} />
                <Typography sx={{ color: "#ff5252" }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate("/auth")}
            sx={{
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)"
                  : "linear-gradient(135deg, #3b82f6, #1d4ed8, #8b5cf6, #a855f7)",
              color: "white",
              flexShrink: 0,
              whiteSpace: "nowrap",
              minWidth: "auto",
              px: { xs: 1.5, sm: 2 },
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              boxShadow: theme === "dark" ? "0 4px 15px rgba(0, 198, 255, 0.3)" : "0 4px 15px rgba(59, 130, 246, 0.3)",
              "&:hover": {
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)"
                    : "linear-gradient(135deg, #1d4ed8, #8b5cf6, #a855f7)",
                transform: "translateY(-1px)",
                boxShadow:
                  theme === "dark" ? "0 6px 20px rgba(0, 198, 255, 0.4)" : "0 6px 20px rgba(59, 130, 246, 0.4)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header

