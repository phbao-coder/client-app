import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import {
    getCartFromServer,
    updateDecreaProductInCart,
    updateIncreaProductInCart,
} from '~/store/cart/cartState';

import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './Cart.module.css';

const cx = classNames.bind(style);

function Cart() {
    const cart = useSelector((state) => state.cart.cart);
    const userID = useSelector((state) => state.user.user.id);
    const dispatch = useDispatch();

    const handleDecreaProduct = (index) => {
        if (cart.products[index].count > 0) {
            dispatch(updateDecreaProductInCart(index));
        }
    };
    const handleIncreaProduct = (index) => {
        dispatch(updateIncreaProductInCart(index));
    };
    const handleRemoveProduct = (index) => {};

    useEffect(() => {
        dispatch(getCartFromServer(userID));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('container')}>
            <h1 className={cx('heading')}>Giỏ hàng của bạn</h1>
            <div className={cx('box')}>
                {cart?.products?.map((item, index) => (
                    <div className={cx('box-item')} key={item.product._id}>
                        <div className={cx('box-item-left')}>
                            <img src={item.product.images} alt={item.product.name} />
                        </div>
                        <div className={cx('box-item-right')}>
                            <h2>{item.product.name}</h2>
                            <div className={cx('quantity')}>
                                <button onClick={() => handleDecreaProduct(index)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <p>Quantity: {item.count}</p>
                                <button onClick={() => handleIncreaProduct(index)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <p>Price: {vnd(item.product.price)} VND</p>
                            <p>Cost: {vnd(item.price * item.count)} VND</p>
                        </div>
                        <div className={cx('delete')}>
                            <button>
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('order')}>
                <p>Tổng giá trị đơn hàng: {vnd(cart?.cartTotal)} VND</p>
                <button>Đặt hàng</button>
            </div>
        </div>
    );
}

export default Cart;
