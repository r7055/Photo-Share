import { combineReducers, configureStore } from "@reduxjs/toolkit";
import albumReducer from "../slices/albumSlice";
import photoReducer from "../slices/photoSlice";
import userReducer from "../slices/userSlice";
import languageReducer from "../slices/languageSlice";
import tagReducer from "../slices/tagSlice"; 

const rootReducer = combineReducers({
    user: userReducer,
    album: albumReducer,
    photo: photoReducer,
    language: languageReducer,
    tags: tagReducer, 
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;

export default store;

