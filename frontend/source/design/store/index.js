import {configureStore} from "@reduxjs/toolkit";
import mainReducer from "../../feature/slice";
import categoriesReducer from "../../feature/CategoriesSlice";
import profileReducer from "../../feature/ProfileSlice";
import allDoctorReducer from "../../feature/AllDoctorSlice";
import requestReducer from "../../feature/RequestSlice";


export const store = configureStore({
    reducer: {
        todos: mainReducer,
        categories: categoriesReducer,
        profile: profileReducer,
        allDoctor: allDoctorReducer,
        request:requestReducer,
    }
})