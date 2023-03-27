import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

import {
    getCartFromServer,
    removeProductToCart,
    updateDecreaProductInCart,
    updateIncreaProductInCart,
} from '~/store/cart/cartState';

import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './Cart.module.css';
import Order from '~/components/Order/Order';

const cx = classNames.bind(style);

function Cart() {
    const cart = useSelector((state) => state.cart.cart);
    const userID = useSelector((state) => state.user.user.id);
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

    useEffect(() => {
        dispatch(getCartFromServer(userID));
    }, [dispatch, userID]);

    return (
        <>
            <div className={cx('container')}>
                <h1 className={cx('heading')}>Giỏ hàng của bạn</h1>
                {cart.products.length !== 0 && (
                    <div className={cx('table--container')}>
                        <table className={cx('cart')}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.products.map((product, index) => (
                                    <tr key={index}>
                                        <th>
                                            <button onClick={() => handleRemoveProduct(index)}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </th>
                                        <th>
                                            <div className={cx('cart__column--name')}>
                                                <img
                                                    src={product.product.images}
                                                    alt={product.product.name}
                                                    style={{ width: '70px' }}
                                                />
                                                <Link to={`/product/${product.product._id}`}>
                                                    {product.product.name}
                                                </Link>
                                            </div>
                                        </th>
                                        <th>
                                            <span className={cx('cart__column--price')}>
                                                <p className={cx('cart__column--price--original')}>
                                                    {vnd(product.product.price)}
                                                </p>
                                                <p className={cx('cart__column--price--sale')}>
                                                    {vnd(
                                                        product.product.price -
                                                            (product.product.price / 100) *
                                                                product.product.sale.salePercentage,
                                                    )}
                                                </p>
                                            </span>
                                        </th>
                                        <th>
                                            <div className={cx('cart__column--count')}>
                                                <button onClick={() => handleDecreaProduct(index)}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <span>{product.count}</span>
                                                <button onClick={() => handleIncreaProduct(index)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </th>
                                        <th>
                                            <span className={cx('cart__column--sum')}>
                                                {vnd(
                                                    product.count *
                                                        (product.product.price -
                                                            (product.product.price / 100) *
                                                                product.product.sale
                                                                    .salePercentage),
                                                )}
                                            </span>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={cx('action--container')}>
                            <h2 className={cx('action--container--title')}>Thông tin nhận hàng</h2>
                            <Order />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
