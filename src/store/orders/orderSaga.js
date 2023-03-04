import { call, put, takeLatest } from 'redux-saga/effects';
import { postOrder } from '~/services/order.service';
import { clearCart } from '../cart/cartState';
import { order, orderSuccess } from './orderState';

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

function* orderSaga() {
    yield takeLatest(order.type, workOrder);
}

export default orderSaga;
