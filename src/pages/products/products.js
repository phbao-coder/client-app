import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '~/store/products/productsState';
import { addToCart, increaQuantityProduct } from '~/store/cart/cartState';

import Product from '~/components/Product/Product';
import MenuProduct from '~/components/MenuProduct/MenuProduct';

import classNames from 'classnames/bind';
import style from './Products.module.css';

const cx = classNames.bind(style);

function Products() {
    const products = useSelector((state) => state.products.products);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className={cx('container')}>
            <MenuProduct />
            <div className={cx('products')}>
                {products?.map((product) => (
                    <Product product={product} onAddToCart={handleAddToCart} key={product._id} />
                ))}
            </div>
        </div>
    );
}

export default Products;
