import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice"; // Make sure this path is correct

const store = configureStore({
    reducer: {
        auth: authSlice,
        job: jobSlice
    }
});

export default store;
