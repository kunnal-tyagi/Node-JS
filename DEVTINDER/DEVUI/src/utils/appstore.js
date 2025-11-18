import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
const appstore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer
    }
});

export default appstore;