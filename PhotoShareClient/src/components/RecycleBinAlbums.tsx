import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { fetchRecycleAlbums, restoreAlbum, deleteAlbum } from '../slices/albumSlice';
import { AppDispatch } from '../store/store';
import { Album } from '../types/album';
import { useNavigate } from 'react-router-dom';

const RecycleBinAlbums: React.FC = () => {
    const { recycledAlbums, loading, msg } = useSelector((state: { album: { recycledAlbums: Album[], loading: boolean, msg: string } }) => state.album);
    const dispatch = useDispatch<AppDispatch>();
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            console.log("use effect פח מיחזור אלבומים");
            
            dispatch(fetchRecycleAlbums({ token }));
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

    const handleRestore = (albumId: number) => {
        if (token) {
            dispatch(restoreAlbum({ token, albumId }));
        } else {
            navigate('/auth');
        }
    };

    const handleDelete = (albumId: number) => {
        if (token) {
            dispatch(deleteAlbum({ token, albumId }));
        } else {
            navigate('/auth');
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>סל מיחזור - אלבומים</Typography>
            <Grid container spacing={2}>
                {recycledAlbums.length === 0 ? (
                    <Typography variant="body1">אין אלבומים שנמחקו.</Typography>
                ) : (
                    recycledAlbums.map((album) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={album.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{album.title}</Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleRestore(album.id!)}
                                        sx={{ marginTop: 2 }}
                                    >
                                        שחזר אלבום
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(album.id!)}
                                        sx={{ marginTop: 2, marginLeft: 2 }}
                                    >
                                        מחק אלבום
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

export default RecycleBinAlbums;