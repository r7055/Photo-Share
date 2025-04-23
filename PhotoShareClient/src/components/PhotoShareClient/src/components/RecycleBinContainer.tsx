import React from 'react';
import { useSelector } from 'react-redux';
import RecycleBinAlbums from './RecycleBinAlbums';
import RecycleBinPhotos from './RecycleBinPhotos';
import { Album } from '../types/album';

const RecycleBinContainer: React.FC = () => {
    const { recycledAlbums, recycledPhotos } = useSelector((state: { album: { recycledAlbums: Album[], recycledPhotos: Album[] } }) => state.album);

    return (
        <div>
            <h2>סל מיחזור</h2>
            {recycledAlbums.length > 0 && <RecycleBinAlbums />}
            {recycledPhotos.length > 0 && <RecycleBinPhotos />}
            {recycledAlbums.length === 0 && recycledPhotos.length === 0 && (
                <p>אין אלבומים או תמונות שנמחקו.</p>
            )}
        </div>
    );
};

export default RecycleBinContainer;