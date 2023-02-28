import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { increaQuantityProduct, decreaQuantityProduct, addToCart } from '~/store/cart/cartState';

import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './Cart.module.css';

const cx = classNames.bind(style);

function Cart() {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const handleIncreaQuantityProduct = (index) => {
        dispatch(increaQuantityProduct(index));
    };

    const handleDecreaQuantityProduct = (index) => {
        if (cart.products[index].quantity > 1) {
            dispatch(decreaQuantityProduct(index));
        }
    };

    const handleRemoveProductFromCart = (index) => {
        const productsCart = [...cart.products]; // tạo mảng temp
        const product = productsCart.splice(index, 1)[0]; // xóa phần tử ở vị trí được chọn
        const newTotalCost = cart.totalCost - product.info.price * product.quantity; // tính lại tổng giá trị giỏ hàng
        const newProductsCart = [...productsCart];
        dispatch(addToCart({ products: newProductsCart, totalCost: newTotalCost }));
    };

    useEffect(() => {}, [cart]);

    return (
        <div className={cx('container')}>
            <h1 className={cx('heading')}>Your Cart</h1>
            <div className={cx('box')}>
                {cart?.products?.map((item, index) => (
                    <div className={cx('box-item')} key={item.info._id}>
                        <div className={cx('box-item-left')}>
                            <img src={item.info.images} alt={item.info.name} />
                        </div>
                        <div className={cx('box-item-right')}>
                            <h2>{item.info.name}</h2>
                            <div className={cx('quantity')}>
                                <button onClick={() => handleDecreaQuantityProduct(index)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleIncreaQuantityProduct(index)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <p>Price: {vnd(item.info.price)} VND</p>
                            <p>Cost: {vnd(item.info.price * item.quantity)} VND</p>
                        </div>
                        <div className={cx('delete')}>
                            <button onClick={() => handleRemoveProductFromCart(index)}>
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('order')}>
                <p>Tổng giá trị đơn hàng: {vnd(cart.totalCost)} VND</p>
                <button>Order</button>
            </div>
        </div>
    );
}

export default Cart;
