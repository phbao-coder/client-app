import { useSelector } from 'react-redux';

import Product from '~/components/product/product';

import classNames from 'classnames/bind';
import style from './Products.module.css';

const cx = classNames.bind(style);

function ProductList() {
    const products = useSelector((state) => state.products.products);

    return (
        <div className={cx('products')}>
            {products?.map((product) => (
                <div className={cx('products__item')}>
                    <Product product={product} key={product._id} />
                </div>
            ))}
        </div>
    );
}

export default ProductList;
