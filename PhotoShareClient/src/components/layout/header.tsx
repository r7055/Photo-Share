import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  } from "@mui/material"
import { Menu as MenuIcon, Person, Settings, Logout } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import type { User } from "../../types/user"

interface HeaderProps {
  toggleSidebar: () => void
  user: User | null
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, user }) => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token")

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
        background: "linear-gradient(90deg, #1a1f36, #3a4276, #8a2be2)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <img src="/logo-blue-small.jpg" alt="PhotoShare Logo" style={{ height: "40px", marginRight: "10px" }} />
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
                fontSize: "24px",
                display: "inline-block",
              }}
            >
              Share
            </span>
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {token ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, ml: 2 }}>
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                  color: "white",
                  fontWeight: "bold",
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
                  background: "linear-gradient(90deg, #1a1f36, #252a4b)",
                  color: "white",
                  mt: 1.5,
                  minWidth: 180,
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                  borderRadius: "12px",
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
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
                    background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 24,
                  }}
                >
                  {getAvatarText()}
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#d1e0ff", fontSize: "0.8rem" }}>
                  {user?.email}
                </Typography>
              </Box>
              <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
              <MenuItem
                onClick={() => {
                  handleProfileMenuClose()
                  navigate("/profile")
                }}
              >
                <Person sx={{ mr: 1.5, fontSize: 20, color: "white" }} />
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleProfileMenuClose()
                  navigate("/settings")
                }}
              >
                <Settings sx={{ mr: 1.5, fontSize: 20, color: "white" }} />
                <Typography>Settings</Typography>
              </MenuItem>
              <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
              <MenuItem onClick={handleLogout}>
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
              background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
              },
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
