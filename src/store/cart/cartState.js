import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            products: [],
            cartTotal: 0,
        },
        isLoading: false,
    },
    reducers: {
        addProductToCart: (state) => {
            state.isLoading = true;
        },
        addProductToCartSuccess: (state, { payload }) => {
            state.cart.products = payload;
            state.isLoading = false;
        },
        addProductToCartFailed: (state) => {
            state.isLoading = false;
        },
        removeProductToCart: (state) => {
            state.isLoading = true;
        },
        removeProductToCartSuccess: (state, { payload }) => {
            state.cart.products = payload.products;
            state.cart.cartTotal = payload.cartTotal;
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
            state.cart.cartTotal += state.cart.products[payload].price;
            state.isLoading = false;
        },
        updateDecreaProductInCart: (state) => {
            state.isLoading = true;
        },
        updateDecreaProductInCartSuccess: (state, { payload }) => {
            state.cart.products[payload].count--;
            state.cart.cartTotal -= state.cart.products[payload].price;
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
        clearCart: (state) => {
            state.cart.products = [];
            state.cart.cartTotal = 0;
        },
        applyCoupon: (state) => {
            state.isLoading = true;
        },
        applyCouponSuccess: (state) => {
            state.isLoading = false;
        },
        applyCouponFailed: (state) => {
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
    clearCart,
    applyCoupon,
    applyCouponSuccess,
    applyCouponFailed,
} = cartSlice.actions;
export default cartSlice.reducer;
