import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '~/store/products/productsState';

import Product from '~/components/Product/Product';

import classNames from 'classnames/bind';
import style from './Products.module.css';

const cx = classNames.bind(style);

function Products() {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className={cx('products')}>
            {products?.map((product) => (
                <Product product={product} key={product._id} />
            ))}
        </div>
    );
}

export default Products;
