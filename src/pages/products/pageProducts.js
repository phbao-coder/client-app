import MenuProduct from '~/components/ProductMenu/MenuProduct';
import ProductList from './productList';

import classNames from 'classnames/bind';
import style from './Products.module.css';

const cx = classNames.bind(style);

function Products() {
    return (
        <div className={cx('container')}>
            <MenuProduct />
            <ProductList />
        </div>
    );
}

export default Products;
