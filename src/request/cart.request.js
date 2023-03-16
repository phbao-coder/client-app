import instance from './instance';

// lấy giỏ hàng đã được lưu từ trước của người dùng
export const getCartByUserRequest = (userID) => {
    try {
        const res = instance.get(`/api/cart/${userID}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// sau khi add hay update cart sẽ save giỏ hàng lên csdl
export const postSaveCartRequest = ({ cartLocal, userID, token }) => {
    // xử lý dữ liệu phù hợp lưu csdl
    const cart = cartLocal.products.map((item) => {
        return {
            _id: item.product._id,
            count: item.count,
        };
    });

    const obj = {
        cart,
        _id: userID,
    };

    try {
        const res = instance.post('/api/cart', obj, {
            headers: { 'x-access-token': token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
