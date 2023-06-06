import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";

export const store = configureStore({
    // take reducers from productsSlice, giving access to the store to these reducers
    reducer: {
        products: productsSlice.reducer
    },
});