import React, { useState } from "react";
import {
    Card,
    CardMedia,
    CardActions,
    IconButton,
    Tooltip,
    Box,
    Chip,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
    Grid,
} from "@mui/material";
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
} from "@mui/icons-material";
import type { Photo } from "../../types/photo";
import DownloadPhoto from "./DownloadPhoto";
import DeletePhoto from "./DeletePhoto";
import SharePhoto from "./SharePhoto";

interface PhotoCardProps {
    photo: Photo;
    onOpenLightbox: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onOpenLightbox }) => {
    const [openShareModal, setOpenShareModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
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

    const tagsToShow = showAllTags ? photo.tags : photo.tags?.slice(0, 1);
    const hasMoreTags = photo.tags && photo.tags.length > 1;

    return (
        <>
            <Card
                sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
                    },
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        image={photo.url}
                        alt={photo.name}
                        sx={{
                            width: "100%",
                            aspectRatio: "1",
                            objectFit: "cover",
                            cursor: "pointer",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                        onClick={() => onOpenLightbox(photo)}
                    />
                    <IconButton
                        onClick={() => onOpenLightbox(photo)}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                            },
                            opacity: 0,
                            transition: "opacity 0.3s",
                            ".MuiCard-root:hover &": {
                                opacity: 1,
                            },
                        }}
                    >
                        <ZoomInIcon />
                    </IconButton>

                    {/* Photo Name Overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            right: 8,
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            borderRadius: "8px",
                            px: 1.5,
                            py: 0.5,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "white",
                                fontWeight: 500,
                                fontSize: "0.85rem",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {photo.name}
                        </Typography>
                    </Box>

                    {/* Tags Section */}
                    {photo.tags && photo.tags.length > 0 && (
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 8,
                                left: 8,
                                right: 8,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                alignItems: "center",
                            }}
                        >
                            {tagsToShow?.map((tag, index) => (
                                <Chip
                                    key={index}
                                    icon={<TagIcon sx={{ fontSize: "0.8rem" }} />}
                                    label={tag.name}
                                    size="small"
                                    sx={{
                                        backgroundColor: "rgba(76, 175, 80, 0.9)",
                                        color: "white",
                                        fontSize: "0.7rem",
                                        height: 24,
                                        "& .MuiChip-icon": {
                                            color: "white",
                                        },
                                    }}
                                />
                            ))}
                            {hasMoreTags && !showAllTags && (
                                <Chip
                                    label={`+${photo.tags.length - 1} עוד`}
                                    size="small"
                                    clickable
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAllTags(true);
                                    }}
                                    sx={{
                                        backgroundColor: "rgba(63, 81, 181, 0.9)",
                                        color: "white",
                                        fontSize: "0.7rem",
                                        height: 24,
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "rgba(63, 81, 181, 1)",
                                        },
                                    }}
                                />
                            )}
                            {showAllTags && hasMoreTags && (
                                <Chip
                                    label="הסתר"
                                    size="small"
                                    clickable
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAllTags(false);
                                    }}
                                    sx={{
                                        backgroundColor: "rgba(158, 158, 158, 0.9)",
                                        color: "white",
                                        fontSize: "0.7rem",
                                        height: 24,
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "rgba(158, 158, 158, 1)",
                                        },
                                    }}
                                />
                            )}
                        </Box>
                    )}
                </Box>

                <CardActions
                    sx={{
                        justifyContent: "space-between",
                        backgroundColor: "background.paper",
                        p: 1,
                    }}
                >
                    <Box>
                        <Tooltip title="צפה בפרטים">
                            <IconButton 
                                size="small" 
                                sx={{ color: "#3f51b5" }}
                                onClick={() => setOpenDetailsModal(true)}
                            >
                                <InfoIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="שתף תמונה">
                            <IconButton 
                                size="small" 
                                sx={{ color: "#4caf50" }} 
                                onClick={() => setOpenShareModal(true)}
                            >
                                <ShareIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box>
                        <DownloadPhoto photo={photo} />
                        {photo.id !== undefined && <DeletePhoto photoId={photo.id} albumId={photo.albumId} />}
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
                        borderRadius: "12px",
                        direction: "rtl",
                    }
                }}
            >
                <DialogTitle sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    pb: 1 
                }}>
                    <Typography variant="h6" component="div">
                        פרטי התמונה
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
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        {photo.name}
                                    </Typography>
                                </Box>
                                
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <ViewIcon color="action" fontSize="small" />
                                    <Typography variant="body2" color="text.secondary">
                                        צפיות: {photo.countViews?.toLocaleString() || 0}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <StorageIcon color="action" fontSize="small" />
                                    <Typography variant="body2" color="text.secondary">
                                        גודל קובץ: {formatFileSize(photo.size)}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <PersonIcon color="action" fontSize="small" />
                                    <Typography variant="body2" color="text.secondary">
                                        מזהה משתמש: {photo.userId}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CalendarIcon color="action" fontSize="small" />
                                    <Typography variant="body2" color="text.secondary">
                                        נוצר: {formatDate(photo.createdAt)}
                                    </Typography>
                                </Box>

                                {photo.tags && photo.tags.length > 0 && (
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <TagIcon fontSize="small" />
                                            תגיות ({photo.tags.length})
                                        </Typography>
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                            {photo.tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag.name}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        borderColor: "#4caf50",
                                                        color: "#4caf50",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(76, 175, 80, 0.1)",
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
                        סגור
                    </Button>
                    <Button 
                        onClick={() => onOpenLightbox(photo)} 
                        variant="contained"
                        startIcon={<ZoomInIcon />}
                    >
                        צפה במסך מלא
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Share Photo Modal */}
            {photo.id !== undefined && (
                <SharePhoto
                    open={openShareModal}
                    onClose={() => setOpenShareModal(false)}
                    photoId={photo.id}
                />
            )}
        </>
    );
};

export default PhotoCard;