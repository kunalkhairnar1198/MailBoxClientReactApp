import {configureStore} from '@reduxjs/toolkit';
import { AuthReducer } from './Auth-Slice/auth-slice';

const store = configureStore({
    reducer:{
        auth:AuthReducer
    }
})