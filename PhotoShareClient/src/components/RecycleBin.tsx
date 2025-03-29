import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card } from '@mui/material';
import { Album } from '../types/album';

const RecycleBin: React.FC = () => {
    const deletedAlbums = useSelector((state: { album: { deletedAlbums: Album[] } }) => state.album.deletedAlbums);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                סל מיחזור
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                {deletedAlbums.length > 0 ? deletedAlbums.map(album => (
                    <Card key={album.id} sx={{ padding: 2, margin: 1 }}>
                        <Typography>{album.title}</Typography>
                    </Card>
                )) : <Typography>אין אלבומים שנמחקו.</Typography>}
            </Box>
        </Box>
    );
};

export default RecycleBin;
