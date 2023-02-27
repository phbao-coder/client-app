import { put, takeLatest } from 'redux-saga/effects';
import { addToCart, addToCartFailed, addToCartSuccess } from './cartState';

function* workAddToCart({ payload }) {
    try {
        yield put(addToCartSuccess(payload));
    } catch (error) {
        console.log(error);
        yield put(addToCartFailed());
    }
}

function* cartSaga() {
    yield takeLatest(addToCart.type, workAddToCart);
}

export default cartSaga;
