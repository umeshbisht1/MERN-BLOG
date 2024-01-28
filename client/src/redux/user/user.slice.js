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
        },
        updateStart:(state)=>{
            state.loading=true;
            state.errror=null;
        },
        updateSuccess:(state,action)=>{
            state.loading=false
            state.currentUser=action.payload
            state.errror=null
        },
        updateFailure:(state,action)=>{
            state.loading=false
            state.errror=action.payload
        },
        deleteStart:(state)=>{
            state.loading=true;
            state.errror=null;
        },
        deleteSuccess:(state)=>{
            state.loading=false
            state.currentUser=null
            state.errror=null
        },
        deleteFailure:(state,action)=>{
            state.loading=false
            state.errror=action.payload
        },

    }
})
export const  {signInFailure,signInStart,signInSuccess,updateFailure,updateStart,updateSuccess,deleteFailure,deleteStart,deleteSuccess}=userSlice.actions
export default userSlice.reducer