import React from 'react';
import { Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: '#3f51b5' }}> 
                    מדיניות פרטיות
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', color: '#3f51b5' }} onClick={handleBack}> 
                    חזרה
                </Typography>
            </Toolbar>

            <Typography variant="h4" gutterBottom color="#3f51b5">
                מדיניות פרטיות
            </Typography>
            <Typography variant="body1" paragraph color="#3f51b5"> 
                זוהי מדיניות הפרטיות שלנו. אנו מחויבים לשמור על פרטיותך 
                ומבינים את החשיבות של המידע האישי שלך. 
                אנו אוספים מידע רק במידת הצורך ומגנים עליו בהתאם לחוק.
            </Typography>
            <Typography variant="body1" paragraph color="#3f51b5"> 
                אם יש לך שאלות נוספות על מדיניות זו, 
                אנא אל תהסס לפנות אלינו.
            </Typography>
        </div>
    );
};

export default PrivacyPolicy;
