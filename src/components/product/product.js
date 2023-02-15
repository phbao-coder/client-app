import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from './Product.module.css';

const cx = classNames.bind(style);

function Product({ product }) {
    return (
        <div className={cx('product')}>
            <div className={cx('image')}>
                <img src={product.images} alt={product.name} />
            </div>
            <div className={cx('name-price')}>
                <h3>{product.name}</h3>
                <span>{product.price} $</span>
            </div>
            <p>Description</p>
            <div className={cx('stars')}>
                <FontAwesomeIcon icon={faStar} className={cx('star')} />
                <FontAwesomeIcon icon={faStar} className={cx('star')} />
                <FontAwesomeIcon icon={faStar} className={cx('star')} />
                <FontAwesomeIcon icon={faStar} className={cx('star')} />
                <FontAwesomeIcon icon={faStar} className={cx('star')} />
            </div>
            <div className={cx('buy')}>
                <button>Add to cart</button>
            </div>
        </div>
    );
}

export default Product;
