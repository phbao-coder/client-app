import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import {
    getCartFromServer,
    removeProductToCart,
    updateDecreaProductInCart,
    updateIncreaProductInCart,
} from '~/store/cart/cartState';

import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './Cart.module.css';
import { order } from '~/store/orders/orderState';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Cart() {
    const cart = useSelector((state) => state.cart.cart);
    const userID = useSelector((state) => state.user.user.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDecreaProduct = (index) => {
        if (cart.products[index].count > 1) {
            dispatch(updateDecreaProductInCart(index));
        }
    };

    const handleIncreaProduct = (index) => {
        dispatch(updateIncreaProductInCart(index));
    };

    const handleRemoveProduct = (index) => {
        const productsCartTemp = [...cart.products];
        const productRemove = productsCartTemp.splice(index, 1);
        const newProductsCart = [...productsCartTemp];
        const newTotalCart = cart.cartTotal - productRemove[0].count * productRemove[0].price;
        dispatch(removeProductToCart({ products: newProductsCart, cartTotal: newTotalCart }));
    };

    const handleOrder = () => {
        dispatch(order({ _id: userID, method: 'Cash on Delivery', navigate }));
    };

    useEffect(() => {
        dispatch(getCartFromServer(userID));
    }, [dispatch, userID]);

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
                            <button onClick={() => handleRemoveProduct(index)}>
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('order')}>
                <p>Tổng giá trị đơn hàng: {vnd(cart?.cartTotal)} VND</p>
                <button onClick={() => handleOrder()}>Đặt hàng</button>
            </div>
        </div>
    );
}

export default Cart;
