import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './user/userState';
import productsSlice from './products/productsState';

export const reducers = combineReducers({
    user: userSlice,
    products: productsSlice,
});
