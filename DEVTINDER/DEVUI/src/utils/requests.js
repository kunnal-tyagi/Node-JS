import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const requestSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            // action.payload is the id that we sent from request.jsx
            const newArray=state.filter((req)=>req._id!==action.payload);
            return newArray;
        }
    }
})

export const {addRequests,removeRequest}=requestSlice.actions
export default requestSlice.reducer;


// state represents the current data stored inside this slice of the Redux store
// state = [ { request1 }, { request2 }, ... ]
// Whenever you dispatch something like:

//     dispatch(addRequests(data))


//        Redux creates an action object like:

//       {
//          type: "requests/addRequests",
//         payload: data
//        }
//        payload = the actual data you send into the reducer.
//        So payload contains values like:

// [
//   { _id: "1", fromUserID: {...} },
//   { _id: "2", fromUserID: {...} }
// ]