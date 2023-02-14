import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        accessToken: null,
        isLoading: false,
        isUser: false,
    },
    reducers: {
        userLogin: (state) => {
            state.isLoading = true;
        },
        userLoginSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.accessToken = payload.accessToken;
            state.isUser = true;
        },
        userLoginFailed: (state) => {
            state.isLoading = false;
            state.user = {};
            state.accessToken = null;
            state.isUser = false;
        },
        userLogout: (state) => {
            state.user = {};
            state.accessToken = null;
            state.isUser = false;
        },
    },
});

export const { userLogin, userLoginSuccess, userLoginFailed, userLogout } = userSlice.actions;
export default userSlice.reducer;
