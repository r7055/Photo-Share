// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { searchAllPhotos } from '../slices/photoSlice';

// const PhotoSearch = () => {

//     const [query, setQuery] = useState('');
//     const dispatch = useDispatch<AppDispatch>();
//     const token = sessionStorage.getItem('token');

//     const handleSearch = () => {
//         if (token) {
//             dispatch(searchAllPhotos({ token, query }));
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search all photos"
//             />
//             <button onClick={handleSearch}>Search</button>
//         </div>
//     );
// };

// export default PhotoSearch;
