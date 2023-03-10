import { Link } from 'react-router-dom';

import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './Product.module.css';

const cx = classNames.bind(style);

function Product({ product, onAddToCart }) {
    return (
        <div className={cx('product')}>
            <span className={cx('sale')}>15%</span>
            <div className={cx('image')}>
                <img src={product.images} alt={product.name} />
            </div>
            <div className={cx('information')}>
                <Link to={product._id}>{product.name}</Link>
                <span className={cx('price-sale')}>
                    {vnd(product.price - (product.price / 100) * 15)}{' '}
                </span>
                <span>{vnd(product.price)} VND</span>
            </div>
            <div className={cx('buy')}>
                <button onClick={() => onAddToCart(product)}>Thêm vào giỏ</button>
            </div>
        </div>
    );
}

export default Product;
