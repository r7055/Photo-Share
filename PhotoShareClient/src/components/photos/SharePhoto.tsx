import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Alert,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import {
  Share as ShareIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { sharePhoto } from '../../slices/photoSlice';
import { sendPhotoShareEmail } from '../../slices/emailSlice';

interface SharedUser {
  id: string;
  email: string;
  name?: string;
}

interface SharePhotoProps {
  open: boolean;
  onClose: () => void;
  photoId: number;
  photoName?: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const SharePhoto: React.FC<SharePhotoProps> = ({
  open,
  onClose,
  photoId,
  photoName,
  onSuccess,
  onError
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [shareEmail, setShareEmail] = useState('');
  const [shareLoading, setShareLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);
  const [shareMessage, setShareMessage] = useState('');

  const token = sessionStorage.getItem('token');
  
  // Get user info for sender name (you might need to adjust this based on your user slice structure)
  const currentUser = useSelector((state: any) => state.auth?.user || state.user?.currentUser);
  const senderName = currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim() : 'Someone';

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setShareEmail(email);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  useEffect(() => {
    if (open) {
      // Reset state when dialog opens
      setShareEmail('');
      setShareMessage('');
      setEmailError('');
      setShareLoading(false);
      setSharedUsers([]);
    }
  }, [open]);

  const handleShare = async () => {
    if (!shareEmail.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(shareEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!photoId || !token) {
      onError?.('Unable to share photo. Please try again.');
      return;
    }

    // Check if user is already shared with
    if (sharedUsers.some(user => user.email.toLowerCase() === shareEmail.toLowerCase())) {
      setEmailError('This photo is already shared with this user');
      return;
    }

    setShareLoading(true);
    setEmailError('');

    try {
      // First, share the photo via API
      await dispatch(sharePhoto({ 
        token, 
        photoId, 
        userEmailForSharing: shareEmail.trim() 
      })).unwrap();
      
      // Then send the email notification
      try {
        await dispatch(sendPhotoShareEmail(
          shareEmail.trim(),
          senderName,
          photoName || `Photo #${photoId}`,
          shareMessage.trim(),
          token
        )).unwrap();
      } catch (emailError) {
        console.warn('Photo shared successfully but email notification failed:', emailError);
        // Don't fail the entire operation if email fails
      }
      
      // Add to shared users list (in real app, this might come from API response)
      const newSharedUser: SharedUser = {
        id: Date.now().toString(),
        email: shareEmail.trim(),
        name: shareEmail.split('@')[0] // Fallback name from email
      };
      setSharedUsers(prev => [...prev, newSharedUser]);
      
      // Reset form
      setShareEmail('');
      setShareMessage('');
      
      const successMsg = `Photo "${photoName || 'Untitled'}" shared successfully with ${shareEmail}`;
      onSuccess?.(successMsg);
      
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to share photo. Please try again.';
      setEmailError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setShareLoading(false);
    }
  };

  const handleRemoveSharedUser = (userId: string) => {
    setSharedUsers(prev => prev.filter(user => user.id !== userId));
    // In real app, you'd also call an API to revoke access
  };

  const handleClose = () => {
    setShareEmail('');
    setShareMessage('');
    setEmailError('');
    setShareLoading(false);
    setSharedUsers([]);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !shareLoading) {
      handleShare();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #1e293b, #334155)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(90deg, #1e88e5, #1565c0)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShareIcon sx={{ mr: 1.5, color: '#4caf50' }} />
          <Box>
            <Typography variant="h6" component="div">
              Share Photo
            </Typography>
            {photoName && (
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                {photoName}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ background: 'linear-gradient(145deg, #1e293b, #334155)', pt: 3 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
          Share this photo with others by entering their email address. They'll receive an invitation to view your photo.
        </Typography>

        {/* Email Input */}
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={shareEmail}
          onChange={handleEmailChange}
          onKeyPress={handleKeyPress}
          error={!!emailError}
          helperText={emailError}
          disabled={shareLoading}
          InputProps={{
            startAdornment: <EmailIcon sx={{ mr: 1, color: 'rgba(255, 255, 255, 0.5)' }} />,
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&.Mui-focused fieldset': { borderColor: '#1e88e5' },
              '&.Mui-error fieldset': { borderColor: '#f44336' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiFormHelperText-root': { 
              color: '#f44336',
              fontSize: '0.75rem',
              mt: 1
            },
          }}
        />

        {/* Optional Message */}
        <TextField
          margin="dense"
          label="Message (Optional)"
          multiline
          rows={2}
          fullWidth
          variant="outlined"
          value={shareMessage}
          onChange={(e) => setShareMessage(e.target.value)}
          disabled={shareLoading}
          placeholder="Add a personal message..."
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&.Mui-focused fieldset': { borderColor: '#1e88e5' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
            '& .MuiInputBase-input': { color: 'white' },
          }}
        />

        {/* Already Shared Users */}
        {sharedUsers.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
              Shared with:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {sharedUsers.map((user) => (
                <Chip
                  key={user.id}
                  icon={<PersonIcon sx={{ fontSize: 16 }} />}
                  label={user.email}
                  onDelete={() => handleRemoveSharedUser(user.id)}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '& .MuiChip-deleteIcon': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        color: '#f44336'
                      }
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Share Info */}
        <Alert 
          severity="info" 
          sx={{ 
            backgroundColor: 'rgba(30, 136, 229, 0.1)',
            border: '1px solid rgba(30, 136, 229, 0.3)',
            '& .MuiAlert-message': { color: 'rgba(255, 255, 255, 0.9)' }
          }}
        >
          The recipient will receive an email with a link to view this photo.
        </Alert>
      </DialogContent>

      <DialogActions sx={{ 
        background: 'linear-gradient(145deg, #1e293b, #334155)', 
        p: 3,
        gap: 1
      }}>
        <Button 
          onClick={handleClose} 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
          disabled={shareLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleShare}
          variant="contained"
          disabled={!shareEmail.trim() || shareLoading || !!emailError}
          startIcon={shareLoading ? <CircularProgress size={20} /> : <ShareIcon />}
          sx={{
            background: shareLoading 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'linear-gradient(90deg, #1e88e5, #1565c0)',
            color: 'white',
            minWidth: 120,
            '&:hover': {
              background: shareLoading 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'linear-gradient(90deg, #1565c0, #0d47a1)',
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }}
        >
          {shareLoading ? 'Sharing...' : 'Share Photo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharePhoto;