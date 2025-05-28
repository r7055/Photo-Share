import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { TextField, Button, Typography, Paper, Box, InputAdornment, IconButton, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../slices/userSlice"
import type { RootState, AppDispatch } from "../../store/store"
import type { UserLogin } from "../../types/user"
import { motion } from "framer-motion"
import { Email, Lock, Visibility, VisibilityOff, Login } from "@mui/icons-material"

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const msg = useSelector((state: RootState) => state.user.msg)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: UserLogin) => {
    setLoading(true)
    try {
      const resultAction = await dispatch(loginUser(data))
      if (loginUser.fulfilled.match(resultAction)) {
        navigate(`/albums/0`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Sign In
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 4,
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
                )}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                startIcon={<Login />}
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              {msg && (
                <Alert severity="error" sx={{ mt: 3, backgroundColor: "rgba(211, 47, 47, 0.1)", color: "#ff5252" }}>
                  {msg}
                </Alert>
              )}

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Don't have an account?{" "}
                  <Button
                    variant="text"
                    onClick={() => navigate("/auth/signup")}
                    sx={{
                      color: "#00c6ff",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </motion.div>
    </Box>
  )
}

export default SignIn