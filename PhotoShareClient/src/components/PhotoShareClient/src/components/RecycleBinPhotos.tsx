import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { fetchRecyclePhotos } from '../slices/albumSlice'; // Ensure you have added deletePhoto
import { restorePhoto, deletePhoto } from '../slices/photoSlice'; // Ensure you have added deletePhoto
import { AppDispatch } from '../store/store';
import { Photo } from '../types/album'; // Assuming you have a Photo type defined
import { useNavigate } from 'react-router-dom';

const RecycleBinPhotos: React.FC = () => {
    const { recycledPhotos, loading, msg } = useSelector((state: { album: { recycledPhotos: Photo[], loading: boolean, msg: string } }) => state.album);
    const dispatch = useDispatch<AppDispatch>();
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("use effect פח מיחזור תמונות");
        
        if (token) {
            dispatch(fetchRecyclePhotos({ token }));
        } else {
            navigate('/auth');
        }
    }, [dispatch, token]);

    if (loading) {
        return <CircularProgress />;
    }

    if (msg) {
        return <Typography variant="h6" color="error">{msg}</Typography>;
    }

    const handleRestore = (photoId: number) => {
        if (token) {
            dispatch(restorePhoto({ token, photoId }));
        } else {
            navigate('/auth');
        }
    };

    const handleDelete = (photoId: number) => {
        if (token) {
            dispatch(deletePhoto({ token, photoId }));
        } else {
            navigate('/auth');
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>סל מיחזור תמונות</Typography>
            <Grid container spacing={2}>
                {recycledPhotos.length === 0 ? (
                    <Typography variant="body1">אין תמונות שנמחקו.</Typography>
                ) : (
                    recycledPhotos.map((photo) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={photo.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{photo.title}</Typography>
                                    <img src={photo.url} alt={photo.title} style={{ width: '100%', height: 'auto' }} />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleRestore(photo.id!)}
                                        sx={{ marginTop: 2 }}
                                    >
                                        שחזר תמונה
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(photo.id!)} // כפתור למחיקה
                                        sx={{ marginTop: 2, marginLeft: 2 }}
                                    >
                                        מחק תמונה
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default RecycleBinPhotos;