import { call, put, takeLatest } from 'redux-saga/effects';
import { configToast, configToastFailed, Toast, ToastFailed } from '~/minxin';
import {
    forgotPasswordRequest,
    loginUserRequest,
    registerUserRequest,
    updateUserRequest,
} from '~/request/user.request';
import { clearCart } from '../cart/cartState';
import { clearOrders } from '../orders/orderState';
import {
    userLogin,
    userLoginSuccess,
    userLoginFailed,
    registerUser,
    registerUserFailed,
    registerUserSuccess,
    userLogout,
    updateUser,
    updateUserSuccess,
    getPasswordSuccess,
    getPasswordFailed,
    getPassword,
} from './userState';

// put tương tự như dispatch, call(fn, {type, action})
function* workUserLogin(action) {
    const { payload } = action;
    console.log(payload);
    try {
        const res = yield call(loginUserRequest, payload);
        if (res.status === 200) {
            console.log(res);
            Toast.fire({
                ...configToast,
                width: 300,
                text: 'Đăng nhập thành công',
            });
            yield put(userLoginSuccess(res.data));
        }
    } catch (error) {
        ToastFailed.fire({
            ...configToastFailed,
            text: 'Tài khoản hoặc mật khẩu không chính xác',
        });
        yield put(userLoginFailed());
    }
}

function* workUserRegister(action) {
    const { payload } = action;
    try {
        const res = yield call(registerUserRequest, payload);
        if (res.status === 200) {
            Toast.fire({ ...configToast, text: 'Đăng ký tài khoản thành công' });
            yield put(registerUserSuccess());
        }
    } catch (error) {
        ToastFailed.fire({ ...configToastFailed, text: 'Các thông tin này đã có người sử dụng' });
        yield put(registerUserFailed());
    }
}

function* workUserUpdate({ payload }) {
    try {
        const res = yield call(updateUserRequest, payload);
        if (res.status === 200) {
            yield put(updateUserSuccess(res.data));
            Toast.fire({ ...configToast, text: 'Cập nhật thành công' });
        }
    } catch (error) {
        console.log(error);
    }
}

function* workGetPassword({ payload }) {
    try {
        const res = yield call(forgotPasswordRequest, payload);
        if (res.status === 200) {
            Toast.fire({ ...configToast, text: 'Mật khẩu mới đã được gửi đến email.' });
            yield put(getPasswordSuccess());
        }
    } catch (error) {
        console.log(error);
        yield put(getPasswordFailed());
    }
}

function* workLogout() {
    try {
        yield put(clearCart());
        yield put(clearOrders());
    } catch (error) {
        console.log(error);
    }
}

function* userSaga() {
    yield takeLatest(userLogin.type, workUserLogin);
    yield takeLatest(registerUser.type, workUserRegister);
    yield takeLatest(updateUser.type, workUserUpdate);
    yield takeLatest(getPassword.type, workGetPassword);
    yield takeLatest(userLogout.type, workLogout);
}

export default userSaga;
