import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-blue-small.jpg';
import { useSelector } from 'react-redux';
import { User } from '../types/user';
import { useEffect } from 'react';

const AppLayout = () => {
    const userState = useSelector((state: { User: { user: User, loading: boolean, msg: string } }) => state.User);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        navigate('/about');
    }, []);

    const handleShareAlbum = () => {
        navigate('/myShares');
    };

    const handleAlbumOverview = () => {
        navigate('/albums/0');
    };

    const handlePrivacyPolicy = () => {
        navigate('/privacy-policy'); // ניווט למדיניות פרטיות
    };
   

    return (
        <>
         <div style={{ background: 'linear-gradient(90deg, #1a1f36,#252a4b)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ background: 'linear-gradient(90deg,rgb(26, 31, 54), #3a4276, #8a2be2)' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="PhotoShare Logo" style={{ height: '50px', marginRight: '10px' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px', padding: 0 }}>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                <span style={{ color: 'white' }}>Photo</span>
                                <span style={{
                                    background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 'bold',
                                    fontSize: '30px',
                                    display: 'inline-block'
                                }}>
                                    Share
                                </span>
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: 'white', margin: 0, padding: 0 }}>
                                my moment
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                        {token && <Button 
                            variant="contained" 
                            onClick={handleShareAlbum} 
                            sx={{
                                background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
                                color: 'white',
                                margin: '10px',
                                '&:hover': {
                                    background: 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
                                },
                            }}
                        >
                            Share Album
                        </Button>}
                        {token && <Button 
                            variant="contained" 
                            onClick={handleAlbumOverview} 
                            sx={{
                                background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
                                color: 'white',
                                margin: '10px',
                                '&:hover': {
                                    background: 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
                                },
                            }}
                        >
                            Albums
                        </Button>}
                        {!token && <Typography variant="subtitle1" sx={{ color: '#d1d1e0' }}>
                            ניהול תמונות חכם באמצעות AI - ארגון, תיוג, שיתוף וזיהוי פנים
                        </Typography>}
                    </Box>
                </Toolbar>
            </AppBar>

            <main style={{ flexGrow: 1 }}>
                <Outlet />
            </main>

            <AppBar position="static" sx={{ top: 'auto', bottom: 0, background: 'linear-gradient(90deg, #1a1f36, #3a4276, #8a2be2)' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" color="inherit">
                        © 2025 PhotoShare. כל הזכויות שמורות.
                    </Typography>
                    <Typography variant="body2" color="inherit" onClick={handlePrivacyPolicy} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        מדיניות פרטיות
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
        </>
    );
};

export default AppLayout;
