import { Toast } from '~/minxin';

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
    orderFilter,
    orderFilterSuccess,
    orderSort,
    orderSortFailed,
    orderSortSuccess,
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
            yield navigate('/product');
            Toast.fire({
                icon: 'success',
                title: 'Đặt hàng thành công',
                text: 'Đơn hàng của bạn đang được xử lý',
            });
        }
    } catch (error) {
        console.log(error);
        Toast.fire({
            icon: 'error',
            title: 'Đặt hàng không thành công',
            text: 'Xin lỗi vì sự bất tiện này',
        });
        yield put(orderFailed());
    }
}

function* workCancelledOrder({ payload }) {
    const { idUser, idOrder, index } = payload;
    const _id = idUser;
    try {
        const res = yield call(putCencelledOrder, idOrder);
        if (res.status === 200) {
            // nhận index để update lại order local storage
            yield put(orderCancellSuccess(index));
            yield put(getOrdersByUser(_id));
            Toast.fire({
                icon: 'success',
                title: 'Hủy đơn thành công',
                text: 'Đơn hàng đã được hủy',
            });
        }
    } catch (error) {
        console.log(error);
        Toast.fire({
            icon: 'error',
            title: 'Hủy đơn không thành công',
            text: 'Xin lỗi vì sự bất tiện này',
        });
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

function* workSortOrder({ payload }) {
    // payload là một order đã được sắp xếp
    try {
        yield put(orderSortSuccess(payload));
    } catch (error) {
        console.log(error);
        yield put(orderSortFailed());
    }
}

function* workOrderFilter({ payload }) {
    // payload là một order đã được filter
    try {
        yield put(orderFilterSuccess(payload));
    } catch (error) {
        console.log(error);
    }
}

function* orderSaga() {
    yield takeLatest(order.type, workOrder);
    yield takeLatest(orderCancell.type, workCancelledOrder);
    yield takeLatest(getOrdersByUser.type, workGetAllOrders);
    yield takeLatest(orderSort.type, workSortOrder);
    yield takeLatest(orderFilter.type, workOrderFilter);
}

export default orderSaga;
