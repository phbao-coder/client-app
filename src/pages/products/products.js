import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    getProducts,
    getProductsByCategory,
    getProductsByNameAndPrice,
} from '~/store/products/productsState';

import Product from '~/components/Product/Product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import style from './Products.module.css';
const cx = classNames.bind(style);

function Products() {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const [objRequest, setObjRequest] = useState({
        nameProduct: '',
        priceBigger: 0,
        priceLess: 9999,
    });

    const onClickChangeCategory = (category) => {
        dispatch(getProductsByCategory(category));
    };

    const onClickChangeName = (nameProduct) => {
        setObjRequest((prev) => {
            return { ...prev, nameProduct: nameProduct };
        });
    };

    const onClickChangePrice = (priceBigger, priceLess) => {
        setObjRequest((prev) => {
            return { ...prev, priceBigger: priceBigger, priceLess: priceLess };
        });
    };

    useEffect(() => {
        dispatch(getProductsByNameAndPrice(objRequest));
    }, [dispatch, objRequest]);

    return (
        <div className={cx('container')}>
            <div className={cx('fillter')}>
                <ul>
                    <li
                        className={cx('fillter-item')}
                        onClick={() => {
                            dispatch(getProducts());
                        }}
                    >
                        <span>All</span>
                    </li>
                    <li className={cx('fillter-item')}>
                        <span onClick={() => onClickChangeCategory('mobile')}>Mobile</span>
                        <Tippy
                            delay={[0, 0]}
                            interactive={true}
                            placement="bottom"
                            offset={[-40, 20]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <ul className={cx('menu')}>
                                        <li
                                            className={cx('menu-item')}
                                            onClick={() => onClickChangeName('Samsung')}
                                        >
                                            <span>Samsung</span>
                                        </li>
                                        <li
                                            className={cx('menu-item')}
                                            onClick={() => onClickChangeName('Iphone')}
                                        >
                                            <span>Iphone</span>
                                        </li>
                                        <li
                                            className={cx('menu-item')}
                                            onClick={() => onClickChangeName('Oppo')}
                                        >
                                            <span>Oppo</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        >
                            <FontAwesomeIcon icon={faArrowDown} className={cx('icon')} />
                        </Tippy>
                    </li>
                    <li className={cx('fillter-item')}>
                        <span onClick={() => onClickChangeCategory('accessories')}>
                            Accessories
                        </span>
                    </li>
                    <li className={cx('fillter-item')}>
                        <span
                            onClick={() =>
                                setObjRequest((prev) => {
                                    return {
                                        ...prev,
                                        priceBigger: 0,
                                        priceLess: 9999,
                                    };
                                })
                            }
                        >
                            Prices
                        </span>
                        <Tippy
                            delay={[0, 0]}
                            interactive={true}
                            placement="bottom"
                            offset={[-40, 20]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <ul className={cx('menu')}>
                                        <li
                                            className={cx('menu-item')}
                                            onClick={() => onClickChangePrice(0, 1000)}
                                        >
                                            <span>Dưới &#60; 1000$</span>
                                        </li>
                                        <li
                                            className={cx('menu-item')}
                                            onClick={() => onClickChangePrice(1000, 2000)}
                                        >
                                            <span>Từ 1000$ - 2000$</span>
                                        </li>
                                        <li
                                            className={cx('menu-item')}
                                            onClick={() => onClickChangePrice(2000, 9999)}
                                        >
                                            <span>Trên &#62; 2000$</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        >
                            <FontAwesomeIcon icon={faArrowDown} className={cx('icon')} />
                        </Tippy>
                    </li>
                </ul>
            </div>
            <div className={cx('products')}>
                {products?.map((product) => (
                    <Product product={product} key={product._id} />
                ))}
            </div>
        </div>
    );
}

export default Products;
