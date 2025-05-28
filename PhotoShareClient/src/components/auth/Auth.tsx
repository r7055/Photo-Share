import { Typography, Grid, Button, Box, Paper, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setLanguage } from "../../slices/languageSlice"
import { motion } from "framer-motion"
import { Login, PersonAdd, Language } from "@mui/icons-material"

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const language = useSelector((state: { language: { language: string } }) => state.language.language)

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang))
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
    <Container maxWidth="md">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: "bold",
                mb: 2,
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {language === "en" ? "Welcome to PhotoShare" : "ברוכים הבאים ל-PhotoShare"}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{
                color: "#d1e0ff",
                mb: 6,
                textAlign: "center",
                maxWidth: "600px",
              }}
            >
              {language === "en"
                ? "Intelligent photo management with AI - organize, tag, share, and recognize faces"
                : "ניהול חכם של התמונות שלך בעזרת טכנולוגיית AI - ארגון, תיוג, שיתוף וזיהוי פנים"}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants} style={{ width: "100%", maxWidth: "500px" }}>
            <Paper
              elevation={24}
              sx={{
                p: 4,
                borderRadius: "20px",
                background: "linear-gradient(145deg, #252a4b, #1a1f36)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Grid container spacing={3} direction="column">
                <Grid>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<Login />}
                    onClick={() => navigate("/auth/signin")}
                    sx={{
                      background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                      color: "#fff",
                      p: 2,
                      fontSize: "1.1rem",
                      borderRadius: "12px",
                      boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
                        transform: "translateY(-2px)",
                        boxShadow: "0px 10px 25px rgba(0,0,0,0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {language === "en" ? "Sign In" : "התחבר"}
                  </Button>
                </Grid>

                <Grid >
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<PersonAdd />}
                    onClick={() => navigate("/auth/signup")}
                    sx={{
                      p: 2,
                      fontSize: "1.1rem",
                      borderRadius: "12px",
                      color: "white",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(200deg, #7209b7, #d400ff, #00c6ff, #0072ff)",
                        color: "white",
                        borderColor: "transparent",
                        transform: "translateY(-2px)",
                        boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {language === "en" ? "Sign Up" : "הרשמה"}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Language sx={{ color: "white", mr: 1 }} />
              <Button
                onClick={() => handleLanguageChange("en")}
                sx={{
                  color: language === "en" ? "#00c6ff" : "white",
                  fontWeight: language === "en" ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                English
              </Button>
              <Button
                onClick={() => handleLanguageChange("he")}
                sx={{
                  color: language === "he" ? "#00c6ff" : "white",
                  fontWeight: language === "he" ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                עברית
              </Button>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  )
}

export default Auth


