import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modalReducer from './modalSlice'
import authReducer from './LoginSlice'


const rootReducer = combineReducers({
    auth:authReducer,
    modal:modalReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})