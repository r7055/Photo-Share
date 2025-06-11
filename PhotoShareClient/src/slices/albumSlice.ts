import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Album, AlbumSharePostModel } from '../types/album';

const url = import.meta.env.VITE_API_URL + '/albums';

// const urlReal='https://photo-share-xko7.onrender.com/api/albums';
// Async thunk for fetching albums
//angular 
//angular
// export const fetchAlbums = createAsyncThunk('albums/fetchAlbums',
//     async (token: string, thunkAPI) => {
//         try {
//             const response = await axios.get<Album[]>(`${url}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             return response.data;
//         } catch (e: any) {
//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );


// Async thunk for creating an album
export const createAlbum = createAsyncThunk('albums/createAlbum',
    async ({ token, album }: { token: string; album: Album }, thunkAPI) => {
        try {
                const response = await axios.post(`${url}`, album, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data as Album;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for fetching an album by ID
export const fetchAlbumById = createAsyncThunk('albums/fetchAlbumById',
    async ({ token, albumId }: { token: string; albumId: string }, thunkAPI) => {
        try {
            const response = await axios.get(`${url}/${albumId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for deleting an album
export const deleteAlbum = createAsyncThunk('albums/deleteAlbum',
    async ({ token, albumId }: { token: string; albumId: number }, thunkAPI) => {
        try {
            await axios.delete(`${url}/${albumId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return albumId;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for fetching albums by parent ID
export const fetchAlbumsByParent = createAsyncThunk('albums/fetchAlbumsByParent',
    async ({ token, albumId }: { token: string; albumId: number }, thunkAPI) => {
        try {
           
            const response = await axios.get<Album[]>(`${url}/parent/${albumId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
           
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for updating an album
export const updateAlbum = createAsyncThunk('albums/updateAlbum',
    async ({ token, album }: { token: string; album: Album }, thunkAPI) => {
        try {
            const albumResponse={title:album.title,description:album.description,albumId:album.parentId? album.parentId:0};
            const response = await axios.put(`${url}/${album.id}`, albumResponse, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


export const fetchSharedAlbums = createAsyncThunk('albums/fetchSharedAlbums',
    async ({ token }: { token: string }, thunkAPI) => {
        try {
            
            const response = await axios.get<Album[]>(`${url}/shared`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const shareAlbum = createAsyncThunk('albums/shareAlbum',
    async ({ token, albumShareData }: { token: string|null; albumShareData: AlbumSharePostModel }, thunkAPI) => {
        try {
            const response = await axios.post(`${url}/share`, albumShareData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const restoreAlbum = createAsyncThunk('albums/restoreAlbum',
    async ({ token, albumId }: { token: string; albumId: number }, thunkAPI) => {
        try {
            await axios.put(`${url}/restore/${albumId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return albumId; // Return the album ID for further processing
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for fetching recycled albums
export const fetchRecycleAlbums = createAsyncThunk('albums/fetchRecycleAlbums',
    async ({ token }: { token: string }, thunkAPI) => {
        try {
            const response = await axios.get<Album[]>(`${url}/recycle`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        myAlbums: [] as Album[], 
        sharedAlbums: [] as Album[], 
        recycledAlbums: [] as Album[], 
        loading: false,
        msg: '',
    },
    reducers: {
        clearMessage: (state) => {
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAlbum.fulfilled, (state, action) => {
                state.myAlbums.push(action.payload);
                state.loading = false;
                state.msg = '';
            })
            .addCase(createAlbum.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to create album";
            })
            .addCase(createAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbumById.fulfilled, (state, action) => {
                const index = state.myAlbums.findIndex(album => album.id === (action.payload as Album).id);
                if (index !== -1) {
                    state.myAlbums[index] = action.payload as Album;
                } else {
                    state.myAlbums.push(action.payload as Album);
                }
                state.loading = false;
                state.msg = '';
            })
            .addCase(fetchAlbumById.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch album by ID";
            })
            .addCase(fetchAlbumById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAlbum.fulfilled, (state, action) => {
                state.myAlbums = state.myAlbums.filter(album => album.id !== action.payload);
                state.loading = false;
                state.msg = '';
            })
            .addCase(deleteAlbum.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to delete album";
            })
            .addCase(deleteAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbumsByParent.fulfilled, (state, action) => {
                state.myAlbums = action.payload;
                state.loading = false;
                state.msg = '';
            })
            .addCase(fetchAlbumsByParent.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch albums by parent ID";
            })
            .addCase(fetchAlbumsByParent.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAlbum.fulfilled, (state, action) => {
                const index = state.myAlbums.findIndex(album => album.id === (action.payload as Album).id);
                if (index !== -1) {
                    state.myAlbums[index] = action.payload as Album;
                }
                state.loading = false;
                state.msg = '';
            })
            .addCase(updateAlbum.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to update album";
            })
            .addCase(updateAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSharedAlbums.fulfilled, (state, action) => {
                state.sharedAlbums= action.payload; 
                state.loading = false;
                state.msg = '';
            })
            .addCase(fetchSharedAlbums.rejected, (state, action) => {
                state.loading = false; 
                state.msg = action.payload as string || "Failed to fetch shared albums"; 
            })
            .addCase(fetchSharedAlbums.pending, (state) => {
                state.loading = true;
            })
            .addCase(shareAlbum.fulfilled, (state) => {
                state.msg = 'Album shared successfully.';
                state.loading = false;
            })
            .addCase(shareAlbum.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to share album";
            })
            .addCase(shareAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(restoreAlbum.fulfilled, (state) => {
                state.msg = 'Album restored successfully.';
                state.loading = false;
            })
            .addCase(restoreAlbum.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to restore album";
            })
            .addCase(restoreAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecycleAlbums.fulfilled, (state, action) => {
                state.recycledAlbums = action.payload;
                state.loading = false;
                state.msg = '';
            })
            .addCase(fetchRecycleAlbums.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch recycled albums";
            })
            .addCase(fetchRecycleAlbums.pending, (state) => {
                state.loading = true;
            });
    },
});

export const { clearMessage } = albumsSlice.actions;
export default albumsSlice.reducer;
