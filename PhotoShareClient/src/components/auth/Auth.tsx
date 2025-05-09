// import { useNavigate } from "react-router-dom";
// import { Button, Typography, Box, Paper } from "@mui/material";
// import { styled } from "@mui/system";
// import { useDispatch, useSelector } from 'react-redux';
// import { setLanguage } from '../slices/languageSlice';

// const BackgroundBox = styled(Box)({
//     position: "fixed",
//     top: 0,
//     left: 0,
//     height: "100vh",
//     width: "100vw",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//     backgroundImage: "url('/path/to/your/background.jpg')", // Add a background image
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backdropFilter: "blur(5px)", // Add a blur effect
// });

// const StyledPaper = styled(Paper)({
//     padding: 5,
//     borderRadius: "12px",
//     backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjusted for better contrast
//     width: "400px",
//     textAlign: "center",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
// });

// const Auth = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const language = useSelector((state: { language: { language: string } }) => state.language.language);

//     const handleLanguageChange = (lang: string) => {
//         dispatch(setLanguage(lang));
//     };

//     return (
//         <>
//             <BackgroundBox>
//                 <StyledPaper elevation={3}>
//                     <Typography variant="h4" fontWeight="600" color="primary" gutterBottom>
//                         {language === 'en' ? 'Welcome' : 'ברוכים הבאים'}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
//                         {language === 'en' ? 'Sign in or sign up to continue' : 'התחברו או הירשמו כדי להמשיך לאזור האישי'}
//                     </Typography>

//                     {/* Language selection buttons */}
//                     <Button onClick={() => handleLanguageChange('en')}>English</Button>
//                     <Button onClick={() => handleLanguageChange('he')}>עברית</Button>

//                     {/* כפתור כניסה */}
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         onClick={() => navigate("/signin")}
//                         sx={{
//                             padding: "12px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             boxShadow: "none",
//                             textTransform: "none",
//                             backgroundColor: "#1976d2", // Primary color
//                             "&:hover": { backgroundColor: "#115293" }, // Darker shade of primary color
//                         }}
//                     >
//                        {language === 'en' ? 'Sign In' : 'התחבר'}
//                     </Button>

//                     {/* כפתור הרשמה עם מסגרת שחורה */}
//                     <Button
//                         fullWidth
//                         variant="outlined"
//                         sx={{
//                             marginTop: 2,
//                             padding: "12px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             textTransform: "none",
//                             color: "#1976d2", // Primary color
//                             borderColor: "#1976d2", // Primary color
//                             "&:hover": { backgroundColor: "#1976d2", color: "white" }, // Primary color with white text
//                         }}
//                         onClick={() => navigate("/signup")}
//                     >
//                         {language === 'en' ? 'Sign Up' : 'הרשמה'}
//                     </Button>
//                 </StyledPaper>
//             </BackgroundBox>
//         </>
//     );
// };

// export default Auth;

import { Typography, Grid, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../slices/languageSlice';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language = useSelector((state: { language: { language: string } }) => state.language.language);

    const handleLanguageChange = (lang: string) => {
        dispatch(setLanguage(lang));
    };

    return (
        <div style={{ minHeight: '100vh', padding: '16px', background: 'linear-gradient(90deg, #1a1f36,#252a4b)', textAlign: 'center' }}>
            <Typography variant="h3" style={{ color: '#ffffff', fontWeight: 'bold', marginTop: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {language === 'en' ? 'Welcome' : 'ברוכים הבאים'}
            </Typography>
            <Typography variant="body1" style={{ color: '#d1e0ff', marginTop: '8px' }}>
                {language === 'en' ? 'Sign in or sign up to continue' : 'התחברו או הירשמו כדי להמשיך לאזור האישי'}
            </Typography>

            <Grid container spacing={3} justifyContent="center" style={{ marginTop: '24px' }}>
                <Grid size={{ xs: 12, sm: 6 }}style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button variant="contained" onClick={() => navigate("/auth/signin")} style={{
                        background: 'linear-gradient(135deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
                        color: '#fff',
                        padding: '12px',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                        maxWidth: '400px',
                        width: '100%', // Allow it to take full width of its parent
                    }}>
                        {language === 'en' ? 'Sign In' : 'התחבר'}
                    </Button>
                    <Button variant="outlined" onClick={() => navigate("/auth/signup")} sx={{
                        marginTop: '16px', // Adjusted margin for better spacing
                        padding: '12px',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        color: '#1976d2',
                        borderColor: '#1976d2',
                        maxWidth: '400px', // Set a maximum width for the button
                        width: '100%', // Allow it to take full width of its parent
                        "&:hover": {
                            background: 'linear-gradient(200deg, #7209b7, #d400ff, #00c6ff, #0072ff)',
                            color: "white"
                        },
                    }}>
                        {language === 'en' ? 'Sign Up' : 'הרשמה'}
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '24px' }}>
                <Grid>
                    <Button onClick={() => handleLanguageChange('en')} style={{ color: '#ffffff' }}>English</Button>
                </Grid>
                <Grid>
                    <Button onClick={() => handleLanguageChange('he')} style={{ color: '#ffffff' }}>עברית</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Auth;



