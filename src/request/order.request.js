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

// cencelled order
export const putCencelledOrder = (idOrder) => {
    // _id là _id của đơn hàng
    const status = { status: 'Cancelled' };
    try {
        // vì đây là api hủy đơn nên gán mặc định 'Cancelled'
        const res = instance.put(`/api/order/${idOrder}`, status);
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
