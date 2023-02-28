import instance from './instance';

export const addToCartRequest = (userID, cart) => {
    const obj = {
        userID,
        cart,
    };

    try {
        const res = instance.post('/api/cart', obj);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCartByUserRequest = (userID) => {
    try {
        const res = instance.get(`/api/cart/${userID}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
