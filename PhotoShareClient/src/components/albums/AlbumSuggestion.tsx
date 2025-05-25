// import React, { useEffect, useState } from 'react';
// import { Button, Snackbar, Alert } from '@mui/material';
// // import { useDispatch } from 'react-redux';

// interface AlbumSuggestionProps {
//     open: boolean;
//     onClose: () => void;
//     imageUrl: string;
    
// }

// const AlbumSuggestion: React.FC<AlbumSuggestionProps> = ({ open, onClose, imageUrl }) => {
//     const [suggestedAlbum, setSuggestedAlbum] = useState<string | null>(null);
//     // const dispatch = useDispatch();

//     useEffect(() => {
//         if (open && imageUrl) {
//             fetchBestAlbum();
//         }
//     }, [open, imageUrl]);

//     const fetchBestAlbum = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/best_album', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     photo_name: imageUrl,
//                     albums: ['album1', 'album2', 'album3'], // רשימת האלבומים שלך
//                 }),
//             });

//             const data = await response.json();
//             setSuggestedAlbum(data.best_album);
//         } catch (error) {
//             console.error('Error fetching best album:', error);
//         }
//     };

//     const handleAddToAlbum = async () => {
//         if (suggestedAlbum) {
//             const photoData = {
//                 url: imageUrl,
//                 albumId: suggestedAlbum,
//                 // הוסף פרטים נוספים אם נדרש
//             };
//             console.log('Adding photo to album:', photoData);
//             // כאן תוכל להוסיף את הקוד להוספת התמונה לאלבום
//            // await dispatch(addPhoto({ token, photo: photoData }));
//             onClose(); // סגירת ההודעה לאחר ההוספה
//         }
//     };

//     return (
//         <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
//             <Alert onClose={onClose} severity="info" sx={{ width: '100%'}}>
//                 {suggestedAlbum ? (
//                     <>
//                         האם תרצה להוסיף את התמונה לאלבום: {suggestedAlbum}?
//                         <Button onClick={handleAddToAlbum} color="inherit">אישור</Button>
//                         <Button onClick={onClose} color="inherit">סגור</Button>
//                     </>
//                 ) : (
//                     "מחפש אלבום מתאים..."
//                 )}
//             </Alert>
//         </Snackbar>
//     );
// };

// export default AlbumSuggestion;
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button, Snackbar, Alert, Box, Typography, CircularProgress, Fade, Chip, Avatar } from "@mui/material"
// import { useDispatch } from "react-redux"
// import type { AppDispatch } from "../../store/store"
import { Check, Folder, Close } from "@mui/icons-material"

interface AlbumSuggestionProps {
  open: boolean
  onClose: () => void
  imageUrl: string
}

const AlbumSuggestion: React.FC<AlbumSuggestionProps> = ({ open, onClose, imageUrl }) => {
  const [suggestedAlbum, setSuggestedAlbum] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
//   const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (open && imageUrl) {
      fetchBestAlbum()
    }
  }, [open, imageUrl])

  const fetchBestAlbum = async () => {
    setLoading(true)
    try {
      // Simulate API call with a delay
      setTimeout(() => {
        // This is a mock response - in a real app, you'd call your AI service
        const mockAlbums = ["Family", "Vacation", "Nature", "Food", "Pets"]
        const randomAlbum = mockAlbums[Math.floor(Math.random() * mockAlbums.length)]
        setSuggestedAlbum(randomAlbum)
        setLoading(false)
      }, 2000)

      // In a real implementation, you'd use your actual API:
      /*
      const response = await fetch('http://localhost:5000/best_album', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo_name: imageUrl,
          albums: ['album1', 'album2', 'album3'],
        }),
      });

      const data = await response.json();
      setSuggestedAlbum(data.best_album);
      setLoading(false);
      */
    } catch (error) {
      console.error("Error fetching best album:", error)
      setLoading(false)
    }
  }

  const handleAddToAlbum = async () => {
    if (suggestedAlbum) {
      const token = sessionStorage.getItem("token")
      if (token) {
        const photoData = {
          url: imageUrl,
          albumId: suggestedAlbum,
          // Add additional details if needed
        }
        console.log("Adding photo to album:", photoData)
        // Here you would add the code to add the photo to the album
        // await dispatch(addPhoto({ token, photo: photoData }));
        onClose() // Close the message after adding
      }
    }
  }

  if (!open) return null

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity="info"
        variant="filled"
        sx={{
          width: "100%",
          backgroundColor: "#1a1f36",
          color: "white",
          border: "1px solid rgba(0, 198, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          "& .MuiAlert-icon": {
            color: "#00c6ff",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: loading ? 2 : 0 }}>
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ color: "#00c6ff", mr: 2 }} />
              <Typography variant="body1">AI is analyzing your photo...</Typography>
            </>
          ) : suggestedAlbum ? (
            <>
              <Fade in={!loading} timeout={500}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ bgcolor: "#00c6ff", mr: 1.5 }}>
                      <Folder />
                    </Avatar>
                    <Typography variant="body1">
                      AI suggests adding this photo to the{" "}
                      <Chip label={suggestedAlbum} size="small" sx={{ mx: 0.5, fontWeight: "bold" }} /> album
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                    <Button
                      onClick={onClose}
                      size="small"
                      startIcon={<Close />}
                      sx={{
                        mr: 1,
                        color: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Ignore
                    </Button>
                    <Button
                      onClick={handleAddToAlbum}
                      variant="contained"
                      size="small"
                      startIcon={<Check />}
                      sx={{
                        background: "linear-gradient(100deg, #00c6ff, #0072ff)",
                        color: "white",
                        "&:hover": {
                          background: "linear-gradient(100deg, #0072ff, #00c6ff)",
                        },
                      }}
                    >
                      Add to Album
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </>
          ) : (
            <Typography variant="body1">No suitable album found for this photo.</Typography>
          )}
        </Box>
      </Alert>
    </Snackbar>
  )
}

export default AlbumSuggestion
