import { createSlice } from "@reduxjs/toolkit"

const initialAuthState ={
    token:localStorage.getItem('idToken'),
    isAuthenticated: !!localStorage.getItem('idToken')
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        loginHandler(state, action){
            state.token = action.payload
            localStorage.setItem('idToken', state.token)
            state.isAuthenticated = true
            console.log(state.token)
        },
        logoutHandler(state, action){
            state.token = action.payload
            localStorage.removeItem('idToken')
        }
    }
})

export const AuthActions = authSlice.actions;
export default authSlice.reducer;