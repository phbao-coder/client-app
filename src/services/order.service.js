import instance from './instance';

// create order
export const postOrder = ({ _id, method }) => {
    try {
        const res = instance.post('/api/order', { _id, method });
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
