import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../types/album';

interface AlbumState {
    recycledAlbums: Album[];
    recycledPhotos: Album[]; // Assuming photos are also represented as Album type
    loading: boolean;
    msg: string;
}

const initialState: AlbumState = {
    recycledAlbums: [],
    recycledPhotos: [],
    loading: false,
    msg: '',
};

// Async thunk for fetching recycled albums
export const fetchRecycleAlbums = createAsyncThunk(
    'albums/fetchRecycleAlbums',
    async (payload: { token: string }) => {
        const response = await fetch('/api/recycled/albums', {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.json();
    }
);

// Async thunk for fetching recycled photos
export const fetchRecyclePhotos = createAsyncThunk(
    'albums/fetchRecyclePhotos',
    async (payload: { token: string }) => {
        const response = await fetch('/api/recycled/photos', {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.json();
    }
);

// Async thunk for restoring an album
export const restoreAlbum = createAsyncThunk(
    'albums/restoreAlbum',
    async (payload: { token: string; albumId: number }) => {
        const response = await fetch(`/api/albums/restore/${payload.albumId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.json();
    }
);

// Async thunk for deleting an album
export const deleteAlbum = createAsyncThunk(
    'albums/deleteAlbum',
    async (payload: { token: string; albumId: number }) => {
        const response = await fetch(`/api/albums/delete/${payload.albumId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.json();
    }
);

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecycleAlbums.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecycleAlbums.fulfilled, (state, action) => {
                state.loading = false;
                state.recycledAlbums = action.payload;
            })
            .addCase(fetchRecycleAlbums.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.error.message || 'Failed to fetch recycled albums';
            })
            .addCase(fetchRecyclePhotos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecyclePhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.recycledPhotos = action.payload;
            })
            .addCase(fetchRecyclePhotos.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.error.message || 'Failed to fetch recycled photos';
            })
            .addCase(restoreAlbum.fulfilled, (state, action) => {
                // Handle restoring album logic
            })
            .addCase(deleteAlbum.fulfilled, (state, action) => {
                // Handle deleting album logic
            });
    },
});

export default albumSlice.reducer;