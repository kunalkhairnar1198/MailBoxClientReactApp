import { createSlice } from "@reduxjs/toolkit"

const initialAuthState ={
    token:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        loginHandler(state, action){
            state.token = action.payload
            localStorage.setItem('idToken', state.token)
            console.log(state.token)
        },
    }
})

export const AuthActions = authSlice.actions;
export default authSlice.reducer;