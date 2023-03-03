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
    },
});

export const {
    order,
    orderSuccess,
    orderFailed,
    getOrdersByUser,
    getOrdersByUserSuccess,
    getOrdersByUserFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
