import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { updateAlbum } from '../../slices/albumSlice';
import { Album } from '../../types/album';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface EditAlbumProps {
    open: boolean;
    onClose: () => void;
    album: Album;
}

const EditAlbum: React.FC<EditAlbumProps> = ({ open, onClose, album }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const navigate=useNavigate();

    useEffect(() => {
        setTitle(album.title);
        setDescription(album.description);
    }, [album]);

    const handleUpdateAlbum = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const updatedAlbum: Album = { ...album, title, description };
            dispatch(updateAlbum({ token, album: updatedAlbum }));
            onClose();
        }
        else(
            navigate('/auth')
        )
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Album</DialogTitle>
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
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdateAlbum} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAlbum;
