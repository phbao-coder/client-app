import { createSlice } from '@reduxjs/toolkit';

const counponsSlice = createSlice({
    name: 'coupons',
    initialState: {
        coupons: [],
        coupon: null, // coupon này được lưu lại sau khi người dùng apply
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
        getCoupon: (state) => {
            state.isLoading = true;
        },
        getCouponSuccess: (state, { payload }) => {
            state.coupon = payload;
            state.isLoading = false;
        },
        getCouponFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    getCoupons,
    getCouponsSuccess,
    getCouponsFailed,
    getCoupon,
    getCouponSuccess,
    getCouponFailed,
} = counponsSlice.actions;
export default counponsSlice.reducer;
