"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material"
import {
  Notifications,
  Security,
  Language,
  Storage,
  Delete,
  Warning,
  Save,
  Palette,
  ViewModule,
  CloudDownload,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useTheme } from "./themeProvider"

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    shareNotifications: true,
    commentNotifications: false,
    language: "en",
    autoDownload: false,
    downloadQuality: 80,
    gridSize: "medium",
    twoFactorAuth: false,
    publicProfile: true,
    autoTagging: true,
  })
  const [success, setSuccess] = useState(false)
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string) => (_: any, newValue: number | number[]) => {
    setSettings((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSaveSettings = () => {
    // Here you would add the actual save logic
    // For example:
    // await dispatch(saveSettings({ settings }));

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") return

    setDeleteLoading(true)
    // Here you would add the actual delete account logic
    // For example:
    // await dispatch(deleteAccount());

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setDeleteLoading(false)
    setDeleteAccountOpen(false)
    // In a real app, you would redirect to logout or home page
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
            Settings
          </Typography>
        </motion.div>

        {success && (
          <motion.div variants={itemVariants}>
            <Alert severity="success" sx={{ mb: 4, backgroundColor: "rgba(76, 175, 80, 0.1)", color: "#4caf50" }}>
              Settings saved successfully!
            </Alert>
          </motion.div>
        )}

        <Grid container spacing={4}>
          {/* Notifications Settings */}
          <Grid size={{ xs:12, md:6}}>
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Notifications sx={{ color: "#00c6ff", mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                    Notifications
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                      name="emailNotifications"
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                  sx={{ mb: 2, color: "white", width: "100%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.shareNotifications}
                      onChange={handleChange}
                      name="shareNotifications"
                      color="primary"
                    />
                  }
                  label="Album Share Notifications"
                  sx={{ mb: 2, color: "white", width: "100%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.commentNotifications}
                      onChange={handleChange}
                      name="commentNotifications"
                      color="primary"
                    />
                  }
                  label="Comment Notifications"
                  sx={{ color: "white", width: "100%" }}
                />
              </Paper>
            </motion.div>
          </Grid>

          {/* Language Settings */}
          <Grid size={{ xs:12, md:6}}>
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Language sx={{ color: "#00c6ff", mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                    Language & Region
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="language-label" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Language
                  </InputLabel>
                  <Select
                    labelId="language-label"
                    id="language"
                    name="language"
                    value={settings.language}
                    label="Language"
                    onChange={handleSelectChange}
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00c6ff",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="de">Deutsch</MenuItem>
                    <MenuItem value="he">עברית</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Palette sx={{ color: "rgba(255, 255, 255, 0.7)", mr: 2 }} />
                  <Typography variant="body1" sx={{ color: "white" }}>
                    Theme
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant={theme === "light" ? "contained" : "outlined"}
                    onClick={() => setTheme("light")}
                    sx={{
                      flex: 1,
                      backgroundColor: theme === "light" ? "#00c6ff" : "transparent",
                      color: theme === "light" ? "white" : "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      "&:hover": {
                        backgroundColor: theme === "light" ? "#00c6ff" : "rgba(255, 255, 255, 0.1)",
                        borderColor: theme === "light" ? "#00c6ff" : "white",
                      },
                    }}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "contained" : "outlined"}
                    onClick={() => setTheme("dark")}
                    sx={{
                      flex: 1,
                      backgroundColor: theme === "dark" ? "#00c6ff" : "transparent",
                      color: theme === "dark" ? "white" : "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      "&:hover": {
                        backgroundColor: theme === "dark" ? "#00c6ff" : "rgba(255, 255, 255, 0.1)",
                        borderColor: theme === "dark" ? "#00c6ff" : "white",
                      },
                    }}
                  >
                    Dark
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Display Settings */}
          <Grid size={{ xs:12, md:6}}>
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <ViewModule sx={{ color: "#00c6ff", mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                    Display Settings
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ color: "white", mb: 1 }}>
                    Grid Size
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      id="grid-size"
                      name="gridSize"
                      value={settings.gridSize}
                      onChange={handleSelectChange}
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00c6ff",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                      }}
                    >
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="large">Large</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <FormControlLabel
                  control={
                    <Switch checked={settings.autoTagging} onChange={handleChange} name="autoTagging" color="primary" />
                  }
                  label="Enable AI Auto-Tagging"
                  sx={{ mb: 2, color: "white", width: "100%" }}
                />
              </Paper>
            </motion.div>
          </Grid>

          {/* Download Settings */}
          <Grid size={{ xs:12, md:6}}>
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <CloudDownload sx={{ color: "#00c6ff", mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                    Download Settings
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoDownload}
                      onChange={handleChange}
                      name="autoDownload"
                      color="primary"
                    />
                  }
                  label="Auto-Download Shared Albums"
                  sx={{ mb: 3, color: "white", width: "100%" }}
                />

                <Typography variant="body1" sx={{ color: "white", mb: 1 }}>
                  Download Quality: {settings.downloadQuality}%
                </Typography>
                <Slider
                  value={settings.downloadQuality}
                  onChange={handleSliderChange("downloadQuality")}
                  aria-labelledby="download-quality-slider"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={100}
                  sx={{
                    color: "#00c6ff",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#00c6ff",
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#00c6ff",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "& .MuiSlider-mark": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "& .MuiSlider-markActive": {
                      backgroundColor: "#00c6ff",
                    },
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>

          {/* Security Settings */}
          <Grid size={{ xs:12, md:6}}>
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Security sx={{ color: "#00c6ff", mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                    Security
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={handleChange}
                      name="twoFactorAuth"
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Two-Factor Authentication
                      <Chip
                        label="Recommended"
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: "rgba(76, 175, 80, 0.2)",
                          color: "#4caf50",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                  }
                  sx={{ mb: 2, color: "white", width: "100%" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.publicProfile}
                      onChange={handleChange}
                      name="publicProfile"
                      color="primary"
                    />
                  }
                  label="Public Profile"
                  sx={{ mb: 3, color: "white", width: "100%" }}
                />

                <Button
                  variant="outlined"
                  startIcon={<Delete sx={{ color: "#f44336" }} />}
                  onClick={() => setDeleteAccountOpen(true)}
                  sx={{
                    color: "#f44336",
                    borderColor: "#f44336",
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                      borderColor: "#f44336",
                    },
                  }}
                >
                  Delete Account
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Storage Settings */}
          <Grid size={{ xs:12, md:6}}>
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Storage sx={{ color: "#00c6ff", mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                    Storage
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body1" sx={{ color: "white" }}>
                      Storage Used
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#00c6ff" }}>
                      1.2 GB / 10 GB
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
                  sx={{
                    background: "linear-gradient(135deg, #7209b7, #d400ff)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #d400ff, #7209b7)",
                    },
                  }}
                >
                  Upgrade Storage Plan
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div variants={itemVariants}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveSettings}
              sx={{
                background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                color: "white",
                px: 4,
                py: 1.5,
                "&:hover": {
                  background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                },
              }}
            >
              Save Settings
            </Button>
          </Box>
        </motion.div>
      </Box>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteAccountOpen}
        onClose={() => setDeleteAccountOpen(false)}
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
          <Warning sx={{ mr: 1.5, color: "#f44336" }} />
          Delete Account
        </DialogTitle>

        <DialogContent sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", pt: 3 }}>
          <Alert severity="error" sx={{ mb: 3, backgroundColor: "rgba(244, 67, 54, 0.1)", color: "#f44336" }}>
            This action cannot be undone. All your data will be permanently deleted.
          </Alert>

          <Typography variant="body1" sx={{ color: "white", mb: 3 }}>
            Please type "DELETE" to confirm that you want to permanently delete your account and all associated data.
          </Typography>

          <TextField
            fullWidth
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#f44336" },
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", p: 2 }}>
          <Button
            onClick={() => setDeleteAccountOpen(false)}
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
            onClick={handleDeleteAccount}
            variant="contained"
            disabled={confirmText !== "DELETE" || deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={20} /> : <Delete />}
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(244, 67, 54, 0.5)",
              },
            }}
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

export default Settings
