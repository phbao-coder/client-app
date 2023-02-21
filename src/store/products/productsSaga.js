import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getProductIdRequest,
    getProductRequest,
    getProductsByCategoryRequest,
    getProductsByNameAndCategoryAndPriceRequest,
    getProductsByNameAndPriceRequest,
    getProductsByNameRequest,
    getProductsByPriceRequest,
} from '~/services/product.service';
import {
    getProducts,
    getProductsByCategory,
    getProductsSuccess,
    getProductsFailed,
    getProductIdFailed,
    getProductId,
    getProductIdSuccess,
    getProductsByName,
    getProductsByPrice,
    getProductsByNameAndPrice,
    getProductsByNameAndCategoryAndPrice,
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

function* workGetProductByCategory({ payload }) {
    try {
        const res = yield call(getProductsByCategoryRequest, payload);
        yield put(getProductsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getProductsFailed());
    }
}

function* workGetProductsByName({ payload }) {
    try {
        const res = yield call(getProductsByNameRequest, payload);
        yield put(getProductsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getProductsFailed());
    }
}

function* workGetProductsByPrice({ payload }) {
    try {
        const res = yield call(getProductsByPriceRequest, payload);
        yield put(getProductsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getProductsFailed());
    }
}

function* workGetProductsByNameAndPrice({ payload }) {
    try {
        const res = yield call(getProductsByNameAndPriceRequest, payload);
        yield put(getProductsSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
}

function* workGetProductsByNameAndCategoryAndPrice({ payload }) {
    try {
        console.log(payload);
        const res = yield call(getProductsByNameAndCategoryAndPriceRequest, payload);
        yield put(getProductsSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
}

function* productsSaga() {
    yield takeLatest(getProducts.type, workGetProducts);
    yield takeLatest(getProductId.type, workGetProductId);
    yield takeLatest(getProductsByCategory.type, workGetProductByCategory);
    yield takeLatest(getProductsByName.type, workGetProductsByName);
    yield takeLatest(getProductsByPrice.type, workGetProductsByPrice);
    yield takeLatest(getProductsByNameAndPrice.type, workGetProductsByNameAndPrice);
    yield takeLatest(
        getProductsByNameAndCategoryAndPrice.type,
        workGetProductsByNameAndCategoryAndPrice,
    );
}

export default productsSaga;
