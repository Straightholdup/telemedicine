import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData = createAsyncThunk(
    'main/fetchData',
    async () => {
        const response  = await axios.get("https://fakestoreapi.com/products")
        return response.data

    }
)

const initialState = {
    data: [
        {
            id: Date.now(),
            title: "darkhan",
            completed: false,
        }
    ],
    loading: "idle",
    error: null,
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.data = action.payload;
        },
        addNewUser: (state, action) => {
            const newUser = {
                id: action.payload.id,
                title: action.payload.title,
                completed: action.payload.completed,
            }
            state.data = [...state.data, newUser];
        },
        deleteUser: (state, action) => {
            state.data = state.data.filter( item => item.id !== action.payload.id);
        },
        markUser: (state, action) => {
            const index = state.data.findIndex((todo) => todo.id === action.payload.id);
            state.data[index].completed = action.payload.completed;
        }
    },
    extraReducers: {
       [fetchData.pending] : (state) => {
                state.loading = "loading";
                state.error = null;
            },
        [fetchData.fulfilled] : (state,action) => {
            state.loading = "iddle";
            state.error = null;
            state.data = action.payload;
        },
        [fetchData.rejected] : (state, action) => {
            state.loading = "failed";
            state.error = action.error;
        },
    }
})

export const {setUsers, addNewUser, deleteUser, markUser} = mainSlice.actions;

export default mainSlice.reducer;