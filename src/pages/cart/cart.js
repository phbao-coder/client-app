import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Order from '~/components/Order/Order';

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

    useEffect(() => {
        dispatch(getCartFromServer(userID));
    }, [dispatch, userID]);

    return (
        <div className={cx('container')}>
            {cart.cartTotal !== 0 ? (
                <>
                    <h1>Giỏ hàng của bạn</h1>
                    <div className={cx('cart')}>
                        {cart?.products.map((product, index) => (
                            <div className={cx('cart-item')} key={index}>
                                <div className={cx('cart-flex')}>
                                    <img src={product.product.images} alt={product.product.name} />
                                    <div className={cx('cart-info')}>
                                        <h3>
                                            {product.product.name}{' '}
                                            {product.product.sale.isOnSale && (
                                                <span className={cx('sale')}>
                                                    -{product.product.sale.salePercentage} %
                                                </span>
                                            )}
                                        </h3>
                                        <p className={cx('sale-original')}>
                                            {vnd(product.product.price)} VND
                                        </p>
                                        <p className={cx('sale-price')}>
                                            {vnd(
                                                product.product.price -
                                                    (product.product.price / 100) *
                                                        product.product.sale.salePercentage,
                                            )}{' '}
                                            VND
                                        </p>
                                        <p>
                                            Tạm tính:{' '}
                                            {vnd(
                                                product.count *
                                                    (product.product.price -
                                                        (product.product.price / 100) *
                                                            product.product.sale.salePercentage),
                                            )}{' '}
                                            VND
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('cart-action')}>
                                    <div className={cx('cart-button')}>
                                        <button onClick={() => handleDecreaProduct(index)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <p>{product.count}</p>
                                        <button onClick={() => handleIncreaProduct(index)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className={cx('cart-delete')}>
                                        <button onClick={() => handleRemoveProduct(index)}>
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Order />
                </>
            ) : (
                <div className={cx('empty-cart')}>
                    <img
                        src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
                        alt=""
                    />
                    <button onClick={() => navigate('/product')}>Quay lại trang sản phẩm</button>
                </div>
            )}
        </div>
    );
}

export default Cart;
