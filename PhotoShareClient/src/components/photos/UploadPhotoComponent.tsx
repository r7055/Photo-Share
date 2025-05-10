// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { uploadPhoto, getDownloadUrl, addPhoto, deletePhoto } from '../slices/photoSlice';
// import { createTag, getUserTags } from '../slices/tagSlice';
// import { AppDispatch } from '../store/store';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Box, Button, TextField, Typography, CircularProgress, Autocomplete, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { Tag } from '../types/tag';

// interface UploadPhotoComponentProps {
//     open: boolean;
//     onClose: () => void;
// }

// const UploadPhotoComponent: React.FC<UploadPhotoComponentProps> = ({ open, onClose }) => {
//     const { parentId } = useParams<{ parentId: string }>();
//     const [file, setFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [imageUrl, setImageUrl] = useState<string | null>(null);
//     const [selectedTags, setSelectedTags] = useState<string[]>([]);
//     const [newTag, setNewTag] = useState('');
//     const token = sessionStorage.getItem('token');
//     const dispatch = useDispatch<AppDispatch>();
//     const tags = useSelector((state: any) => state.tags.tags);
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (token) {
//             dispatch(getUserTags(token));
//         }
//         else (
//             navigate('/auth')
//         )
//     }, [dispatch, token]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFile(event.target.files[0]);
//         }
//     };

//     const handleTagChange = (event: any, value: string[]) => {
//         console.log(event, value);
//         setSelectedTags(value);
//     };

//     const handleAddTag = async () => {
//         if (newTag) {
//             await dispatch(createTag({ token: token!, tagPostModel: { name: newTag } }));
//             setNewTag('');
//         }
//     };

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (!file) return;

//         setLoading(true);
//         const fileName = file.name;

//         try {
//             if (!token) {
//                 throw new Error('Token is required for uploading photos.');
//             }
//             const uploadResponse = await dispatch(uploadPhoto({ token, fileName, file }));

//             if (uploadResponse.meta.requestStatus === 'fulfilled') {
//                 const downloadResponse = await dispatch(getDownloadUrl({ token, fileName }));

//                 if (downloadResponse.meta.requestStatus === 'fulfilled') {
//                     const downloadUrl = downloadResponse.payload as string;
//                     const photoTags = selectedTags.map(tagName => {
//                         const foundTag = tags.find((tag: Tag) => tag.name === tagName);
//                         return foundTag ? { name: foundTag.name, id: foundTag.id } : null;
//                     }).filter(tag => tag !== null);
//                     const photoData = {
//                         url: downloadUrl,
//                         size: file.size,
//                         albumId: parentId?.toString() || 'defaultAlbumId',
//                         name: fileName,
//                         tags: photoTags
//                     };
//                     await dispatch(addPhoto({ token, photo: photoData }));
//                     setImageUrl(downloadUrl);
//                 } else {
//                     const uploadPayload = uploadResponse.payload as { fileName: string };
//                     await dispatch(deletePhoto({ token, id: Number(uploadPayload.fileName) }));
//                 }
//             }
//         } catch (error) {
//             console.error('Upload process failed:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//             <DialogTitle sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)', color: 'white' }}>Upload Photo</DialogTitle>
//             <DialogContent sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
//                 <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
//                     <input
//                         type="file"
//                         onChange={handleFileChange}
//                         required
//                         style={{ marginBottom: '10px', display: 'none' }}
//                         id="file-upload"
//                     />
//                     <label htmlFor="file-upload">
//                         <Button variant="contained" component="span" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white', marginBottom: '10px' }}>
//                             Choose File
//                         </Button>
//                     </label>
//                     <Autocomplete
//                         multiple
//                         options={tags.map(tag => tag.name)}
//                         value={selectedTags}
//                         onChange={handleTagChange}
//                         renderTags={(value: string[], getTagProps) =>
//                             value.map((option, index) => (
//                                 <Chip variant="outlined" label={option} {...getTagProps({ index })} sx={{ margin: '2px', color: 'grey', borderColor: 'white' }} />
//                             ))
//                         }
//                         renderInput={(params) => (
//                             <TextField {...params} variant="outlined" placeholder="Add Tags" sx={{ backgroundColor: 'white', marginBottom: '10px' }} />
//                         )}
//                     />
//                     <TextField
//                         variant="outlined"
//                         value={newTag}
//                         onChange={(e) => setNewTag(e.target.value)}
//                         placeholder="Add a new tag"
//                         sx={{ backgroundColor: 'white', marginBottom: '10px' }}
//                     />
//                     <Button type="button" onClick={handleAddTag} variant="contained" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white', marginBottom: '10px' }}>
//                         Add Tag
//                     </Button>
//                     <Button type="submit" disabled={loading} variant="contained" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white' }}>
//                         {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Photo'}
//                     </Button>
//                 </form>
//                 {imageUrl && (
//                     <Box sx={{ marginTop: '20px' }}>
//                         <Typography variant="h6" sx={{ color: 'white' }}>Uploaded Image:</Typography>
//                         <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
//                     </Box>
//                 )}
//             </DialogContent>
//             <DialogActions sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
//                 <Button
//                     onClick={onClose}
//                     variant="contained"
//                     sx={{
//                         background: 'linear-gradient(100deg,#00ffff,#1709b7,#d400ff)',
//                         color: 'white',
//                         marginTop: '20px',
//                         '&:hover': {
//                             background: 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
//                         },
//                         borderRadius: '8px',
//                         padding: '10px 20px',
//                         fontWeight: 'bold',
//                     }}
//                 >
//                     סגור
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default UploadPhotoComponent;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto, getDownloadUrl, addPhoto, deletePhoto } from '../../slices/photoSlice';
import { createTag, getUserTags } from '../../slices/tagSlice';
import { AppDispatch } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    Autocomplete,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Tag } from '../../types/tag';
import AlbumSuggestion from '../albums/AlbumSuggestion'; // הוספת הקומפוננטה
import { Photo } from '../../types/photo';

interface UploadPhotoComponentProps {
    open: boolean;
    onClose: () => void;
}

const UploadPhotoComponent: React.FC<UploadPhotoComponentProps> = ({ open, onClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [showAlbumSuggestion, setShowAlbumSuggestion] = useState(false); // מצב להראות את ההודעה
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch<AppDispatch>();
    const tags = useSelector((state: { tags: { tags: Tag[] } }) => state.tags.tags);
    const navigate = useNavigate();
    const { albumId } = useParams<{ albumId: string }>();


    useEffect(() => {
        if (token) {
            dispatch(getUserTags(token));
        } else {
            navigate('/auth');
        }
    }, [dispatch, token]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleTagChange = (event: any, value: string[]) => {
        console.log(event, value);
        setSelectedTags(value);
    };

    const handleAddTag = async () => {
        if (newTag) {
            await dispatch(createTag({ token: token!, tagPostModel: { name: newTag } }));
            setNewTag('');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) return;

        setLoading(true);
        const fileName = file.name;

        try {
            if (!token) {
                throw new Error('Token is required for uploading photos.');
            }
            const uploadResponse = await dispatch(uploadPhoto({ token, fileName, file }));

            if (uploadResponse.meta.requestStatus === 'fulfilled') {
                const downloadResponse = await dispatch(getDownloadUrl({ token, fileName }));

                if (downloadResponse.meta.requestStatus === 'fulfilled') {
                    const downloadUrl = downloadResponse.payload as string;
                    const photoTags = selectedTags.map(tagName => {
                        const foundTag = tags.find((tag: Tag) => tag.name === tagName);
                        return foundTag ? { name: foundTag.name, id: foundTag.id } : null;
                    }).filter(tag => tag !== null);
                    console.log('albumId in upload photo', albumId);
                    
                    const photoData = {
                        url: downloadUrl,
                        size: file.size,
                        albumId: Number(albumId) || 0,
                        name: fileName,
                        tags: photoTags
                    };
                    console.log('photoData', photoData);
                    
                    await dispatch(addPhoto({ token, photo: photoData }));
                    setImageUrl(downloadUrl);
                    setShowAlbumSuggestion(true); // לפתוח את ההודעה לאחר ההעלאה
                } else {
                    const uploadPayload = uploadResponse.payload as { Photo: Photo };
                    await dispatch(deletePhoto({ token, id: uploadPayload.Photo.id ?? 0, albumId: Number(albumId) || 0 }));
                }
            }
        } catch (error) {
            console.error('Upload process failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)', color: 'white' }}>Upload Photo</DialogTitle>
            <DialogContent sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        style={{ marginBottom: '10px', display: 'none' }}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button variant="contained" component="span" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white', marginBottom: '10px' }}>
                            Choose File
                        </Button>
                    </label>
                    <Autocomplete
                        multiple
                        options={tags.map(tag => tag.name)}
                        value={selectedTags}
                        onChange={handleTagChange}
                        renderTags={(value: string[], getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} sx={{ margin: '2px', color: 'grey', borderColor: 'white' }} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" placeholder="Add Tags" sx={{ backgroundColor: 'white', marginBottom: '10px' }} />
                        )}
                    />
                    <TextField
                        variant="outlined"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a new tag"
                        sx={{ backgroundColor: 'white', marginBottom: '10px' }}
                    />
                    <Button type="button" onClick={handleAddTag} variant="contained" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white', marginBottom: '10px' }}>
                        Add Tag
                    </Button>
                    <Button type="submit" disabled={loading} variant="contained" sx={{ background: 'linear-gradient(100deg, #00c6ff, #0072ff, #7209b7, #d400ff)', color: 'white' }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Photo'}
                    </Button>
                </form>
                {imageUrl && (
                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>Uploaded Image:</Typography>
                        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(100deg,#00ffff,#1709b7,#d400ff)',
                        color: 'white',
                        marginTop: '20px',
                        '&:hover': {
                            background: 'linear-gradient(100deg, #0072ff, #7209b7, #d400ff)',
                        },
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontWeight: 'bold',
                    }}
                >
                    סגור
                </Button>
            </DialogActions>
            {imageUrl && (
                <AlbumSuggestion 
                    open={showAlbumSuggestion} 
                    onClose={() => setShowAlbumSuggestion(false)} 
                    imageUrl={imageUrl} 
                />
            )}
        </Dialog>
    );
};

export default UploadPhotoComponent;
