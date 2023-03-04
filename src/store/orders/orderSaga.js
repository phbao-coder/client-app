import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllOrdersByUser, postOrder } from '~/services/order.service';
import { clearCart } from '../cart/cartState';
import {
    getOrdersByUser,
    getOrdersByUserFailed,
    getOrdersByUserSuccess,
    order,
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
            console.log('Order success');
        }
    } catch (error) {
        console.log(error);
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
    yield takeLatest(getOrdersByUser.type, workGetAllOrders);
}

export default orderSaga;
