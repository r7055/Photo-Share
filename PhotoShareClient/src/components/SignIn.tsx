// import { useForm, Controller } from "react-hook-form";
// import { TextField, Button, Typography, Box, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../slices/userSlice';
// import { RootState, AppDispatch } from '../store/store'; 
// import { UserLogin } from "../types/user";

// const SignIn = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm<UserLogin>();
//   const dispatch = useDispatch<AppDispatch>(); 
//   const navigate = useNavigate();
//   const msg = useSelector((state: RootState) => state.user.msg); 

//   const onSubmit = async (data: UserLogin) => {
//     const resultAction = await dispatch(loginUser(data));
//     if (loginUser.fulfilled.match(resultAction)) {
//       navigate(`/albums/0`);
//     }
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           height: "100vh",
//           width: "100vw",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//           overflow: "hidden",
//         }}
//       >
//         <Paper
//           elevation={24}
//           sx={{
//             padding: 5,
//             borderRadius: "20px",
//             backgroundColor: "rgba(255, 255, 255, 0.9)",
//             width: "380px",
//             textAlign: "center",
//             boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
//             backdropFilter: "blur(10px)",
//             transition: "transform 0.3s ease",
//             "&:hover": {
//               transform: "scale(1.05)",
//             }
//           }}
//         >
//           <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
//             התחברות
//           </Typography>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Controller
//               name="email"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "דוא״ל נדרש",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                   message: "כתובת דוא״ל לא חוקית"
//                 }
//               }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="דוא״ל"
//                   error={!!errors.email}
//                   helperText={errors.email ? errors.email.message : ''}
//                   required
//                   fullWidth
//                   sx={{
//                     marginBottom: 2,
//                     "& .MuiOutlinedInput-root": {
//                       backgroundColor: "rgba(255, 255, 255, 0.8)",
//                     }
//                   }}
//                 />
//               )}
//             />
//             <Controller
//               name="password"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "סיסמא נדרשת",
//                 minLength: {
//                   value: 6,
//                   message: "הסיסמא חייבת להיות לפחות 6 תוים"
//                 }
//               }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="סיסמא"
//                   type="password"
//                   error={!!errors.password}
//                   helperText={errors.password ? errors.password.message : ''}
//                   required
//                   fullWidth
//                   sx={{
//                     marginBottom: 2,
//                     "& .MuiOutlinedInput-root": {
//                       backgroundColor: "rgba(255, 255, 255, 0.8)",
//                     }
//                   }}
//                 />
//               )}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "#1976d2",
//                 "&:hover": {
//                   backgroundColor: "#1565c0",
//                 },
//                 width: "100%",
//                 padding: "12px 0",
//                 borderRadius: "8px",
//               }}
//             >
//               התחבר
//             </Button>
//           </form>
//           {msg && <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>{msg}</Typography>}
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default SignIn;
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/userSlice';
import { RootState, AppDispatch } from '../store/store';
import { UserLogin } from "../types/user";

const SignIn = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<UserLogin>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const msg = useSelector((state: RootState) => state.user.msg);

  const onSubmit = async (data: UserLogin) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate(`/albums/0`);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '16px', background: 'linear-gradient(90deg, #1a1f36,#252a4b)', textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
        התחברות
      </Typography>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "דוא״ל נדרש",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "כתובת דוא״ל לא חוקית"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="דוא״ל"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "סיסמא נדרשת",
              minLength: {
                value: 6,
                message: "הסיסמא חייבת להיות לפחות 6 תוים"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="סיסמא"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              width: "100%",
              padding: "12px 0",
              borderRadius: "8px",
            }}
          >
            התחבר
          </Button>
        </form>
        {msg && <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>{msg}</Typography>} */}
      <Grid container spacing={3} justifyContent="center" style={{ marginTop: '24px' }}>
        <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "דוא״ל נדרש",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "כתובת דוא״ל לא חוקית"
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="דוא״ל"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  required
                  fullWidth
                  sx={{
                    marginBottom: 2,
                    backgroundColor: 'transparent', // שקוף
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)', // גבול שקוף
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.7)', // גבול שקוף בה hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 1)', // גבול שקוף במצב ממוקד
                      },
                    },
                    color: 'white', // צבע טקסט
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "סיסמא נדרשת",
                minLength: {
                  value: 6,
                  message: "הסיסמא חייבת להיות לפחות 6 תוים"
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="סיסמא"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  required
                  fullWidth
                  sx={{
                    marginBottom: 2,
                    backgroundColor: 'transparent', // שקוף
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)', // גבול שקוף
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.7)', // גבול שקוף בה hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 1)', // גבול שקוף במצב ממוקד
                      },
                    },
                    color: 'white', // צבע טקסט
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                width: "100%",
                padding: "12px 0",
                borderRadius: "8px",
                marginTop: 2,
              }}
            >
              התחבר
            </Button>
          </form>
          {msg && <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>{msg}</Typography>}
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
