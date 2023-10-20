import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    requestId: null,
};

const RequestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        setRequestId: (state, action) => {
            state.requestId = action.payload;
        },
    }
})

export const {setRequestId} = RequestSlice.actions;

export default RequestSlice.reducer;