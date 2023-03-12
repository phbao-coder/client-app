const { call, put, takeLatest } = require('redux-saga/effects');
const { getCouponsRequest, getCouponByCodeRequest } = require('~/services/coupon.service');
const {
    getCouponsSuccess,
    getCouponsFailed,
    getCoupons,
    getCouponSuccess,
    getCouponFailed,
    getCoupon,
} = require('./couponsState');

function* workGetAllCoupons() {
    try {
        const res = yield call(getCouponsRequest);
        yield put(getCouponsSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getCouponsFailed());
    }
}

function* workGetCoupon({ payload }) {
    // payload này là mã code
    try {
        const res = yield call(getCouponByCodeRequest, payload);
        yield put(getCouponSuccess(res.data));
    } catch (error) {
        console.log(error);
        yield put(getCouponFailed());
    }
}

function* couponsSaga() {
    yield takeLatest(getCoupons.type, workGetAllCoupons);
    yield takeLatest(getCoupon.type, workGetCoupon);
}

export default couponsSaga;
