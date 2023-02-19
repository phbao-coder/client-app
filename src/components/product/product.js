import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './Product.module.css';

const cx = classNames.bind(style);

function Product({ product }) {
    return (
        <div className={cx('product')}>
            <div className={cx('image')}>
                <img src={product.images} alt={product.name} />
            </div>
            <div className={cx('name-price')}>
                <Link to={product._id}>{product.name}</Link>
                <span>{product.price}$</span>
            </div>
            <div className={cx('information')}>
                <p>{product.description}</p>
                <p>{product.os}</p>
                <p>{product.ram}GB Ram</p>
                <p>{product.memory}GB Rom</p>
                <p>{product.color}</p>
            </div>
            <div className={cx('buy')}>
                <button>Add to cart</button>
            </div>
        </div>
    );
}

export default Product;
