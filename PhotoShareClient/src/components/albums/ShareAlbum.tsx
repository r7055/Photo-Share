import React, { useState } from 'react';
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
  Person as PersonIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { shareAlbum } from '../../slices/albumSlice';
import type { Album } from '../../types/album';

interface ShareAlbumProps {
  open: boolean;
  onClose: () => void;
  album: Album | null;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

interface SharedUser {
  id: string;
  email: string;
  name?: string;
}

const ShareAlbum: React.FC<ShareAlbumProps> = ({
  open,
  onClose,
  album,
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

  const handleShare = async () => {
    if (!shareEmail.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(shareEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!album?.id || !token) {
      onError?.('Unable to share album. Please try again.');
      return;
    }

    // Check if user is already shared with
    if (sharedUsers.some(user => user.email.toLowerCase() === shareEmail.toLowerCase())) {
      setEmailError('This album is already shared with this user');
      return;
    }

    setShareLoading(true);
    setEmailError('');

    try {
      const shareData = {
        albumId: album.id,
        UserEmailForSharing: shareEmail.trim(),
        message: shareMessage.trim() || undefined
      };

      await dispatch(shareAlbum({ token, albumShareData: shareData })).unwrap();
      
      // Add to shared users list (in real app, this would come from API response)
      const newSharedUser: SharedUser = {
        id: Date.now().toString(),
        email: shareEmail.trim(),
        name: shareEmail.split('@')[0] // Fallback name from email
      };
      setSharedUsers(prev => [...prev, newSharedUser]);
      
      // Reset form
      setShareEmail('');
      setShareMessage('');
      
      onSuccess?.(`Album "${album.title}" shared successfully with ${shareEmail}`);
      
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to share album. Please try again.';
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
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !shareLoading) {
      handleShare();
    }
  };

  if (!album) return null;

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
          background: 'linear-gradient(90deg, #1a1f36, #252a4b)',
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
              Share Album
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
              {album.title}
            </Typography>
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
          Share this album with others by entering their email address. They'll receive an invitation to view your photos.
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
              '&.Mui-focused fieldset': { borderColor: '#00c6ff' },
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
              '&.Mui-focused fieldset': { borderColor: '#00c6ff' },
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
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            border: '1px solid rgba(33, 150, 243, 0.3)',
            '& .MuiAlert-message': { color: 'rgba(255, 255, 255, 0.9)' }
          }}
        >
          The recipient will receive an email invitation with a link to view this album.
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
              : 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)',
            color: 'white',
            minWidth: 120,
            '&:hover': {
              background: shareLoading 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }}
        >
          {shareLoading ? 'Sharing...' : 'Share Album'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareAlbum;