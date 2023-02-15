import instance from './instance';

export const getProductRequest = () => {
    try {
        const res = instance.get('/api/products/');
        return res;
    } catch (error) {
        console.log(error);
    }
};
