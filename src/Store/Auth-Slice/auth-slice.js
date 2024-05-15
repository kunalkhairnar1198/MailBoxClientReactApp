import { createSlice } from "@reduxjs/toolkit"

const initialAuthState ={
    
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        loginHandler(state, action){

        },
    }
})

export const AuthActions = authSlice.actions;
export default authSlice.reducer;