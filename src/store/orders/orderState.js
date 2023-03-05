import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        isLoading: false,
    },
    reducers: {
        order: (state) => {
            state.isLoading = true;
        },
        orderSuccess: (state) => {
            state.isLoading = false;
        },
        orderFailed: (state) => {
            state.isLoading = false;
        },
        orderCancell: (state) => {
            state.isLoading = true;
        },
        orderCancellSuccess: (state, { payload }) => {
            state.orders[payload].orderSatus = 'Cancelled';
            state.isLoading = false;
        },
        orderCancellFailed: (state) => {
            state.isLoading = false;
        },
        getOrdersByUser: (state) => {
            state.isLoading = true;
        },
        getOrdersByUserSuccess: (state, { payload }) => {
            state.orders = payload;
            state.isLoading = false;
        },
        getOrdersByUserFailed: (state) => {
            state.isLoading = false;
        },
        orderSort: (state) => {
            state.isLoading = true;
        },
        orderSortSuccess: (state, { payload }) => {
            state.orders = payload;
            state.isLoading = false;
        },
        orderSortFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    order,
    orderSuccess,
    orderFailed,
    orderCancell,
    orderCancellSuccess,
    orderCancellFailed,
    getOrdersByUser,
    getOrdersByUserSuccess,
    getOrdersByUserFailed,
    orderSort,
    orderSortSuccess,
    orderSortFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
