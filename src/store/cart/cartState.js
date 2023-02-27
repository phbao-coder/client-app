import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            products: [],
            totalCost: 0,
        },
        isAdding: false,
    },
    reducers: {
        addToCart: (state) => {
            state.isAdding = true;
        },
        addToCartSuccess: (state, { payload }) => {
            state.cart = payload;
            state.isAdding = false;
        },
        addToCartFailed: (state) => {
            state.isAdding = false;
        },
        increaQuantityProduct: (state, { payload }) => {
            state.cart.products[payload].quantity++;
            state.cart.totalCost += state.cart.products[payload].info.price;
        },
        decreaQuantityProduct: (state, { payload }) => {
            state.cart.products[payload].quantity--;
            state.cart.totalCost -= state.cart.products[payload].info.price;
        },
    },
});

export const {
    addToCart,
    addToCartSuccess,
    addToCartFailed,
    increaQuantityProduct,
    decreaQuantityProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
