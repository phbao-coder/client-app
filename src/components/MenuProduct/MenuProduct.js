import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import style from './MenuProduct.module.css';
import { useDispatch } from 'react-redux';
import {
    getProductsByPrice,
    getProductsByNameAndCategoryAndPrice,
} from '~/store/products/productsState';
import { useEffect, useState } from 'react';
const cx = classNames.bind(style);

const nameProductMobile = ['Samsung', 'Iphone', 'Oppo'];
const priceProduct = [
    { priceBigger: 0, priceLess: 500 },
    { priceBigger: 500, priceLess: 1000 },
    { priceBigger: 1000, priceLess: 1500 },
    { priceBigger: 1500, priceLess: 2000 },
    { priceBigger: 2000, priceLess: 9999 },
];

function MenuProduct() {
    const dispatch = useDispatch();
    const [isDisplayAllProducts, setIsDisplayAllProducts] = useState(true);
    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState({ priceBigger: 0, priceLess: 9999 });

    useEffect(() => {
        if (isDisplayAllProducts) {
            const { priceBigger, priceLess } = price;
            dispatch(getProductsByPrice({ priceBigger, priceLess }));
        } else {
            const { priceBigger, priceLess } = price;
            dispatch(
                getProductsByNameAndCategoryAndPrice({
                    nameProduct,
                    category,
                    priceBigger,
                    priceLess,
                }),
            );
        }
    }, [category, dispatch, isDisplayAllProducts, nameProduct, price]);

    return (
        <div className={cx('fillter')}>
            <ul>
                <li
                    className={cx('fillter-item')}
                    onClick={() => {
                        setIsDisplayAllProducts(true); // Set thằng này bằng true để nó gọi API lấy toàn bộ sản phẩm
                        setNameProduct('');
                        // Vì ta dùng API lọc theo giá (price) của sản phẩm nên phải reset lại price
                        setPrice(() => {
                            return {
                                priceBigger: 0,
                                priceLess: 9999,
                            };
                        });
                    }}
                >
                    <span>All</span>
                </li>
                <li className={cx('fillter-item')}>
                    <span
                        onClick={() => {
                            setCategory('mobile');
                            // Set nó thành false để nó không gọi API lọc theo price sản phẩm
                            setIsDisplayAllProducts(false);
                        }}
                    >
                        {nameProduct !== '' ? nameProduct : 'Mobile'}
                    </span>
                    <Tippy
                        delay={[0, 0]}
                        interactive={true}
                        placement="bottom"
                        offset={[-40, 20]}
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <ul className={cx('menu')}>
                                    {nameProductMobile.map((item, index) => (
                                        <li
                                            key={index}
                                            className={cx('menu-item')}
                                            onClick={() => {
                                                // Đề phòng trường hợp người dùng không chọn category rồi mới chọn sản phẩm. Mà chọn thẳng sản phẩm.
                                                setCategory('mobile');
                                                setIsDisplayAllProducts(false);

                                                setNameProduct(item);
                                            }}
                                        >
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    >
                        <FontAwesomeIcon icon={faArrowDown} className={cx('icon')} />
                    </Tippy>
                </li>
                <li
                    className={cx('fillter-item')}
                    onClick={() => {
                        // Tránh trường hợp gửi API là accessories có lẫn tên sản phẩm của mobile
                        setNameProduct('');
                        setCategory('accessories');
                        setIsDisplayAllProducts(false);
                    }}
                >
                    <span>Accessories</span>
                </li>
                <li className={cx('fillter-item')}>
                    <span>
                        {price.priceBigger === 0 && price.priceLess === 9999 && 'Price'}
                        {price.priceBigger === 0 &&
                            price.priceLess < 9999 &&
                            `Dưới ${price.priceLess}`}
                        {price.priceBigger !== 0 &&
                            price.priceBigger < 2000 &&
                            `${price.priceBigger}$ to ${price.priceLess}$`}
                        {price.priceBigger === 2000 && `Trên ${price.priceBigger}$`}
                    </span>
                    <Tippy
                        delay={[0, 0]}
                        interactive={true}
                        placement="bottom"
                        offset={[-40, 20]}
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <ul className={cx('menu')}>
                                    {priceProduct.map((item, index) => (
                                        <li
                                            key={index}
                                            className={cx('menu-item')}
                                            onClick={() => {
                                                setPrice(() => {
                                                    return {
                                                        priceBigger: item.priceBigger,
                                                        priceLess: item.priceLess,
                                                    };
                                                });
                                            }}
                                        >
                                            <span>
                                                {item.priceBigger === 0 &&
                                                    `Dưới ${item.priceLess}$`}
                                                {item.priceBigger !== 0 &&
                                                    item.priceBigger < 2000 &&
                                                    `${item.priceBigger}$ to ${item.priceLess}$`}
                                                {item.priceBigger === 2000 &&
                                                    `Trên ${item.priceBigger}$`}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    >
                        <FontAwesomeIcon icon={faArrowDown} className={cx('icon')} />
                    </Tippy>
                </li>
            </ul>
        </div>
    );
}

export default MenuProduct;
