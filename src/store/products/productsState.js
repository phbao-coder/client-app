import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoading: false,
    },
    reducers: {
        getProducts: (state) => {
            state.isLoading = true;
        },
        getProductsSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.products = payload;
        },
        getProductsFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const { getProducts, getProductsSuccess, getProductsFailed } = productsSlice.actions;
export default productsSlice.reducer;
