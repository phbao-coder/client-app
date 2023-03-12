import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, updateIncreaProductInCart } from '~/store/cart/cartState';

import Tippy from '@tippyjs/react/headless';

import vnd from '~/utils/vnd';
import colorVietnamese from '~/utils/color';
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
        <div className={cx('container', 'flex')}>
            <div className={cx('left')}>
                <div className={cx('main-image')}>
                    <img src={images} alt={name} className={cx('slide')} />
                </div>
            </div>
            <div className={cx('right')}>
                <h3>
                    {name} {sale.isOnSale && <span>{sale.salePercentage} %</span>}
                </h3>
                <h4>{vnd(price)} VND</h4>
                <h4 className={cx('price-sale')}>
                    {vnd(price - (price / 100) * sale.salePercentage)} VND
                </h4>
                {category === 'accessories' && (
                    <p>
                        Chức năng: {description} <br />
                        <span>Màu sắc: {colorVietnamese(color)}</span>
                    </p>
                )}
                {category === 'mobile' && (
                    <p>
                        Màn hình: {description} <br />
                        Camera sau: {camBack} <br />
                        Camera trước: {camFront} <br />
                        Ram: {ram} GB
                        <br />
                        Rom: {memory} GB <br />
                        OS: {os} <br />
                        Pin: {pin} mAh
                        <br />
                        <span>Màu sắc: {color}</span>
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
