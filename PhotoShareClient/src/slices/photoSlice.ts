import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Photo } from '../types/photo';
// import { photo } from '../types/photo';

const baseUrl = 'http://localhost:5141/api/photos';
const uploadUrl = 'http://localhost:5141/api/upload/presigned-url';
const downloadUrl = 'http://localhost:5141/api/download/download-url';

// Async thunk for uploading a photo
export const uploadPhoto = createAsyncThunk('photos/uploadPhoto',
    async ({ token, fileName, file }: { token: string; fileName: string; file: File }, thunkAPI) => {
        try {
            const response = await axios.get<{ url: string }>(uploadUrl, {
                params: { fileName },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const presignedUrl = response.data.url;

            await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });

            return { fileName, url: presignedUrl };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for getting download URL by file name
export const getDownloadUrl = createAsyncThunk('photos/getDownloadUrl',
    async ({ token, fileName }: { token: string; fileName: string }, thunkAPI) => {
        try {
            const response = await axios.get<string>(`${downloadUrl}/${fileName}`, {
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

// Async thunk for getting photos by album ID
export const getPhotosByAlbumId = createAsyncThunk('photos/getPhotosByAlbumId',
    async ({ token, albumId }: { token: string; albumId: number }, thunkAPI) => {
        try {
            const response = await axios.get<Photo[]>(`${baseUrl}/${albumId}`, {
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

// Async thunk for getting a photo by ID
export const getPhotoById = createAsyncThunk('photos/getPhotoById',
    async ({ token, id }: { token: string; id: number }, thunkAPI) => {
        try {
            const response = await axios.get<Photo>(`${baseUrl}/photo/${id}`, {
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

// Async thunk for deleting a photo
export const deletePhoto = createAsyncThunk('photos/deletePhoto',
    async ({ token, id }: { token: string; id: number }, thunkAPI) => {
        try {
            await axios.delete(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id; // Return the deleted photo ID
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for adding a photo
export const addPhoto = createAsyncThunk('photos/addPhoto',
    async ({ token, photo }: { token: string; photo: Photo }, thunkAPI) => {
        try {
            console.log(token, photo);

            const response = await axios.post<Photo>(baseUrl, photo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchDownloadUrlsForPhotos = createAsyncThunk('photos/fetchDownloadUrlsForPhotos',
    async ({ token, photos }: { token: string; photos: Photo[] }, thunkAPI) => {
        const updatedPhotos = await Promise.all(photos.map(async (photo) => {
            const downloadUrl = await thunkAPI.dispatch(getDownloadUrl({ token, fileName: photo.name }));
            return { ...photo, url: downloadUrl.payload }; // הוסף את ה-URL לתמונה
        }));
        return updatedPhotos;
    }
);

const photoSlice = createSlice({
    name: 'photos',
    initialState: {
        photos: [] as Photo[],
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
            .addCase(uploadPhoto.fulfilled, (state, action) => {
                state.photos.push(action.payload);
                state.loading = false;
                state.msg = '';
            })
            .addCase(uploadPhoto.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to upload photo";
            })
            .addCase(uploadPhoto.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDownloadUrl.fulfilled, (state, action) => {
                const downloadUrl = action.payload;
                // Handle the download URL as needed
            })
            .addCase(getDownloadUrl.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch download URL";
            })
            .addCase(getDownloadUrl.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPhotosByAlbumId.fulfilled, (state, action) => {
                state.photos = action.payload;
                  fetchDownloadUrlsForPhotos({ token: sessionStorage.getItem('token')!, photos: action.payload });
                state.loading = false;
            })
            .addCase(getPhotosByAlbumId.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch photos by album ID";
            })
            .addCase(getPhotosByAlbumId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPhotoById.fulfilled, (state, action) => {
                const photo = action.payload;
                // Handle the fetched photo as needed
            })
            .addCase(getPhotoById.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch photo by ID";
            })
            .addCase(getPhotoById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                const id = action.payload;
                state.photos = state.photos.filter(photo => photo.id !== id);
                state.loading = false;
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to delete photo";
            })
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPhoto.fulfilled, (state, action) => {
                state.photos.push(action.payload);
                state.loading = false;
            })
            .addCase(addPhoto.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to add photo";
            })
            .addCase(addPhoto.pending, (state) => {
                state.loading = true;
            });
    },
});

export const { clearMessage } = photoSlice.actions;
export default photoSlice.reducer;
