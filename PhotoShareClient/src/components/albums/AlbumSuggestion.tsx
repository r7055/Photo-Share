import React, { useEffect, useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../../slices/photoSlice';

interface AlbumSuggestionProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    token: string;
}

const AlbumSuggestion: React.FC<AlbumSuggestionProps> = ({ open, onClose, imageUrl, token }) => {
    const [suggestedAlbum, setSuggestedAlbum] = useState<string | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (open && imageUrl) {
            fetchBestAlbum();
        }
    }, [open, imageUrl]);

    const fetchBestAlbum = async () => {
        try {
            const response = await fetch('http://localhost:5000/best_album', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    photo_name: imageUrl,
                    albums: ['album1', 'album2', 'album3'], // רשימת האלבומים שלך
                }),
            });

            const data = await response.json();
            setSuggestedAlbum(data.best_album);
        } catch (error) {
            console.error('Error fetching best album:', error);
        }
    };

    const handleAddToAlbum = async () => {
        if (suggestedAlbum) {
            const photoData = {
                url: imageUrl,
                albumId: suggestedAlbum,
                // הוסף פרטים נוספים אם נדרש
            };
            console.log('Adding photo to album:', photoData);
            // כאן תוכל להוסיף את הקוד להוספת התמונה לאלבום
           // await dispatch(addPhoto({ token, photo: photoData }));
            onClose(); // סגירת ההודעה לאחר ההוספה
        }
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="info" sx={{ width: '100%'}}>
                {suggestedAlbum ? (
                    <>
                        האם תרצה להוסיף את התמונה לאלבום: {suggestedAlbum}?
                        <Button onClick={handleAddToAlbum} color="inherit">אישור</Button>
                        <Button onClick={onClose} color="inherit">סגור</Button>
                    </>
                ) : (
                    "מחפש אלבום מתאים..."
                )}
            </Alert>
        </Snackbar>
    );
};

export default AlbumSuggestion;
