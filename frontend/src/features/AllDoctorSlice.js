import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allDoctor: [],
};

const AllDoctorSlice = createSlice({
    name: "allDoctor",
    initialState,
    reducers: {
        setAllDoctor: (state, action) => {
            state.allDoctor = action.payload;
        },
    }
})

export const {setAllDoctor} = AllDoctorSlice.actions;

export default AllDoctorSlice.reducer;