import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Stack,
  IconButton,
  Tooltip,
  Paper,
  LinearProgress,
} from "@mui/material"
import { styled, keyframes, alpha } from "@mui/material"
import { Download, AutoAwesome, PhotoCamera, Send, Refresh, Palette, Close } from "@mui/icons-material"
import { AppDispatch, RootState } from "../../store/store"
import { clearError, clearGeneratedImage, generateImage } from "../../slices/aiImageSlice"

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`

// Professional styled components (keeping all your existing styles)
const ModernBackground = styled(Box)({
  height: "100vh", // קבוע גובה למסך מלא
  overflow: "hidden", // מונע גלילה
  background: `
    linear-gradient(135deg, 
      ${alpha("#ea66cb", 0.03)} 0%, 
      ${alpha("#bd84f6", 0.05)} 25%, 
      ${alpha("#f093fb", 0.03)} 50%, 
      ${alpha("#00d4ff", 0.04)} 75%, 
      transparent 100%
    ),
    radial-gradient(circle at 20% 80%, ${alpha("#ea66cb", 0.08)} 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, ${alpha("#00d4ff", 0.06)} 0%, transparent 50%),
    #ffffff
  `,
  display: "flex",
  alignItems: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 30%, ${alpha("#bd84f6", 0.1)} 0%, transparent 30%),
      radial-gradient(circle at 70% 70%, ${alpha("#f093fb", 0.08)} 0%, transparent 30%)
    `,
    pointerEvents: "none",
  },
})

const GlassMorphCard = styled(Card)({
  borderRadius: "20px",
  background: `
    linear-gradient(135deg, 
      ${alpha("#ffffff", 0.9)} 0%, 
      ${alpha("#ffffff", 0.8)} 100%
    )
  `,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha("#ffffff", 0.3)}`,
  boxShadow: `
    0 8px 32px ${alpha("#000000", 0.08)},
    0 2px 8px ${alpha("#000000", 0.04)},
    inset 0 1px 0 ${alpha("#ffffff", 0.6)}
  `,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `
      0 12px 40px ${alpha("#000000", 0.12)},
      0 4px 12px ${alpha("#000000", 0.06)},
      inset 0 1px 0 ${alpha("#ffffff", 0.7)}
    `,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, #ea66cb, #bd84f6, #f093fb, #00d4ff)",
  },
})

const ProfessionalTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: `linear-gradient(135deg, 
      ${alpha("#ffffff", 0.7)} 0%, 
      ${alpha("#ffffff", 0.5)} 100%
    )`,
    backdropFilter: "blur(10px)",
    border: `1px solid ${alpha("#bd84f6", 0.2)}`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      background: `linear-gradient(135deg, 
        ${alpha("#ffffff", 0.8)} 0%, 
        ${alpha("#ffffff", 0.6)} 100%
      )`,
      border: `1px solid ${alpha("#bd84f6", 0.3)}`,
      transform: "translateY(-1px)",
    },
    "&.Mui-focused": {
      background: `linear-gradient(135deg, 
        ${alpha("#ffffff", 0.9)} 0%, 
        ${alpha("#ffffff", 0.7)} 100%
      )`,
      border: `1px solid #bd84f6`,
      boxShadow: `0 0 0 3px ${alpha("#bd84f6", 0.1)}`,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#bd84f6",
  },
})

const GradientButton = styled(Button)({
  background: "linear-gradient(135deg, #ea66cb 0%, #bd84f6 50%, #f093fb 100%)",
  color: "white",
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: 600,
  padding: "12px 32px",
  fontSize: "1rem",
  boxShadow: `
    0 4px 15px ${alpha("#bd84f6", 0.4)},
    0 2px 8px ${alpha("#bd84f6", 0.2)}
  `,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "left 0.5s",
  },
  "&:hover": {
    background: "linear-gradient(135deg, #d65bb6 0%, #a96edb 50%, #e87de6 100%)",
    transform: "translateY(-2px)",
    boxShadow: `
      0 8px 25px ${alpha("#bd84f6", 0.5)},
      0 4px 12px ${alpha("#bd84f6", 0.3)}
    `,
    "&::before": {
      left: "100%",
    },
  },
  "&:disabled": {
    background: `linear-gradient(135deg, ${alpha("#e0e0e0", 0.8)}, ${alpha("#bdbdbd", 0.8)})`,
    color: alpha("#ffffff", 0.7),
    boxShadow: "none",
  },
})

const SecondaryButton = styled(Button)({
  background: "linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)",
  color: "white",
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: 600,
  padding: "8px 20px",
  boxShadow: `0 4px 12px ${alpha("#00d4ff", 0.3)}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "linear-gradient(135deg, #00bce2 0%, #0284c7 100%)",
    transform: "translateY(-1px)",
    boxShadow: `0 6px 16px ${alpha("#00d4ff", 0.4)}`,
  },
})

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 10,
  background: `linear-gradient(135deg, 
    ${alpha("#ffffff", 0.9)} 0%, 
    ${alpha("#ffffff", 0.7)} 100%
  )`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha("#e0e0e0", 0.5)}`,
  color: "#666",
  width: 40,
  height: 40,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: `linear-gradient(135deg, 
      ${alpha("#f44336", 0.1)} 0%, 
      ${alpha("#f44336", 0.05)} 100%
    )`,
    border: `1px solid ${alpha("#f44336", 0.3)}`,
    color: "#f44336",
    transform: "translateY(-1px) scale(1.05)",
  },
})

const FloatingIcon = styled(Box)({
  position: "absolute",
  animation: `${float} 6s ease-in-out infinite`,
  opacity: 0.1,
  pointerEvents: "none",
})

interface ImageGeneratorProps {
  onClose?: () => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onClose }) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>()
  const { isGenerating, generatedImageUrl, error } = useSelector((state: RootState) => state.aiImage)

  // Local state for UI
  const [prompt, setPrompt] = useState<string>("")
  const [currentPlaceholder, setCurrentPlaceholder] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

  const placeholderTexts = [
    "תמונה של כלב חמוד משחק בגינה...",
    "ילדה מחייכת עם פרחים בשיער...",
    "נוף הרים מדהים בשקיעה...",
    "חתול ישן על ספר פתוח...",
    "פרפר צבעוני על פרח אדום...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholderTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isGenerating) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(timer)
    } else {
      setProgress(0)
    }
  }, [isGenerating])

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      return
    }

    setProgress(0)
    dispatch(clearError())
    dispatch(generateImage(prompt))
  }

  const handleDownloadImage = async () => {
    if (!generatedImageUrl) return

    try {
      // Try direct download first
      const link = document.createElement("a")
      link.href = generatedImageUrl
      link.download = `ai-generated-${Date.now()}.png`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("שגיאה בהורדה ישירה, מנסה עם fetch:", error)
      
      // If direct download fails, try with fetch
      try {
        const response = await fetch(generatedImageUrl, {
          mode: 'cors',
          headers: {
            'Accept': 'image/*'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const blob = await response.blob()
        const blobUrl = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = blobUrl
        link.download = `ai-generated-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
      } catch (fetchError) {
        console.error("שגיאה בהורדת התמונה:", fetchError)
        alert("שגיאה בהורדת התמונה. נסה להקליק על התמונה ולשמור אותה ידנית.")
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleGenerateImage()
    }
  }

  const handleClearAll = () => {
    setPrompt("")
    dispatch(clearError())
    dispatch(clearGeneratedImage())
  }

  return (
    <ModernBackground>
      {/* כפתור סגירה */}
      {onClose && (
        <CloseButton onClick={onClose}>
          <Close fontSize="small" />
        </CloseButton>
      )}

      {/* Floating decorative elements */}
      <FloatingIcon sx={{ top: "15%", left: "10%", animationDelay: "0s" }}>
        <Palette sx={{ fontSize: 60, color: "#ea66cb" }} />
      </FloatingIcon>
      <FloatingIcon sx={{ top: "60%", right: "15%", animationDelay: "2s" }}>
        <AutoAwesome sx={{ fontSize: 40, color: "#00d4ff" }} />
      </FloatingIcon>
      <FloatingIcon sx={{ bottom: "20%", left: "20%", animationDelay: "4s" }}>
        <AutoAwesome sx={{ fontSize: 50, color: "#bd84f6" }} />
      </FloatingIcon>

      <Container maxWidth="lg" sx={{ py: 2, position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Professional Header */}
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #ea66cb, #bd84f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 6px 16px ${alpha("#bd84f6", 0.3)}`,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "2px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                },
              }}
            >
              <AutoAwesome sx={{ color: "white", fontSize: 24, position: "relative", zIndex: 1 }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #333, #666)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 0.5,
                }}
              >
                AI Image Studio
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                מחולל תמונות מתקדם עם בינה מלאכותית
              </Typography>
            </Box>
          </Stack>
          <Chip
            label="בחינם • ללא הגבלה"
            sx={{
              background: `linear-gradient(135deg, 
                ${alpha("#4ade80", 0.1)} 0%, 
                ${alpha("#10b981", 0.1)} 100%
              )`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha("#4ade80", 0.3)}`,
              color: "#059669",
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          />
        </Box>

        <Grid container spacing={3} sx={{ flex: 1, minHeight: 0 }}>
          {/* Left Panel - Input */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
            <GlassMorphCard sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: "#333",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "1.1rem",
                  }}
                >
                  <PhotoCamera sx={{ color: "#bd84f6" }} />
                  תאר את התמונה שאתה רוצה ליצור
                </Typography>

                <ProfessionalTextField
                  fullWidth
                  multiline
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={placeholderTexts[currentPlaceholder]}
                  InputProps={{
                    style: { direction: "rtl", textAlign: "right", fontSize: "1rem", color: "#1a1a1a" },
                  }}
                  sx={{ mb: 2, flex: 1 }}
                />

                {isGenerating && (
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        background: alpha("#bd84f6", 0.1),
                        "& .MuiLinearProgress-bar": {
                          background: "linear-gradient(90deg, #ea66cb, #bd84f6)",
                          borderRadius: 3,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "#666", mt: 0.5, display: "block" }}>
                      {Math.round(progress)}% הושלם
                    </Typography>
                  </Box>
                )}

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 2,
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, 
                        ${alpha("#f44336", 0.1)} 0%, 
                        ${alpha("#f44336", 0.05)} 100%
                      )`,
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${alpha("#f44336", 0.2)}`,
                    }}
                    onClose={() => dispatch(clearError())}
                  >
                    {error}
                  </Alert>
                )}

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: "auto" }}>
                  <GradientButton
                    fullWidth
                    onClick={handleGenerateImage}
                    disabled={isGenerating || !prompt.trim()}
                    startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <Send />}
                  >
                    {isGenerating ? "יוצר..." : "צור תמונה"}
                  </GradientButton>
                  <Tooltip title="נקה הכל">
                    <IconButton
                      onClick={handleClearAll}
                      sx={{
                        background: `linear-gradient(135deg, 
                          ${alpha("#ffffff", 0.8)} 0%, 
                          ${alpha("#ffffff", 0.6)} 100%
                        )`,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${alpha("#e0e0e0", 0.5)}`,
                        color: "#666",
                        "&:hover": {
                          background: `linear-gradient(135deg, 
                            ${alpha("#ffffff", 0.9)} 0%, 
                            ${alpha("#ffffff", 0.7)} 100%
                          )`,
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                </Stack>

                <Typography
                  variant="caption"
                  sx={{
                    color: alpha("#666", 0.8),
                    mt: 1,
                    textAlign: "center",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  💡 Ctrl + Enter לייצור מהיר
                </Typography>
              </CardContent>
            </GlassMorphCard>
          </Grid>

          {/* Right Panel - Result */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
            <GlassMorphCard sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#333",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: "1.1rem",
                    }}
                  >
                    <AutoAwesome sx={{ color: "#00d4ff" }} />
                    התוצאה
                  </Typography>
                  {generatedImageUrl && (
                    <SecondaryButton startIcon={<Download />} onClick={handleDownloadImage} size="small">
                      הורד תמונה
                    </SecondaryButton>
                  )}
                </Stack>

                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    background: `
                      linear-gradient(135deg, 
                        ${alpha("#f8fafc", 0.8)} 0%, 
                        ${alpha("#f1f5f9", 0.6)} 100%
                      )
                    `,
                    backdropFilter: "blur(10px)",
                    border: `2px dashed ${alpha("#bd84f6", 0.2)}`,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    minHeight: 200,
                    "&:hover": {
                      border: `2px dashed ${alpha("#bd84f6", 0.4)}`,
                    },
                  }}
                >
                  {isGenerating ? (
                    <Stack alignItems="center" spacing={2}>
                      <Box sx={{ position: "relative" }}>
                        <CircularProgress
                          size={50}
                          thickness={4}
                          sx={{
                            color: "#bd84f6",
                            animation: `${pulse} 2s ease-in-out infinite`,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <AutoAwesome sx={{ color: "#bd84f6", fontSize: 20 }} />
                        </Box>
                      </Box>
                      <Typography sx={{ color: "#666", fontWeight: 600, textAlign: "center", fontSize: "0.9rem" }}>
                        יוצר תמונה מדהימה...
                        <br />
                        <Typography component="span" variant="caption" sx={{ color: "#999" }}>
                          זה יכול לקחת כמה שניות
                        </Typography>
                      </Typography>
                    </Stack>
                  ) : generatedImageUrl ? (
                    <CardMedia
                      component="img"
                      image={generatedImageUrl}
                      alt="תמונה שנוצרה"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "12px",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    />
                  ) : (
                    <Stack alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "16px",
                          background: `linear-gradient(135deg, 
                            ${alpha("#bd84f6", 0.1)} 0%, 
                            ${alpha("#00d4ff", 0.1)} 100%
                          )`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PhotoCamera sx={{ fontSize: 30, color: alpha("#bd84f6", 0.6) }} />
                      </Box>
                      <Typography sx={{ color: "#666", textAlign: "center", fontWeight: 500, fontSize: "0.9rem" }}>
                        התמונה שלך תופיע כאן
                        <br />
                        <Typography component="span" variant="caption" sx={{ color: "#999" }}>
                          הכנס תיאור ולחץ על "צור תמונה"
                        </Typography>
                      </Typography>
                    </Stack>
                  )}
                </Paper>
              </CardContent>
            </GlassMorphCard>
          </Grid>
        </Grid>

        {/* Professional Footer */}
        <Box sx={{ mt: 2, textAlign: "center", flexShrink: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: alpha("#666", 0.8),
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              fontSize: "0.8rem",
            }}
          >
            <AutoAwesome sx={{ fontSize: 14, color: "#bd84f6" }} />
            מופעל על ידי בינה מלאכותית מתקדמת • יצירה מהירה ואיכותית
            <AutoAwesome sx={{ fontSize: 14, color: "#00d4ff" }} />
          </Typography>
        </Box>
      </Container>
    </ModernBackground>
  )
}

export default ImageGenerator