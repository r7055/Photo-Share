import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserLogin, User } from '../types/user';

const url = import.meta.env.VITE_API_URL+'/auth';
const urlUser = import.meta.env.VITE_API_URL+'/users';

// Async thunk for logging in a user
export const loginUser = createAsyncThunk('user/login',
    async (userData: UserLogin, thunkAPI) => {
        try {
            console.log(userData);

            const response = await axios.post<{ user: User, token: string }>(`${url}/login`, userData);
            const { user, token } = response.data;
            sessionStorage.setItem('token', token);
            return user;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);



// Async thunk for updating a user
export const updateUser = createAsyncThunk("user/updateUser",
    async ({ token, user }: { token: string; user: User }, thunkAPI) => {
        console.log("Updating user:", user);
        console.log("Using token:", token);
        try {
            // שלח את ה-ID בנתיב ה-URL במקום רק ב-body
            const response = await axios.put<{ user: User }>(`${urlUser}/${user.id}`, user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data.user;
        } catch (e: any) {
            console.error("Update user error:", e.response?.data || e.message);
            return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
        }
    })


// Async thunk for registering a user
export const registerUser = createAsyncThunk('user/register',
    async (userData: User, thunkAPI) => {
        try {
            const response = await axios.post<{ user: User, token: string }>(`${url}/register`, userData);
            const { user, token } = response.data;
            sessionStorage.setItem('token', token); // Save token to session storage
            return user;
        } catch (e: any) {
            console.log(e);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: {} as User,
        loading: false,
        msg: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload as User;
                console.log(state.user);

                state.loading = false;
                state.msg = ''; // נקה את המסר במקרה של הצלחה
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Login failed"; // עדכן את המסר במקרה של שגיאה
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload as User;
                state.loading = false;
                state.msg = ''; // נקה את המסר במקרה של הצלחה
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Registration failed"; // עדכן את המסר במקרה של שגיאה
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload as User;
                state.loading = false;
                state.msg = ''; // נקה את המסר במקרה של הצלחה
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.msg = action.payload as string || "Update failed"; // עדכן את המסר במקרה של שגיאה
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            });
    }
});

export default userSlice.reducer;