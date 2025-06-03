// // // import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// // // import AppLayout from './components/appLayout';
// // // import Auth from './components/Auth';
// // // import SignIn from './components/SignIn';
// // // import Signup from './components/SignUp';
// // // import About from './components/About';
// // // import AlbumList from './components/AlbumList';
// // // // import PhotoUploader from './components/PhotoUploader';
// // // import RecycleBin from './components/RecycleBin';
// // // import SharedAlbums from './components/Share';

// // // const router = createBrowserRouter([
// // //     {
// // //         path: '/',
// // //         element: <AppLayout />,
// // //         children: [
// // //             { path: 'about', element: <About /> },
// // //             { path: 'auth', element: <Auth /> },
// // //             { path: 'auth/signin', element: <SignIn /> },
// // //             { path: 'auth/signup', element: <Signup /> },
// // //             { path: 'albums/:parentId', element: <AlbumList /> },
// // //             // { path: 'albums/:parentId/uploadPhoto', element: <PhotoUploader /> },
// // //             { path: 'recycle-bin', element: <RecycleBin /> },
// // //             {path:'myShares',element:<SharedAlbums/>}
// // //             // {path: 'album/:albumId/photo/:photoId', element: <AlbumList />},
// // //             // {path: 'album/:albumId/photo/:photoId/edit', element: <AlbumList />},
// // //             // {path: 'album/:albumId/photo/:photoId/delete', element: <AlbumList />},
// // //             // {path: 'album/:albumId/photo/:photoId/download', element: <AlbumList />},
// // //             // { path: 'addPhoto', element: <AddPhoto albumId={0} /> },
// // //         ],
// // //     },
// // // ]);

// // // const AppRouter = () => {
// // //     return <RouterProvider router={router} />;
// // // };

// // // export default AppRouter;
// // import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// // import AppLayout from './components/appLayout';
// // import Auth from './components/auth/Auth';
// // import SignIn from './components/auth/SignIn';
// // import Signup from './components/auth/SignUp';
// // import About from './components/About';
// // import PersonalArea from './components/PersonalArea';
// // // import PhotoUploader from './components/PhotoUploader';
// // import RecycleBin from './components/RecycleBin';
// // import SharedAlbums from './components/Share';
// // import PrivacyPolicy from './components/PrivacyPolicy';

// // const router = createBrowserRouter([
// //     {
// //         path: '/',
// //         element: <AppLayout />,
// //         children: [
// //             { path: 'about', element: <About /> },
// //             { path: 'auth', element: <Auth /> },
// //             { path: 'auth/signin', element: <SignIn /> },
// //             { path: 'auth/signup', element: <Signup /> },
// //             { path: 'albums/:albumId', element: <PersonalArea /> },
// //             // { path: 'albums/:parentId/uploadPhoto', element: <PhotoUploader /> },
// //             { path: 'recycle-bin', element: <RecycleBin /> },
// //             { path: 'myShares', element: <SharedAlbums /> },
// //             // {path: 'album/:albumId/photo/:photoId', element: <AlbumList />},
// //             // {path: 'album/:albumId/photo/:photoId/edit', element: <AlbumList />},
// //             // {path: 'album/:albumId/photo/:photoId/delete', element: <AlbumList />},
// //             // {path: 'album/:albumId/photo/:photoId/download', element: <AlbumList />},
// //             // { path: 'addPhoto', element: <AddPhoto albumId={0} /> },
// //             { path: "/privacy-policy", element: <PrivacyPolicy /> }

// //         ],
// //     },
// // ]);

// // const AppRouter = () => {
// //     return <RouterProvider router={router} />;
// // };

// // export default AppRouter;
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Auth from './components/auth/Auth';
// import SignIn from './components/auth/SignIn';
// import Signup from './components/auth/SignUp';
// import About from './components/About';
// import PersonalArea from './components/PersonalArea';
// // import PhotoUploader from './components/PhotoUploader';
// import RecycleBin from './components/RecycleBin';
// import SharedAlbums from './components/Share';
// import PrivacyPolicy from './components/PrivacyPolicy';
// import AppLayoutRefactored from './components/AppLayoutRefactored';
// import Settings from './components/Setting';
// import Profile from './components/Profile';
// import Home from './components/Home';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <AppLayoutRefactored />, // Use the refactored layout
//         children: [
//             { path: '', element: <Home /> },
//             { path: 'about', element: <About /> },
//             { path: 'auth', element: <Auth /> },
//             { path: 'auth/signin', element: <SignIn /> },
//             { path: 'auth/signup', element: <Signup /> },
//             { path: 'albums/:albumId', element: <PersonalArea /> },
//             // { path: 'albums/:parentId/uploadPhoto', element: <PhotoUploader /> },
//             { path: 'recycle-bin', element: <RecycleBin /> },
//             { path: 'myShares', element: <SharedAlbums /> },
//             { path: "/privacy-policy", element: <PrivacyPolicy /> },
//             { path: 'profile', element: <Profile /> },
//             { path: 'settings', element: <Settings /> },
//             // { path: 'photo-analysis', element: <PhotoAnalysis /> },
//         ],
//     },
// ]);

// const AppRouter = () => {
//     return <RouterProvider router={router} />;
// };

// export default AppRouter;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/auth/Auth';
import SignIn from './components/auth/SignIn';
import Signup from './components/auth/SignUp';
import About from './components/About';
import PersonalArea from './components/PersonalArea';
import RecycleBin from './components/bin//RecycleBin';
import SharedAlbums from './components/SharedAlbums';
import PrivacyPolicy from './components/PrivacyPolicy';
import AppLayoutRefactored from './components/AppLayoutRefactored';
import Settings from './components/Setting';
import Profile from './components/Profile';
import Home from './components/Home';
import SharedPhotos from './components/SharedPhotos';

const router = createBrowserRouter([
    // דף הבית עצמאי - בלי layout
    {
        path: '/',
        element: <Home />
    },
    // דפי auth עצמאיים - בלי layout
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/auth/signin',
        element: <SignIn />
    },
    {
        path: '/auth/signup',
        element: <Signup />
    },

    {
        path: '/',
        element: <AppLayoutRefactored />,
        children: [
            { path: 'about', element: <About /> },
            { path: 'albums/:albumId', element: <PersonalArea /> },
            { path: 'recycle-bin', element: <RecycleBin /> },
            { path: 'myShares', element: <SharedAlbums /> },
            { path: 'shared-photos', element: <SharedPhotos /> },
            { path: 'profile', element: <Profile /> },
            { path: 'settings', element: <Settings /> },
        ],
    },
    // דפים נוספים עצמאיים
    {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
    }
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;