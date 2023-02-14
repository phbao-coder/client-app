import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUserRequest, registerUserRequest } from '~/services/user.service';
import {
    userLogin,
    userLoginSuccess,
    userLoginFailed,
    registerUser,
    registerUserFailed,
} from './userState';

// put tương tự như dispatch, call(fn, {type, action})
function* workUserLogin(action) {
    const { payload } = action;
    try {
        const res = yield call(loginUserRequest, payload);
        yield put(userLoginSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(userLoginFailed());
    }
}

function* workUserRegister(action) {
    const { payload } = action;
    try {
        yield call(registerUserRequest, payload);
    } catch (error) {
        console.log(error);
        yield put(registerUserFailed());
    }
}

function* userSaga() {
    yield takeLatest(userLogin.type, workUserLogin);
    yield takeLatest(registerUser.type, workUserRegister);
}

export default userSaga;
