import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/auth/Auth';
import SignIn from './components/auth/SignIn';
import Signup from './components/auth/SignUp';

import PersonalArea from './components/PersonalArea';
import RecycleBin from './components/recycle-bin/RecycleBin';
import SharedAlbums from './components/share/SharedAlbums';
import PrivacyPolicy from './components/PrivacyPolicy';
import Settings from './components/Setting';
import Profile from './components/Profile';
import Home from './components/Home';
import SharedPhotos from './components/share/SharedPhotos';
import PhotoGallery from './components/photos/PhotoGallery';
import AppLayout from './components/appLayout';

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
        element: <AppLayout />,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'albums/:albumId', element: <PersonalArea /> },
            { path: 'photos/:albumId', element: <PhotoGallery /> },
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