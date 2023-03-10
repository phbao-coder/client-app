import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, updateIncreaProductInCart } from '~/store/cart/cartState';

import Tippy from '@tippyjs/react/headless';

import vnd from '~/utils/vnd';
import color from '~/utils/color';
import addToCart from '~/utils/addToCart';

import classNames from 'classnames/bind';
import style from './DetailProductCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function DetailProductCard({ product }) {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        const action = {
            addProductToCart,
            updateIncreaProductInCart,
        };
        addToCart(cart, product, dispatch, action);
    };

    return (
        <div className={cx('container', 'flex')}>
            <div className={cx('left')}>
                <div className={cx('main-image')}>
                    <img src={product.images} alt={product.name} className={cx('slide')} />
                </div>
            </div>
            <div className={cx('right')}>
                <h3>
                    {product.name} <span>-15%</span>
                </h3>
                <h4>{vnd(product.price)} VND</h4>
                <h4 className={cx('price-sale')}>
                    {vnd(product.price - (product.price / 100) * 15)} VND
                </h4>
                {product.category === 'accessories' && (
                    <p>
                        Chức năng: {product.description} <br />
                        <span>Màu sắc: {color(product.color)}</span>
                    </p>
                )}
                {product.category === 'mobile' && (
                    <p>
                        Màn hình: {product.description} <br />
                        Camera sau: {product.camBack} <br />
                        Camera trước: {product.camFront} <br />
                        Ram: {product.ram} GB
                        <br />
                        Rom: {product.memory} GB <br />
                        OS: {product.os} <br />
                        Pin: {product.pin} mAh
                        <br />
                        <span>Màu sắc: {product.color}</span>
                    </p>
                )}
                <Tippy arrow={true} render={() => <></>}>
                    <button onClick={() => handleAddToCart(product)}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                </Tippy>
            </div>
        </div>
    );
}

export default DetailProductCard;
