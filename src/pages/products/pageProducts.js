import MenuProduct from '~/components/ProductMenu/MenuProduct';
import ProductList from './productList';

import classNames from 'classnames/bind';
import style from './Products.module.css';
import Banner from '~/components/Banner/Banner';

const cx = classNames.bind(style);

function Products() {
    return (
        <>
            <Banner />
            <div className={cx('container')}>
                <MenuProduct />
                <ProductList />
            </div>
        </>
    );
}

export default Products;
