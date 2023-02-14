import Product from '~/components/Product/Product';

import classNames from 'classnames/bind';
import style from './Products.module.css';

const cx = classNames.bind(style);

function Products() {
    return (
        <div className={cx('container')}>
            <Product />
        </div>
    );
}

export default Products;
