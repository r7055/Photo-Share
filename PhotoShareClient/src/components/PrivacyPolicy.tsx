import type React from "react"
import { Box, Typography, IconButton, Container, Paper, Divider } from "@mui/material"
import { Shield, Security, Info, ContactMail, ArrowForward } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useTheme } from "./themeProvider"

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #0f172a, #1e293b, #334155)"
            : "linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            borderRadius: "16px",
            background:
              theme === "dark"
                ? "linear-gradient(145deg, #1e293b, #334155)"
                : "linear-gradient(145deg, #ffffff, #f1f5f9)",
            boxShadow: theme === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Shield sx={{ mr: 2, color: theme === "dark" ? "#00c6ff" : "#3b82f6", fontSize: 32 }} />
              <Typography
                variant="h4"
                sx={{
                  color: theme === "dark" ? "white" : "#1e293b",
                  fontWeight: "bold",
                }}
              >
                Privacy Policy
              </Typography>
            </Box>
            <IconButton
              onClick={handleBack}
              sx={{
                color: theme === "dark" ? "#00c6ff" : "#3b82f6",
                backgroundColor: theme === "dark" ? "rgba(0, 198, 255, 0.1)" : "rgba(59, 130, 246, 0.1)",
                "&:hover": {
                  backgroundColor: theme === "dark" ? "rgba(0, 198, 255, 0.2)" : "rgba(59, 130, 246, 0.2)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
              fontSize: "1.1rem",
            }}
          >
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>

        {/* Content */}
        <Paper
          sx={{
            p: 4,
            borderRadius: "16px",
            background:
              theme === "dark"
                ? "linear-gradient(145deg, #1e293b, #334155)"
                : "linear-gradient(145deg, #ffffff, #f1f5f9)",
            boxShadow: theme === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          }}
        >
          {/* Introduction */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: theme === "dark" ? "white" : "#1e293b",
                fontWeight: "bold",
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Info sx={{ mr: 1.5, color: theme === "dark" ? "#00c6ff" : "#3b82f6" }} />
              Introduction
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.9)",
                lineHeight: 1.7,
                fontSize: "1.1rem",
              }}
            >
              Welcome to PhotoShare. We are committed to protecting your privacy and understand the importance of your
              personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you
              use our photo sharing platform.
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

          {/* Information We Collect */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: theme === "dark" ? "white" : "#1e293b",
                fontWeight: "bold",
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Security sx={{ mr: 1.5, color: theme === "dark" ? "#00c6ff" : "#3b82f6" }} />
              Information We Collect
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.9)",
                lineHeight: 1.7,
                fontSize: "1.1rem",
                mb: 2,
              }}
            >
              We collect information that you provide directly to us, including:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Account information (email, username, profile details)
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Photos and content you upload to our platform
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Usage data and analytics to improve our services
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                }}
              >
                Communication preferences and settings
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

          {/* How We Use Your Information */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: theme === "dark" ? "white" : "#1e293b",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              How We Use Your Information
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.9)",
                lineHeight: 1.7,
                fontSize: "1.1rem",
                mb: 2,
              }}
            >
              We use the information we collect to:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Provide and maintain our photo sharing services
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Process and store your photos securely
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Improve our platform and develop new features
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                }}
              >
                Communicate with you about updates and support
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

          {/* Data Protection */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: theme === "dark" ? "white" : "#1e293b",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Data Protection & Security
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.9)",
                lineHeight: 1.7,
                fontSize: "1.1rem",
              }}
            >
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. Your photos are stored securely using
              industry-standard encryption and access controls.
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

          {/* Your Rights */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: theme === "dark" ? "white" : "#1e293b",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Your Rights
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.9)",
                lineHeight: 1.7,
                fontSize: "1.1rem",
                mb: 2,
              }}
            >
              You have the right to:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Access and download your personal data
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Correct or update your information
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                Delete your account and associated data
              </Typography>
              <Typography
                component="li"
                variant="body1"
                sx={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
                  lineHeight: 1.6,
                }}
              >
                Withdraw consent for data processing
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

          {/* Contact Information */}
          <Box
            sx={{
              p: 3,
              borderRadius: "12px",
              backgroundColor: theme === "dark" ? "rgba(0, 198, 255, 0.1)" : "rgba(59, 130, 246, 0.1)",
              border: theme === "dark" ? "1px solid rgba(0, 198, 255, 0.3)" : "1px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme === "dark" ? "white" : "#1e293b",
                fontWeight: "bold",
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ContactMail sx={{ mr: 1.5, color: theme === "dark" ? "#00c6ff" : "#3b82f6" }} />
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.9)",
                lineHeight: 1.7,
                fontSize: "1.1rem",
              }}
            >
              If you have any questions about this Privacy Policy or our data practices, please don't hesitate to
              contact us at{" "}
              <Box
                component="span"
                sx={{
                  color: theme === "dark" ? "#00c6ff" : "#3b82f6",
                  fontWeight: "bold",
                }}
              >
                photoshare464@gmail.com
              </Box>{" "}
              or through our support channels.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default PrivacyPolicy
