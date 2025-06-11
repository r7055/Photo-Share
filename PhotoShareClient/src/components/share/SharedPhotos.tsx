import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Grid,
  CircularProgress,
  Alert,
  Container
} from '@mui/material';
import { Masonry } from '@mui/lab';
import {
  ZoomIn as ZoomInIcon,
  Share as ShareIcon,
  Info as InfoIcon,
  Tag as TagIcon,
  Visibility as ViewIcon,
  CalendarToday as CalendarIcon,
  Storage as StorageIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Download as DownloadIcon,
  PhotoLibrary as PhotoLibraryIcon
} from '@mui/icons-material';
import { clearMessage, getSharedPhotos } from '../../slices/photoSlice';
import { AppDispatch } from '../../store/store';
import { Photo } from '../../types/photo';

// SharedPhotoCard Component
interface SharedPhotoCardProps {
  photo: Photo;
  onOpenLightbox: (photo: Photo) => void;
  isLiked: boolean;
  onToggleLike: (photoId: string | number) => void;
}

const SharedPhotoCard: React.FC<SharedPhotoCardProps> = ({
  photo,
  onOpenLightbox,
  isLiked,
  onToggleLike
}) => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tagsToShow = showAllTags ? photo.tags : photo.tags?.slice(0, 2);
  const hasMoreTags = photo.tags && photo.tags.length > 2;

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {imageError ? (
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1',
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <PhotoLibraryIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Image unavailable
              </Typography>
            </Box>
          ) : (
            <CardMedia
              component="img"
              image={photo.url}
              alt={photo.name}
              sx={{
                width: '100%',
                aspectRatio: '1',
                objectFit: 'cover',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => onOpenLightbox(photo)}
              onError={() => setImageError(true)}
            />
          )}

          {/* Zoom overlay button */}
          <IconButton
            onClick={() => onOpenLightbox(photo)}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
              opacity: 0,
              transition: 'opacity 0.3s',
              '.MuiCard-root:hover &': {
                opacity: 1,
              },
            }}
          >
            <ZoomInIcon />
          </IconButton>

          {/* Photo name overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: '0.85rem',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {photo.name}
            </Typography>
          </Box>

          {/* Views counter */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 2,
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <ViewIcon sx={{ fontSize: '0.8rem', color: 'white' }} />
            <Typography
              variant="caption"
              sx={{ color: 'white', fontSize: '0.75rem' }}
            >
              {photo.countViews || 0}
            </Typography>
          </Box>

          {/* Tags section */}
          {photo.tags && photo.tags.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                right: 8,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {tagsToShow?.map((tag, index) => (
                <Chip
                  key={index}
                  icon={<TagIcon sx={{ fontSize: '0.8rem' }} />}
                  label={tag.name}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(76, 175, 80, 0.9)',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 24,
                    '& .MuiChip-icon': {
                      color: 'white',
                    },
                  }}
                />
              ))}
              {hasMoreTags && !showAllTags && (
                <Chip
                  label={`+${photo.tags.length - 2} more`}
                  size="small"
                  clickable
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllTags(true);
                  }}
                  sx={{
                    backgroundColor: 'rgba(63, 81, 181, 0.9)',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 24,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(63, 81, 181, 1)',
                    },
                  }}
                />
              )}
              {showAllTags && hasMoreTags && (
                <Chip
                  label="hide"
                  size="small"
                  clickable
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllTags(false);
                  }}
                  sx={{
                    backgroundColor: 'rgba(158, 158, 158, 0.9)',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 24,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(158, 158, 158, 1)',
                    },
                  }}
                />
              )}
            </Box>
          )}
        </Box>

        <CardActions
          sx={{
            justifyContent: 'space-between',
            backgroundColor: 'background.paper',
            p: 1,
          }}
        >
          <Box>
            <Tooltip title="View details">
              <IconButton
                size="small"
                sx={{ color: 'primary.main' }}
                onClick={() => setOpenDetailsModal(true)}
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share photo">
              <IconButton
                size="small"
                sx={{ color: 'success.main' }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
              <IconButton
                size="small"
                sx={{ color: isLiked ? 'error.main' : 'text.secondary' }}
                onClick={() => photo.id !== undefined && onToggleLike(photo.id)}
              >
                {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton
                size="small"
                sx={{ color: 'info.main' }}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>

      {/* Photo Details Modal */}
      <Dialog
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" component="div">
            Photo Details
          </Typography>
          <IconButton
            onClick={() => setOpenDetailsModal(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs:12, md:6}}>
              <Box
                component="img"
                src={photo.url}
                alt={photo.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                onError={() => setImageError(true)}
              />
            </Grid>
            <Grid size={{ xs:12, md:6}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {photo.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ViewIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Views: {photo.countViews?.toLocaleString() || 0}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StorageIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    File size: {formatFileSize(photo.size)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Shared by: User #{photo.userId}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Created: {formatDate(photo.createdAt)}
                  </Typography>
                </Box>

                {photo.tags && photo.tags.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TagIcon fontSize="small" />
                      Tags ({photo.tags.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {photo.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: 'success.main',
                            color: 'success.main',
                            '&:hover': {
                              backgroundColor: 'success.light',
                              opacity: 0.1
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button onClick={() => setOpenDetailsModal(false)} variant="outlined">
            Close
          </Button>
          <Button
            onClick={() => onOpenLightbox(photo)}
            variant="contained"
            startIcon={<ZoomInIcon />}
          >
            View Fullscreen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Main SharedPhotos Component
const SharedPhotos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sharedPhotos, loading, msg } = useSelector(
    (state: { photo: { sharedPhotos: Photo[]; loading: boolean; msg: string | null } }) => state.photo
  );

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Set<string | number>>(new Set());

  const token = sessionStorage.getItem("token") || "";
  const userId = useSelector((state: { user: { user: { id: number } } }) => state.user.user.id) as number;

  useEffect(() => {
    if (token && typeof userId === 'number' && !isNaN(userId)) {
      dispatch(getSharedPhotos({ token, userId }));
    }
    return () => {
      dispatch(clearMessage());
    }
  }, [dispatch, token, userId]);

  const handleOpenLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  const toggleLike = (photoId: string | number) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Loading shared photos...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Error state
  if (msg && (msg.includes('Failed') || msg.includes('Error'))) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={() => {
                if (token && typeof userId === 'number' && !isNaN(userId)) {
                  dispatch(getSharedPhotos({ token, userId }));
                }
              }}
            >
              Try Again
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          {msg}
        </Alert>
      </Container>
    );
  }

  // No photos state
  if (!sharedPhotos || sharedPhotos.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <PhotoLibraryIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.primary">
            No shared photos yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Photos shared with you will appear here ✨
          </Typography>
        </Box>
      </Container>
    );
  }

  // Main content
  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Shared Memories
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Discover beautiful moments shared by your community
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ViewIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              {sharedPhotos.reduce((sum, photo) => sum + (photo.countViews || 0), 0)} total views
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhotoLibraryIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              {sharedPhotos.length} photos
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Photos Grid */}
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
        {sharedPhotos.map((photo, index) => (
          <SharedPhotoCard
            key={photo.id ? String(photo.id) : `photo-${index}`}
            photo={photo}
            onOpenLightbox={handleOpenLightbox}
            isLiked={photo.id !== undefined ? likedPhotos.has(photo.id) : false}
            onToggleLike={toggleLike}
          />
        ))}
      </Masonry>

      {/* Lightbox Modal - You'll need to implement PhotoLightbox component */}
      {selectedPhoto && (
        <Dialog
          open={openLightbox}
          onClose={handleCloseLightbox}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              borderRadius: 0,
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '90vh',
              p: 2
            }}
          >
            <IconButton
              onClick={handleCloseLightbox}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={selectedPhoto.url}
              alt={selectedPhoto.name}
              sx={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            />
          </Box>
        </Dialog>
      )}
    </Container>
  );
};

export default SharedPhotos;
