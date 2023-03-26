import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, updateIncreaProductInCart } from '~/store/cart/cartState';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import vnd from '~/utils/vnd';
import addToCart from '~/utils/addToCart';
import colorVietnamese from '~/utils/color';

import classNames from 'classnames/bind';
import style from './DetailProductCard.module.css';

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
    const {
        images,
        name,
        price,
        color,
        category,
        description,
        camBack,
        camFront,
        ram,
        memory,
        os,
        pin,
        sale,
    } = product;

    return (
        <div className={cx('container')}>
            <div className={cx('container--left')}>
                <img src={images} alt={name} />
            </div>
            <div className={cx('container--right')}>
                {category === 'accessories' && (
                    <div className={cx('container__information')}>
                        <h2 className={cx('container__information--name')}>{name}</h2>
                        <h2 className={cx('container__information--sale')}>
                            Giảm -{sale.salePercentage}%
                        </h2>
                        <div className={cx('container__information--price')}>
                            <h3>{vnd(price - (price / 100) * sale.salePercentage)}</h3>
                            <h3 className={cx('container__information--price--original')}>
                                {vnd(price)}
                            </h3>
                        </div>
                        <button
                            className={cx('container--right__button')}
                            onClick={() => handleAddToCart(product)}
                        >
                            Thêm vào giỏ hàng <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                        <div className={cx('container__information--detail')}>
                            <h3>Thông số kỹ thuật</h3>
                            <ul>
                                <li>Chức năng: {description}</li>
                                <li>Màu sắc: {colorVietnamese(color)}</li>
                            </ul>
                        </div>
                    </div>
                )}
                {category === 'mobile' && (
                    <div className={cx('container__information')}>
                        <h2 className={cx('container__information--name')}>{name}</h2>
                        <h2 className={cx('container__information--sale')}>
                            Giảm -{sale.salePercentage}%
                        </h2>
                        <div className={cx('container__information--price')}>
                            <h3>{vnd(price - (price / 100) * sale.salePercentage)}</h3>
                            <h3 className={cx('container__information--price--original')}>
                                {vnd(price)}
                            </h3>
                        </div>
                        <button
                            className={cx('container--right__button')}
                            onClick={() => handleAddToCart(product)}
                        >
                            Thêm vào giỏ hàng <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                        <div className={cx('container__information--detail')}>
                            <h3>Thông số kỹ thuật</h3>
                            <ul>
                                <li>Màn hình: {description}</li>
                                <li>Camera trước: {camFront}</li>
                                <li>Camera sau: {camBack}</li>
                                <li>Dung lượng RAM: {ram} GB</li>
                                <li>Dung lượng ROM: {memory} GB</li>
                                <li>Hệ điều hành: {os}</li>
                                <li>Dung lượng pin: {pin} mAh</li>
                                <li>Màu sắc: {colorVietnamese(color)}</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailProductCard;
