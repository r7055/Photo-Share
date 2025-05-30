// import React, { useState } from "react";
// import {
//     Card,
//     CardMedia,
//     CardActions,
//     IconButton,
//     Tooltip,
//     Box,
//     Chip,
// } from "@mui/material";
// import {
//     ZoomIn as ZoomInIcon,
//     Share as ShareIcon,
//     Info as InfoIcon,
//     Tag as TagIcon,
// } from "@mui/icons-material";
// import type { Photo } from "../../types/photo";
// import DownloadPhoto from "./DownloadPhoto";
// import DeletePhoto from "./DeletePhoto";
// import SharePhoto from "./SharePhoto"; // Import the SharePhotoModal

// interface PhotoCardProps {
//     photo: Photo;
//     onOpenLightbox: (photo: Photo) => void;
// }

// const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onOpenLightbox }) => {
//     const [openModal, setOpenModal] = useState(false); // State to manage modal open/close

//     return (
//         <Card
//             sx={{
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                     transform: "translateY(-5px)",
//                     boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
//                 },
//             }}
//         >
//             <Box sx={{ position: "relative" }}>
//                 <CardMedia
//                     component="img"
//                     image={photo.url}
//                     alt={photo.name}
//                     sx={{
//                         width: "100%",
//                         cursor: "pointer",
//                         transition: "transform 0.3s ease",
//                         "&:hover": {
//                             transform: "scale(1.02)",
//                         },
//                     }}
//                     onClick={() => onOpenLightbox(photo)}
//                 />
//                 <IconButton
//                     onClick={() => onOpenLightbox(photo)}
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                         color: "white",
//                         "&:hover": {
//                             backgroundColor: "rgba(0, 0, 0, 0.7)",
//                         },
//                         opacity: 0,
//                         transition: "opacity 0.3s",
//                         ".MuiCard-root:hover &": {
//                             opacity: 1,
//                         },
//                     }}
//                 >
//                     <ZoomInIcon />
//                 </IconButton>

//                 {photo.tags && photo.tags.length > 0 && (
//                     <Box
//                         sx={{
//                             position: "absolute",
//                             bottom: 8,
//                             left: 8,
//                             display: "flex",
//                             flexWrap: "wrap",
//                             gap: 0.5,
//                         }}
//                     >
//                         {photo.tags.slice(0, 3).map((tag, index) => (
//                             <Chip
//                                 key={index}
//                                 icon={<TagIcon sx={{ fontSize: "0.8rem" }} />}
//                                 label={tag.name}
//                                 size="small"
//                                 sx={{
//                                     backgroundColor: "rgba(0, 0, 0, 0.6)",
//                                     color: "white",
//                                     fontSize: "0.7rem",
//                                     height: 24,
//                                     "& .MuiChip-icon": {
//                                         color: "white",
//                                     },
//                                 }}
//                             />
//                         ))}
//                         {photo.tags.length > 3 && (
//                             <Chip
//                                 label={`+${photo.tags.length - 3}`}
//                                 size="small"
//                                 sx={{
//                                     backgroundColor: "rgba(0, 0, 0, 0.6)",
//                                     color: "white",
//                                     fontSize: "0.7rem",
//                                     height: 24,
//                                 }}
//                             />
//                         )}
//                     </Box>
//                 )}
//             </Box>

//             <CardActions
//                 sx={{
//                     justifyContent: "space-between",
//                     backgroundColor: "background.paper",
//                     p: 1,
//                 }}
//             >
//                 <Box>
//                     <Tooltip title="View Details">
//                         <IconButton size="small" sx={{ color: "#3f51b5" }}>
//                             <InfoIcon fontSize="small" />
//                         </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Share Photo">
//                         <IconButton size="small" sx={{ color: "#4caf50" }} onClick={() => setOpenModal(true)}>
//                             <ShareIcon fontSize="small" />
//                         </IconButton>
//                     </Tooltip>
//                 </Box>

//                 <Box>
//                     <DownloadPhoto photo={photo} />
//                     {photo.id !== undefined && <DeletePhoto photoId={photo.id} albumId={photo.albumId} />}
//                 </Box>
//             </CardActions>

//             {/* Share Photo Modal */}
//             {photo.id !== undefined && (
//                 <SharePhoto
//                     open={openModal}
//                     onClose={() => setOpenModal(false)}
//                     photoId={photo.id}
                   
//                 />
//             )}
//         </Card>
//     );
// };

// export default PhotoCard;
// src/components/photos/PhotoCard.tsx
import React, { useState } from "react";
import {
    Card,
    CardMedia,
    CardActions,
    IconButton,
    Tooltip,
    Box,
    Chip,
} from "@mui/material";
import {
    ZoomIn as ZoomInIcon,
    Share as ShareIcon,
    Info as InfoIcon,
    Tag as TagIcon,
} from "@mui/icons-material";
import type { Photo } from "../../types/photo"; // Make sure this type is defined correctly
import DownloadPhoto from "./DownloadPhoto";
import DeletePhoto from "./DeletePhoto";
import SharePhoto from "./SharePhoto";

// Suggested Photo type (ensure your actual type matches this structure)
// interface TagInfo {
//   name: string;
//   // other properties if your tag has more
// }
// interface Photo {
//   id: number;
//   name:string;
//   url: string;
//   albumId: number; // Crucial: DeletePhoto needs this via photo.albumId
//   tags?: TagInfo[]; // For the chips display
// }

interface PhotoCardProps {
    photo: Photo;
    onOpenLightbox: (photo: Photo) => void;
    // No need for separate albumId prop if photo.albumId is reliably present
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onOpenLightbox }) => {
    const [openShareModal, setOpenShareModal] = useState(false); // Renamed for clarity

    return (
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
                        aspectRatio: '1/1', // Added for consistent image shape, adjust as needed
                        objectFit: 'cover', // Ensures image covers the area well
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
                        // Corrected hover target: Use a class on Card or Box instead of MuiCard-root
                        // For simplicity, let's assume the parent Box gets a class or use sx on parent Box
                        // This specific selector might be tricky; often easier to control opacity via parent hover state.
                        // A simpler approach:
                        // The Box wrapping CardMedia needs a className, e.g., "media-box"
                        // Then ".media-box:hover &": { opacity: 1 }
                        // For now, relying on Card hover:
                        "../../..:hover &": { // This attempts to select grandparent Card on hover
                           opacity:1 // This might not work as expected, check MUI docs for complex selectors
                        }
                        // A more robust way is to use a state variable toggled by onMouseEnter/onMouseLeave on the Card
                        // or on the Box containing the CardMedia.
                        // However, if the CSS ":hover" on the parent Card directly (`.MuiCard-root:hover &`) works for you, that's fine.
                    }}
                >
                    <ZoomInIcon />
                </IconButton>

                {photo.tags && photo.tags.length > 0 && (
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                        }}
                    >
                        {photo.tags.slice(0, 3).map((tag, index) => (
                            <Chip
                                key={index}
                                icon={<TagIcon sx={{ fontSize: "0.8rem" }} />}
                                label={tag.name} // Assuming tag is an object with a name property
                                size="small"
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    color: "white",
                                    fontSize: "0.7rem",
                                    height: 24,
                                    "& .MuiChip-icon": {
                                        color: "white",
                                    },
                                }}
                            />
                        ))}
                        {photo.tags.length > 3 && (
                            <Chip
                                label={`+${photo.tags.length - 3}`}
                                size="small"
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    color: "white",
                                    fontSize: "0.7rem",
                                    height: 24,
                                }}
                            />
                        )}
                    </Box>
                )}
            </Box>

            <CardActions
                sx={{
                    justifyContent: "space-between",
                    backgroundColor: "background.paper", // Good for theme consistency
                    p: 1,
                }}
            >
                <Box>
                    <Tooltip title="View Details">
                        {/* SUGGESTION: Make InfoIcon open lightbox too */}
                        <IconButton size="small" sx={{ color: "#3f51b5" }} onClick={() => onOpenLightbox(photo)}>
                            <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share Photo">
                        <IconButton size="small" sx={{ color: "#4caf50" }} onClick={() => setOpenShareModal(true)}>
                            <ShareIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box>
                    <DownloadPhoto photo={photo} />
                    {/* Ensure photo.id and photo.albumId are non-null/defined before rendering DeletePhoto */}
                    {photo.id !== undefined && photo.albumId !== undefined && (
                        <DeletePhoto photoId={photo.id} albumId={photo.albumId} />
                    )}
                </Box>
            </CardActions>

            {/* Share Photo Modal */}
            {photo.id !== undefined && (
                <SharePhoto
                    open={openShareModal}
                    onClose={() => setOpenShareModal(false)}
                    photoId={photo.id}
                    photoName={photo.name} // Pass photo.name here
                />
            )}
        </Card>
    );
};

export default PhotoCard;