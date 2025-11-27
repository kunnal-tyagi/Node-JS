import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import ConnectionReducer from "./ConnectionSlice"
import { connect } from "mongoose";
const appstore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:ConnectionReducer
    }
});

export default appstore;