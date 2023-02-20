import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: {},
        isLoading: false,
    },
    reducers: {
        getProducts: (state) => {
            state.isLoading = true;
        },
        getProductsByCategory: (state) => {
            state.isLoading = true;
        },
        getProductsByName: (state) => {
            state.isLoading = true;
        },
        getProductsByPrice: (state) => {
            state.isLoading = true;
        },
        getProductsByNameAndPrice: (state) => {
            state.isLoading = true;
        },
        getProductsSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.products = payload;
        },
        getProductsFailed: (state) => {
            state.isLoading = false;
        },
        getProductId: (state) => {
            state.isLoading = true;
        },
        getProductIdSuccess: (state, { payload }) => {
            state.product = payload;
            state.isLoading = false;
        },
        getProductIdFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    getProducts,
    getProductsByCategory,
    getProductsByName,
    getProductsByPrice,
    getProductsByNameAndPrice,
    getProductsSuccess,
    getProductsFailed,
    getProductId,
    getProductIdSuccess,
    getProductIdFailed,
} = productsSlice.actions;
export default productsSlice.reducer;
