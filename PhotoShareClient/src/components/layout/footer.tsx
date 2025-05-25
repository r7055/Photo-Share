"use client"

import type React from "react"
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Copyright, Security, Info } from "@mui/icons-material"

const Footer: React.FC = () => {
  const navigate = useNavigate()

  const handlePrivacyPolicy = () => {
    navigate("/privacy-policy")
  }

  return (
    
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        background: "linear-gradient(90deg, #1a1f36, #3a4276, #8a2be2)",
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Copyright sx={{ mr: 1, fontSize: 18, color: "rgba(255, 255, 255, 0.7)" }} />
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            © {new Date().getFullYear()} PhotoShare. All rights reserved.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Link
            component="button"
            variant="body2"
            onClick={handlePrivacyPolicy}
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                color: "white",
                textDecoration: "underline",
              },
            }}
          >
            <Security sx={{ mr: 0.5, fontSize: 16 }} />
            Privacy Policy
          </Link>

          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/about")}
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                color: "white",
                textDecoration: "underline",
              },
            }}
          >
            <Info sx={{ mr: 0.5, fontSize: 16 }} />
            About
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
