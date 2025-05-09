// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch } from '../store/store';
// // import { Album } from '../types/album';
// // import { deleteAlbum, fetchAlbumsByParent, shareAlbum } from '../slices/albumSlice';
// // import { Box, Button, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import MoreVertIcon from '@mui/icons-material/MoreVert';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import ShareIcon from '@mui/icons-material/Share';
// // import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// // import 
// // 
// //  from './AddAlbum';
// // import EditAlbum from './EditAlbum';
// // import UploadPhotoComponent from './UploadPhotoComponent'; 
// // import UploadDirectoryComponent from './UploadDirectoryComponent'; 
// // import { User } from '../types/user';

// // const AlbumList: React.FC = () => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const navigate = useNavigate();
// //     const { myAlbums, loading, msg } = useSelector((state: { album: { myAlbums: Album[], loading: boolean, msg: string } }) => state.album);
// //     const { user } = useSelector((state: { user: { user: User } }) => state.user); 
// //     const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
// //     const { parentId } = useParams<{ parentId: string }>();

// //     const [openAddAlbum, setOpenAddAlbum] = useState(false);
// //     const [openEditAlbum, setOpenEditAlbum] = useState(false);
// //     const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
// //     const [openUploadDirectory, setOpenUploadDirectory] = useState(false);
// //     const [selectedAlbum, setSelectedAlbum] = useState<Album>({} as Album);

// //     const [isRoot, setIsRoot] = useState<boolean>(true);
// //     const token = sessionStorage.getItem('token');

// //     const [path, setPath] = useState<string[]>(['']);

// //     const [clickCount, setClickCount] = useState(0);
// //     const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

// //     useEffect(() => {
// //         if (token) {
// //             dispatch(fetchAlbumsByParent({ token, parentId: parentId ? parseInt(parentId) : 0 }));
// //             setIsRoot(parentId ? parseInt(parentId) === 0 : false);
// //         }
// //     }, [dispatch, token, parentId]);

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

// //     const handleShareAlbum = (albumId: number) => {
// //         const UserEmailForSharing = prompt("הכנס כתובת אימייל לשיתוף:");
// //         handleMenuClose(albumId);
// //         if (UserEmailForSharing) {
// //             const shareData = { albumId, UserEmailForSharing };
// //             dispatch(shareAlbum({ token, albumShareData: shareData }));
// //         }
// //     };

// //     const handleAlbumClick = (albumId: number, albumTitle: string) => {
// //         setClickCount(prev => prev + 1);

// //         if (clickTimeout) {
// //             clearTimeout(clickTimeout);
// //         }

// //         const newTimeout = setTimeout(() => {
// //             setClickCount(0);
// //         }, 300);

// //         setClickTimeout(newTimeout);

// //         if (clickCount === 1) {
// //             setPath(prev => [...prev, albumTitle]);
// //             navigate(`/albums/${albumId}`);
// //         }
// //     };

// //     const handleRecycleBinClick = () => {
// //         navigate('/recycle-bin');
// //     };

// //     const springProps = {
// //         initial: { opacity: 0, scale: 0.9 },
// //         animate: { opacity: 1, scale: 1 },
// //         exit: { opacity: 0, scale: 0.9 },
// //         transition: { tension: 200, friction: 20 },
// //     };

// //     if (loading) return <div>Loading...</div>;
// //     if (msg) return <div>{msg}</div>;

// //     return (
// //         <Box sx={{ padding: 3 }}>
// //             <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
// //                 <EmojiEmotionsIcon sx={{ mr: 1, fontSize: 40, color: '#ff9800' }} /> ברוכים הבאים לאזור האישי
// //             </Typography>

// //             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// //                 <Typography variant="body1" sx={{ color: '#3f51b5', mr: 1 }}>
// //                     {user.firstName} 
// //                 </Typography>
// //                 {path.map((name, index) => (
// //                     <Typography
// //                     key={index}
// //                     variant="body1"
// //                     sx={{ cursor: 'pointer', color: '#3f51b5', mr: 1 }}
// //                     onClick={() => {
// //                         const newPath = path.slice(0, index + 1);
// //                         setPath(newPath);
// //                         const parentIdToNavigate = index === 0 ? 0 : myAlbums.find(album => album.title === newPath[index])?.id;
// //                         if (parentIdToNavigate) {
// //                             navigate(`/albums/${parentIdToNavigate}`);
// //                         }
// //                     }}
// //                     >
// //                         {name} {index < path.length - 1 ? '>' : ''}
// //                     </Typography>
// //                 ))}
// //             </Box>

// //             <AddAlbum open={openAddAlbum} onClose={() => setOpenAddAlbum(false)} />
// //             <EditAlbum open={openEditAlbum} onClose={() => setOpenEditAlbum(false)} album={selectedAlbum!} />
// //             <UploadPhotoComponent open={openUploadPhoto} onClose={() => setOpenUploadPhoto(false)} />
// //             <UploadDirectoryComponent open={openUploadDirectory} onClose={() => setOpenUploadDirectory(false)} />

// //             <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={() => setOpenUploadPhoto(true)}
// //                 sx={{ marginRight: 2 }}
// //             >
// //                 העלאת קובץ
// //             </Button>

// //             <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={() => setOpenUploadDirectory(true)}
// //             >
// //                 העלאת תיקייה
// //             </Button>

// //             <Button
// //                 variant="contained"
// //                 color="secondary"
// //                 onClick={handleRecycleBinClick}
// //                 startIcon={<DeleteIcon />}
// //                 sx={{
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     marginTop: 2,
// //                     backgroundColor: '#f44336',
// //                     '&:hover': {
// //                         backgroundColor: '#d32f2f',
// //                     },
// //                 }}
// //             >
// //                 סל מיחזור
// //             </Button>

// //             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
// //                 {Array.isArray(myAlbums) && myAlbums.length > 0 ? myAlbums.map(album => (
// //                     <motion.div {...springProps} key={album.id}>
// //                         <Card
// //                             sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
// //                             onClick={() => handleAlbumClick(album.id!, album.title)}
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
// //                                 <MenuItem onClick={() => handleShareAlbum(album.id!)}>
// //                                     <ShareIcon sx={{ mr: 1, color: 'green' }} /> שתף
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
// import { deleteAlbum, fetchAlbumsByParent, shareAlbum } from '../slices/albumSlice';
// import { Box, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import FolderIcon from '@mui/icons-material/Folder';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ShareIcon from '@mui/icons-material/Share';
// import { User } from '../types/user';

// const AlbumList: React.FC<{ onSelectAlbum: (albumId: number) => void }> = ({ onSelectAlbum }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { myAlbums, loading, msg } = useSelector((state: { album: { myAlbums: Album[], loading: boolean, msg: string } }) => state.album);
//     const { user } = useSelector((state: { user: { user: User } }) => state.user);
//     const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
//     const { parentId } = useParams<{ parentId: string }>();

//     const token = sessionStorage.getItem('token');

//     const [path, setPath] = useState<string[]>(['']);

//     const [clickCount, setClickCount] = useState(0);
//     const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchAlbumsByParent({ token, parentId: parentId ? parseInt(parentId) : 0 }));
//         }
//     }, [dispatch, token, parentId]);

//     const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, albumId: number) => {
//         setAnchorEl(prev => ({ ...prev, [albumId]: event.currentTarget }));
//     };

//     const handleMenuClose = (albumId: number) => {
//         setAnchorEl(prev => ({ ...prev, [albumId]: null }));
//     };

//     const handleDeleteAlbum = (albumId: number) => {
//         handleMenuClose(albumId);
//         if (token) {
//             dispatch(deleteAlbum({ token, albumId }));
//         }
//     };

//     const handleEditAlbum = (album: Album) => {
//         handleMenuClose(album.id!);
//         // Add edit functionality
//     };

//     const handleShareAlbum = (albumId: number) => {
//         const UserEmailForSharing = prompt("הכנס כתובת אימייל לשיתוף:");
//         handleMenuClose(albumId);
//         if (UserEmailForSharing) {
//             const shareData = { albumId, UserEmailForSharing };
//             dispatch(shareAlbum({ token, albumShareData: shareData }));
//         }
//     };

//     const handleAlbumClick = (albumId: number, albumTitle: string) => {
//         setClickCount(prev => prev + 1);

//         if (clickTimeout) {
//             clearTimeout(clickTimeout);
//         }

//         const newTimeout = setTimeout(() => {
//             setClickCount(0);
//         }, 300);

//         setClickTimeout(newTimeout);

//         if (clickCount === 1) {
//             console.log(`Album ID clicked: ${albumId}`);
//             setPath(prev => [...prev, albumTitle]);
//             navigate(`/albums/${albumId}`);
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
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="body1" sx={{ color: '#3f51b5', mr: 1 }}>
//                     {user.firstName}
//                 </Typography>
//                 {path.map((name, index) => {
//                     const albumIdToNavigate = index === 0 ? 0 : myAlbums.find(album => album.title === name)?.id;
//                     console.log("myAlbums", myAlbums);

//                     return (
//                         <Typography
//                             key={index}
//                             variant="body1"
//                             sx={{ cursor: 'pointer', color: '#3f51b5', mr: 1 }}
//                             onClick={() => {
//                                 console.log(`Navigating to Album ID:עכחגכחגחחכ ${albumIdToNavigate}`); // הדפסה של מזהה האלבום
//                                 if (albumIdToNavigate) {
//                                     setPath(path.slice(0, index + 1)); // עדכון הנתיב
//                                     navigate(`/albums/${albumIdToNavigate}`); // ניווט לאלבום
//                                 }
//                             }}
//                         >
//                             {name} {index < path.length - 1 ? '>' : ''}
//                         </Typography>
//                     );
//                 })}
//             </Box>
//             {Array.isArray(myAlbums) && myAlbums.length > 0 ? myAlbums.map(album => (
//                 <motion.div {...springProps} key={album.id}>
//                     <Card
//                         sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
//                         onClick={() => handleAlbumClick(album.id!, album.title)}
//                     >
//                         <FolderIcon sx={{ fontSize: 70, color: '#3f51b5' }} />
//                         <Typography variant="h6" sx={{ textAlign: 'center', mt: 1, color: '#3f51b5' }}>{album.title}</Typography>
//                         <IconButton sx={{ position: 'absolute', top: 5, right: 5 }} onClick={(event) => handleMenuOpen(event, album.id!)}>
//                             <MoreVertIcon />
//                         </IconButton>
//                         <Menu
//                             anchorEl={anchorEl[album.id!]}
//                             open={Boolean(anchorEl[album.id!])}
//                             onClose={() => handleMenuClose(album.id!)}
//                         >
//                             <MenuItem onClick={() => handleEditAlbum(album)}>
//                                 <EditIcon sx={{ mr: 1 }} /> עריכה
//                             </MenuItem>
//                             <MenuItem onClick={() => handleDeleteAlbum(album.id!)}>
//                                 <DeleteIcon sx={{ mr: 1, color: 'red' }} /> מחיקה
//                             </MenuItem>
//                             <MenuItem onClick={() => handleShareAlbum(album.id!)}>
//                                 <ShareIcon sx={{ mr: 1, color: 'green' }} /> שתף
//                             </MenuItem>
//                         </Menu>
//                     </Card>
//                 </motion.div>
//             )) : <Typography>לא נמצאו תקיות.</Typography>}
//         </Box>
//     );
// };

// export default AlbumList;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { Album } from '../../types/album';
import { deleteAlbum, fetchAlbumsByParent, shareAlbum } from '../../slices/albumSlice';
import { Box, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { User } from '../../types/user';

const AlbumOverview: React.FC<{ onSelectAlbum: (albumId: number) => void }> = ({ onSelectAlbum }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { myAlbums, loading, msg } = useSelector((state: { album: { myAlbums: Album[], loading: boolean, msg: string } }) => state.album);
    const { user } = useSelector((state: { user: { user: User } }) => state.user);
    const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
    const { parentId } = useParams<{ parentId: string }>();

    const token = sessionStorage.getItem('token');

    const [path, setPath] = useState<string[]>(['']);
    const [clickCount, setClickCount] = useState(0);
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
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
        // Add edit functionality
    };

    const handleShareAlbum = (albumId: number) => {
        const UserEmailForSharing = prompt("הכנס כתובת אימייל לשיתוף:");
        handleMenuClose(albumId);
        if (UserEmailForSharing) {
            const shareData = { albumId, UserEmailForSharing };
            dispatch(shareAlbum({ token, albumShareData: shareData }));
        }
    };

    const handleAlbumClick = (albumId: number, albumTitle: string) => {
        setClickCount(prev => prev + 1);
        
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }

        const newTimeout = setTimeout(() => {
            setClickCount(0);
        }, 300);

        setClickTimeout(newTimeout);

        if (clickCount === 1) {
            onSelectAlbum(albumId); // Set the selected album ID
            navigate(`/albums/${albumId}`);
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2, justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ color: '#3f51b5', mr: 1 }}>
                    {user.firstName}
                </Typography>
                {path.map((name, index) => {
                    const albumIdToNavigate = index === 0 ? 0 : myAlbums.find(album => album.title === name)?.id;
                    return (
                        <Typography
                            key={index}
                            variant="body1"
                            sx={{ cursor: 'pointer', color: '#3f51b5', mr: 1 }}
                            onClick={() => {
                                if (albumIdToNavigate) {
                                    setPath(path.slice(0, index + 1)); // Update path
                                    navigate(`/albums/${albumIdToNavigate}`); // Navigate to album
                                }
                            }}
                        >
                            {name} {index < path.length - 1 ? '>' : ''}
                        </Typography>
                    );
                })}
            </Box>
            {Array.isArray(myAlbums) && myAlbums.length > 0 ? myAlbums.map(album => (
                <motion.div {...springProps} key={album.id}>
                    <Card
                        sx={{ width: 180, height: 180, backgroundColor: '#e0e0e0', borderRadius: '15px', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                        onClick={() => handleAlbumClick(album.id!, album.title)}
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
    );
};

export default AlbumOverview;
