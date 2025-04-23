import React from 'react';
import { Button, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { getDownloadUrl } from "../../slices/photoSlice"; // Adjust the import path as needed
import { AppDispatch } from '../../store/store';
import DownloadIcon from '@mui/icons-material/Download';

interface DownloadPhotoProps {
    photo: { name: string; url: string };
}

const DownloadPhoto: React.FC<DownloadPhotoProps> = ({ photo }) => {
    const dispatch = useDispatch<AppDispatch>();
    const token = sessionStorage.getItem('token');

    const handleDownload = async (fileName: string) => {
        if (token) {
            try {
                const downloadUrl = await dispatch(getDownloadUrl({ token, fileName })).unwrap();
                const response = await fetch(downloadUrl);
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(link.href);
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        } else {
            // Handle case when token is not available (e.g., redirect to auth)
            console.error('Token is not available');
        }
    };

    return (
        <>
            {/* <Button
                variant="text"
                onClick={() => handleDownload(photo.name)}
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    color: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '5px 10px',
                    borderRadius: '5px',
                }}
            >
                הורדה
            </Button> */}

            <Tooltip title="הורדת תמונה">
                <IconButton onClick={() => handleDownload(photo.name)}>
                    <DownloadIcon />
                </IconButton>
            </Tooltip>
        </>
    );
}

export default DownloadPhoto;
