import instance from './instance';

// Get all products
export const getProductRequest = () => {
    try {
        const res = instance.get('/api/products');
        return res;
    } catch (error) {}
};

// Get product by id
export const getProductIdRequest = (productId) => {
    try {
        const res = instance.get(`/api/products/${productId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get products by category // mobile or accessories
export const getProductsByCategoryRequest = (category) => {
    try {
        const res = instance.get(`/api/products?category=${category}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get products by name
export const getProductsByNameRequest = (nameProduct) => {
    try {
        const res = instance.get(`/api/products?name[regex]=${nameProduct}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get products by price
export const getProductsByPriceRequest = ({ priceBigger, priceLess }) => {
    try {
        const res = instance.get(`/api/products?price[gte]=${priceBigger}&price[lte]=${priceLess}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get products by price and name
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

// Get products by name, category and pirce
export const getProductsByNameAndCategoryAndPriceRequest = ({
    nameProduct,
    category,
    priceBigger,
    priceLess,
}) => {
    try {
        const res = instance.get(
            `/api/products?name[regex]=${nameProduct}&category=${category}&price[gte]=${priceBigger}&price[lte]=${priceLess}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
