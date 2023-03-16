import { call, put, select, takeLatest } from 'redux-saga/effects';
import { configToast, configToastFailed, Toast, ToastFailed } from '~/minxin';

import { getCartByUserRequest, postSaveCartRequest } from '~/request/cart.request';
import { applyCouponRequest } from '~/request/coupon.request';

import {
    addProductToCart,
    addProductToCartFailed,
    addProductToCartSuccess,
    applyCoupon,
    applyCouponFailed,
    applyCouponSuccess,
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
    try {
        // mỗi lần có sự thay đổi cart trên local ta sẽ cập nhật nó lên csdl
        const userID = yield select((state) => state.user.user.id);
        const token = yield select((state) => state.user.accessToken);
        if (token !== null) {
            yield put(addProductToCartSuccess(products));
            const cartLocal = yield select((state) => state.cart.cart);
            yield call(postSaveCartRequest, { cartLocal, userID, token });
            Toast.fire({ ...configToast, text: 'Đã thêm sản phẩm vào giỏ hàng' });
        } else {
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
        }
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
        yield put(getCartFromServer(userID));
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
        yield put(getCartFromServer(userID));
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

function* workApplyCoupon({ payload }) {
    // payload is obj = { userID, cartID, codeCoupon}
    const { userID, idCart, code } = payload;
    yield put(getCartFromServer(userID));
    try {
        const res = yield call(applyCouponRequest, { idCart, code });
        console.log(res);
        if (res.status === 200) {
            yield put(getCartFromServer(userID));
            yield put(applyCouponSuccess());
        }
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            ToastFailed.fire({
                title: 'Lỗi',
                text: 'Không thể áp dụng cho đơn hàng này!',
            });
        } else if (error.response.status === 404) {
            ToastFailed.fire({
                title: 'Lỗi',
                text: 'Mã giảm giá không tồn tại',
            });
        }
        yield put(applyCouponFailed());
    }
}

function* cartSaga() {
    yield takeLatest(getCartFromServer.type, workGetCartFromServer);
    yield takeLatest(addProductToCart.type, workAddProductToCart);
    yield takeLatest(updateIncreaProductInCart.type, workUpdateIncreaProductInCart);
    yield takeLatest(updateDecreaProductInCart.type, workUpdateDecreaProductInCart);
    yield takeLatest(removeProductToCart.type, workRemoveProductInCart);
    yield takeLatest(applyCoupon.type, workApplyCoupon);
}

export default cartSaga;
