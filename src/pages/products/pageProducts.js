import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import MenuProduct from '~/components/ProductMenu/MenuProduct';

import classNames from 'classnames/bind';
import style from './Products.module.css';
import ProductList from './productList';

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
