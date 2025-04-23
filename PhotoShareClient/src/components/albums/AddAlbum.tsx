// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { createAlbum } from '../slices/albumSlice';
// import { Album } from '../types/album';
// import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// import { useParams } from 'react-router-dom';

// interface AddAlbumProps {
//     open: boolean; 
//     onClose: () => void;
// }

// const AddAlbum: React.FC<AddAlbumProps> = ({ open, onClose }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const { parentId } = useParams<{ parentId: string }>();

//     const handleAddAlbum = () => {
//         const token = sessionStorage.getItem('token');
//         if (token) {
//             const newAlbum: Album = { title, description, parentId: Number(parentId) };
//             dispatch(createAlbum({ token, album: newAlbum }));
//             onClose(); // Close the dialog after adding the album
//         }
//     };

//     if (!open) return null;

//     return (
//         <Box>
//             <Dialog open={open} onClose={onClose}>
//                 <DialogTitle>Add New Album</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Title"
//                         type="text"
//                         fullWidth
//                         variant="outlined"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Description"
//                         type="text"
//                         fullWidth
//                         variant="outlined"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleAddAlbum} color="primary">
//                         Add
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AddAlbum;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createAlbum } from '../../slices/albumSlice';
import { Album } from '../../types/album';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

interface AddAlbumProps {
    open: boolean; 
    onClose: () => void;
}

const AddAlbum: React.FC<AddAlbumProps> = ({ open, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { parentId } = useParams<{ parentId: string }>();

    const handleAddAlbum = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const newAlbum: Album = { title, description, parentId: Number(parentId) };
            dispatch(createAlbum({ token, album: newAlbum }));
            setTitle('');
            setDescription('');
            onClose(); // Close the dialog after adding the album
        }
    };

    if (!open) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)', color: 'white' }}>
                <Typography variant="h6">Add New Album</Typography>
            </DialogTitle>
            <DialogContent sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ backgroundColor: 'white', marginBottom: '10px' }}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ backgroundColor: 'white', marginBottom: '10px' }}
                />
            </DialogContent>
            <DialogActions sx={{ background: 'linear-gradient(90deg, #1a1f36, #252a4b)' }}>
                <Button onClick={onClose} variant="contained" sx={{ background: 'linear-gradient(100deg,#00ffff,#1709b7,#d400ff)', color: 'white' }}>
                    Cancel
                </Button>
                <Button onClick={handleAddAlbum} variant="contained" sx={{ background: 'linear-gradient(100deg,#00c6ff,#0072ff,#7209b7,#d400ff)', color: 'white' }}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAlbum;
