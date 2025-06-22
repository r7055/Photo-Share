import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { createAlbum } from "../../slices/albumSlice"
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
} from "@mui/material"
import { useParams } from "react-router-dom"
import { Close, CreateNewFolder, Description } from "@mui/icons-material"
import { useTheme } from "../themeProvider"

interface AddAlbumProps {
  open: boolean
  onClose: () => void
}

const AddAlbum: React.FC<AddAlbumProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { theme } = useTheme()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { albumId } = useParams<{ albumId: string }>()
  const [loading, setLoading] = useState(false)

  const handleAddAlbum = async () => {
    if (!title.trim()) return

    setLoading(true)
    const token = sessionStorage.getItem("token")
    if (token) {
      const newAlbum: Album = {
        title,
        description,
        parentId: Number(albumId),
        photoCount: 0,
      }

      await dispatch(createAlbum({ token, album: newAlbum }))
      setTitle("")
      setDescription("")
      setLoading(false)
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: theme === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
          background:
            theme === "dark"
              ? "linear-gradient(145deg, #1e293b, #334155)"
              : "linear-gradient(145deg, #f8fafc, #e2e8f0)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background:
            theme === "dark" ? "linear-gradient(90deg, #1a1f36, #252a4b)" : "linear-gradient(90deg, #e2e8f0, #cbd5e1)",
          color: theme === "dark" ? "white" : "#1e293b",
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CreateNewFolder sx={{ mr: 1.5, color: theme === "dark" ? "#00c6ff" : "#3b82f6" }} />
          <Typography variant="h6">Add New Album</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: theme === "dark" ? "white" : "#1e293b" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          background:
            theme === "dark" ? "linear-gradient(90deg, #1a1f36, #252a4b)" : "linear-gradient(90deg, #f8fafc, #e2e8f0)",
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
                <CreateNewFolder
                  sx={{ color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)" }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
              },
              "&:hover fieldset": {
                borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme === "dark" ? "#00c6ff" : "#3b82f6",
              },
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
            },
            "& .MuiInputLabel-root": {
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: theme === "dark" ? "white" : "#1e293b",
            },
            "& .MuiInputAdornment-root": {
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)",
            },
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
                <Description sx={{ color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
              },
              "&:hover fieldset": {
                borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme === "dark" ? "#00c6ff" : "#3b82f6",
              },
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
            },
            "& .MuiInputLabel-root": {
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: theme === "dark" ? "white" : "#1e293b",
            },
            "& .MuiInputAdornment-root": {
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(30, 41, 59, 0.7)",
              alignSelf: "flex-start",
              mt: 2,
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          background:
            theme === "dark" ? "linear-gradient(90deg, #1a1f36, #252a4b)" : "linear-gradient(90deg, #f8fafc, #e2e8f0)",
          p: 3,
          pt: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: theme === "dark" ? "white" : "#1e293b",
            border: `2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
            "&:hover": {
              border: `2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"}`,
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddAlbum}
          variant="contained"
          disabled={!title.trim() || loading}
          sx={{
            ml: 2,
            background:
              theme === "dark"
                ? "linear-gradient(135deg, #00c6ff, #0072ff)"
                : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            color: "white",
            boxShadow: theme === "dark" ? "0 4px 15px rgba(0, 198, 255, 0.3)" : "0 4px 15px rgba(59, 130, 246, 0.3)",
            "&:hover": {
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, #0072ff, #00c6ff)"
                  : "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              transform: "translateY(-1px)",
              boxShadow: theme === "dark" ? "0 6px 20px rgba(0, 198, 255, 0.4)" : "0 6px 20px rgba(59, 130, 246, 0.4)",
            },
            "&.Mui-disabled": {
              background: theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
              color: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(30, 41, 59, 0.3)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          {loading ? "Creating..." : "Create Album"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddAlbum

