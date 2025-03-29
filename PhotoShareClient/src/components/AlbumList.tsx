// // // import { useEffect, useState } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { AppDispatch } from '../store/store';
// // // import { Album } from '../types/album';
// // // import { deleteAlbum, fetchAlbumsByParent } from '../slices/albumSlice';
// // // import { Box, Card, IconButton, Menu, MenuItem, Typography} from '@mui/material';
// // // import FolderIcon from '@mui/icons-material/Folder';
// // // import MoreVertIcon from '@mui/icons-material/MoreVert';
// // // import EditIcon from '@mui/icons-material/Edit';
// // // import DeleteIcon from '@mui/icons-material/Delete';
// // // import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// // // import { useParams } from 'react-router-dom';
// // // import AddAlbum from './AddAlbum';
// // // import EditAlbum from './EditAlbum';
// // // import { motion } from 'framer-motion';

// // // const AlbumList: React.FC = () => {
// // //     const dispatch = useDispatch<AppDispatch>();
// // //     const { albums, loading, msg } = useSelector((state: { album: { albums: Album[], loading: boolean, msg: string } }) => state.album);
// // //     const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
// // //     const { albumId } = useParams<{ albumId: string }>();
// // //     const [openAddAlbum, setOpenAddAlbum] = useState(false);
// // //     const [openEditAlbum, setOpenEditAlbum] = useState(false);
// // //     const [selectedAlbum, setSelectedAlbum] = useState<Album>({}as Album);
// // //     const token = sessionStorage.getItem('token');

// // //     useEffect(() => {
// // //         if (token) {
// // //             dispatch(fetchAlbumsByParent({ token, parentId: albumId ? parseInt(albumId) : 0 }));
// // //         }
// // //     }, [dispatch, token, albumId]);

// // //     const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
// // //         setAnchorEl(prev => ({ ...prev, [albumId]: event.currentTarget }));
// // //     };

// // //     const handleMenuClose = (albumId: number) => {
// // //         setAnchorEl(prev => ({ ...prev, [albumId]: null }));
// // //     };

// // //     const handleDeleteAlbum = (albumId: number) => {
// // //         handleMenuClose(albumId); // סגור את התפריט
// // //         if (token) {
// // //             dispatch(deleteAlbum({ token, albumId }));
// // //         }
// // //     };

// // //     const handleEditAlbum = (album: Album) => {
// // //         handleMenuClose(album.id!); // סגור את התפריט
// // //         setSelectedAlbum(album);
// // //         setOpenEditAlbum(true);
// // //     };


// // //     const springProps = {
// // //         initial: { opacity: 0, scale: 0.9 },
// // //         animate: { opacity: 1, scale: 1 },
// // //         exit: { opacity: 0, scale: 0.9 },
// // //         transition: { tension: 200, friction: 20 },
// // //     };

// // //     if (loading) return <div>Loading...</div>;
// // //     if (msg) return <div>{msg}</div>;

// // //     return (
// // //         <Box sx={{ padding: 3 }}>
// // //             <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#3f51b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// // //                 <EmojiEmotionsIcon sx={{ mr: 1, fontSize: 40, color: '#ff9800' }} /> ברוכים הבאים לאזור האישי
// // //             </Typography>
// // //             <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
// // //             <EditAlbum open={openEditAlbum} onClose={() => setOpenEditAlbum(false)} album={selectedAlbum!} />
// // //             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
// // //                 {albums.length > 0 ? albums.map(album => (
// // //                     <motion.div {...springProps} key={album.id}>
// // //                         <Card sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
// // //                             <FolderIcon sx={{ fontSize: 70, color: '#3f51b5' }} />
// // //                             <Typography variant="h6" sx={{ textAlign: 'center', mt: 1, color: '#3f51b5' }}>{album.title}</Typography>
// // //                             <IconButton sx={{ position: 'absolute', top: 5, right: 5 }} onClick={(event) => handleMenuOpen(event, album.id!)}>
// // //                                 <MoreVertIcon />
// // //                             </IconButton>
// // //                             <Menu
// // //                                 anchorEl={anchorEl[album.id!]}
// // //                                 open={Boolean(anchorEl[album.id!])}
// // //                                 onClose={() => handleMenuClose(album.id!)}
// // //                             >
// // //                                 <MenuItem onClick={() => handleEditAlbum(album)}>
// // //                                     <EditIcon sx={{ mr: 1 }} /> עריכה
// // //                                 </MenuItem>
// // //                                 <MenuItem onClick={() => handleDeleteAlbum(album.id!)}>
// // //                                     <DeleteIcon sx={{ mr: 1, color: 'red' }} /> מחיקה
// // //                                 </MenuItem>
// // //                             </Menu>
// // //                         </Card>
// // //                     </motion.div>
// // //                 )) : <Typography>לא נמצאו תקיות.</Typography>}
// // //             </Box>
// // //         </Box>
// // //     );
// // // };

// // // export default AlbumList;
// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch } from '../store/store';
// // import { Album } from '../types/album';
// // import { deleteAlbum, fetchAlbumsByParent } from '../slices/albumSlice';
// // import { Box, Button, Card, CircularProgress, IconButton, Menu, MenuItem, Typography } from '@mui/material';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import MoreVertIcon from '@mui/icons-material/MoreVert';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import AddAlbum from './AddAlbum';
// // import EditAlbum from './EditAlbum';
// // import { motion } from 'framer-motion';

// // const AlbumList: React.FC = () => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const navigate = useNavigate();
// //     const { albums, loading, msg } = useSelector((state: { album: { albums: Album[], loading: boolean, msg: string } }) => state.album);
// //     const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
// //     const { albumId } = useParams<{ albumId: string }>();

// //     const [openAddAlbum, setOpenAddAlbum] = useState(false);
// //     const [openEditAlbum, setOpenEditAlbum] = useState(false);
// //     const [selectedAlbum, setSelectedAlbum] = useState<Album>({} as Album);

// //     const [clickCount, setClickCount] = useState(0); // מצב למעקב אחרי מספר הלחיצות
// //     const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null); // טיימר

// //     const token = sessionStorage.getItem('token');
// //     const isParentIdValid = albumId && parseInt(albumId) !== 0;


// //     useEffect(() => {
// //         if (token) {
// //             dispatch(fetchAlbumsByParent({ token, parentId: albumId ? parseInt(albumId) : 0 }));
// //         }
// //     }, [dispatch, token, albumId]);

// //     const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
// //         setAnchorEl(prev => ({ ...prev, [albumId]: event.currentTarget }));
// //     };

// //     const handleMenuClose = (albumId: number) => {
// //         setAnchorEl(prev => ({ ...prev, [albumId]: null }));
// //     };

// //     const handleDeleteAlbum = (albumId: number) => {
// //         handleMenuClose(albumId);
// //         if (token) {
// //             dispatch(deleteAlbum({ token, albumId }));
// //         }
// //     };

// //     const handleEditAlbum = (album: Album) => {
// //         handleMenuClose(album.id!);
// //         setSelectedAlbum(album);
// //         setOpenEditAlbum(true);
// //     };

// //     const handleAlbumClick = (albumId: number) => {
// //         setClickCount(prev => prev + 1);

// //         if (clickTimeout) {
// //             clearTimeout(clickTimeout); // נקה את הטיימר הקודם
// //         }

// //         const newTimeout = setTimeout(() => {
// //             setClickCount(0); // אפס את מספר הלחיצות לאחר תקופה
// //         }, 300); // תקופה של 300 מילישניות

// //         setClickTimeout(newTimeout);

// //         if (clickCount === 1) { // אם זו הלחיצה השנייה
// //             navigate(`/albums/${albumId}`); // ניווט לאלבום
// //         }
// //     };

// //     const springProps = {
// //         initial: { opacity: 0, scale: 0.9 },
// //         animate: { opacity: 1, scale: 1 },
// //         exit: { opacity: 0, scale: 0.9 },
// //         transition: { tension: 200, friction: 20 },
// //     };

// //     if (loading) return <div>Loading...</div>;
// //     if (msg) return <div>{msg}</div>;
// //     if (loading) return (
// //         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //             <CircularProgress />
// //         </Box>
// //     );



// //     return (
// //         <Box sx={{ padding: 3 }}>
// //             <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#3f51b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                 <EmojiEmotionsIcon sx={{ mr: 1, fontSize: 40, color: '#8a2be2' }} /> ברוכים הבאים לאזור האישי
// //             </Typography>

// //             <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
// //             <EditAlbum open={openEditAlbum} onClose={() => setOpenEditAlbum(false)} album={selectedAlbum!} />

// //               {isParentIdValid && <Button variant="contained" color="primary" onClick={() => navigate('/upload-photo')}>הוסף תמונה</Button>} 
// //             {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
// //                 {albums.length > 0 ? albums.map(album => (
// //                     <motion.div key={album.id}>
// //                         <Card sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
// //                             <FolderIcon sx={{ fontSize: 70, color: '#3f51b5' }} />
// //                             <Typography variant="h6" sx={{ textAlign: 'center', mt: 1, color: '#3f51b5' }}>{album.title}</Typography>
// //                         </Card>
// //                     </motion.div>
// //                 )) : <Typography>לא נמצאו תקיות.</Typography>}
// //             </Box>  */}

// //             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
// //                 {albums.length > 0 ? albums.map(album => (
// //                     <motion.div {...springProps} key={album.id}>
// //                         <Card 
// //                             sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }} 
// //                             onClick={() => handleAlbumClick(album.id!)} // הוספת אירוע לחיצה
// //                         >
// //                             <FolderIcon sx={{ fontSize: 70, color: '#3f51b5' }} />
// //                             <Typography variant="h6" sx={{ textAlign: 'center', mt: 1, color: '#3f51b5' }}>{album.title}</Typography>
// //                             <IconButton sx={{ position: 'absolute', top: 5, right: 5 }} onClick={(event) => handleMenuOpen(event, album.id!)}>
// //                                 <MoreVertIcon />
// //                             </IconButton>
// //                             <Menu
// //                                 anchorEl={anchorEl[album.id!]}
// //                                 open={Boolean(anchorEl[album.id!])}
// //                                 onClose={() => handleMenuClose(album.id!)}
// //                             >
// //                                 <MenuItem onClick={() => handleEditAlbum(album)}>
// //                                     <EditIcon sx={{ mr: 1 }} /> עריכה
// //                                 </MenuItem>
// //                                 <MenuItem onClick={() => handleDeleteAlbum(album.id!)}>
// //                                     <DeleteIcon sx={{ mr: 1, color: 'red' }} /> מחיקה
// //                                 </MenuItem>
// //                             </Menu>
// //                         </Card>
// //                     </motion.div>
// //                 )) : <Typography>לא נמצאו תקיות.</Typography>}
// //             </Box>
// //         </Box>



// //     );
// // };

// // export default AlbumList;
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { Album } from '../types/album';
// import { deleteAlbum, fetchAlbumsByParent } from '../slices/albumSlice';
// import { Box, Button, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
// import FolderIcon from '@mui/icons-material/Folder';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import { useParams, useNavigate } from 'react-router-dom';
// import AddAlbum from './AddAlbum';
// import EditAlbum from './EditAlbum';
// import { motion } from 'framer-motion';

// const AlbumList: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate(); // הוספת ניווט
//     const { albums, loading, msg } = useSelector((state: { album: { albums: Album[], loading: boolean, msg: string } }) => state.album);
//     const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
//     const { parentId } = useParams<{ parentId: string }>();
//     const [isRoot, setIsRoot] = useState<boolean>(true);
//     const [openAddAlbum, setOpenAddAlbum] = useState(false);
//     const [openEditAlbum, setOpenEditAlbum] = useState(false);
//     const [selectedAlbum, setSelectedAlbum] = useState<Album>({} as Album);

//     const token = sessionStorage.getItem('token');

//     // מצב למעקב אחרי מספר הלחיצות
//     const [clickCount, setClickCount] = useState(0);
//     const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchAlbumsByParent({ token, parentId: parentId ? parseInt(parentId) : 0 }));
//             setIsRoot(parentId ? parseInt(parentId) === 0 : false)
//         }
//     }, [dispatch, token, parentId]);

//     const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
//         setAnchorEl(prev => ({ ...prev, [albumId]: event.currentTarget }));
//     };

//     const handleMenuClose = (albumId: number) => {
//         setAnchorEl(prev => ({ ...prev, [albumId]: null }));
//     };

//     const handleDeleteAlbum = (albumId: number) => {
//         handleMenuClose(albumId); // סגור את התפריט
//         if (token) {
//             dispatch(deleteAlbum({ token, albumId }));
//         }
//     };

//     const handleEditAlbum = (album: Album) => {
//         handleMenuClose(album.id!); // סגור את התפריט
//         setSelectedAlbum(album);
//         setOpenEditAlbum(true);
//     };

//     const handleRecycleBinClick = () => {
//         navigate('/recycle-bin'); // נווט לסל המיחזור
//     };
//     const handleAlbumClick = (albumId: number) => {
//         setClickCount(prev => prev + 1);

//         if (clickTimeout) {
//             clearTimeout(clickTimeout);
//         }

//         const newTimeout = setTimeout(() => {
//             setClickCount(0);
//         }, 300); // 300 מילישניות

//         setClickTimeout(newTimeout);

//         if (clickCount === 1) {
//             navigate(`/albums/${albumId}`); // ניווט לאלבום
//         }
//     };

//     const springProps = {
//         initial: { opacity: 0, scale: 0.9 },
//         animate: { opacity: 1, scale: 1 },
//         exit: { opacity: 0, scale: 0.9 },
//         transition: { tension: 200, friction: 20 },
//     };

//     if (loading) return <div>Loading...</div>;
//     if (msg) return <div>{msg}</div>;

//     return (
//         <Box sx={{ padding: 3 }}>
//             <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#3f51b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <EmojiEmotionsIcon sx={{ mr: 1, fontSize: 40, color: '#ff9800' }} /> ברוכים הבאים לאזור האישי
//             </Typography>
//             <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
//             <EditAlbum open={openEditAlbum} onClose={() => setOpenEditAlbum(false)} album={selectedAlbum!} />
//             {!isRoot && <Button variant="contained" color="primary" onClick={() => navigate(`/albums/${parentId}/uploadPhoto`)}>הוסף תמונה</Button>}


//             <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleRecycleBinClick}
//                 startIcon={<DeleteIcon />} // הוספת האייקון
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     marginTop: 2,
//                     backgroundColor: '#f44336', // צבע אדום כמו ב-Windows
//                     '&:hover': {
//                         backgroundColor: '#d32f2f', // צבע כהה יותר בה hover
//                     },
//                 }}
//             >
//                 סל מיחזור
//             </Button>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
//                 {albums.length > 0 ? albums.map(album => (
//                     <motion.div {...springProps} key={album.id}>
//                         <Card
//                             sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
//                             onClick={() => handleAlbumClick(album.id!)} // הוספת אירוע לחיצה
//                         >
//                             <FolderIcon sx={{ fontSize: 70, color: '#3f51b5' }} />
//                             <Typography variant="h6" sx={{ textAlign: 'center', mt: 1, color: '#3f51b5' }}>{album.title}</Typography>
//                             <IconButton sx={{ position: 'absolute', top: 5, right: 5 }} onClick={(event) => handleMenuOpen(event, album.id!)}>
//                                 <MoreVertIcon />
//                             </IconButton>
//                             <Menu
//                                 anchorEl={anchorEl[album.id!]}
//                                 open={Boolean(anchorEl[album.id!])}
//                                 onClose={() => handleMenuClose(album.id!)}
//                             >
//                                 <MenuItem onClick={() => handleEditAlbum(album)}>
//                                     <EditIcon sx={{ mr: 1 }} /> עריכה
//                                 </MenuItem>
//                                 <MenuItem onClick={() => handleDeleteAlbum(album.id!)}>
//                                     <DeleteIcon sx={{ mr: 1, color: 'red' }} /> מחיקה
//                                 </MenuItem>
//                             </Menu>
//                         </Card>
//                     </motion.div>
//                 )) : <Typography>לא נמצאו תקיות.</Typography>}
//             </Box>
//         </Box>
//     );
// };

// export default AlbumList;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { Album } from '../types/album';
import { deleteAlbum, fetchAlbumsByParent, shareAlbum } from '../slices/albumSlice';
import { Box, Button, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useParams, useNavigate } from 'react-router-dom';
import AddAlbum from './AddAlbum';
import EditAlbum from './EditAlbum';
import { motion } from 'framer-motion';

const AlbumList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { myAlbums, loading, msg } = useSelector((state: { album: { myAlbums: Album[], loading: boolean, msg: string } }) => state.album);
    const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
    const { parentId } = useParams<{ parentId: string }>();
    const [openAddAlbum, setOpenAddAlbum] = useState(false);
    const [openEditAlbum, setOpenEditAlbum] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<Album>({} as Album);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        console.log("token: ",token);
        
        if (token) {
            dispatch(fetchAlbumsByParent({ token, parentId: parentId ? parseInt(parentId) : 0 }));
        }
    }, [dispatch, token, parentId]);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
        setAnchorEl(prev => ({ ...prev, [albumId]: event.currentTarget }));
    };

    const handleMenuClose = (albumId: number) => {
        setAnchorEl(prev => ({ ...prev, [albumId]: null }));
    };

    const handleDeleteAlbum = (albumId: number) => {
        handleMenuClose(albumId);
        if (token) {
            dispatch(deleteAlbum({ token, albumId }));
        }
    };

    const handleEditAlbum = (album: Album) => {
        handleMenuClose(album.id!);
        setSelectedAlbum(album);
        setOpenEditAlbum(true);
    };

    const handleShareAlbum = (albumId: number) => {
        const UserEmailForSharing = prompt("הכנס כתובת אימייל לשיתוף:");
        handleMenuClose(albumId);
        if (UserEmailForSharing) {
            const shareData = { albumId, UserEmailForSharing };
            dispatch(shareAlbum({ token, albumShareData: shareData }));
        }
    };

    const springProps = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { tension: 200, friction: 20 },
    };

    if (loading) return <div>Loading...</div>;
    if (msg) return <div>{msg}</div>;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
                <EmojiEmotionsIcon sx={{ mr: 1, fontSize: 40, color: '#ff9800' }} /> ברוכים הבאים לאזור האישי
            </Typography>
            <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
            <EditAlbum open={openEditAlbum} onClose={() => setOpenEditAlbum(false)} album={selectedAlbum!} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
                {Array.isArray(myAlbums) && myAlbums.length > 0 ? myAlbums.map(album => (
                    <motion.div {...springProps} key={album.id}>
                        <Card
                            sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                        >
                            <FolderIcon sx={{ fontSize: 70, color: '#3f51b5' }} />
                            <Typography variant="h6" sx={{ textAlign: 'center', mt: 1, color: '#3f51b5' }}>{album.title}</Typography>
                            <IconButton sx={{ position: 'absolute', top: 5, right: 5 }} onClick={(event) => handleMenuOpen(event, album.id!)}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl[album.id!]}
                                open={Boolean(anchorEl[album.id!])}
                                onClose={() => handleMenuClose(album.id!)}
                            >
                                <MenuItem onClick={() => handleEditAlbum(album)}>
                                    <EditIcon sx={{ mr: 1 }} /> עריכה
                                </MenuItem>
                                <MenuItem onClick={() => handleDeleteAlbum(album.id!)}>
                                    <DeleteIcon sx={{ mr: 1, color: 'red' }} /> מחיקה
                                </MenuItem>
                                <MenuItem onClick={() => handleShareAlbum(album.id!)}>
                                    <ShareIcon sx={{ mr: 1, color: 'green' }} /> שתף
                                </MenuItem>
                            </Menu>
                        </Card>
                    </motion.div>
                )) : <Typography>לא נמצאו תקיות.</Typography>}
            </Box>

        </Box>
    );
};

export default AlbumList;
