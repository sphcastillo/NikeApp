import { createSlice } from "@reduxjs/toolkit";

// define the initial state
const initialState = {
    products: [],
};

// export the slice - we need:
// 1. name to know what name to use for this slice
// 2. initial state
// 3. reducers: the functions that will update this state 
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
})