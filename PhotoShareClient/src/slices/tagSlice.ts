import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Tag } from '../types/tag';
import { env } from 'process';

const baseUrl = env.REACT_APP_API_URL+'/tags';

// Async thunk for creating a tag
export const createTag = createAsyncThunk('tags/createTag',
    async ({ token, tagPostModel }: { token: string; tagPostModel: Tag }, thunkAPI) => {
        try {
            const response = await axios.post<Tag>(baseUrl, tagPostModel, {
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

// Async thunk for getting all tags
export const getAllTags = createAsyncThunk('tags/getAllTags',
    async (token: string, thunkAPI) => {
        try {
            const response = await axios.get<Tag[]>(baseUrl, {
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

// Async thunk for deleting a tag
export const deleteTag = createAsyncThunk('tags/deleteTag',
    async ({ token, id }: { token: string; id: number }, thunkAPI) => {
        try {
            await axios.delete(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id; // Return the deleted tag ID
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for getting user tags
export const getUserTags = createAsyncThunk('tags/getUserTags',
    async (token: string, thunkAPI) => {
        try {
            const response = await axios.get<Tag[]>(`${baseUrl}/user`, {
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

const tagSlice = createSlice({
    name: 'tags',
    initialState: {
        tags: [] as Tag[],
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
            .addCase(createTag.fulfilled, (state, action) => {
                state.tags.push(action.payload); // Add new tag to state
                state.loading = false;
                state.msg = '';
            })
            .addCase(createTag.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to create tag";
            })
            .addCase(createTag.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTags.fulfilled, (state, action) => {
                state.tags = action.payload; // Set tags to fetched tags
                state.loading = false;
            })
            .addCase(getAllTags.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch tags";
            })
            .addCase(getAllTags.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTag.fulfilled, (state, action) => {
                const id = action.payload;
                state.tags = state.tags.filter(tag => tag.id !== id); // Remove deleted tag
                state.loading = false;
            })
            .addCase(deleteTag.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to delete tag";
            })
            .addCase(deleteTag.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserTags.fulfilled, (state, action) => {
                state.tags = action.payload; // Set tags to fetched user tags
                state.loading = false;
            })
            .addCase(getUserTags.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Failed to fetch user tags";
            })
            .addCase(getUserTags.pending, (state) => {
                state.loading = true;
            });
    },
});

export const { clearMessage } = tagSlice.actions;
export default tagSlice.reducer;
