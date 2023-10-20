import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    profileData : [],
};

const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
    }
})

export const {setProfileData} = ProfileSlice.actions;

export default ProfileSlice.reducer;