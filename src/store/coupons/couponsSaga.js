const { call, put, takeLatest } = require('redux-saga/effects');
const { getCouponsRequest } = require('~/services/coupon.service');
const { getCouponsSuccess, getCouponsFailed, getCoupons } = require('./couponsState');

function* workGetAllCouponsSaga() {
    try {
        const res = yield call(getCouponsRequest);
        yield put(getCouponsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getCouponsFailed());
    }
}

function* couponsSaga() {
    yield takeLatest(getCoupons.type, workGetAllCouponsSaga);
}

export default couponsSaga;
