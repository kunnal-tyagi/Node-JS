import {createSlice} from "@reduxjs/toolkit"

const feedSlice=createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addfeed:(state,action)=>{
            return action.payload;
        },
        removefeed:(state,action)=>{
            return [];
        }
    }
})

export const {addfeed,removefeed}=feedSlice.actions
export default feedSlice.reducer;