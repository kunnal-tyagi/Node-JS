import {createSlice} from "@reduxjs/toolkit"
import { addUser } from "./userSlice"
const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addfeed:(state,action)=>{
            return action.payload;
        },
        removefeed:(state,action)=>{
            return action.payload;
        }
    }
})

export const {addfeed}=feedSlice.actions
export default feedSlice.reducer;