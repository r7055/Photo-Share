"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  TextField,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  InputAdornment,
} from "@mui/material"
import {
  Edit,
  Save,
  PhotoCamera,
  Lock,
  Email,
  Person,
  Visibility,
  VisibilityOff,
  CloudUpload,
} from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
// import { updateUser } from "../slices/userSlice"
// import type { AppDispatch } from "../store/store"
import type { User } from "../types/user"
import { motion } from "framer-motion"
import { AppDispatch } from "../store/store"
import { updateUser } from "../slices/userSlice"

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: { user: { user: User } }) => state.user)
  const [editing, setEditing] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const token = sessionStorage.getItem("token")

      if (token && user) {
        await dispatch(
          updateUser({
            token,
            user: {
              ...user,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
            },
          }),
        )
        setSuccess(true)
        setEditing(false)      }
    } catch (error) {
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setLoading(true)
    setError("")
    setSuccess(false)

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match")
      setLoading(false)
      return
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    try {
      // Here you would add the actual password change logic
      // For example:
      // await dispatch(changePassword({ token, currentPassword: formData.currentPassword, newPassword: formData.newPassword }));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)
      setChangePassword(false)
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      setError("Failed to change password. Please check your current password and try again.")
    } finally {
      setLoading(false)
    }
  }

  // Generate avatar text from user name
  const getAvatarText = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    }
    return user?.firstName?.charAt(0) || "U"
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
        <motion.div variants={itemVariants}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color: "text.primary" }}>
            My Profile
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid size={{xs:12, md:4}}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={3}
                sx={{
                  p: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "linear-gradient(145deg, #252a4b, #1a1f36)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box
                  sx={{
                    height: 120,
                    background: "linear-gradient(90deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                    position: "relative",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    mt: -8,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: 48,
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                      border: "4px solid #252a4b",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                      mb: 2,
                    }}
                  >
                    {getAvatarText()}
                  </Avatar>

                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 120,
                      right: "calc(50% - 80px)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>

                  <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#d1e0ff", mb: 3 }}>
                    {user?.email}
                  </Typography>

                  <Chip
                    label="Premium Member"
                    sx={{
                      backgroundColor: "rgba(0, 198, 255, 0.2)",
                      color: "#00c6ff",
                      fontWeight: "bold",
                      mb: 3,
                    }}
                  />

                  <Button
                    variant="contained"
                    startIcon={<Lock />}
                    onClick={() => setChangePassword(true)}
                    sx={{
                      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                      },
                      width: "100%",
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Paper>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  mt: 3,
                  background: "linear-gradient(145deg, #252a4b, #1a1f36)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Typography variant="h6" sx={{ color: "white", mb: 2, fontWeight: "bold" }}>
                  Account Statistics
                </Typography>
                <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Albums:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                    12
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Photos:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                    248
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Storage Used:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                    1.2 GB
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Member Since:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                    {new Date().toLocaleDateString()}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Profile Details */}
          <Grid size={{xs:12, md:8}}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: "linear-gradient(145deg, #252a4b, #1a1f36)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                    Personal Information
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={editing ? <Save /> : <Edit />}
                    onClick={() => (editing ? handleSave() : setEditing(true))}
                    disabled={loading}
                    sx={{
                      color: "white",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : editing ? "Save" : "Edit"}
                  </Button>
                </Box>

                {success && (
                  <Alert severity="success" sx={{ mb: 3, backgroundColor: "rgba(76, 175, 80, 0.1)", color: "#4caf50" }}>
                    Profile updated successfully!
                  </Alert>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 3, backgroundColor: "rgba(244, 67, 54, 0.1)", color: "#f44336" }}>
                    {error}
                  </Alert>
                )}

                <Grid container spacing={3}>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Person sx={{ color: "rgba(255, 255, 255, 0.5)", mr: 1, fontSize: 20 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                          "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                          "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        },
                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                        "& .MuiInputBase-input": { color: "white" },
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Person sx={{ color: "rgba(255, 255, 255, 0.5)", mr: 1, fontSize: 20 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                          "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                          "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        },
                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                        "& .MuiInputBase-input": { color: "white" },
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12}}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Email sx={{ color: "rgba(255, 255, 255, 0.5)", mr: 1, fontSize: 20 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                          "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                          "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        },
                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                        "& .MuiInputBase-input": { color: "white" },
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  mt: 3,
                  background: "linear-gradient(145deg, #252a4b, #1a1f36)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: "bold" }}>
                  Storage Usage
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      1.2 GB of 10 GB used
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#00c6ff" }}>
                      12%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: "12%",
                        height: "100%",
                        background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<CloudUpload />}
                  sx={{
                    background: "linear-gradient(135deg, #7209b7, #d400ff)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #d400ff, #7209b7)",
                    },
                  }}
                >
                  Upgrade Storage
                </Button>
              </Paper>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  mt: 3,
                  background: "linear-gradient(145deg, #252a4b, #1a1f36)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: "bold" }}>
                  Recent Activity
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      Uploaded 5 photos to "Vacation 2023"
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                      2 hours ago
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      Created new album "Family Gathering"
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                      Yesterday
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      Shared "Birthday Party" album with 3 people
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                      3 days ago
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="text"
                  sx={{
                    color: "#00c6ff",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  View All Activity
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Change Password Dialog */}
      <Dialog
        open={changePassword}
        onClose={() => setChangePassword(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #1a1f36, #252a4b)",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Lock sx={{ mr: 1.5, color: "#00c6ff" }} />
          Change Password
        </DialogTitle>

        <DialogContent sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", pt: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, backgroundColor: "rgba(244, 67, 54, 0.1)", color: "#f44336" }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            margin="dense"
            label="Current Password"
            name="currentPassword"
            type={showPassword ? "text" : "password"}
            value={formData.currentPassword}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Lock sx={{ color: "rgba(255, 255, 255, 0.5)", mr: 1, fontSize: 20 }} />,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />

          <TextField
            fullWidth
            margin="dense"
            label="New Password"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            value={formData.newPassword}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Lock sx={{ color: "rgba(255, 255, 255, 0.5)", mr: 1, fontSize: 20 }} />,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Confirm New Password"
            name="confirmPassword"
            type={showNewPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Lock sx={{ color: "rgba(255, 255, 255, 0.5)", mr: 1, fontSize: 20 }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", p: 2 }}>
          <Button
            onClick={() => setChangePassword(false)}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            disabled={loading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
            startIcon={loading ? <CircularProgress size={20} /> : <Save />}
            sx={{
              background: "linear-gradient(135deg, #00c6ff, #0072ff)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #0072ff, #00c6ff)",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            {loading ? "Saving..." : "Change Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

export default Profile
