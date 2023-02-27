import { all, fork } from 'redux-saga/effects';
import userSaga from './user/userSaga';
import productsSaga from './products/productsSaga';
import cartSaga from './cart/cartSaga';

export default function* rootSaga() {
    yield all([fork(userSaga), fork(productsSaga), fork(cartSaga)]);
}
