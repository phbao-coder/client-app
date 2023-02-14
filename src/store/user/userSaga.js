import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUserRequest } from '~/services/user.service';
import { userLogin, userLoginSuccess, userLoginFailed } from './userState';

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

function* userSaga() {
    yield takeLatest(userLogin.type, workUserLogin);
}

export default userSaga;
