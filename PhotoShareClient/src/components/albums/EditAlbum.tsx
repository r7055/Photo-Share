import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { updateAlbum } from "../../slices/albumSlice"
import type { Album } from "../../types/album"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Close, Edit, Description, Save } from "@mui/icons-material"

interface EditAlbumProps {
  open: boolean
  onClose: () => void
  album: Album
}

const EditAlbum: React.FC<EditAlbumProps> = ({ open, onClose, album }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [title, setTitle] = useState(album ? album.title : "")
  const [description, setDescription] = useState(album ? album.description : "")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (album) {
      setTitle(album.title)
      setDescription(album.description || "")
    }
  }, [album])

  const handleUpdateAlbum = async () => {
    if (!title.trim()) return

    setLoading(true)
    const token = sessionStorage.getItem("token")
    if (token) {
      const updatedAlbum: Album = { ...album, title, description }
      await dispatch(updateAlbum({ token, album: updatedAlbum }))
      setLoading(false)
      onClose()
    } else {
      navigate("/auth")
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg, #1a1f36, #252a4b)",
          color: "white",
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Edit sx={{ mr: 1.5, color: "#00c6ff" }} />
          <Typography variant="h6">Edit Album</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          background: "linear-gradient(90deg, #1a1f36, #252a4b)",
          p: 3,
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          label="Album Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Edit sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
            "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />

        <TextField
          margin="dense"
          label="Album Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Description sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
              </InputAdornment>
            ),
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
            "& .MuiInputAdornment-root": {
              color: "rgba(255, 255, 255, 0.7)",
              alignSelf: "flex-start",
              mt: 2,
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          background: "linear-gradient(90deg, #1a1f36, #252a4b)",
          p: 3,
          pt: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.3)",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdateAlbum}
          variant="contained"
          disabled={!title.trim() || loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Save />}
          sx={{
            ml: 2,
            background: "linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(100deg, #0072ff, #7209b7, #d400ff)",
            },
            "&.Mui-disabled": {
              background: "rgba(255, 255, 255, 0.12)",
              color: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditAlbum
