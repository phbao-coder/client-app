import { call, put, takeLatest } from 'redux-saga/effects';
import { getProductIdRequest, getProductRequest } from '~/services/product.service';
import {
    getProducts,
    getProductsSuccess,
    getProductsFailed,
    getProductIdFailed,
    getProductId,
    getProductIdSuccess,
} from './productsState';

function* workGetProducts() {
    try {
        const res = yield call(getProductRequest);
        yield put(getProductsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getProductsFailed());
    }
}

function* workGetProductId({ payload }) {
    try {
        const res = yield call(getProductIdRequest, payload);
        yield put(getProductIdSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getProductIdFailed());
    }
}

function* productsSaga() {
    yield takeLatest(getProducts.type, workGetProducts);
    yield takeLatest(getProductId.type, workGetProductId);
}

export default productsSaga;
