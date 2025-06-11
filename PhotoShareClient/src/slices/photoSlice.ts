import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Photo } from '../types/photo';

// import { photo } from '../types/photo';


const baseUrlPhoto =  import.meta.env.REACT_APP_API_URL+'/photos';
const uploadUrl = import.meta.env.REACT_APP_API_URL+'/upload/presigned-url';
const downloadUrl = import.meta.env.REACT_APP_API_URL+'/download/download-url';
const shareUrl = import.meta.env.REACT_APP_API_URL+'/photos/share';

// Async thunk for uploading a photo
export const uploadPhoto = createAsyncThunk('photos/uploadPhoto',
    async ({ token, fileName, file, fileType }: { token: string; fileName: string; file: File; fileType: string }, thunkAPI) => {
        try {
            const response = await axios.get<{ url: string }>(uploadUrl, {
                params: { fileName, fileType },
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
        console.log("getPhotosByAlbumId", token, albumId); // Debugging line
        try {
            const response = await axios.get<Photo[]>(`${baseUrlPhoto}/${albumId}`, {
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
            const response = await axios.get<Photo>(`${baseUrlPhoto}/photo/${id}`, {
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

// Async thunk for getting recycle photos
export const getRecyclePhotos = createAsyncThunk(
    'photos/getRecyclePhotos',
    async ({ token }: { token: string }, thunkAPI) => {
        try {
            const response = await axios.get<Photo[]>(`${baseUrlPhoto}/recycle`, {
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

// Async thunk for restoring a photo
export const restorePhoto = createAsyncThunk('photos/restorePhoto',
    async ({ token, photoId, albumId }: { token: string; photoId: number; albumId: number }, thunkAPI) => {
        try {
            console.log("restorePhoto", token, photoId, albumId); // Debugging line

            await axios.post(
                `${baseUrlPhoto}/restore`,
                photoId,
                {
                    params: { albumId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return { photoId, albumId };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for deleting a photo
export const deletePhoto = createAsyncThunk('photos/deletePhoto',
    async ({ token, id, albumId }: { token: string; id: number, albumId: number }) => {
        try {
            await axios.delete(`${baseUrlPhoto}/${id}`, {
                params: { albumId },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id; // Return the deleted photo ID
        } catch (e: any) {
            await axios.delete(`${baseUrlPhoto}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id; // Return the deleted photo ID
        }
    }
);

// Async thunk for adding a photo
export const addPhoto = createAsyncThunk('photos/addPhoto',
    async ({ token, photo }: { token: string; photo: Photo }, thunkAPI) => {
        try {
            console.log(token, photo);

            const response = await axios.post<Photo>(baseUrlPhoto, photo, {
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

// Async thunk for sharing a photo
export const sharePhoto = createAsyncThunk('photos/sharePhoto',
    async ({ token, photoId, userEmailForSharing }: { token: string; photoId: number; userEmailForSharing: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${shareUrl}`, {
                photoId,
                userEmailForSharing
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // You can return any relevant data if needed
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for getting shared photos
export const getSharedPhotos = createAsyncThunk('photos/getSharedPhotos',
    async ({ token, userId }: { token: string; userId: number }, thunkAPI) => {
        try {
            const response = await axios.get<Photo[]>(`${baseUrlPhoto}/shared`, {
                params: { userId },
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


const photoSlice = createSlice({
    name: 'photos',
    initialState: {
        photos: [] as Photo[],
        recycledPhotos: [] as Photo[],
        sharedPhotos: [] as Photo[],
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
            .addCase(uploadPhoto.fulfilled, (state) => {
                // const photo = action.payload;
                // state.photos.push();
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
            .addCase(getDownloadUrl.fulfilled, (state) => {
                // const downloadUrl = action.payload;
                // Handle the download URL as needed
                state.loading = false;
                state.msg = '';
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
                state.loading = false;
            })
            .addCase(getPhotosByAlbumId.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch photos by album ID";
            })
            .addCase(getPhotosByAlbumId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPhotoById.fulfilled, (_) => {
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
            })
            .addCase(getRecyclePhotos.fulfilled, (state, action) => {
                console.log("Recycle photos fetched: ", action.payload);
                state.recycledPhotos = action.payload;
                state.loading = false;
            })
            .addCase(getRecyclePhotos.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch recycle photos";
            })
            .addCase(getRecyclePhotos.pending, (state) => {
                state.loading = true;
            })
            .addCase(restorePhoto.fulfilled, (state,) => {
                state.loading = false;
                state.msg = "Photo restored successfully";
            })
            .addCase(restorePhoto.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to restore photo";
            })
            .addCase(restorePhoto.pending, (state) => {
                state.loading = true;
            })
            .addCase(sharePhoto.fulfilled, (state, _) => {
                state.loading = false;
                state.msg = "Photo shared successfully!";
            })
            .addCase(sharePhoto.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to share photo";
            })
            .addCase(sharePhoto.pending, (state) => {
                state.loading = true;
            }).addCase(getSharedPhotos.fulfilled, (state, action) => {
                state.sharedPhotos = action.payload; // Assuming you want to store them in the same 'photos' array
                state.loading = false;
            })
            .addCase(getSharedPhotos.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch shared photos";
            })
            .addCase(getSharedPhotos.pending, (state) => {
                state.loading = true;
            });
    },
});

export const { clearMessage } = photoSlice.actions;
export default photoSlice.reducer;
