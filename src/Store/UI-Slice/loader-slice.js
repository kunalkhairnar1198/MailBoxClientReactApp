import { createSlice } from "@reduxjs/toolkit"

const initialUiState ={
    isVisible:false,
}

const LoaderSlice = createSlice({
    name:'loader',
    initialState: initialUiState,
    reducers:{
        isLoadingData(state, action){
            state.isVisible = !state.isVisible;
        },
        stopIsloading(state,action){
            state.isVisible  = false
        }
    }
})
export const LoaderActions = LoaderSlice.actions;
export default LoaderSlice.reducer;