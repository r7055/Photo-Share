// // import { Box, Button } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';

// // const Sidebar: React.FC<{ onOpenAddAlbum: () => void, onOpenUploadPhoto: () => void, onOpenUploadDirectory: () => void, onRecycleBinClick: () => void }> = ({ onOpenAddAlbum, onOpenUploadPhoto, onOpenUploadDirectory, onRecycleBinClick }) => {
// //     return (
// //         <Box sx={{ padding: 2, borderRight: '1px solid #ccc' }}>
// //             <Button variant="contained" color="primary" onClick={onOpenAddAlbum} sx={{ marginBottom: 2 }}>
// //                 הוספת תיקייה
// //             </Button>
// //             <Button variant="contained" color="primary" onClick={onOpenUploadDirectory} sx={{ marginBottom: 2 }}>
// //                 העלאת תיקייה
// //             </Button>
// //             <Button variant="contained" color="primary" onClick={onOpenUploadPhoto} sx={{ marginBottom: 2 }}>
// //                 העלאת קובץ
// //             </Button>
// //             <Button
// //                 variant="contained"
// //                 color="secondary"
// //                 onClick={onRecycleBinClick}
// //                 startIcon={<DeleteIcon />}
// //                 sx={{
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     backgroundColor: '#f44336',
// //                     '&:hover': {
// //                         backgroundColor: '#d32f2f',
// //                     },
// //                 }}
// //             >
// //                 סל מיחזור
// //             </Button>
// //         </Box>
// //     );
// // };

// // export default Sidebar;
// import { Box, Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// const Sidebar: React.FC<{ 
//     onOpenAddAlbum: () => void, 
//     onOpenUploadPhoto: () => void, 
//     onOpenUploadDirectory: () => void, 
//     onRecycleBinClick: () => void 
// }> = ({ onOpenAddAlbum, onOpenUploadPhoto, onOpenUploadDirectory, onRecycleBinClick }) => {
//     return (
//         <Box sx={{ padding: 2, borderRight: '1px solid #ccc' }}>
//             <Button variant="contained" color="primary" onClick={onOpenAddAlbum} sx={{ marginBottom: 2 }}>
//                 הוספת תיקייה
//             </Button>
//             <Button variant="contained" color="primary" onClick={onOpenUploadDirectory} sx={{ marginBottom: 2 }}>
//                 העלאת תיקייה
//             </Button>
//             <Button variant="contained" color="primary" onClick={onOpenUploadPhoto} sx={{ marginBottom: 2 }}>
//                 העלאת קובץ
//             </Button>
//             <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={onRecycleBinClick}
//                 startIcon={<DeleteIcon />}
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     backgroundColor: '#f44336',
//                     '&:hover': {
//                         backgroundColor: '#d32f2f',
//                     },
//                 }}
//             >
//                 סל מיחזור
//             </Button>
//         </Box>
//     );
// };

// export default Sidebar;

import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UploadDirectoryIcon from '@mui/icons-material/FolderOpen';

const Sidebar: React.FC<{ onOpenAddAlbum: () => void, onOpenUploadPhoto: () => void, onOpenUploadDirectory: () => void, onRecycleBinClick: () => void }> = ({ onOpenAddAlbum, onOpenUploadPhoto, onOpenUploadDirectory, onRecycleBinClick }) => {

    return (
        <Box sx={{ padding: 2, borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained" color="primary" onClick={onOpenAddAlbum} startIcon={<AddIcon />} sx={{ marginBottom: 2 }}>
                הוספת תיקייה
            </Button>
            <Button variant="contained" color="primary" onClick={onOpenUploadDirectory} startIcon={<UploadDirectoryIcon />} sx={{ marginBottom: 2 }}>
                העלאת תיקייה
            </Button>
            <Button variant="contained" color="primary" onClick={onOpenUploadPhoto} startIcon={<UploadFileIcon />} sx={{ marginBottom: 2 }}>
                העלאת קובץ
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={onRecycleBinClick}
                startIcon={<DeleteIcon />}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f44336',
                    '&:hover': {
                        backgroundColor: '#d32f2f',
                    },
                }}
            >
                סל מיחזור
            </Button>
            
        </Box>
    );
};

export default Sidebar;
