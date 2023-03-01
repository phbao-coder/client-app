import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            products: [],
        },
        isLoading: false,
    },
    reducers: {
        addProductToCart: (state) => {
            state.isLoading = true;
        },
        addProductToCartSuccess: (state, { payload }) => {
            state.cart.products = payload.products;
            state.isLoading = false;
        },
        addProductToCartFailed: (state) => {
            state.isLoading = false;
        },
        removeProductToCart: (state) => {
            state.isLoading = true;
        },
        removeProductToCartSuccess: (state, { payload }) => {
            state.cart.products = payload;
            state.isLoading = false;
        },
        removeProductToCartFailed: (state) => {
            state.isLoading = false;
        },
        updateIncreaProductInCart: (state) => {
            state.isLoading = true;
        },
        updateIncreaProductInCartSuccess: (state, { payload }) => {
            state.cart.products[payload].count++;
            state.isLoading = false;
        },
        updateDecreaProductInCart: (state) => {
            state.isLoading = true;
        },
        updateDecreaProductInCartSuccess: (state, { payload }) => {
            state.cart.products[payload].count--;
            state.isLoading = false;
        },
        updateProductInCartFailed: (state) => {
            state.isLoading = false;
        },
        getCartFromServer: (state) => {
            state.isLoading = true;
        },
        getCartFromServerSuccess: (state, { payload }) => {
            state.cart = payload;
            state.isLoading = false;
        },
        getCartFromServerFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    addProductToCart,
    addProductToCartSuccess,
    addProductToCartFailed,
    removeProductToCart,
    removeProductToCartSuccess,
    removeProductToCartFailed,
    updateIncreaProductInCart,
    updateIncreaProductInCartSuccess,
    updateDecreaProductInCart,
    updateDecreaProductInCartSuccess,
    updateProductInCartFailed,
    getCartFromServer,
    getCartFromServerSuccess,
    getCartFromServerFailed,
} = cartSlice.actions;
export default cartSlice.reducer;
