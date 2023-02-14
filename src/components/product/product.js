import classNames from 'classnames/bind';
import style from './Product.module.css';

const cx = classNames.bind(style);

function Product() {
    return (
        <div className={cx('Card')}>
            <h2>Product</h2>
        </div>
    );
}

export default Product;
