import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types/user';
import { EmailData, EmailResponse } from '../types/email';

const url =  import.meta.env.VITE_REACT_APP_API_URL+'/mail/send-email';

export const sendWelcomeEmail = (user: User, token: string) => {
    const subject = `🎉 Welcome to PhotoShare, ${user.firstName}! Your Journey Starts Here`;
    const body = generateWelcomeEmailBody(user.firstName);
    return sendEmail({ token, emailData: { To: user.email, Subject: subject, Body: body } });
};

export const sendPhotoShareEmail = (recipientEmail: string, senderName: string, photoTitle: string, message: string = '', token: string) => {
    const subject = `📸 ${senderName} shared a stunning photo with you: ${photoTitle}`;
    const body = generatePhotoShareEmailBody(senderName, photoTitle, message);
    return sendEmail({ token, emailData: { To: recipientEmail, Subject: subject, Body: body } });
};

export const sendAlbumShareEmail = (recipientEmail: string, senderName: string, albumTitle: string, photoCount: number, message: string = '', token: string) => {
    const subject = `🎨 ${senderName} shared an amazing album with you: ${albumTitle}`;
    const body = generateAlbumShareEmailBody(senderName, albumTitle, photoCount, message);
    return sendEmail({ token, emailData: { To: recipientEmail, Subject: subject, Body: body } });
};

const generateWelcomeEmailBody = (firstName: string): string => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Welcome to PhotoShare</title>
</head>
<body style='margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); min-height: 100vh;'>
    <div style='max-width: 650px; margin: 0 auto; padding: 20px;'>
        
        <!-- Main Container -->
        <div style='background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15); position: relative;'>
            
            <!-- Animated Header -->
            <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 40px; text-align: center; position: relative; overflow: hidden;'>
                <div style='position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: pulse 4s ease-in-out infinite;'></div>
                
                <div style='position: relative; z-index: 2;'>
                    <div style='background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3); width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); animation: bounce 2s ease-in-out infinite;'>
                        <span style='font-size: 45px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));'>📸</span>
                    </div>
                    <h1 style='color: white; margin: 0 0 15px; font-size: 36px; font-weight: 700; text-shadow: 0 4px 8px rgba(0,0,0,0.3); letter-spacing: -1px;'>Welcome to PhotoShare!</h1>
                    <p style='color: rgba(255,255,255,0.95); margin: 0; font-size: 18px; font-weight: 300;'>Your memories deserve the perfect home</p>
                </div>
            </div>

            <!-- Welcome Message -->
            <div style='padding: 50px 40px;'>
                <div style='text-align: center; margin-bottom: 40px;'>
                    <h2 style='color: #2d3748; margin: 0 0 20px; font-size: 28px; font-weight: 600;'>
                        Hey ${firstName}! 👋
                    </h2>
                    <p style='color: #4a5568; margin: 0; font-size: 18px; line-height: 1.7;'>
                        We're absolutely <strong style='color: #667eea;'>thrilled</strong> to have you join our PhotoShare family! 
                        Get ready to experience photo sharing like never before.
                    </p>
                </div>

                <!-- Features Grid -->
                <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 25px; margin: 40px 0;'>
                    <div style='background: linear-gradient(135deg, #ff6b6b20 0%, #ff6b6b10 100%); padding: 30px 25px; border-radius: 15px; text-align: center; border: 2px solid #ff6b6b20; transition: transform 0.3s ease;'>
                        <div style='font-size: 40px; margin-bottom: 15px;'>📸</div>
                        <h3 style='color: #2d3748; margin: 0 0 10px; font-size: 18px; font-weight: 600;'>Upload & Share</h3>
                        <p style='color: #4a5568; margin: 0; font-size: 14px;'>Share your precious moments with friends and family</p>
                    </div>
                    
                    <div style='background: linear-gradient(135deg, #48dbfb20 0%, #48dbfb10 100%); padding: 30px 25px; border-radius: 15px; text-align: center; border: 2px solid #48dbfb20;'>
                        <div style='font-size: 40px; margin-bottom: 15px;'>📂</div>
                        <h3 style='color: #2d3748; margin: 0 0 10px; font-size: 18px; font-weight: 600;'>Create Albums</h3>
                        <p style='color: #4a5568; margin: 0; font-size: 14px;'>Organize your photos into beautiful collections</p>
                    </div>
                    
                    <div style='background: linear-gradient(135deg, #feca5720 0%, #feca5710 100%); padding: 30px 25px; border-radius: 15px; text-align: center; border: 2px solid #feca5720;'>
                        <div style='font-size: 40px; margin-bottom: 15px;'>🚀</div>
                        <h3 style='color: #2d3748; margin: 0 0 10px; font-size: 18px; font-weight: 600;'>Easy Sharing</h3>
                        <p style='color: #4a5568; margin: 0; font-size: 14px;'>Share instantly with just one click</p>
                    </div>
                </div>

                <!-- CTA Button -->
                <div style='text-align: center; margin: 45px 0;'>
                    <a href='#' style='display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: 600; font-size: 18px; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden;'>
                        <span style='position: relative; z-index: 2;'>🌟 Start Your Journey</span>
                    </a>
                </div>

                <!-- Welcome Gift -->
                <div style='background: linear-gradient(135deg, #ff9ff320 0%, #ff9ff310 100%); padding: 30px; border-radius: 15px; text-align: center; margin: 30px 0; border: 2px solid #ff9ff330;'>
                    <div style='font-size: 50px; margin-bottom: 20px;'>🎁</div>
                    <h3 style='margin: 0 0 15px; color: #2d3748; font-size: 20px; font-weight: 600;'>Welcome Gift!</h3>
                    <p style='margin: 0; color: #4a5568; font-size: 16px;'>
                        As a welcome gift, you get <strong style='color: #667eea;'>unlimited photo uploads</strong> for your first month!
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div style='background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 40px; text-align: center; border-top: 1px solid #e2e8f0;'>
                <div style='margin-bottom: 20px;'>
                    <span style='font-size: 24px; margin: 0 8px;'>📸</span>
                    <span style='font-size: 24px; margin: 0 8px;'>💖</span>
                    <span style='font-size: 24px; margin: 0 8px;'>🌟</span>
                    <span style='font-size: 24px; margin: 0 8px;'>🎨</span>
                </div>
                <p style='margin: 0 0 15px; color: #4a5568; font-size: 16px; font-weight: 500;'>
                    Welcome to the PhotoShare family, ${firstName}!
                </p>
                <p style='margin: 0; color: #718096; font-size: 14px;'>
                    © 2024 PhotoShare. Where memories come alive. ✨
                </p>
            </div>
        </div>
    </div>

    <style>
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        @media only screen and (max-width: 600px) {
            .email-container { margin: 10px !important; padding: 10px !important; }
            .email-content { padding: 30px 20px !important; }
            .email-header { padding: 40px 20px !important; }
        }
    </style>
</body>
</html>`;
};

const generatePhotoShareEmailBody = (senderName: string, photoTitle: string, personalMessage: string): string => {
    const message = personalMessage
        ? `<div style='background: linear-gradient(135deg, #ff9ff320 0%, #ff9ff310 100%); padding: 25px; border-radius: 15px; margin: 30px 0; border-left: 5px solid #ff9ff3;'>
            <div style='font-size: 24px; margin-bottom: 10px;'>💌</div>
            <p style='font-style: italic; color: #4a5568; margin: 0; font-size: 16px; line-height: 1.6;'>"${personalMessage}"</p>
        </div>`
        : "";

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Photo Shared - PhotoShare</title>
</head>
<body style='margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); min-height: 100vh;'>
    <div style='max-width: 650px; margin: 0 auto; padding: 20px;'>
        
        <div style='background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);'>
            
            <!-- Header -->
            <div style='background: linear-gradient(135deg, #48dbfb 0%, #0fb9b1 100%); padding: 45px 40px; text-align: center; position: relative; overflow: hidden;'>
                <div style='position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); opacity: 0.3;'></div>
                
                <div style='position: relative; z-index: 2;'>
                    <div style='background: white; width: 90px; height: 90px; border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);'>
                        <span style='font-size: 40px;'>📸</span>
                    </div>
                    <h1 style='color: white; margin: 0 0 10px; font-size: 32px; font-weight: 700; text-shadow: 0 4px 8px rgba(0,0,0,0.3);'>New Photo Shared!</h1>
                    <p style='color: rgba(255,255,255,0.95); margin: 0; font-size: 16px;'>Someone wants to share a special moment with you</p>
                </div>
            </div>

            <!-- Content -->
            <div style='padding: 45px 40px;'>
                <div style='text-align: center; margin-bottom: 35px;'>
                    <h2 style='color: #2d3748; margin: 0 0 15px; font-size: 26px; font-weight: 600;'>
                        📷 "${photoTitle}"
                    </h2>
                    <p style='color: #4a5568; margin: 0; font-size: 18px; line-height: 1.6;'>
                        <strong style='color: #48dbfb; font-weight: 600;'>${senderName}</strong> has shared this beautiful photo with you!
                    </p>
                </div>

                ${message}

                <!-- Photo Preview Placeholder -->
                <div style='background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 40px; border-radius: 15px; text-align: center; margin: 35px 0; border: 2px dashed #cbd5e0;'>
                    <div style='font-size: 60px; margin-bottom: 20px; opacity: 0.7;'>🖼️</div>
                    <h3 style='margin: 0 0 15px; color: #2d3748; font-size: 20px; font-weight: 600;'>Photo Preview</h3>
                    <p style='margin: 0; color: #718096; font-size: 16px;'>Click below to view the full-resolution photo</p>
                </div>

                <!-- CTA Button -->
                <div style='text-align: center; margin: 40px 0;'>
                    <a href='#' style='display: inline-block; background: linear-gradient(135deg, #48dbfb 0%, #0fb9b1 100%); color: white; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: 600; font-size: 18px; box-shadow: 0 8px 25px rgba(72, 219, 251, 0.4); transition: all 0.3s ease;'>
                        🔍 View Photo
                    </a>
                </div>

                <!-- Features -->
                <div style='background: linear-gradient(135deg, #667eea20 0%, #667eea10 100%); padding: 25px; border-radius: 15px; margin-top: 35px;'>
                    <div style='text-align: center;'>
                        <div style='font-size: 30px; margin-bottom: 15px;'>⭐</div>
                        <h3 style='margin: 0 0 10px; color: #2d3748; font-size: 18px; font-weight: 600;'>What you can do:</h3>
                        <p style='margin: 0; color: #4a5568; font-size: 15px; line-height: 1.6;'>
                            View • Download • Comment • Share with others • Add to your favorites
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style='background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 35px 40px; text-align: center; border-top: 1px solid #e2e8f0;'>
                <div style='margin-bottom: 20px;'>
                    <span style='font-size: 22px; margin: 0 6px;'>📸</span>
                    <span style='font-size: 22px; margin: 0 6px;'>💝</span>
                    <span style='font-size: 22px; margin: 0 6px;'>🌟</span>
                </div>
                <p style='margin: 0 0 10px; color: #4a5568; font-size: 16px; font-weight: 500;'>
                    PhotoShare - Capturing Life's Beautiful Moments
                </p>
                <p style='margin: 0; color: #718096; font-size: 14px;'>
                    © 2024 PhotoShare. Share the joy. ✨
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

const generateAlbumShareEmailBody = (senderName: string, albumTitle: string, photoCount: number, personalMessage: string): string => {
    const message = personalMessage
        ? `<div style='background: linear-gradient(135deg, #feca5720 0%, #feca5710 100%); padding: 25px; border-radius: 15px; margin: 30px 0; border-left: 5px solid #feca57;'>
            <div style='font-size: 24px; margin-bottom: 10px;'>💌</div>
            <p style='font-style: italic; color: #4a5568; margin: 0; font-size: 16px; line-height: 1.6;'>"${personalMessage}"</p>
        </div>`
        : "";

    const photoText = photoCount === 1 ? 'photo' : 'photos';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Album Shared - PhotoShare</title>
</head>
<body style='margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); min-height: 100vh;'>
    <div style='max-width: 650px; margin: 0 auto; padding: 20px;'>
        
        <div style='background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);'>
            
            <!-- Header -->
            <div style='background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); padding: 45px 40px; text-align: center; position: relative; overflow: hidden;'>
                <div style='position: absolute; top: -20px; left: -20px; width: 120%; height: 120%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: rotate 20s linear infinite;'></div>
                
                <div style='position: relative; z-index: 2;'>
                    <div style='background: white; width: 90px; height: 90px; border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);'>
                        <span style='font-size: 40px;'>🎨</span>
                    </div>
                    <h1 style='color: white; margin: 0 0 10px; font-size: 32px; font-weight: 700; text-shadow: 0 4px 8px rgba(0,0,0,0.3);'>Amazing Album Shared!</h1>
                    <p style='color: rgba(255,255,255,0.95); margin: 0; font-size: 16px;'>A collection of beautiful memories awaits you</p>
                </div>
            </div>

            <!-- Content -->
            <div style='padding: 45px 40px;'>
                <div style='text-align: center; margin-bottom: 35px;'>
                    <h2 style='color: #2d3748; margin: 0 0 15px; font-size: 26px; font-weight: 600;'>
                        📚 "${albumTitle}"
                    </h2>
                    <p style='color: #4a5568; margin: 0; font-size: 18px; line-height: 1.6;'>
                        <strong style='color: #ff6b6b; font-weight: 600;'>${senderName}</strong> has shared this amazing album containing 
                        <strong style='color: #2d3748;'>${photoCount} ${photoText}</strong> with you!
                    </p>
                </div>

                ${message}

                <!-- Album Stats -->
                <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 35px 0;'>
                    <div style='background: linear-gradient(135deg, #ff6b6b20 0%, #ff6b6b10 100%); padding: 25px 20px; border-radius: 15px; text-align: center; border: 2px solid #ff6b6b20;'>
                        <div style='font-size: 35px; margin-bottom: 10px;'>📷</div>
                        <h3 style='color: #2d3748; margin: 0 0 5px; font-size: 24px; font-weight: 700;'>${photoCount}</h3>
                        <p style='color: #4a5568; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;'>Photos</p>
                    </div>
                    
                    <div style='background: linear-gradient(135deg, #feca5720 0%, #feca5710 100%); padding: 25px 20px; border-radius: 15px; text-align: center; border: 2px solid #feca5720;'>
                        <div style='font-size: 35px; margin-bottom: 10px;'>👥</div>
                        <h3 style='color: #2d3748; margin: 0 0 5px; font-size: 24px; font-weight: 700;'>Shared</h3>
                        <p style='color: #4a5568; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;'>With Love</p>
                    </div>
                </div>

                <!-- Album Preview -->
                <div style='background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 35px; border-radius: 15px; text-align: center; margin: 35px 0; border: 2px dashed #cbd5e0;'>
                    <div style='display: flex; justify-content: center; gap: 10px; margin-bottom: 20px;'>
                        <div style='width: 50px; height: 50px; background: linear-gradient(45deg, #ff6b6b, #feca57); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px;'>📸</div>
                        <div style='width: 50px; height: 50px; background: linear-gradient(45deg, #48dbfb, #0fb9b1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px;'>🖼️</div>
                        <div style='width: 50px; height: 50px; background: linear-gradient(45deg, #ff9ff3, #fecfef); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px;'>🎨</div>
                    </div>
                    <h3 style='margin: 0 0 15px; color: #2d3748; font-size: 20px; font-weight: 600;'>Album Preview</h3>
                    <p style='margin: 0; color: #718096; font-size: 16px;'>Click below to explore all the memories in this collection</p>
                </div>

                <!-- CTA Button -->
                <div style='text-align: center; margin: 40px 0;'>
                    <a href='#' style='display: inline-block; background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); color: white; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: 600; font-size: 18px; box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4); transition: all 0.3s ease;'>
                        🚀 Explore Album
                    </a>
                </div>

                <!-- Features -->
                <div style='background: linear-gradient(135deg, #667eea20 0%, #667eea10 100%); padding: 25px; border-radius: 15px; margin-top: 35px;'>
                    <div style='text-align: center;'>
                        <div style='font-size: 30px; margin-bottom: 15px;'>✨</div>
                        <h3 style='margin: 0 0 10px; color: #2d3748; font-size: 18px; font-weight: 600;'>What you can do:</h3>
                        <p style='margin: 0; color: #4a5568; font-size: 15px; line-height: 1.6;'>
                            Browse all photos • Download favorites • Leave comments • Share with friends • Create your own albums
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style='background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 35px 40px; text-align: center; border-top: 1px solid #e2e8f0;'>
                <div style='margin-bottom: 20px;'>
                    <span style='font-size: 22px; margin: 0 6px;'>🎨</span>
                    <span style='font-size: 22px; margin: 0 6px;'>📚</span>
                    <span style='font-size: 22px; margin: 0 6px;'>💖</span>
                    <span style='font-size: 22px; margin: 0 6px;'>🌟</span>
                </div>
                <p style='margin: 0 0 10px; color: #4a5568; font-size: 16px; font-weight: 500;'>
                    PhotoShare - Where Every Memory Matters
                </p>
                <p style='margin: 0; color: #718096; font-size: 14px;'>
                    © 2024 PhotoShare. Collect, Share, Cherish. ✨
                </p>
            </div>
        </div>
    </div>

    <style>
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
</body>
</html>`;
};

// Async thunk for sending email
export const sendEmail = createAsyncThunk<EmailResponse, { token: string; emailData: EmailData }>(
    'email/sendEmail',
    async ({ token, emailData }, thunkAPI) => {
        try {
            const response = await axios.post<EmailResponse>(url, emailData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        loading: false,
        msg: '',
        emailsSent: 0,
        lastEmailType: '',
    },
    reducers: {
        clearMessage: (state) => {
            state.msg = '';
        },
        resetEmailStats: (state) => {
            state.emailsSent = 0;
            state.lastEmailType = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = 'Email sent successfully! 🎉';
                state.emailsSent += 1;
                // Extract email type from the subject line
                const subject = action.meta.arg.emailData.Subject;
                if (subject.includes('Welcome')) {
                    state.lastEmailType = 'welcome';
                } else if (subject.includes('shared a stunning photo')) {
                    state.lastEmailType = 'photo';
                } else if (subject.includes('shared an amazing album')) {
                    state.lastEmailType = 'album';
                }
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.loading = false;
                state.msg = `Failed to send email: ${action.payload as string}`;
            })
            .addCase(sendEmail.pending, (state) => {
                state.loading = true;
                state.msg = 'Sending email...';
            });
    },
});

export const { clearMessage, resetEmailStats } = emailSlice.actions;
export default emailSlice.reducer;