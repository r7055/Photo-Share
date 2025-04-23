import React from 'react';
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; // Import the DeleteIcon
import { useDispatch } from "react-redux";
import { deletePhoto } from '../../slices/photoSlice'; // Adjust the import path as needed
import { AppDispatch } from '../../store/store';

interface DeletePhotoProps {
    photoId: number;
}

const DeletePhoto: React.FC<DeletePhotoProps> = ({ photoId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const token = sessionStorage.getItem('token');


    const handleDelete = async (id: number) => {
        if (token) {
            try {
                await dispatch(deletePhoto({ token, id })).unwrap();
                // Optionally, you can add logic to refresh the photo list or show a success message
            } catch (error) {
                console.error('Error deleting photo:', error);
            }
        } else {
            console.error('Token is not available');
        }
    };

    return (
        <Tooltip title="מחק תמונה">
            <IconButton onClick={() => handleDelete(photoId)}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    );
}

export default DeletePhoto;
