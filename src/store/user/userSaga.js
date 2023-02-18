import { call, put, takeLatest } from 'redux-saga/effects';
import { configSwalert, configToast, SwalertError, SwalertSuccess, Toast } from '~/minxin';
import { loginUserRequest, registerUserRequest } from '~/services/user.service';
import {
    userLogin,
    userLoginSuccess,
    userLoginFailed,
    registerUser,
    registerUserFailed,
    registerUserSuccess,
} from './userState';

// put tương tự như dispatch, call(fn, {type, action})
function* workUserLogin(action) {
    const { payload } = action;
    try {
        const res = yield call(loginUserRequest, payload);
        if (res.status === 200) {
            Toast.fire({ ...configToast.success, text: 'Login success' });
            yield put(userLoginSuccess(res.data));
        }
    } catch (error) {
        Toast.fire({ ...configToast.error, text: 'Username or password not vaild' });
        yield put(userLoginFailed());
    }
}

function* workUserRegister(action) {
    const { payload } = action;
    try {
        const res = yield call(registerUserRequest, payload);
        if (res.status === 200) {
            SwalertSuccess.fire({
                ...configSwalert.swalertSuccess,
                title: 'Register success',
                text: 'Register account success fully',
            });
            yield put(registerUserSuccess());
        }
    } catch (error) {
        SwalertError.fire({
            ...configSwalert.swalertError,
            title: 'Register error',
            text: 'Username or password is used',
        });
        yield put(registerUserFailed());
    }
}

function* userSaga() {
    yield takeLatest(userLogin.type, workUserLogin);
    yield takeLatest(registerUser.type, workUserRegister);
}

export default userSaga;
