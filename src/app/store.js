import { configureStore } from "@reduxjs/toolkit";
import SelectSlice from "../features/SelectSlice";

export const store=configureStore({
    reducer:{
        SelectSlice
    }
});

export default store