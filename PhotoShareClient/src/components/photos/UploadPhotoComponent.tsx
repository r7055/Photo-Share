
import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uploadPhoto, getDownloadUrl, addPhoto, deletePhoto } from "../../slices/photoSlice"
import { createTag, getUserTags } from "../../slices/tagSlice"
import type { AppDispatch } from "../../store/store"
import { useNavigate, useParams } from "react-router-dom"
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Grid,
  Divider,
  InputAdornment,
  Fade,
  Zoom,
  Snackbar,
  Alert,
} from "@mui/material"
import { CloudUpload, Close, AddCircle, Label, Check, PhotoLibrary } from "@mui/icons-material"
import type { Tag } from "../../types/tag"
import type { Photo } from "../../types/photo"
import AlbumSuggestion from "../albums/AlbumSuggestion"

interface UploadPhotoComponentProps {
  open: boolean
  onClose: () => void
}

const UploadPhotoComponent: React.FC<UploadPhotoComponentProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [showAlbumSuggestion, setShowAlbumSuggestion] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

  const token = sessionStorage.getItem("token")
  const dispatch = useDispatch<AppDispatch>()
  const tags = useSelector((state: { tags: { tags: Tag[] } }) => state.tags.tags)
  const navigate = useNavigate()
  const { albumId } = useParams<{ albumId: string }>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (token) {
      dispatch(getUserTags(token))
    } else {
      navigate("/auth")
    }
  }, [dispatch, token, navigate])

  useEffect(() => {
    // Clean up preview URL when component unmounts or when file changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setFile(null)
      setImageUrl(null)
      setPreviewUrl(null)
      setSelectedTags([])
      setNewTag("")
      setUploadProgress(0)
    }
  }, [open])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      setPreviewUrl(URL.createObjectURL(droppedFile))
    }
  }

  const handleTagChange = (_: any, value: string[]) => {
    setSelectedTags(value)
  }

  const handleAddTag = async () => {
    if (newTag && !tags.some((tag) => tag.name === newTag)) {
      try {
        await dispatch(createTag({ token: token!, tagPostModel: { name: newTag } }))
        setSelectedTags([...selectedTags, newTag])
        setNewTag("")
        setSnackbar({
          open: true,
          message: "Tag added successfully",
          severity: "success",
        })
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to add tag",
          severity: "error",
        })
      }
    } else if (tags.some((tag) => tag.name === newTag)) {
      if (!selectedTags.includes(newTag)) {
        setSelectedTags([...selectedTags, newTag])
      }
      setNewTag("")
    }
  }

  const simulateProgress = () => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    setUploadProgress(0);
    const fileName = file.name;
    const fileType = file.type; // קבלת סוג הקובץ
    const cleanupProgress = simulateProgress();

    try {
        if (!token) {
            throw new Error("Token is required for uploading photos.");
        }
        const uploadResponse = await dispatch(uploadPhoto({ token, fileName, file, fileType })); // העברת fileType

      if (uploadResponse.meta.requestStatus === "fulfilled") {
        setUploadProgress(100)
        const downloadResponse = await dispatch(getDownloadUrl({ token, fileName }))

        if (downloadResponse.meta.requestStatus === "fulfilled") {
          const downloadUrl = downloadResponse.payload as string
          const photoTags = selectedTags
            .map((tagName) => {
              const foundTag = tags.find((tag: Tag) => tag.name === tagName)
              return foundTag ? { name: foundTag.name, id: foundTag.id } : null
            })
            .filter((tag) => tag !== null)

          const photoData = {
            url: downloadUrl,
            size: file.size,
            albumId: Number(albumId) || 0,
            name: fileName,
            tags: photoTags,
            userId: useSelector((state: {user: { id: number } }) => state.user.id), 
            countViews: 0,
          }

          await dispatch(addPhoto({ token, photo: photoData }))
          setImageUrl(downloadUrl)
          setShowAlbumSuggestion(true)

          setSnackbar({
            open: true,
            message: "Photo uploaded successfully",
            severity: "success",
          })
        } else {
          const uploadPayload = uploadResponse.payload as { Photo: Photo }
          await dispatch(deletePhoto({ token, id: uploadPayload.Photo.id ?? 0, albumId: Number(albumId) || 0 }))

          setSnackbar({
            open: true,
            message: "Failed to process uploaded photo",
            severity: "error",
          })
        }
      } else {
        setSnackbar({
          open: true,
          message: "Failed to upload photo",
          severity: "error",
        })
      }
    } catch (error) {
        console.error("Upload process failed:", error);
        setSnackbar({
            open: true,
            message: "Upload process failed",
            severity: "error",
        });
    } finally {
        cleanupProgress();
        setLoading(false);
    }
};

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
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
            <CloudUpload sx={{ mr: 1.5, color: "#00c6ff" }} />
            <Typography variant="h6">Upload Photo</Typography>
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
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <Grid container spacing={3}>
              <Grid size={{ xs:12, md:6}}>
                <Box
                  sx={{
                    height: 300,
                    border: "2px dashed",
                    borderColor: dragActive ? "#00c6ff" : "rgba(255, 255, 255, 0.3)",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    backgroundColor: dragActive ? "rgba(0, 198, 255, 0.05)" : "rgba(255, 255, 255, 0.05)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    id="file-upload"
                  />

                  {previewUrl ? (
                    <Zoom in={!!previewUrl} timeout={300}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            fontSize: "0.8rem",
                            textAlign: "center",
                            borderBottomLeftRadius: "8px",
                            borderBottomRightRadius: "8px",
                          }}
                        >
                          {file?.name} ({file?.size ? (file.size / 1024 / 1024).toFixed(2) : 0} MB)
                        </Box>
                      </Box>
                    </Zoom>
                  ) : (
                    <Box sx={{ textAlign: "center" }}>
                      <PhotoLibrary sx={{ fontSize: 60, color: "rgba(255, 255, 255, 0.5)", mb: 2 }} />
                      <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                        Drag & Drop Photo
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 2 }}>
                        or click to browse
                      </Typography>
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUpload />}
                        sx={{
                          color: "#00c6ff",
                          borderColor: "#00c6ff",
                          "&:hover": {
                            borderColor: "#00c6ff",
                            backgroundColor: "rgba(0, 198, 255, 0.1)",
                          },
                        }}
                      >
                        Select File
                      </Button>
                    </Box>
                  )}
                </Box>

                {loading && (
                  <Box sx={{ mt: 2, width: "100%" }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 8,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 4,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${uploadProgress}%`,
                          background: "linear-gradient(90deg, #00c6ff, #0072ff, #7209b7)",
                          borderRadius: 4,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: "white", mt: 1, textAlign: "center" }}>
                      {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : "Processing..."}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid  size={{ xs:12, md:6}}>
                <Typography variant="subtitle1" sx={{ color: "white", mb: 2, display: "flex", alignItems: "center" }}>
                  <Label sx={{ mr: 1, color: "#00c6ff" }} />
                  Add Tags
                </Typography>

                <Autocomplete
                  multiple
                  options={tags.map((tag) => tag.name)}
                  value={selectedTags}
                  onChange={handleTagChange}
                  renderTags={(value: string[], getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                      variant="filled"
                      label={option}
                      {...getTagProps({ index })}
                      sx={{
                          margin: "2px",
                          backgroundColor: "rgba(0, 198, 255, 0.2)",
                          color: "white",
                          "& .MuiChip-deleteIcon": {
                              color: "rgba(255, 255, 255, 0.7)",
                              "&:hover": {
                                  color: "white",
                                },
                            },
                        }}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select tags"
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                          "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                          "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        },
                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiChip-root": { color: "white" },
                      }}
                    />
                  )}
                />

                <Box sx={{ display: "flex", mb: 3 }}>
                  <TextField
                    variant="outlined"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Create new tag"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Label sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
                      "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                    variant="contained"
                    sx={{
                      ml: 1,
                      minWidth: "40px",
                      background: "linear-gradient(100deg, #00c6ff, #0072ff)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(100deg, #0072ff, #00c6ff)",
                      },
                      "&.Mui-disabled": {
                        background: "rgba(255, 255, 255, 0.12)",
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    <AddCircle />
                  </Button>
                </Box>

                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 2 }}>
                  Popular Tags:
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                  {tags.slice(0, 8).map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      onClick={() => {
                        if (!selectedTags.includes(tag.name)) {
                          setSelectedTags([...selectedTags, tag.name])
                        }
                      }}
                      sx={{
                        backgroundColor: selectedTags.includes(tag.name)
                          ? "rgba(0, 198, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: selectedTags.includes(tag.name)
                            ? "rgba(0, 198, 255, 0.3)"
                            : "rgba(255, 255, 255, 0.2)",
                        },
                      }}
                    />
                  ))}
                </Box>

                <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Album: {albumId === "0" ? "Root" : `Album #${albumId}`}
                  </Typography>

                  <Button
                    type="submit"
                    disabled={!file || loading}
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <CloudUpload />}
                    sx={{
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
                    {loading ? "Uploading..." : "Upload Photo"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>

          {imageUrl && !loading && (
            <Fade in={!!imageUrl && !loading} timeout={500}>
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: "rgba(0, 198, 255, 0.1)",
                    border: "1px solid rgba(0, 198, 255, 0.3)",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Check sx={{ mr: 1, color: "#4caf50" }} />
                    Photo uploaded successfully!
                  </Typography>
                </Paper>
              </Box>
            </Fade>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            background: "linear-gradient(90deg, #1a1f36, #252a4b)",
            p: 3,
            pt: 0,
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
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {imageUrl && (
        <AlbumSuggestion open={showAlbumSuggestion} onClose={() => setShowAlbumSuggestion(false)} imageUrl={imageUrl} />
      )}

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

export default UploadPhotoComponent

