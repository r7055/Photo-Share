// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { createAlbum } from '../slices/albumSlice';
// import { Album } from '../types/album';
// import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';

// interface AddAlbumProps {
//     open: boolean; 
//     onClose: () => void;
// }


// const AddAlbum: React.FC<AddAlbumProps> = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const [open, setOpen] = useState(false);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleAddAlbum = () => {
//         const token = sessionStorage.getItem('token');
//         if (token) {
//             const newAlbum: Album = { title, description , parentId: 0};
//             dispatch(createAlbum({ token, album: newAlbum }));
//             handleClose();
//         }
//     };

//     return (
//         <Box>
//              <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 sx={{ display: 'block', margin: 'auto', mb: 3, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
//                 onClick={handleClickOpen}
//             >
//                 הוסף תקייה חדשה
//             </Button>
//             <Dialog open={open} onClose={handleClose}>
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
//                     <Button onClick={handleClose} color="primary">
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
import { AppDispatch } from '../store/store';
import { createAlbum } from '../slices/albumSlice';
import { Album } from '../types/album';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom'; // הוספת import של useParams

interface AddAlbumProps {
    open: boolean; 
    onClose: () => void;
}

const AddAlbum: React.FC<AddAlbumProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { parentId } = useParams<{ parentId: string }>(); // שליפת ה-parentId מה-URL

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddAlbum = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const newAlbum: Album = { title, description, parentId: Number(parentId) }; // המרת ה-parentId למספר
            dispatch(createAlbum({ token, album: newAlbum }));
            handleClose();
        }
    };

    return (
        <Box>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ display: 'block', margin: 'auto', mb: 3, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
                onClick={handleClickOpen}
            >
                הוסף תקייה חדשה
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Album</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddAlbum} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddAlbum;
