import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/userSlice';
import { RootState, AppDispatch } from '../../store/store';
import { UserLogin } from "../../types/user";

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
      <Typography variant="h3" style={{ color: '#ffffff', fontWeight: 'bold', marginTop: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        התחברות
      </Typography>
      <Grid container spacing={3} justifyContent="center" style={{ marginTop: '24px' }}>
        <Grid size={{ xs: 12, sm: 6 }}style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '70%' }}>
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
                label="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                required
                fullWidth
                sx={{
                    marginBottom: 2,
                    borderRadius: "8px",
                    background: '#1a1f36',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgba(255, 255, 255, 1)',
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        color: 'white', 
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white', 
                    },
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
                label="password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                required
                fullWidth
                sx={{
                    marginBottom: 2,
                    borderRadius: "8px",
                    background: '#1a1f36',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgba(255, 255, 255, 1)',
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        color: 'white', // צבע הפונט של הטקסט שהמשתמש מקליד
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)', // צבע התווית
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white', // צבע התווית כאשר השדה ממוקד
                    },
                }}
            />
            
              )}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                padding: "12px 0",
                borderRadius: "8px",
                marginTop: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
                color: '#fff',
                fontSize: '18px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.3)'
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
