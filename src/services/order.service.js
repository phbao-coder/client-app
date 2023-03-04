import instance from './instance';

// create order
export const postOrder = (obj) => {
    // obj: {_id, method, destination, phone, note}
    try {
        const res = instance.post('/api/order', obj);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// get all orders by user
export const getAllOrdersByUser = (_id) => {
    try {
        const res = instance.get(`/api/order/user/${_id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
