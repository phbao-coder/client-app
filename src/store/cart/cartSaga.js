import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getCartByUserRequest, postSaveCartRequest } from '~/services/cart.service';
import {
    addProductToCart,
    addProductToCartFailed,
    addProductToCartSuccess,
    getCartFromServer,
    getCartFromServerFailed,
    getCartFromServerSuccess,
    updateDecreaProductInCart,
    updateDecreaProductInCartSuccess,
    updateIncreaProductInCart,
    updateIncreaProductInCartSuccess,
    updateProductInCartFailed,
} from './cartState';

function* workGetCartFromServer({ payload }) {
    try {
        const res = yield call(getCartByUserRequest, payload);
        yield put(getCartFromServerSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getCartFromServerFailed());
    }
}

function* workAddProductToCart({ payload }) {
    try {
        yield put(addProductToCartSuccess(payload));
        // mỗi lần có sự thay đổi cart trên local ta sẽ cập nhật nó lên csdl
        const cartLocal = yield select((state) => state.cart.cart);
        const userID = yield select((state) => state.user.user.id);
        yield call(postSaveCartRequest, { cartLocal, userID });
    } catch (error) {
        console.log(error);
        yield put(addProductToCartFailed());
    }
}

function* workUpdateIncreaProductInCart({ payload }) {
    try {
        yield put(updateIncreaProductInCartSuccess(payload));
        // mỗi lần có sự thay đổi cart trên local ta sẽ cập nhật nó lên csdl
        const cartLocal = yield select((state) => state.cart.cart);
        const userID = yield select((state) => state.user.user.id);
        yield call(postSaveCartRequest, { cartLocal, userID });
    } catch (error) {
        console.log(error);
        yield put(updateProductInCartFailed());
    }
}

function* workUpdateDecreaProductInCart({ payload }) {
    try {
        yield put(updateDecreaProductInCartSuccess(payload));
        // mỗi lần có sự thay đổi cart trên local ta sẽ cập nhật nó lên csdl
        const cartLocal = yield select((state) => state.cart.cart);
        const userID = yield select((state) => state.user.user.id);
        yield call(postSaveCartRequest, { cartLocal, userID });
    } catch (error) {
        console.log(error);
        yield put(updateProductInCartFailed());
    }
}

function* cartSaga() {
    yield takeLatest(getCartFromServer.type, workGetCartFromServer);
    yield takeLatest(addProductToCart.type, workAddProductToCart);
    yield takeLatest(updateIncreaProductInCart.type, workUpdateIncreaProductInCart);
    yield takeLatest(updateDecreaProductInCart.type, workUpdateDecreaProductInCart);
}

export default cartSaga;
