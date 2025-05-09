// import { useState } from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import AlbumList from './AlbumList';
// import AddAlbum from './AddAlbum';
// import Sidebar from './Sidebar';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import UploadPhotoComponent from './UploadPhotoComponent';
// import UploadDirectoryComponent from './UploadDirectoryComponent';
// import { useNavigate } from 'react-router-dom';
// import { Grid } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';


// const PersonalArea: React.FC = () => {
//     const [openAddAlbum, setOpenAddAlbum] = useState(false);
//     const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
//     const [openUploadDirectory, setOpenUploadDirectory] = useState(false);

//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const navigate = useNavigate();

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     const handleRecycleBinClick = () => {
//         navigate('/recycle-bin');
//     };


//     return (
//         <Box>
//             <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
//                 <EmojiEmotionsIcon sx={{ mr: 1, fontSize: 40, color: '#ff9800' }} /> ברוכים הבאים לאזור האישי
//             </Typography>
//             <Button onClick={toggleSidebar}>
//                 {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
//             </Button>

//             <Grid container spacing={isSidebarOpen ? 2 : 1}>
//                 {isSidebarOpen && <Grid item xs={12} md={3}>
//                     <Sidebar
//                         onOpenAddAlbum={() => setOpenAddAlbum(true)}
//                         onOpenUploadPhoto={() => setOpenUploadPhoto(true)}
//                         onOpenUploadDirectory={() => setOpenUploadDirectory(true)}
//                         onRecycleBinClick={handleRecycleBinClick}
//                     />
//                 </Grid>}
//                 <Grid item xs={12} md={9}>
//                     <AlbumList />
//                 </Grid>
//             </Grid>
//             <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
//             <UploadPhotoComponent open={openUploadPhoto} onClose={() => setOpenUploadPhoto(false)} />
//             <UploadDirectoryComponent open={openUploadDirectory} onClose={() => setOpenUploadDirectory(false)} />
//         </Box>
//     );
// }

// export default PersonalArea;
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddAlbum from './albums/AddAlbum';
import AlbumOverview from './albums/AlbumOverview';
import Sidebar from './Sidebar';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import UploadPhotoComponent from './photos/UploadPhotoComponent';
import UploadDirectoryComponent from './photos/UploadDirectoryComponent';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PhotoGallery from './photos/PhotoGallery'; 

const PersonalArea: React.FC = () => {
    const [openAddAlbum, setOpenAddAlbum] = useState(false);
    const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
    const [openUploadDirectory, setOpenUploadDirectory] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null); // State to hold selected album ID

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleRecycleBinClick = () => {
        navigate('/recycle-bin');
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
                <EmojiEmotionsIcon sx={{ mr: 1, fontSize: 40, color: '#ff9800' }} /> ברוכים הבאים לאזור האישי
            </Typography>
            <Button onClick={toggleSidebar}>
                {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>

            <Grid container spacing={isSidebarOpen ? 2 : 1}>
                {isSidebarOpen && <Grid size={{xs:12,md:3}}>
                    <Sidebar
                        onOpenAddAlbum={() => setOpenAddAlbum(true)}
                        onOpenUploadPhoto={() => setOpenUploadPhoto(true)}
                        onOpenUploadDirectory={() => setOpenUploadDirectory(true)}
                        onRecycleBinClick={handleRecycleBinClick}
                    />
                </Grid>}
                <Grid size={{xs:12,md:9}}>
                    <AlbumOverview onSelectAlbum={setSelectedAlbumId} /> {/* Pass the function to set selected album ID */}
                    {selectedAlbumId && <PhotoGallery albumId={selectedAlbumId} />} {/* Render PhotoGallery if an album is selected */}
                </Grid>
            </Grid>
            <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
            <UploadPhotoComponent open={openUploadPhoto} onClose={() => setOpenUploadPhoto(false)} />
            <UploadDirectoryComponent open={openUploadDirectory} onClose={() => setOpenUploadDirectory(false)} />
        </Box>
    );
}

export default PersonalArea;
