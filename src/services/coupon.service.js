import instance from './instance';

export const applyCouponRequest = ({ idCart, code }) => {
    try {
        const res = instance.post('/api/coupon/apply', { idCart, code });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCouponsRequest = () => {
    try {
        const res = instance.get('/api/coupon');
        return res;
    } catch (error) {
        console.log(error);
    }
};
