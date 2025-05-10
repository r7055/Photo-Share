import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { AppDispatch } from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Photo } from '../types/photo';
import { deletePhoto, getRecyclePhotos, restorePhoto } from '../slices/photoSlice';

const RecycleBinPhotos: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const { albumId } = useParams<{ albumId: string }>();


    const { recycledPhotos, loading, msg } = useSelector((state: { photo: { recycledPhotos: Photo[], loading: boolean, msg: string } }) => state.photo);
    
    useEffect(() => {
        console.log("use effect פח מיחזור תמונות");
        
        if (token) {
            dispatch(getRecyclePhotos({ token }));
            console.log("recycledPhotos", recycledPhotos);
            
        } else {
            navigate('/auth');
        }
    }, [dispatch, token, navigate]);

    if (loading) {
        return <CircularProgress />;
    }

    if (msg) {
        return <Typography variant="h6" color="error">{msg}</Typography>;
    }

    const handleRestore = (photoId: number, albumId: number) => {
        if (token) {
            dispatch(restorePhoto({ token, photoId, albumId }));
        } else {
            navigate('/auth');
        }
    };

    const handleDelete = (photoId: number,albumId:number) => {
        if (token) {
            dispatch(deletePhoto({ token, id: photoId, albumId:albumId }));
        } else {
            navigate('/auth');
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>סל מיחזור תמונות</Typography>
            <Grid container spacing={2}>
                dfa
               <div> {recycledPhotos.length}</div>
                fdsa
                {recycledPhotos.length === 0 ? (
                    <Typography variant="body1">אין תמונות שנמחקו.</Typography>
                ) : (
                    recycledPhotos.map((photo) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4}} key={photo.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{photo.name}</Typography>
                                    <img src={photo.url} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleRestore(photo.id!, Number(photo.albumId)!)} 
                                        sx={{ marginTop: 2 }}
                                    >
                                        שחזר תמונה
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => albumId && handleDelete(photo.id!, Number(albumId))}
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