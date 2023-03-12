import instance from './instance';

export const applyCouponRequest = ({ idCart, code }) => {
    try {
        const res = instance.post('/api/coupon/apply', { idCart, code });
        return res;
    } catch (error) {
        console.log(error);
    }
};
