// import { useForm, Controller } from "react-hook-form";
// import { TextField, Button, Typography, Box, Paper } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from "react";
// import { User } from "../types/user";
// import store from "../store/store";
// import { registerUser } from "../slices/userSlice";


// const Signup = () => {
//   const { control, handleSubmit, formState: { errors, isValid } } = useForm<User>({ mode: "onChange" });
//   const [msg, setMsg] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data: User) => {
//     setLoading(true);
//     setMsg("");

//     try {
    

//      const res=await store.dispatch(registerUser(data));

//       if (res.payload && (res.payload as User).id) {
//         setMsg("ההרשמה בוצעה בהצלחה! 🎉");
//         navigate("/albumList");
//       } else {
//         setMsg("שגיאה בהרשמה. נסה שוב.");
//       }
//     } catch (error: any) {
//       if (error.response) {
//         setMsg("😜לחץ כאן לכניסה אתה כבר רשום במאגר");
//       } else {
//         setMsg("שגיאה בחיבור לשרת. נסה שוב מאוחר יותר.");
//       }
//     } finally {
//       setLoading(false);
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
//           backgroundColor: "rgba(255, 255, 255, 0.5)",
//           overflow: "hidden",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 5,
//             borderRadius: "12px",
//             backgroundColor: "rgba(255, 255, 255, 0.8)",
//             width: "400px",
//             textAlign: "center",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
//             הרשמה
//           </Typography>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Controller
//               name="firstName"
//               control={control}
//               defaultValue=""
//               rules={{ required: "UserName is required" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="FirstName"
//                   error={!!errors.firstName}
//                   helperText={errors.firstName ? errors.firstName.message : ''}
//                   required
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 />
//               )}
//             />
//              <Controller
//               name="lastName"
//               control={control}
//               defaultValue=""
//               rules={{ required: "UserName is required" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="LastName"
//                   error={!!errors.lastName}
//                   helperText={errors.lastName ? errors.lastName.message : ''}
//                   required
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 />
//               )}
//             />
//             <Controller
//               name="password"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters long"
//                 }
//               }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Password"
//                   type="password"
//                   error={!!errors.password}
//                   helperText={errors.password ? errors.password.message : ''}
//                   required
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 />
//               )}
//             />
//             <Controller
//               name="email"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                   message: "Invalid email address"
//                 }
//               }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Email"
//                   error={!!errors.email}
//                   helperText={errors.email ? errors.email.message : ''}
//                   required
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 />
//               )}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{ backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
//               disabled={!isValid || loading}
//             >
//               {loading ? "ביצוע הרשמה..." : "הרשמה"}
//             </Button>
//           </form>
//           {msg === "😜לחץ כאן לכניסה אתה כבר רשום במאגר" && (
//             <Link to="/login">
//               <Typography variant="body2" align="center">
//                 להתחברות הקליקו כאן
//               </Typography>
//             </Link>
//           )}
//           {msg && (
//             <Typography variant="body2" color="error" align="center">
//               {msg}
//             </Typography>
//           )}
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default Signup;

import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { User } from "../../types/user";
import store from "../../store/store";
import { registerUser } from "../../slices/userSlice";

const Signup = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<User>({ mode: "onChange" });
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    setLoading(true);
    setMsg("");

    try {
      const res = await store.dispatch(registerUser(data));

      if (res.payload && (res.payload as User).id) {
        setMsg("ההרשמה בוצעה בהצלחה! 🎉");
        navigate(`/albums/0`);
      } else {
        setMsg("שגיאה בהרשמה. נסה שוב.");
      }
    } catch (error: any) {
      if (error.response) {
        setMsg("😜לחץ כאן לכניסה אתה כבר רשום במאגר");
      } else {
        setMsg("שגיאה בחיבור לשרת. נסה שוב מאוחר יותר.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: '#3a4276', // צבע קבוע לרקע
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          padding: 5,
          borderRadius: "20px",
          backgroundColor: "#ffffff", // רקע לא שקוף
          width: "400px",
          textAlign: "center",
          boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
          הרשמה
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "שם פרטי נדרש" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="שם פרטי"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ''}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "שם משפחה נדרש" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="שם משפחה"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ''}
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
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
            disabled={!isValid || loading}
          >
            {loading ? "ביצוע הרשמה..." : "הרשמה"}
          </Button>
        </form>
        {msg === "😜לחץ כאן לכניסה אתה כבר רשום במאגר" && (
          <Link to="/login">
            <Typography variant="body2" align="center">
              להתחברות הקליקו כאן
            </Typography>
          </Link>
        )}
        {msg && (
          <Typography variant="body2" color="error" align="center">
            {msg}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Signup;
