import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Product from '~/components/Product/Product';
import MenuProduct from '~/components/MenuProduct/MenuProduct';

import { getProducts } from '~/store/products/productsState';
import { addProductToCart, updateIncreaProductInCart } from '~/store/cart/cartState';

import addToCart from '~/utils/addToCart';

import classNames from 'classnames/bind';
import style from './Products.module.css';

const cx = classNames.bind(style);

function Products() {
    const products = useSelector((state) => state.products.products);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        const action = {
            addProductToCart,
            updateIncreaProductInCart,
        };
        addToCart(cart, product, dispatch, action);
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
