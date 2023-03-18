import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import MenuProduct from '~/components/ProductMenu/MenuProduct';

import classNames from 'classnames/bind';
import style from './Products.module.css';
import ProductList from './productList';

const cx = classNames.bind(style);

function Products() {
    const [menuDisplay, setMenuDisplay] = useState(false);

    return (
        <div className={cx('container')}>
            <div className={cx('menu', { 'menu-display': menuDisplay })}>
                <div className={cx('menu-item')}>
                    <MenuProduct />
                </div>
                <span
                    className={cx('menu-item-button')}
                    onClick={() => setMenuDisplay((prev) => !prev)}
                >
                    {menuDisplay ? (
                        <FontAwesomeIcon icon={faArrowRight} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowLeft} />
                    )}
                </span>
            </div>
            <ProductList />
        </div>
    );
}

export default Products;
