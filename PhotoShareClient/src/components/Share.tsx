import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { fetchSharedAlbums } from '../slices/albumSlice';
import { AppDispatch } from '../store/store';
import { Album } from '../types/album';
import { useNavigate } from 'react-router-dom';

const SharedAlbums = () => {
    const { sharedAlbums, loading, msg } = useSelector((state: { album: { sharedAlbums: Album[], loading: boolean, msg: string } }) => state.album);
    const dispatch = useDispatch<AppDispatch>();
    const token = sessionStorage.getItem('token');
    const navigate=useNavigate();

    useEffect(() => {
        console.log("sharedAlbums",sharedAlbums,token);
        if (token) {
            dispatch(fetchSharedAlbums({ token }));
        }
        else(
            navigate('/auth')
        )
    }, [dispatch,token]);

    if (loading) {
        return <CircularProgress />;
    }

    if (msg) {
        return <Typography variant="h6" color="error">{msg}</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>אלבומים ששיתפו אותי</Typography>
            <Grid container spacing={2}>
                {sharedAlbums.length === 0 ? (
                    <Typography variant="body1">אין אלבומים ששיתפו אותי.</Typography>
                ) : (
                    sharedAlbums.map((album) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4}} key={album.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{album.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">{album.description}</Typography>
                                    {/* כאן תוכל להוסיף את התמונות של האלבום */}
                                    {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                                        {album.photos.map((photo) => (
                                            <img key={photo.id} src={photo.url} alt={photo.title} style={{ width: '100%', borderRadius: '5px' }} />
                                        ))}
                                    </div> */}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default SharedAlbums;
