import {configureStore} from "@reduxjs/toolkit";
import mainReducer from "../features/slice";
import categoriesReducer from "../features/CategoriesSlice";
import profileReducer from "../features/ProfileSlice";
import allDoctorReducer from "../features/AllDoctorSlice";
import requestReducer from "../features/RequestSlice";


export const store = configureStore({
    reducer: {
        todos: mainReducer,
        categories: categoriesReducer,
        profile: profileReducer,
        allDoctor: allDoctorReducer,
        request:requestReducer,
    }
})