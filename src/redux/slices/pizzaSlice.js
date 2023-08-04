import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async ({params}) => {
        const {sortBy, order, search, category, currentPage} = params
        const {data} = await axios.get(
            `https://64ad3fd0b470006a5ec59bef.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        },
    }
})

export const selectPizzaData = state => state.pizza
export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer
