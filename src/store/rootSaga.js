import { all, fork } from 'redux-saga/effects';
import userSaga from './user/userSaga';
import productsSaga from './products/productsSaga';
import cartSaga from './cart/cartSaga';
import orderSaga from './orders/orderSaga';
import couponsSaga from './coupons/couponsSaga';

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(productsSaga),
        fork(cartSaga),
        fork(orderSaga),
        fork(couponsSaga),
    ]);
}
