// // import { useForm, Controller } from "react-hook-form";
// // import { TextField, Button, Typography, Grid } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { loginUser } from '../../slices/userSlice';
// // import { RootState, AppDispatch } from '../../store/store';
// // import { UserLogin } from "../../types/user";

// // const SignIn = () => {
// //   const { control, handleSubmit, formState: { errors } } = useForm<UserLogin>();
// //   const dispatch = useDispatch<AppDispatch>();
// //   const navigate = useNavigate();
// //   const msg = useSelector((state: RootState) => state.user.msg);

// //   const onSubmit = async (data: UserLogin) => {
// //     const resultAction = await dispatch(loginUser(data));
// //     if (loginUser.fulfilled.match(resultAction)) {
// //       navigate(`/albums/0`);
// //     }
// //   };

// //   return (
// //     <div style={{ minHeight: '100vh', padding: '16px', background: 'linear-gradient(90deg, #1a1f36,#252a4b)', textAlign: 'center' }}>
// //       <Typography variant="h3" style={{ color: '#ffffff', fontWeight: 'bold', marginTop: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
// //         התחברות
// //       </Typography>
// //       <Grid container spacing={3} justifyContent="center" style={{ marginTop: '24px' }}>
// //         <Grid size={{ xs: 12, sm: 6 }}style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //           <form onSubmit={handleSubmit(onSubmit)} style={{ width: '70%' }}>
// //             <Controller
// //               name="email"
// //               control={control}
// //               defaultValue=""
// //               rules={{
// //                 required: "דוא״ל נדרש",
// //                 pattern: {
// //                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
// //                   message: "כתובת דוא״ל לא חוקית"
// //                 }
// //               }}
// //               render={({ field }) => (
// //                 <TextField
// //                 {...field}
// //                 label="email"
// //                 error={!!errors.email}
// //                 helperText={errors.email ? errors.email.message : ''}
// //                 required
// //                 fullWidth
// //                 sx={{
// //                     marginBottom: 2,
// //                     borderRadius: "8px",
// //                     background: '#1a1f36',
// //                     '& .MuiOutlinedInput-root': {
// //                         '& fieldset': {
// //                             borderColor: 'rgba(255, 255, 255, 0.5)',
// //                         },
// //                         '&:hover fieldset': {
// //                             borderColor: 'rgba(255, 255, 255, 0.7)',
// //                         },
// //                         '&.Mui-focused fieldset': {
// //                             borderColor: 'rgba(255, 255, 255, 1)',
// //                         },
// //                     },
// //                     '& .MuiOutlinedInput-input': {
// //                         color: 'white', 
// //                     },
// //                     '& .MuiInputLabel-root': {
// //                         color: 'rgba(255, 255, 255, 0.7)',
// //                     },
// //                     '& .MuiInputLabel-root.Mui-focused': {
// //                         color: 'white', 
// //                     },
// //                 }}
// //             />
            

// //               )}
// //             />
// //             <Controller
// //               name="password"
// //               control={control}
// //               defaultValue=""
// //               rules={{
// //                 required: "סיסמא נדרשת",
// //                 minLength: {
// //                   value: 6,
// //                   message: "הסיסמא חייבת להיות לפחות 6 תוים"
// //                 }
// //               }}
// //               render={({ field }) => (
// //                 <TextField
// //                 {...field}
// //                 label="password"
// //                 type="password"
// //                 error={!!errors.password}
// //                 helperText={errors.password ? errors.password.message : ''}
// //                 required
// //                 fullWidth
// //                 sx={{
// //                     marginBottom: 2,
// //                     borderRadius: "8px",
// //                     background: '#1a1f36',
// //                     '& .MuiOutlinedInput-root': {
// //                         '& fieldset': {
// //                             borderColor: 'rgba(255, 255, 255, 0.5)',
// //                         },
// //                         '&:hover fieldset': {
// //                             borderColor: 'rgba(255, 255, 255, 0.7)',
// //                         },
// //                         '&.Mui-focused fieldset': {
// //                             borderColor: 'rgba(255, 255, 255, 1)',
// //                         },
// //                     },
// //                     '& .MuiOutlinedInput-input': {
// //                         color: 'white', // צבע הפונט של הטקסט שהמשתמש מקליד
// //                     },
// //                     '& .MuiInputLabel-root': {
// //                         color: 'rgba(255, 255, 255, 0.7)', // צבע התווית
// //                     },
// //                     '& .MuiInputLabel-root.Mui-focused': {
// //                         color: 'white', // צבע התווית כאשר השדה ממוקד
// //                     },
// //                 }}
// //             />
            
// //               )}
// //             />
// //             <Button
// //               type="submit"
// //               variant="contained"
// //               size="large"
// //               sx={{
// //                 width: "100%",
// //                 padding: "12px 0",
// //                 borderRadius: "8px",
// //                 marginTop: 2,
// //                 fontWeight: 'bold',
// //                 background: 'linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
// //                 color: '#fff',
// //                 fontSize: '18px',
// //                 boxShadow: '0px 4px 10px rgba(0,0,0,0.3)'
// //               }}
// //             >
// //               התחבר
// //             </Button>
// //           </form>
// //           {msg && <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>{msg}</Typography>}
// //         </Grid>
// //       </Grid>
// //     </div>
// //   );
// // };

// // export default SignIn;
// "use client"
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


// import type React from "react"
// import { useState } from "react"
// import { useForm, Controller } from "react-hook-form"
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Paper,
//   Grid,
//   InputAdornment,
//   IconButton,
//   Alert,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material"
// import { Link, useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { loginUser } from "../../slices/userSlice"
// import type { AppDispatch } from "../../store/store"
// import { motion } from "framer-motion"
// import { Email, Lock, Visibility, VisibilityOff, Login } from "@mui/icons-material"

// interface SignInFormData {
//   email: string
//   password: string
//   rememberMe: boolean
// }

// const SignIn: React.FC = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInFormData>({ mode: "onChange" })
//   const [msg, setMsg] = useState<string>("")
//   const [loading, setLoading] = useState<boolean>(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch<AppDispatch>()

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const onSubmit = async (data: SignInFormData) => {
//     setLoading(true)
//     setMsg("")

//     try {
      
//       const res = await dispatch(loginUser({ email: data.email, password: data.password }))

//       if (res.payload && typeof res.payload === "string") {
//         sessionStorage.setItem("token", res.payload)
//         navigate("/albums/0")
//       } else {
//         setMsg("Invalid email or password. Please try again.")
//       }
//     } catch (error: any) {
//       if (error.response) {
//         setMsg(error.response.data.message || "Login failed. Please try again.")
//       } else {
//         setMsg("Server connection error. Please try again later.")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     },
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "80vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         py: 4,
//       }}
//     >
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         style={{ width: "100%", maxWidth: "500px" }}
//       >
//         <motion.div variants={itemVariants}>
//           <Typography
//             variant="h3"
//             sx={{
//               color: "white",
//               fontWeight: "bold",
//               mb: 3,
//               textAlign: "center",
//               textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
//             }}
//           >
//             Welcome Back
//           </Typography>
//         </motion.div>

//         <motion.div variants={itemVariants}>
//           <Paper
//             elevation={24}
//             sx={{
//               p: 4,
//               borderRadius: "20px",
//               background: "linear-gradient(145deg, #252a4b, #1a1f36)",
//               boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
//               border: "1px solid rgba(255, 255, 255, 0.1)",
//             }}
//           >
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Grid container spacing={3}>
//                 <Grid size={{ xs:12}}>
//                   <Controller
//                     name="email"
//                     control={control}
//                     defaultValue=""
//                     rules={{
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                         message: "Invalid email address",
//                       },
//                     }}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Email"
//                         error={!!errors.email}
//                         helperText={errors.email ? errors.email.message : ""}
//                         required
//                         fullWidth
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <Email sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//                             "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
//                             "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
//                             backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           },
//                           "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
//                           "& .MuiInputBase-input": { color: "white" },
//                           "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
//                         }}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid size={{ xs:12}}>
//                   <Controller
//                     name="password"
//                     control={control}
//                     defaultValue=""
//                     rules={{ required: "Password is required" }}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Password"
//                         type={showPassword ? "text" : "password"}
//                         error={!!errors.password}
//                         helperText={errors.password ? errors.password.message : ""}
//                         required
//                         fullWidth
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <Lock sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
//                             </InputAdornment>
//                           ),
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <IconButton
//                                 aria-label="toggle password visibility"
//                                 onClick={handleTogglePasswordVisibility}
//                                 edge="end"
//                                 sx={{ color: "rgba(255, 255, 255, 0.7)" }}
//                               >
//                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                               </IconButton>
//                             </InputAdornment>
//                           ),
//                         }}
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//                             "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
//                             "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
//                             backgroundColor: "rgba(255, 255, 255, 0.05)",
//                           },
//                           "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
//                           "& .MuiInputBase-input": { color: "white" },
//                           "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
//                         }}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid size={{ xs:12}}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Controller
//                       name="rememberMe"
//                       control={control}
//                       defaultValue={false}
//                       render={({ field }) => (
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               {...field}
//                               sx={{
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 "&.Mui-checked": {
//                                   color: "#00c6ff",
//                                 },
//                               }}
//                             />
//                           }
//                           label="Remember me"
//                           sx={{ color: "rgba(255, 255, 255, 0.7)" }}
//                         />
//                       )}
//                     />
//                     <Link to="/auth/forgot-password">
//                       <Button
//                         variant="text"
//                         sx={{
//                           color: "#00c6ff",
//                           textTransform: "none",
//                           "&:hover": {
//                             backgroundColor: "transparent",
//                             textDecoration: "underline",
//                           },
//                         }}
//                       >
//                         Forgot Password?
//                       </Button>
//                     </Link>
//                   </Box>
//                 </Grid>
//               </Grid>

//               {msg && (
//                 <Alert
//                   severity="error"
//                   sx={{
//                     mt: 3,
//                     backgroundColor: "rgba(211, 47, 47, 0.1)",
//                     color: "#ff5252",
//                   }}
//                 >
//                   {msg}
//                 </Alert>
//               )}

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 size="large"
//                 disabled={loading}
//                 startIcon={<Login />}
//                 sx={{
//                   mt: 4,
//                   mb: 2,
//                   background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//                   color: "#fff",
//                   p: 1.5,
//                   fontSize: "1.1rem",
//                   borderRadius: "12px",
//                   boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
//                   "&:hover": {
//                     background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
//                     transform: "translateY(-2px)",
//                     boxShadow: "0px 10px 25px rgba(0,0,0,0.4)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 {loading ? "Signing in..." : "Sign In"}
//               </Button>

//               <Box sx={{ textAlign: "center", mt: 2 }}>
//                 <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
//                   Don't have an account?{" "}
//                   <Button
//                     variant="text"
//                     onClick={() => navigate("/auth/signup")}
//                     sx={{
//                       color: "#00c6ff",
//                       textTransform: "none",
//                       "&:hover": {
//                         backgroundColor: "transparent",
//                         textDecoration: "underline",
//                       },
//                     }}
//                   >
//                     Sign Up
//                   </Button>
//                 </Typography>
//               </Box>
//             </form>
//           </Paper>
//         </motion.div>
//       </motion.div>
//     </Box>
//   )
// }

// export default SignIn
