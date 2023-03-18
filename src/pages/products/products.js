import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Product from '~/components/product/product';
import MenuProduct from '~/components/ProductMenu/MenuProduct';

import { addProductToCart, updateIncreaProductInCart } from '~/store/cart/cartState';

import addToCart from '~/utils/addToCart';

import classNames from 'classnames/bind';
import style from './Products.module.css';

const cx = classNames.bind(style);

function Products() {
    const products = useSelector((state) => state.products.products);
    const cart = useSelector((state) => state?.cart?.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [menuDisplay, setMenuDisplay] = useState(false);

    const handleAddToCart = (product) => {
        const action = {
            addProductToCart,
            updateIncreaProductInCart,
        };
        addToCart(cart, product, dispatch, action, navigate);
    };

    console.log('re-render-page');

    return (
        <div className={cx('container')}>
            <div className={cx('menu', { 'menu-display': menuDisplay })}>
                <div className={cx('menu-item')}>
                    <MenuProduct />
                </div>
                <span
                    className={cx('menu-item-button')}
                    onClick={() => setMenuDisplay((prev) => !prev)}
                >
                    {menuDisplay ? (
                        <FontAwesomeIcon icon={faArrowRight} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowLeft} />
                    )}
                </span>
            </div>
            <div className={cx('products')}>
                {products?.map((product) => (
                    <Product product={product} onAddToCart={handleAddToCart} key={product._id} />
                ))}
            </div>
        </div>
    );
}

export default Products;
