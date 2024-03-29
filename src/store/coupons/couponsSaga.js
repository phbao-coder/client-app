const { call, put, takeLatest } = require('redux-saga/effects');
const { getCouponsRequest } = require('~/request/coupon.request');
const { getCouponsSuccess, getCouponsFailed, getCoupons } = require('./couponsState');

function* workGetAllCoupons() {
    try {
        const res = yield call(getCouponsRequest);
        yield put(getCouponsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getCouponsFailed());
    }
}

function* couponsSaga() {
    yield takeLatest(getCoupons.type, workGetAllCoupons);
}

export default couponsSaga;
