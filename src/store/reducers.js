import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './user/userState';
import productsSlice from './products/productsState';
import cartSlice from './cart/cartState';
import orderSlice from './orders/orderState';

export const reducers = combineReducers({
    user: userSlice,
    products: productsSlice,
    cart: cartSlice,
    order: orderSlice,
});
