import {createSlice} from "@reduxjs/toolkit"

const feedSlice=createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addfeed:(state,action)=>{
            return action.payload;
        },
        removefeed:(state,action)=>{
            const newFeed=state.filter((user)=>user._id!==action.payload);
            return newFeed;
        }
    }
})

export const {addfeed,removefeed}=feedSlice.actions
export default feedSlice.reducer;