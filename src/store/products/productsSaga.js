import { call, put, takeLatest } from 'redux-saga/effects';
import { getProductRequest } from '~/services/product.service';
import { getProducts, getProductsSuccess, getProductsFailed } from './productsState';

function* workGetProducts() {
    try {
        const res = yield call(getProductRequest);
        yield put(getProductsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getProductsFailed());
    }
}

function* productsSaga() {
    yield takeLatest(getProducts.type, workGetProducts);
}

export default productsSaga;
