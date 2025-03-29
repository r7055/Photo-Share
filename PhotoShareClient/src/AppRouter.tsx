import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/appLayout';
import Auth from './components/Auth';
import SignIn from './components/SignIn';
import Signup from './components/SignUp';
import About from './components/About';
import AlbumList from './components/AlbumList';
import PhotoUploader from './components/PhotoUploader';
import RecycleBin from './components/RecycleBin';
import SharedAlbums from './components/Share';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: 'about', element: <About /> },
            { path: 'auth', element: <Auth /> },
            { path: 'auth/signin', element: <SignIn /> },
            { path: 'auth/signup', element: <Signup /> },
            { path: 'albums/:parentId', element: <AlbumList /> },
            { path: 'albums/:parentId/uploadPhoto', element: <PhotoUploader /> },
            { path: 'recycle-bin', element: <RecycleBin /> },
            {path:'myShares',element:<SharedAlbums/>}
            // {path: 'album/:albumId/photo/:photoId', element: <AlbumList />},
            // {path: 'album/:albumId/photo/:photoId/edit', element: <AlbumList />},
            // {path: 'album/:albumId/photo/:photoId/delete', element: <AlbumList />},
            // {path: 'album/:albumId/photo/:photoId/download', element: <AlbumList />},
            // { path: 'addPhoto', element: <AddPhoto albumId={0} /> },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
