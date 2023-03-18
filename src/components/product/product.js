import { memo, useState } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './Product.module.css';

const cx = classNames.bind(style);

function Product({ product, onAddToCart }) {
    const { _id, name, images, price, sale, memory, category } = product;
    console.log('re-render-product');

    const handleAddToCart = () => {
        onAddToCart(product);
    };

    return (
        <div className={cx('product')}>
            {sale.isOnSale && <span className={cx('sale')}>{sale.salePercentage} %</span>}
            <div className={cx('image')}>
                <img src={images} alt={name} />
            </div>
            <div className={cx('information')}>
                <Link to={_id}>{name}</Link>
                {category === 'mobile' && <p>{memory} GB</p>}
                <span className={cx('price-sale')}>
                    {vnd(price - (price / 100) * sale.salePercentage)}{' '}
                </span>
                <span>{vnd(price)} VND</span>
            </div>
            <div className={cx('buy')}>
                <button onClick={handleAddToCart}>
                    Thêm vào <FontAwesomeIcon icon={faCartShopping} />
                </button>
            </div>
        </div>
    );
}

export default memo(Product);
