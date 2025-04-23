import { configureStore } from '@reduxjs/toolkit';
import albumReducer from '../slices/albumSlice';

const store = configureStore({
    reducer: {
        album: albumReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;