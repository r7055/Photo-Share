// // // import React, { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { AppDispatch } from '../store/store';
// // // import { getPhotosByAlbumId } from '../slices/photoSlice';
// // // import { Box, Grid, Card, Typography } from '@mui/material';
// // // import { Photo } from '../types/photo';

// // // interface PhotoGalleryProps {
// // //     albumId: number;
// // // }

// // // const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
// // //     const dispatch = useDispatch<AppDispatch>();
// // //     const { photos, loading, msg } = useSelector((state: { photo: { photos: Photo[], loading: boolean, msg: string } }) => state.photo);
// // //     const token = sessionStorage.getItem('token');

// // //     useEffect(() => {
// // //         if (token) {
// // //             dispatch(getPhotosByAlbumId({ token, albumId }));
// // //         }
// // //     }, [dispatch, token, albumId]);

// // //     if (loading) return <div>Loading...</div>;
// // //     if (msg) return <div>{msg}</div>;

// // //     return (
// // //         <Box sx={{ mt: 3 }}>
// // //             <Typography variant="h5" sx={{ mb: 2 }}>תמונות מהאלבום</Typography>
// // //             <Grid container spacing={2}>
// // //                 {photos.map(photo => (
// // //                     <Grid item size={{ xs: 12, sm: 6, md: 4}} key={photo.id}>
// // //                         <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
// // //                             <img src={photo.url} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
// // //                             <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '5px' }}>
// // //                                 {photo.name}
// // //                             </Typography>
// // //                         </Card>
// // //                     </Grid>
// // //                 ))}
// // //             </Grid>
// // //         </Box>
// // //     );
// // // };

// // // export default PhotoGallery;
// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch } from '../store/store';
// // import { getPhotosByAlbumId, getDownloadUrl } from '../slices/photoSlice';
// // import { Box, Grid, Card, Typography, Button } from '@mui/material';
// // import { Photo } from '../types/photo';
// // import { useNavigate } from 'react-router-dom';

// // interface PhotoGalleryProps {
// //     albumId: number;
// // }

// // const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const { photos, loading, msg } = useSelector((state: { photo: { photos: Photo[], loading: boolean, msg: string } }) => state.photo);
// //     const token = sessionStorage.getItem('token');
// //     const navigate=useNavigate();

// //     useEffect(() => {
// //         if (token) {
// //             dispatch(getPhotosByAlbumId({ token, albumId }));
// //         }
// //         else(
// //             navigate('/auth')
// //         )
// //     }, [dispatch, token, albumId]);

// // const Download= async(fileName:string)=>{
// //     if (token) {
// //         return  await dispatch(getDownloadUrl({ token, fileName })).unwrap();
// //     }
// //     else(
// //         navigate('/auth')
// //     )
// // }

// //     const handleDownload = async (fileName: string) => {
// //         const downloadPhoto=Download(fileName);
// //     };

// //     if (loading) return <div>Loading...</div>;
// //     if (msg) return <div>{msg}</div>;

// //     return (
// //         <Box sx={{ mt: 3 }}>
// //             <Typography variant="h5" sx={{ mb: 2 }}>תמונות מהאלבום</Typography>
// //             <Grid container spacing={2}>
// //                 {photos.map(photo => (
// //                     <Grid item size={{ xs: 12, sm: 6, md: 4}} key={photo.id}>
// //                         <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>

// //                             <img src={Download(photo.name)} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
// //                             <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '5px' }}>
// //                                 {photo.name}
// //                             </Typography>
// //                             <Button
// //                                 variant="contained"
// //                                 color="primary"
// //                                 onClick={() => handleDownload(photo.name)} // קריאה להורדה
// //                                 sx={{ position: 'absolute', top: 5, right: 5 }}
// //                             >
// //                                 הורדה
// //                             </Button>
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
// import { AppDispatch } from '../../store/store';
// import { getPhotosByAlbumId } from '../../slices/photoSlice';
// import { Box, Grid, Card, Typography } from '@mui/material';
// import { Photo } from '../../types/photo';
// import { useNavigate } from 'react-router-dom';
// import DownloadPhoto from './DownloadPhoto'; // Adjust the import path as needed

// interface PhotoGalleryProps {
//     albumId: number;
// }

// const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { photos, loading, msg } = useSelector((state: { photo: { photos: Photo[], loading: boolean, msg: string } }) => state.photo);
//     const token = sessionStorage.getItem('token');
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (token) {
//             dispatch(getPhotosByAlbumId({ token, albumId }));
//         } else {
//             navigate('/auth');
//         }
//     }, [dispatch, token, albumId, navigate]);

//     if (loading) return <div>Loading...</div>;
//     if (msg) return <div>{msg}</div>;

//     return (
//         <Box sx={{ mt: 3 }}>
//             <Typography variant="h5" sx={{ mb: 2 }}>תמונות מהאלבום</Typography>
//             <Grid container spacing={2}>
//                 {photos.map(photo => (
//                     <Grid item size={{ xs: 12, sm: 6, md: 4}} key={photo.id}>
//                         <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
//                             <img src={photo.url} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
//                             {/* <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '5px' }}>
//                                 {photo.name}
//                             </Typography> */}
//                             <DownloadPhoto photo={photo} />



                            
                           
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
import { AppDispatch } from '../../store/store';
import { getPhotosByAlbumId } from '../../slices/photoSlice';
import { Box, Grid, Card, Typography } from '@mui/material';
import { Photo } from '../../types/photo';
import { useNavigate } from 'react-router-dom';
import DownloadPhoto from './DownloadPhoto'; // Adjust the import path as needed
import DeletePhoto from './DeletePhoto'; // Import the DeletePhoto component
import { Masonry } from '@mui/lab';

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

    if (loading) return <div>Loading...</div>;
    if (msg) return <div>{msg}</div>;

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>תמונות מהאלבום</Typography>
            <Masonry columns={3} spacing={2} sx={{ mt: 4 }}>
                {photos.map(photo => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={photo.id}>
                        <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                            <img src={photo.url} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
                            <DownloadPhoto photo={photo} />
                            {photo.id !== undefined &&  (
                                <DeletePhoto photoId={photo.id} albumId={albumId} />
                            )}
                        </Card>
                    </Grid>
                ))}
            </Masonry>
        </Box>
    );
};

export default PhotoGallery;
