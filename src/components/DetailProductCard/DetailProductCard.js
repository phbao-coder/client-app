import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaQuantityProduct } from '~/store/cart/cartState';
import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './DetailProductCard.module.css';

const cx = classNames.bind(style);

function DetailProductCard({ product }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const handleAddToCart = (product) => {
        const productsInCart = [...cart.products];
        const isProductInCart = productsInCart.findIndex((item) => item.info.name === product.name);
        if (isProductInCart === -1) {
            // thêm sản phẩm mới
            const addProductToCart = [...productsInCart, { info: product, quantity: 1 }];
            // cập nhật tổng giá trị giỏ hàng
            const newTotalCost = cart.totalCost + product.price;
            dispatch(addToCart({ products: addProductToCart, totalCost: newTotalCost }));
        } else {
            // tăng số lượng nếu sản phẩm đã có trong giỏ hàng
            dispatch(increaQuantityProduct(isProductInCart));
        }
    };

    return (
        <div className={cx('container', 'flex')}>
            <div className={cx('left')}>
                <div className={cx('main-image')}>
                    <img src={product.images} alt={product.name} className={cx('slide')} />
                </div>
            </div>
            <div className={cx('right')}>
                <h3>{product.name}</h3>
                <h4>{vnd(product.price)} VND</h4>
                {product.category === 'accessories' && (
                    <p>
                        Chức năng: {product.description} <br />
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
                <button onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</button>
            </div>
        </div>
    );
}

export default DetailProductCard;
