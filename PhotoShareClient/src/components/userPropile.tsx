import type React from "react"
import { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import { Edit, Save, Close } from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import { updateUser } from "../slices/userSlice"
import type { AppDispatch } from "../store/store"
import type { User } from "../types/user"

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: { user: { user: User } }) => state.user)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    const token = sessionStorage.getItem("token")
    if (token && user) {
      dispatch(
        updateUser({
          token,
          user: {
            ...user,
            ...formData,
          },
        }),
      )
      handleClose()
    }
  }

  // Generate avatar text from user name
  const getAvatarText = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    }
    return user?.firstName?.charAt(0) || "U"
  }

  // Generate random gradient for avatar
  const getAvatarGradient = () => {
    const colors = ["#00c6ff", "#0072ff", "#7209b7", "#d400ff"]
    const start = colors[Math.floor(Math.random() * colors.length)]
    const end = colors[Math.floor(Math.random() * colors.length)]
    return `linear-gradient(135deg, ${start}, ${end})`
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          margin: "0 auto",
          background: "linear-gradient(90deg, #1a1f36, #252a4b)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: 100,
            background: "linear-gradient(90deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
            position: "relative",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            mt: -5,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: 36,
              fontWeight: "bold",
              background: getAvatarGradient(),
              border: "4px solid #252a4b",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            {getAvatarText()}
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, color: "white", fontWeight: "bold" }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body1" sx={{ color: "#d1e0ff" }}>
            {user?.email}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={handleOpen}
            sx={{
              mt: 3,
              background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
              },
            }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", color: "white" }}>
          Edit Profile
          <IconButton onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8, color: "white" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", pt: 3 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
              },
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
              },
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
              },
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", p: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "#00c6ff",
                backgroundColor: "rgba(0, 198, 255, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<Save />}
            sx={{
              background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserProfile

