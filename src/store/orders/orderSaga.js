import { ToastOrderSuccess } from '~/minxin';

import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllOrdersByUser, putCencelledOrder, postOrder } from '~/services/order.service';
import { clearCart } from '../cart/cartState';
import {
    getOrdersByUser,
    getOrdersByUserFailed,
    getOrdersByUserSuccess,
    order,
    orderCancell,
    orderCancellFailed,
    orderCancellSuccess,
    orderFailed,
    orderSuccess,
} from './orderState';

function* workOrder({ payload }) {
    // payload: {_id, method, destination, phone, note, navigate}
    const { navigate, ...others } = payload;
    try {
        const res = yield call(postOrder, others);
        if (res.status === 200) {
            yield put(orderSuccess());
            yield put(clearCart());
            yield navigate('/');
            ToastOrderSuccess.fire({
                title: 'Đặt hàng thành công',
                text: 'Đơn hàng của bạn đang được xử lý',
                icon: 'success',
            });
        }
    } catch (error) {
        console.log(error);
        yield put(orderFailed());
    }
}

function* workCancelledOrder({ payload }) {
    const { idUser, idOrder } = payload;
    const _id = idUser;
    try {
        const res = yield call(putCencelledOrder, idOrder);
        if (res.status === 200) {
            yield put(orderCancellSuccess());
            yield put(getOrdersByUser(_id));
            console.log('hủy thành công');
        }
    } catch (error) {
        console.log(error);
        yield put(orderCancellFailed());
    }
}

function* workGetAllOrders({ payload }) {
    // payload phải là id user
    try {
        const res = yield call(getAllOrdersByUser, payload);
        if (res.status === 200) {
            yield put(getOrdersByUserSuccess(res.data));
        }
    } catch (error) {
        console.log(error);
        yield put(getOrdersByUserFailed());
    }
}

function* orderSaga() {
    yield takeLatest(order.type, workOrder);
    yield takeLatest(orderCancell.type, workCancelledOrder);
    yield takeLatest(getOrdersByUser.type, workGetAllOrders);
}

export default orderSaga;
