import { createSlice } from '@reduxjs/toolkit';

const counponsSlice = createSlice({
    name: 'coupons',
    initialState: {
        coupons: [],
        isLoading: false,
    },
    reducers: {
        getCoupons: (state) => {
            state.isLoading = true;
        },
        getCouponsSuccess: (state, { payload }) => {
            state.coupons = payload;
            state.isLoading = false;
        },
        getCouponsFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const { getCoupons, getCouponsSuccess, getCouponsFailed } = counponsSlice.actions;
export default counponsSlice.reducer;
