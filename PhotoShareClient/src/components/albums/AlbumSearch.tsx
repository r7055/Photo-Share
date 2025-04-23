// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { searchPhotosInAlbum } from '../slices/albumSlice'
// import { AppDispatch } from '../store/store';

// interface AlbumSearchProps {
//     albumId: number;
// }

// const AlbumSearch: React.FC<AlbumSearchProps> = ({ albumId }) => {
//     const [query, setQuery] = useState('');
//     const dispatch = useDispatch<AppDispatch>();
//     const token = sessionStorage.getItem('token');

//     const handleSearch = () => {
//         if (token) {
//             dispatch(searchPhotosInAlbum({ token, albumId: albumId.toString(), query }));
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search photos in this album"
//             />
//             <button onClick={handleSearch}>Search</button>
//         </div>
//     );
// };

// export default AlbumSearch;


// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchAlbums } from './slices/albumsSlice';
// // import AlbumSearch from './AlbumSearch'; // Import the AlbumSearch component

// // const AlbumList = () => {
// //     const dispatch = useDispatch();
// //     const { albums, loading, msg } = useSelector(state => state.albums);
// //     const token = sessionStorage.getItem('token'); // Retrieve the token

// //     useEffect(() => {
// //         if (token) {
// //             dispatch(fetchAlbums(token)); // Fetch albums with token
// //         }
// //     }, [dispatch, token]);

// //     if (loading) return <div>Loading...</div>;
// //     if (msg) return <div>{msg}</div>;

// //     return (
// //         <div>
// //             {albums.map(album => (
// //                 <div key={album.id}>
// //                     <h3>{album.title}</h3>
// //                     <p>{album.description}</p>
// //                     <AlbumSearch albumId={album.id} /> {/* Add AlbumSearch for each album */}
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default AlbumList;

