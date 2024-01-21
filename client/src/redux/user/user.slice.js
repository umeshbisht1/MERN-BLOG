import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    errror:null,
    loading:false

}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true,
            state.errror=null
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.errror=null
        },
        signInFailure:(state,action)=>{
            state.loading=false,
            state.errror=action.payload
        }
    }
})
export const  {signInFailure,signInStart,signInSuccess}=userSlice.actions
export default userSlice.reducer