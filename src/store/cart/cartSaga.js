import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getCartByUserRequest, postSaveCartRequest } from '~/services/cart.service';
import {
    addProductToCart,
    addProductToCartFailed,
    addProductToCartSuccess,
    getCartFromServer,
    getCartFromServerFailed,
    getCartFromServerSuccess,
    removeProductToCart,
    removeProductToCartFailed,
    removeProductToCartSuccess,
    updateDecreaProductInCart,
    updateDecreaProductInCartSuccess,
    updateIncreaProductInCart,
    updateIncreaProductInCartSuccess,
    updateProductInCartFailed,
} from './cartState';

function* workGetCartFromServer({ payload }) {
    try {
        const res = yield call(getCartByUserRequest, payload);
        if (res.data !== null) {
            yield put(getCartFromServerSuccess(res.data));
        }
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
        const token = yield select((state) => state.user.user.accessToken);
        yield call(postSaveCartRequest, { cartLocal, userID, token });
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
        const token = yield select((state) => state.user.user.accessToken);
        yield call(postSaveCartRequest, { cartLocal, userID, token });
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
        const token = yield select((state) => state.user.user.accessToken);
        yield call(postSaveCartRequest, { cartLocal, userID, token });
    } catch (error) {
        console.log(error);
        yield put(updateProductInCartFailed());
    }
}

function* workRemoveProductInCart({ payload }) {
    try {
        yield put(removeProductToCartSuccess(payload));
        // mỗi lần có sự thay đổi cart trên local ta sẽ cập nhật nó lên csdl
        const cartLocal = yield select((state) => state.cart.cart);
        const userID = yield select((state) => state.user.user.id);
        const token = yield select((state) => state.user.user.accessToken);
        yield call(postSaveCartRequest, { cartLocal, userID, token });
    } catch (error) {
        console.log(error);
        yield put(removeProductToCartFailed());
    }
}

function* cartSaga() {
    yield takeLatest(getCartFromServer.type, workGetCartFromServer);
    yield takeLatest(addProductToCart.type, workAddProductToCart);
    yield takeLatest(updateIncreaProductInCart.type, workUpdateIncreaProductInCart);
    yield takeLatest(updateDecreaProductInCart.type, workUpdateDecreaProductInCart);
    yield takeLatest(removeProductToCart.type, workRemoveProductInCart);
}

export default cartSaga;
