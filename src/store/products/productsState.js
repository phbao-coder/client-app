import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [], // for page products
        productsFeature: [], // for products feature
        productsSearch: [], // for products search
        product: {},
        isLoading: false,
    },
    reducers: {
        // page products
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
        getProductsByNameAndCategoryAndPrice: (state) => {
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
        // search products
        getProductsSearch: (state) => {
            state.isLoading = true;
        },
        getProductsSearchSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.productsSearch = payload;
        },
        getProductsSearchFailed: (state) => {
            state.isLoading = false;
        },
        // feature products
        getProductsFeature: (state) => {
            state.isLoading = true;
        },
        getProductsFeatureSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.productsFeature = payload;
        },
        getProductsFeatureFailed: (state) => {
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
    getProductsByNameAndCategoryAndPrice,
    getProductsSuccess,
    getProductsFailed,
    getProductId,
    getProductIdSuccess,
    getProductIdFailed,
    getProductsSearch,
    getProductsSearchSuccess,
    getProductsSearchFailed,
    getProductsFeature,
    getProductsFeatureSuccess,
    getProductsFeatureFailed,
} = productsSlice.actions;
export default productsSlice.reducer;
