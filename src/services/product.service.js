import instance from './instance';

export const getProductRequest = () => {
    try {
        const res = instance.get('/api/products/');
        return res;
    } catch (error) {}
};

export const getProductIdRequest = (productId) => {
    try {
        const res = instance.get(`/api/products/${productId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
