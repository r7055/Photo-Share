// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch } from '../store/store';
// // import { getPhotosByAlbumId } from '../slices/photoSlice';
// // import { Box, Grid, Card, Typography } from '@mui/material';
// // import { Photo } from '../types/photo';

// // interface PhotoGalleryProps {
// //     albumId: number;
// // }

// // const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const { photos, loading, msg } = useSelector((state: { photo: { photos: Photo[], loading: boolean, msg: string } }) => state.photo);
// //     const token = sessionStorage.getItem('token');

// //     useEffect(() => {
// //         if (token) {
// //             dispatch(getPhotosByAlbumId({ token, albumId }));
// //         }
// //     }, [dispatch, token, albumId]);

// //     if (loading) return <div>Loading...</div>;
// //     if (msg) return <div>{msg}</div>;

// //     return (
// //         <Box sx={{ mt: 3 }}>
// //             <Typography variant="h5" sx={{ mb: 2 }}>תמונות מהאלבום</Typography>
// //             <Grid container spacing={2}>
// //                 {photos.map(photo => (
// //                     <Grid item xs={12} sm={6} md={4} key={photo.id}>
// //                         <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
// //                             <img src={photo.url} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
// //                             <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '5px' }}>
// //                                 {photo.name}
// //                             </Typography>
// //                         </Card>
// //                     </Grid>
// //                 ))}
// //             </Grid>
// //         </Box>
// //     );
// // };

// // export default PhotoGallery;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { getPhotosByAlbumId, getDownloadUrl } from '../slices/photoSlice';
// import { Box, Grid, Card, Typography, Button } from '@mui/material';
// import { Photo } from '../types/photo';
// import { useNavigate } from 'react-router-dom';

// interface PhotoGalleryProps {
//     albumId: number;
// }

// const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { photos, loading, msg } = useSelector((state: { photo: { photos: Photo[], loading: boolean, msg: string } }) => state.photo);
//     const token = sessionStorage.getItem('token');
//     const navigate=useNavigate();

//     useEffect(() => {
//         if (token) {
//             dispatch(getPhotosByAlbumId({ token, albumId }));
//         }
//         else(
//             navigate('/auth')
//         )
//     }, [dispatch, token, albumId]);

// const Download= async(fileName:string)=>{
//     if (token) {
//         return  await dispatch(getDownloadUrl({ token, fileName })).unwrap();
//     }
//     else(
//         navigate('/auth')
//     )
// }

//     const handleDownload = async (fileName: string) => {
//         const downloadPhoto=Download(fileName);
//     };

//     if (loading) return <div>Loading...</div>;
//     if (msg) return <div>{msg}</div>;

//     return (
//         <Box sx={{ mt: 3 }}>
//             <Typography variant="h5" sx={{ mb: 2 }}>תמונות מהאלבום</Typography>
//             <Grid container spacing={2}>
//                 {photos.map(photo => (
//                     <Grid item xs={12} sm={6} md={4} key={photo.id}>
//                         <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>

//                             <img src={Download(photo.name)} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
//                             <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '5px' }}>
//                                 {photo.name}
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => handleDownload(photo.name)} // קריאה להורדה
//                                 sx={{ position: 'absolute', top: 5, right: 5 }}
//                             >
//                                 הורדה
//                             </Button>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// };

// export default PhotoGallery;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getPhotosByAlbumId, getDownloadUrl } from '../slices/photoSlice';
import { Box, Grid, Card, Typography, Button } from '@mui/material';
import { Photo } from '../types/photo';
import { useNavigate } from 'react-router-dom';

interface PhotoGalleryProps {
    albumId: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { photos, loading, msg } = useSelector((state: { photo: { photos: Photo[], loading: boolean, msg: string } }) => state.photo);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            dispatch(getPhotosByAlbumId({ token, albumId }));
        } else {
            navigate('/auth');
        }
    }, [dispatch, token, albumId, navigate]);

    const handleDownload = async (fileName: string) => {
        if (token) {
            try {
                const downloadUrl = await dispatch(getDownloadUrl({ token, fileName })).unwrap();
                const link = document.createElement('a');
                link.href = downloadUrl; // Assuming the download URL is returned
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        } else {
            navigate('/auth');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (msg) return <div>{msg}</div>;

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>תמונות מהאלבום</Typography>
            <Grid container spacing={2}>
                {photos.map(photo => (
                    <Grid item xs={12} sm={6} md={4} key={photo.id}>
                        <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                            <img src={photo.url} alt={photo.name} style={{ width: '100%', height: 'auto' }} /> {/* Assuming photo.url is the image source */}
                            <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '5px' }}>
                                {photo.name}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleDownload(photo.name)} // קריאה להורדה
                                sx={{ position: 'absolute', top: 5, right: 5 }}
                            >
                                הורדה
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PhotoGallery;
