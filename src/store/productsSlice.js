import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

// define the initial state
const initialState = {
    products: products,
    selectedProduct: null,
};

// export the slice - we need:
// 1. name to know what name to use for this slice
// 2. initial state
// 3. reducers: the functions that will update this state 
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            console.log("state: ", state);
            console.log("action: ", action);
            const productId = action.payload;
            state.selectedProduct = state.products.find((p) => p.id === productId);
        }
    },
})