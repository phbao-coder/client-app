import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './user/userState';

export const reducers = combineReducers({
    user: userSlice,
});
