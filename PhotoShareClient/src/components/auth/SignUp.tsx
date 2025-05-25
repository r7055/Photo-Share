// // // import { useForm, Controller } from "react-hook-form";
// // // import { TextField, Button, Typography, Box, Paper } from '@mui/material';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { useState } from "react";
// // // import { User } from "../types/user";
// // // import store from "../store/store";
// // // import { registerUser } from "../slices/userSlice";


// // // const Signup = () => {
// // //   const { control, handleSubmit, formState: { errors, isValid } } = useForm<User>({ mode: "onChange" });
// // //   const [msg, setMsg] = useState<string>("");
// // //   const [loading, setLoading] = useState<boolean>(false);
// // //   const navigate = useNavigate();

// // //   const onSubmit = async (data: User) => {
// // //     setLoading(true);
// // //     setMsg("");

// // //     try {


// // //      const res=await store.dispatch(registerUser(data));

// // //       if (res.payload && (res.payload as User).id) {
// // //         setMsg("ההרשמה בוצעה בהצלחה! 🎉");
// // //         navigate("/albumList");
// // //       } else {
// // //         setMsg("שגיאה בהרשמה. נסה שוב.");
// // //       }
// // //     } catch (error: any) {
// // //       if (error.response) {
// // //         setMsg("😜לחץ כאן לכניסה אתה כבר רשום במאגר");
// // //       } else {
// // //         setMsg("שגיאה בחיבור לשרת. נסה שוב מאוחר יותר.");
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <Box
// // //         sx={{
// // //           position: "fixed",
// // //           top: 0,
// // //           left: 0,
// // //           height: "100vh",
// // //           width: "100vw",
// // //           display: "flex",
// // //           justifyContent: "center",
// // //           alignItems: "center",
// // //           backgroundColor: "rgba(255, 255, 255, 0.5)",
// // //           overflow: "hidden",
// // //         }}
// // //       >
// // //         <Paper
// // //           elevation={3}
// // //           sx={{
// // //             padding: 5,
// // //             borderRadius: "12px",
// // //             backgroundColor: "rgba(255, 255, 255, 0.8)",
// // //             width: "400px",
// // //             textAlign: "center",
// // //             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
// // //           }}
// // //         >
// // //           <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
// // //             הרשמה
// // //           </Typography>
// // //           <form onSubmit={handleSubmit(onSubmit)}>
// // //             <Controller
// // //               name="firstName"
// // //               control={control}
// // //               defaultValue=""
// // //               rules={{ required: "UserName is required" }}
// // //               render={({ field }) => (
// // //                 <TextField
// // //                   {...field}
// // //                   label="FirstName"
// // //                   error={!!errors.firstName}
// // //                   helperText={errors.firstName ? errors.firstName.message : ''}
// // //                   required
// // //                   fullWidth
// // //                   sx={{ marginBottom: 2 }}
// // //                 />
// // //               )}
// // //             />
// // //              <Controller
// // //               name="lastName"
// // //               control={control}
// // //               defaultValue=""
// // //               rules={{ required: "UserName is required" }}
// // //               render={({ field }) => (
// // //                 <TextField
// // //                   {...field}
// // //                   label="LastName"
// // //                   error={!!errors.lastName}
// // //                   helperText={errors.lastName ? errors.lastName.message : ''}
// // //                   required
// // //                   fullWidth
// // //                   sx={{ marginBottom: 2 }}
// // //                 />
// // //               )}
// // //             />
// // //             <Controller
// // //               name="password"
// // //               control={control}
// // //               defaultValue=""
// // //               rules={{
// // //                 required: "Password is required",
// // //                 minLength: {
// // //                   value: 6,
// // //                   message: "Password must be at least 6 characters long"
// // //                 }
// // //               }}
// // //               render={({ field }) => (
// // //                 <TextField
// // //                   {...field}
// // //                   label="Password"
// // //                   type="password"
// // //                   error={!!errors.password}
// // //                   helperText={errors.password ? errors.password.message : ''}
// // //                   required
// // //                   fullWidth
// // //                   sx={{ marginBottom: 2 }}
// // //                 />
// // //               )}
// // //             />
// // //             <Controller
// // //               name="email"
// // //               control={control}
// // //               defaultValue=""
// // //               rules={{
// // //                 required: "Email is required",
// // //                 pattern: {
// // //                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
// // //                   message: "Invalid email address"
// // //                 }
// // //               }}
// // //               render={({ field }) => (
// // //                 <TextField
// // //                   {...field}
// // //                   label="Email"
// // //                   error={!!errors.email}
// // //                   helperText={errors.email ? errors.email.message : ''}
// // //                   required
// // //                   fullWidth
// // //                   sx={{ marginBottom: 2 }}
// // //                 />
// // //               )}
// // //             />
// // //             <Button
// // //               type="submit"
// // //               variant="contained"
// // //               size="large"
// // //               sx={{ backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
// // //               disabled={!isValid || loading}
// // //             >
// // //               {loading ? "ביצוע הרשמה..." : "הרשמה"}
// // //             </Button>
// // //           </form>
// // //           {msg === "😜לחץ כאן לכניסה אתה כבר רשום במאגר" && (
// // //             <Link to="/login">
// // //               <Typography variant="body2" align="center">
// // //                 להתחברות הקליקו כאן
// // //               </Typography>
// // //             </Link>
// // //           )}
// // //           {msg && (
// // //             <Typography variant="body2" color="error" align="center">
// // //               {msg}
// // //             </Typography>
// // //           )}
// // //         </Paper>
// // //       </Box>
// // //     </>
// // //   );
// // // };

// // // export default Signup;

// // import { useForm, Controller } from "react-hook-form";
// // import { TextField, Button, Typography, Box, Paper } from '@mui/material';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useState } from "react";
// // import { User } from "../../types/user";
// // import store from "../../store/store";
// // import { registerUser } from "../../slices/userSlice";

// // const Signup = () => {
// //   const { control, handleSubmit, formState: { errors, isValid } } = useForm<User>({ mode: "onChange" });
// //   const [msg, setMsg] = useState<string>("");
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const navigate = useNavigate();

// //   const onSubmit = async (data: User) => {
// //     setLoading(true);
// //     setMsg("");

// //     try {
// //       const res = await store.dispatch(registerUser(data));

// //       if (res.payload && (res.payload as User).id) {
// //         setMsg("ההרשמה בוצעה בהצלחה! 🎉");
// //         navigate(`/albums/0`);
// //       } else {
// //         setMsg("שגיאה בהרשמה. נסה שוב.");
// //       }
// //     } catch (error: any) {
// //       if (error.response) {
// //         setMsg("😜לחץ כאן לכניסה אתה כבר רשום במאגר");
// //       } else {
// //         setMsg("שגיאה בחיבור לשרת. נסה שוב מאוחר יותר.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         position: "fixed",
// //         top: 0,
// //         left: 0,
// //         height: "100vh",
// //         width: "100vw",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         background: '#3a4276', // צבע קבוע לרקע
// //         overflow: "hidden",
// //       }}
// //     >
// //       <Paper
// //         elevation={24}
// //         sx={{
// //           padding: 5,
// //           borderRadius: "20px",
// //           backgroundColor: "#ffffff", // רקע לא שקוף
// //           width: "400px",
// //           textAlign: "center",
// //           boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
// //         }}
// //       >
// //         <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
// //           הרשמה
// //         </Typography>
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //           <Controller
// //             name="firstName"
// //             control={control}
// //             defaultValue=""
// //             rules={{ required: "שם פרטי נדרש" }}
// //             render={({ field }) => (
// //               <TextField
// //                 {...field}
// //                 label="שם פרטי"
// //                 error={!!errors.firstName}
// //                 helperText={errors.firstName ? errors.firstName.message : ''}
// //                 required
// //                 fullWidth
// //                 sx={{ marginBottom: 2 }}
// //               />
// //             )}
// //           />
// //           <Controller
// //             name="lastName"
// //             control={control}
// //             defaultValue=""
// //             rules={{ required: "שם משפחה נדרש" }}
// //             render={({ field }) => (
// //               <TextField
// //                 {...field}
// //                 label="שם משפחה"
// //                 error={!!errors.lastName}
// //                 helperText={errors.lastName ? errors.lastName.message : ''}
// //                 required
// //                 fullWidth
// //                 sx={{ marginBottom: 2 }}
// //               />
// //             )}
// //           />
// //           <Controller
// //             name="password"
// //             control={control}
// //             defaultValue=""
// //             rules={{
// //               required: "סיסמא נדרשת",
// //               minLength: {
// //                 value: 6,
// //                 message: "הסיסמא חייבת להיות לפחות 6 תוים"
// //               }
// //             }}
// //             render={({ field }) => (
// //               <TextField
// //                 {...field}
// //                 label="סיסמא"
// //                 type="password"
// //                 error={!!errors.password}
// //                 helperText={errors.password ? errors.password.message : ''}
// //                 required
// //                 fullWidth
// //                 sx={{ marginBottom: 2 }}
// //               />
// //             )}
// //           />
// //           <Controller
// //             name="email"
// //             control={control}
// //             defaultValue=""
// //             rules={{
// //               required: "דוא״ל נדרש",
// //               pattern: {
// //                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
// //                 message: "כתובת דוא״ל לא חוקית"
// //               }
// //             }}
// //             render={({ field }) => (
// //               <TextField
// //                 {...field}
// //                 label="דוא״ל"
// //                 error={!!errors.email}
// //                 helperText={errors.email ? errors.email.message : ''}
// //                 required
// //                 fullWidth
// //                 sx={{ marginBottom: 2 }}
// //               />
// //             )}
// //           />
// //           <Button
// //             type="submit"
// //             variant="contained"
// //             size="large"
// //             sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
// //             disabled={!isValid || loading}
// //           >
// //             {loading ? "ביצוע הרשמה..." : "הרשמה"}
// //           </Button>
// //         </form>
// //         {msg === "😜לחץ כאן לכניסה אתה כבר רשום במאגר" && (
// //           <Link to="/login">
// //             <Typography variant="body2" align="center">
// //               להתחברות הקליקו כאן
// //             </Typography>
// //           </Link>
// //         )}
// //         {msg && (
// //           <Typography variant="body2" color="error" align="center">
// //             {msg}
// //           </Typography>
// //         )}
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default Signup;
"use client"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid, // Keep Grid import
  InputAdornment,
  IconButton,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import type { User } from "../../types/user"
import store from "../../store/store"
import { registerUser } from "../../slices/userSlice"
import { motion } from "framer-motion"
import {
  Person,
  PersonOutline,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  ArrowBack,
  HowToReg,
} from "@mui/icons-material"

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<User>({ mode: "onChange" })
  const [msg, setMsg] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const steps = ["Personal Information", "Account Details"]

  const handleNext = async () => {
    const fieldsToValidate = activeStep === 0 ? ["firstName", "lastName"] : ["email", "password"]
    const result = await trigger(fieldsToValidate as any)
    if (result) {
      setActiveStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }




  //   if (error.response && error.response.status === 409) {
  //     console.log('Email already exists');
  //   } else {
  //     console.log('An error occurred:', error.message);
  //   }
  // }


  const onSubmit = async (data: User) => {
    setLoading(true)
    setMsg("")

    try {
      const res = await store.dispatch(registerUser(data))
      console.log(res);
      
      if ((res.payload as User).id) {
        // if (res.payload && (res.payload as User).id) {
        setMsg("Registration successful! 🎉")
        navigate(`/albums/0`)
      } else {
        setMsg("Registration failed. Please try again.")
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          setMsg("The email is already registered. Please sign in instead.");
        } else {
          setMsg("Server connection error. Please try again later.");
        }
      } else {
        setMsg("Server connection error. Please try again later.");
      }
    } finally {
      setLoading(false)
    }
  }

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
        style={{ width: "100%", maxWidth: "500px" }}
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
            Create Account
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
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepLabel-label": {
                        color: "rgba(255, 255, 255, 0.7)",
                        "&.Mui-active": { color: "#00c6ff" },
                        "&.Mui-completed": { color: "#4caf50" },
                      },
                      "& .MuiStepIcon-root": {
                        color: "rgba(255, 255, 255, 0.3)",
                        "&.Mui-active": { color: "#00c6ff" },
                        "&.Mui-completed": { color: "#4caf50" },
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit(onSubmit)}>
              {activeStep === 0 && ( // Conditionally render the entire Grid for step 0
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}> {/* Use 'item' prop for Grid children */}
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      rules={{ required: "First name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="First Name"
                          error={!!errors.firstName}
                          helperText={errors.firstName ? errors.firstName.message : ""}
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}> {/* Use 'item' prop for Grid children */}
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Last name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Last Name"
                          error={!!errors.lastName}
                          helperText={errors.lastName ? errors.lastName.message : ""}
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutline sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
                      )}
                    />
                  </Grid>
                </Grid>
              )}

              {activeStep === 1 && ( // Conditionally render the entire Grid for step 1
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}> {/* Use 'item' prop for Grid children */}
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
                  </Grid>
                  <Grid size={{ xs: 12 }}> {/* Use 'item' prop for Grid children */}
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
                  </Grid>
                </Grid>
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                {activeStep > 0 ? (
                  <Button
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    Back
                  </Button>
                ) : (
                  <Box />
                )}

                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                      },
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid || loading}
                    startIcon={<HowToReg />}
                    sx={{
                      background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
                      },
                      "&.Mui-disabled": {
                        background: "rgba(255, 255, 255, 0.12)",
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                )}
              </Box>

              {msg && (
                <Alert
                  severity={msg.includes("successful") ? "success" : "error"}
                  sx={{
                    mt: 3,
                    backgroundColor: msg.includes("successful") ? "rgba(76, 175, 80, 0.1)" : "rgba(211, 47, 47, 0.1)",
                    color: msg.includes("successful") ? "#4caf50" : "#ff5252",
                  }}
                >
                  {msg}
                </Alert>
              )}

              {msg === "You are already registered. Click here to sign in 😜" && (
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Link to="/auth/signin">
                    <Button
                      variant="text"
                      sx={{
                        color: "#00c6ff",
                        "&:hover": {
                          backgroundColor: "transparent",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                </Box>
              )}

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Already have an account?{" "}
                  <Button
                    variant="text"
                    onClick={() => navigate("/auth/signin")}
                    sx={{
                      color: "#00c6ff",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign In
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

export default Signup
// "use client"
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
//   Stepper,
//   Step,
//   StepLabel,
// } from "@mui/material"
// import { Link, useNavigate } from "react-router-dom"
// import type { User } from "../../types/user"
// import store from "../../store/store"
// import { registerUser } from "../../slices/userSlice"
// import { motion } from "framer-motion"
// import {
//   Person,
//   PersonOutline,
//   Email,
//   Lock,
//   Visibility,
//   VisibilityOff,
//   ArrowForward,
//   ArrowBack,
//   HowToReg,
// } from "@mui/icons-material"

// const Signup = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid },
//     trigger,
//   } = useForm<User>({ mode: "onChange" })
//   const [msg, setMsg] = useState<string>("")
//   const [loading, setLoading] = useState<boolean>(false)
//   const [activeStep, setActiveStep] = useState(0)
//   const [showPassword, setShowPassword] = useState(false)
//   const navigate = useNavigate()

//   const steps = ["Personal Information", "Account Details"]

//   const handleNext = async () => {
//     const fieldsToValidate = activeStep === 0 ? ["firstName", "lastName"] : ["email", "password"]
//     const result = await trigger(fieldsToValidate as any)
//     if (result) {
//       setActiveStep((prevStep) => prevStep + 1)
//     }
//   }

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1)
//   }

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const onSubmit = async (data: User) => {
//     setLoading(true)
//     setMsg("")

//     try {
//       const res = await store.dispatch(registerUser(data))

//       if (res.payload && (res.payload as User).id) {
//         setMsg("Registration successful! 🎉")
//         navigate(`/albums/0`)
//       } else {
//         setMsg("Registration failed. Please try again.")
//       }
//     } catch (error: any) {
//       if (error.response) {
//         setMsg("You are already registered. Click here to sign in 😜")
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
//             Create Account
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
//             <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel
//                     sx={{
//                       "& .MuiStepLabel-label": {
//                         color: "rgba(255, 255, 255, 0.7)",
//                         "&.Mui-active": { color: "#00c6ff" },
//                         "&.Mui-completed": { color: "#4caf50" },
//                       },
//                       "& .MuiStepIcon-root": {
//                         color: "rgba(255, 255, 255, 0.3)",
//                         "&.Mui-active": { color: "#00c6ff" },
//                         "&.Mui-completed": { color: "#4caf50" },
//                       },
//                     }}
//                   >
//                     {label}
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>

//             <form onSubmit={handleSubmit(onSubmit)}>
//               {activeStep === 0 ? (
//                 <Grid container spacing={2}>
//                   <Grid size={{xs:12}}>
//                     <Controller
//                       name="firstName"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "First name is required" }}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           label="First Name"
//                           error={!!errors.firstName}
//                           helperText={errors.firstName ? errors.firstName.message : ""}
//                           required
//                           fullWidth
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Person sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//                               "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
//                               "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
//                               backgroundColor: "rgba(255, 255, 255, 0.05)",
//                             },
//                             "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
//                             "& .MuiInputBase-input": { color: "white" },
//                             "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
//                           }}
//                         />
//                       )}
//                     />
//                   </Grid>
//                   <Grid size={{xs:12}}>
//                     <Controller
//                       name="lastName"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "Last name is required" }}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           label="Last Name"
//                           error={!!errors.lastName}
//                           helperText={errors.lastName ? errors.lastName.message : ""}
//                           required
//                           fullWidth
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <PersonOutline sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//                               "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
//                               "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
//                               backgroundColor: "rgba(255, 255, 255, 0.05)",
//                             },
//                             "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
//                             "& .MuiInputBase-input": { color: "white" },
//                             "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
//                           }}
//                         />
//                       )}
//                     />
//                   </Grid>
//                 </Grid>
//               ) : (
//                 <Grid container spacing={2}>
//                   <Grid size={{xs:12}}>
//                     <Controller
//                       name="email"
//                       control={control}
//                       defaultValue=""
//                       rules={{
//                         required: "Email is required",
//                         pattern: {
//                           value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                           message: "Invalid email address",
//                         },
//                       }}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           label="Email"
//                           error={!!errors.email}
//                           helperText={errors.email ? errors.email.message : ""}
//                           required
//                           fullWidth
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Email sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//                               "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
//                               "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
//                               backgroundColor: "rgba(255, 255, 255, 0.05)",
//                             },
//                             "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
//                             "& .MuiInputBase-input": { color: "white" },
//                             "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
//                           }}
//                         />
//                       )}
//                     />
//                   </Grid>
//                   <Grid size={{xs:12}}>
//                     <Controller
//                       name="password"
//                       control={control}
//                       defaultValue=""
//                       rules={{
//                         required: "Password is required",
//                         minLength: {
//                           value: 6,
//                           message: "Password must be at least 6 characters",
//                         },
//                       }}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           label="Password"
//                           type={showPassword ? "text" : "password"}
//                           error={!!errors.password}
//                           helperText={errors.password ? errors.password.message : ""}
//                           required
//                           fullWidth
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Lock sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
//                               </InputAdornment>
//                             ),
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <IconButton
//                                   aria-label="toggle password visibility"
//                                   onClick={handleTogglePasswordVisibility}
//                                   edge="end"
//                                   sx={{ color: "rgba(255, 255, 255, 0.7)" }}
//                                 >
//                                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//                               "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
//                               "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
//                               backgroundColor: "rgba(255, 255, 255, 0.05)",
//                             },
//                             "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
//                             "& .MuiInputBase-input": { color: "white" },
//                             "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
//                           }}
//                         />
//                       )}
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//                 {activeStep > 0 ? (
//                   <Button
//                     onClick={handleBack}
//                     startIcon={<ArrowBack />}
//                     sx={{
//                       color: "white",
//                       "&:hover": {
//                         backgroundColor: "rgba(255, 255, 255, 0.05)",
//                       },
//                     }}
//                   >
//                     Back
//                   </Button>
//                 ) : (
//                   <Box />
//                 )}

//                 {activeStep < steps.length - 1 ? (
//                   <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     endIcon={<ArrowForward />}
//                     sx={{
//                       background: "linear-gradient(135deg, #00c6ff, #0072ff)",
//                       color: "white",
//                       "&:hover": {
//                         background: "linear-gradient(135deg, #0072ff, #00c6ff)",
//                       },
//                     }}
//                   >
//                     Next
//                   </Button>
//                 ) : (
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={!isValid || loading}
//                     startIcon={<HowToReg />}
//                     sx={{
//                       background: "linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)",
//                       color: "white",
//                       "&:hover": {
//                         background: "linear-gradient(135deg, #0072ff, #7209b7, #d400ff)",
//                       },
//                       "&.Mui-disabled": {
//                         background: "rgba(255, 255, 255, 0.12)",
//                         color: "rgba(255, 255, 255, 0.3)",
//                       },
//                     }}
//                   >
//                     {loading ? "Registering..." : "Register"}
//                   </Button>
//                 )}
//               </Box>

//               {msg && (
//                 <Alert
//                   severity={msg.includes("successful") ? "success" : "error"}
//                   sx={{
//                     mt: 3,
//                     backgroundColor: msg.includes("successful") ? "rgba(76, 175, 80, 0.1)" : "rgba(211, 47, 47, 0.1)",
//                     color: msg.includes("successful") ? "#4caf50" : "#ff5252",
//                   }}
//                 >
//                   {msg}
//                 </Alert>
//               )}

//               {msg === "You are already registered. Click here to sign in 😜" && (
//                 <Box sx={{ textAlign: "center", mt: 2 }}>
//                   <Link to="/auth/signin">
//                     <Button
//                       variant="text"
//                       sx={{
//                         color: "#00c6ff",
//                         "&:hover": {
//                           backgroundColor: "transparent",
//                           textDecoration: "underline",
//                         },
//                       }}
//                     >
//                       Sign In
//                     </Button>
//                   </Link>
//                 </Box>
//               )}

//               <Box sx={{ mt: 3, textAlign: "center" }}>
//                 <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
//                   Already have an account?{" "}
//                   <Button
//                     variant="text"
//                     onClick={() => navigate("/auth/signin")}
//                     sx={{
//                       color: "#00c6ff",
//                       textTransform: "none",
//                       "&:hover": {
//                         backgroundColor: "transparent",
//                         textDecoration: "underline",
//                       },
//                     }}
//                   >
//                     Sign In
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

// export default Signup
