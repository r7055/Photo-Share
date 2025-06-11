import type React from "react"
import { useState } from "react"
import { IconButton, Tooltip, Snackbar, Alert, CircularProgress } from "@mui/material"
import { useDispatch } from "react-redux"
import { getDownloadUrl } from "../../slices/photoSlice"
import type { AppDispatch } from "../../store/store"
import { Download as DownloadIcon } from "@mui/icons-material"

interface DownloadPhotoProps {
  photo: { name: string; url: string }
}

const DownloadPhoto: React.FC<DownloadPhotoProps> = ({ photo }) => {
  const dispatch = useDispatch<AppDispatch>()
  const token = sessionStorage.getItem("token")
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (token) {
      setLoading(true)
      try {
        const downloadUrl = await dispatch(getDownloadUrl({ token, fileName: photo.name })).unwrap()
        const response = await fetch(downloadUrl)
        const blob = await response.blob()
        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(blob)
        link.download = photo.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link.href)

        setSnackbar({
          open: true,
          message: "Photo downloaded successfully",
          severity: "success",
        })
      } catch (error) {
        console.error("Error downloading file:", error)
        setSnackbar({
          open: true,
          message: "Failed to download photo",
          severity: "error",
        })
      } finally {
        setLoading(false)
      }
    } else {
      console.error("Token is not available")
      setSnackbar({
        open: true,
        message: "Please log in to download photos",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <>
      <Tooltip title="Download Photo">
        <IconButton size="small" onClick={handleDownload} disabled={loading} sx={{ color: "#3f51b5" }}>
          {loading ? <CircularProgress size={18} color="inherit" /> : <DownloadIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default DownloadPhoto
