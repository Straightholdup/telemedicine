import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    disease: "",
    doctorType: "",
    typeOfSelection: "",
    selectedDoctor: {},
    loginType: JSON.parse(sessionStorage.getItem("type")) || false,
    themeMode : true,
};

const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setDisease: (state, action) => {
            state.disease = action.payload;
        },
        setSelectedDoctor: (state, action) => {
            state.selectedDoctor = action.payload;
        },
        setDoctorType: (state, action) => {
            state.doctorType = action.payload;
        },
        setSelectionType : (state, action) => {
            state.typeOfSelection = action.payload;
        },
        setLoginType : (state, action) => {
            state.loginType = action.payload;
        },
        setThemeMode : (state) => {
            state.themeMode = !state.themeMode;
        }
    }
})

export const {setDisease, setSelectedDoctor, setDoctorType, setSelectionType, setLoginType, setThemeMode} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;