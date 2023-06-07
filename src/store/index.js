import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { cartSlice } from "./cartSlice";

export const store = configureStore({
    // take reducers from productsSlice, giving access to the store to these reducers
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer
    },
});