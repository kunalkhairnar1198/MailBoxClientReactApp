import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Auth-Slice/auth-slice';
import loaderReducer from './UI-Slice/loader-slice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        loader: loaderReducer
    }
})