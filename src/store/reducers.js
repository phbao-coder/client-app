import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './user/userState';
import productsSlice from './products/productsState';
import cartSlice from './cart/cartState';
import orderSlice from './orders/orderState';
import couponsSlice from './coupons/couponsState';

export const reducers = combineReducers({
    user: userSlice,
    products: productsSlice,
    cart: cartSlice,
    orders: orderSlice,
    coupons: couponsSlice,
});
