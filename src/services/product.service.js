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

export const getProductsByCategoryRequest = (category) => {
    try {
        const res = instance.get(`/api/products?category=${category}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getProductsByNameRequest = (nameProduct) => {
    try {
        const res = instance.get(`/api/products?name[regex]=${nameProduct}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getProductsByPriceRequest = ({ priceBigger, priceLess }) => {
    try {
        const res = instance.get(`/api/products?price[gte]=${priceBigger}&price[lte]=${priceLess}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getProductsByNameAndPriceRequest = ({ nameProduct, priceBigger, priceLess }) => {
    try {
        const res = instance.get(
            `/api/products?name[regex]=${nameProduct}&price[gte]=${priceBigger}&price[lte]=${priceLess}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
