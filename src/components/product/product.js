import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { addProductToCart } from '~/store/cart/cartState';

import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './Product.module.css';

const cx = classNames.bind(style);

function Product({ product, isDisplayButton = true }) {
    const { _id, name, images, price, sale } = product;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addProductToCart({ product, navigate }));
    };

    return (
        <div className={cx('product')}>
            <div className={cx('product__header')}>
                <Link to={`/product/${_id}`} className={cx('product__header--link')}>
                    <img className={cx('product__header--link--image')} src={images} alt={name} />
                </Link>
                {sale.isOnSale && (
                    <span className={cx('product__header--sale')}>- {sale.salePercentage}%</span>
                )}
            </div>
            <div className={cx('product__body')}>
                <Link to={`/product/${_id}`} className={cx('product__body--link')}>
                    {name}
                </Link>
                <span>{vnd(price - (price / 100) * sale.salePercentage)}</span>
                <span className={cx('product__body--sale')}>{vnd(price)}</span>
                {isDisplayButton && (
                    <button className={cx('product__body--button')} onClick={handleAddToCart}>
                        <span className={cx('product__body--button-text')}>Thêm vào giỏ hàng</span>
                        <span className={cx('product__body--button-icon')}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Product;
