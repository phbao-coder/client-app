import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import color from '~/utils/color';
import vnd from '~/utils/vnd';

import style from './Product.module.css';

const cx = classNames.bind(style);

function Product({ product, onAddToCart }) {
    return (
        <div className={cx('product')}>
            <div className={cx('image')}>
                <img src={product.images} alt={product.name} />
            </div>
            <div className={cx('name')}>
                <Link to={product._id}>{product.name}</Link>
            </div>
            <div className={cx('information')}>
                <span>{vnd(product.price)} VND</span>
                <p>
                    {product.category === 'mobile'
                        ? product.description
                        : `Chức năng ${product.description}`}
                </p>
                <p>{color(product.color)}</p>
            </div>
            <div className={cx('buy')}>
                <button onClick={() => onAddToCart(product)}>Thêm vào giỏ hàng</button>
            </div>
        </div>
    );
}

export default Product;
