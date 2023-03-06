import { call, put, select, takeLatest } from 'redux-saga/effects';
import { configToast, configToastFailed, Toast, ToastFailed } from '~/minxin';
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
    const { products, navigate } = payload;
    console.log(products);
    try {
        // mỗi lần có sự thay đổi cart trên local ta sẽ cập nhật nó lên csdl
        yield put(addProductToCartSuccess(products));
        const cartLocal = yield select((state) => state.cart.cart);
        const userID = yield select((state) => state.user.user.id);
        const token = yield select((state) => state.user.user.accessToken);
        const res = yield call(postSaveCartRequest, { cartLocal, userID, token });
        if (res.status === 200) {
            Toast.fire({ ...configToast, text: 'Đã thêm sản phẩm vào giỏ hàng' });
        }
    } catch (error) {
        console.log(error);
        ToastFailed.fire({
            ...configToastFailed,
            title: 'Không thể thêm sản phẩm',
            text: 'Bạn cần phải đăng nhập',
            showConfirmButton: true,
            confirmButtonText: 'Đồng ý',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login');
            }
        });
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
