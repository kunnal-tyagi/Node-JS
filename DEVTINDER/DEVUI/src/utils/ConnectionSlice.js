import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice=createSlice({
    reducers:{
        addConnections:(state,action)=>{
            return action.payload;
        },
        removeConnections: () => null,
    }
})

export const {addConnections,removeConnections}=ConnectionSlice.actions
export default ConnectionSlice.reducer;