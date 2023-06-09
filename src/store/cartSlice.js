import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    deliveryFee: 15,
    freeDeliveryFrom: 200, 
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const newProduct = action.payload.product;
            // search if we already have item
            const cartItem = state.items.find(
                (item) => item.product._id === newProduct._id
            );
            if(cartItem){
                // if exists, add to it
                cartItem.quantity += 1;
            }else {
            // push new product by quantity 1
            state.items.push({ product: newProduct, quantity: 1 });
            }
        },
        changeQuantity: (state, action) => {
            const { productId, amount } = action.payload;
            const cartItem = state.items.find(
                (item) => item.product._id === productId
            );
            if(cartItem){
                cartItem.quantity += amount;
            }
            // when the quantity goes below 0 => remove item from cart
            if(cartItem.quantity <= 0){
                state.items = state.items.filter((item) => item != cartItem);
            }
        },
        clear: (state) => {
            state.items =  [];
        }
    }
});

export const selectNumberOfItems = (state) => state.cart.items.length;

export const selectSubtotal = (state) =>
    state.cart.items.reduce(
        (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
        0
);

// this will get us all the cart details
const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
    cartSelector,
    selectSubtotal,
    (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectTotal = createSelector(
    selectSubtotal,
    selectDeliveryPrice,
    // function that will generate the value
    (subtotal, delivery) => subtotal + delivery
);