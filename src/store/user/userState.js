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
            state.user = payload.user;
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
        registerUser: (state) => {
            state.isLoading = true;
        },
        registerUserSuccess: (state) => {
            state.isLoading = false;
        },
        registerUserFailed: (state) => {
            state.isLoading = false;
        },
        updateUser: (state) => {
            state.isLoading = true;
        },
        updateUserSuccess: (state, { payload }) => {
            state.user.username = payload.username;
            state.user.name = payload.name;
            state.user.address = payload.address;
            state.user.phone = payload.phone;
            state.user.email = payload.email;
            state.isLoading = false;
        },
        updateUserFailed: (state) => {
            state.isLoading = false;
        },
        updateAvatar: (state) => {
            state.isLoading = true;
        },
        updateAvatarSuccess: (state, { payload }) => {
            state.user.avatar = payload.avatar;
            state.isLoading = false;
        },
        updateAvatarFailed: (state) => {
            state.isLoading = false;
        },
        getPassword: (state) => {
            state.isLoading = true;
        },
        getPasswordSuccess: (state) => {
            state.isLoading = false;
        },
        getPasswordFailed: (state) => {
            state.isLoading = false;
        },
        changePassword: (state) => {
            state.isLoading = true;
        },
        changePasswordSuccess: (state) => {
            state.isLoading = false;
        },
        changePasswordFailed: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    userLogin,
    userLoginSuccess,
    userLoginFailed,
    userLogout,
    registerUser,
    registerUserSuccess,
    registerUserFailed,
    updateUser,
    updateUserSuccess,
    updateUserFailed,
    updateAvatar,
    updateAvatarSuccess,
    updateAvatarFailed,
    getPassword,
    getPasswordSuccess,
    getPasswordFailed,
    changePassword,
    changePasswordSuccess,
    changePasswordFailed,
} = userSlice.actions;
export default userSlice.reducer;
