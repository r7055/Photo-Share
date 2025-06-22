"use client"

import type React from "react"
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Copyright, Security, Info } from "@mui/icons-material"
import { useTheme } from "../themeProvider"

const Footer: React.FC = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handlePrivacyPolicy = () => {
    navigate("/privacy-policy")
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        background:
          theme === "dark"
            ? "linear-gradient(90deg, #1a1f36, #3a4276, #8a2be2)"
            : "linear-gradient(90deg, #e0f2fe, #b3e5fc, #81d4fa, #4fc3f7)",
        boxShadow: theme === "dark" ? "0 -4px 10px rgba(0, 0, 0, 0.3)" : "0 -4px 15px rgba(79, 195, 247, 0.2)",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderTop: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(79, 195, 247, 0.3)"}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          px: { xs: 2, sm: 3 },
          minHeight: "64px",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 1,
            minWidth: 0,
          }}
        >
          <Copyright
            sx={{
              mr: 1,
              fontSize: 18,
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "#0277bd",
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            color={theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "#01579b"}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            © {new Date().getFullYear()} PhotoShare. All rights reserved.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 3 },
            flexShrink: 0,
          }}
        >
          <Link
            component="button"
            variant="body2"
            onClick={handlePrivacyPolicy}
            sx={{
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "#0288d1",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: theme === "dark" ? "#00c6ff" : "#0277bd",
                textDecoration: "underline",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Security
              sx={{
                mr: 0.5,
                fontSize: { xs: 14, sm: 16 },
              }}
            />
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Privacy Policy
            </Box>
            <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
              Privacy
            </Box>
          </Link>

          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/about")}
            sx={{
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "#0288d1",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: theme === "dark" ? "#00c6ff" : "#0277bd",
                textDecoration: "underline",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Info
              sx={{
                mr: 0.5,
                fontSize: { xs: 14, sm: 16 },
              }}
            />
            About
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
