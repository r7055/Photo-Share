import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
// ...existing code...

const store = configureStore({
    reducer: {
        // ...existing reducers...
    },
    // ...existing code...
});

export default store;