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
import vnd from '~/utils/vnd';
const cx = classNames.bind(style);

const nameProductMobile = ['Samsung', 'Iphone', 'Oppo'];
const priceProduct = [
    { priceBigger: 0, priceLess: 1000000 },
    { priceBigger: 1000000, priceLess: 2000000 },
    { priceBigger: 2000000, priceLess: 5000000 },
    { priceBigger: 5000000, priceLess: 10000000 },
    { priceBigger: 10000000, priceLess: 20000000 },
    { priceBigger: 20000000, priceLess: 40000000 },
    { priceBigger: 40000000, priceLess: 99000000 },
];

function MenuProduct() {
    const dispatch = useDispatch();
    const [isDisplayAllProducts, setIsDisplayAllProducts] = useState(true);
    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState({ priceBigger: 0, priceLess: 99000000 });

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
                                priceLess: 99000000,
                            };
                        });
                    }}
                >
                    <span>Toàn bộ</span>
                </li>
                <li className={cx('fillter-item')}>
                    <span
                        onClick={() => {
                            setCategory('mobile');
                            // Set nó thành false để nó không gọi API lọc theo price sản phẩm
                            setIsDisplayAllProducts(false);
                        }}
                    >
                        {nameProduct !== '' ? nameProduct : 'Di động'}
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
                    <span>Phụ kiện</span>
                </li>
                <li className={cx('fillter-item')}>
                    <span>
                        {price.priceBigger === 0 && price.priceLess === 99000000 && 'Giá'}
                        {price.priceBigger === 0 &&
                            price.priceLess < 99000000 &&
                            `Dưới ${vnd(price.priceLess)} `}
                        {price.priceBigger !== 0 &&
                            price.priceBigger < 40000000 &&
                            `${vnd(price.priceBigger)}  đến ${vnd(price.priceLess)} `}
                        {price.priceBigger === 40000000 && `Trên ${vnd(price.priceBigger)} `}
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
                                                    `Dưới ${vnd(item.priceLess)}`}
                                                {item.priceBigger !== 0 &&
                                                    item.priceBigger < 40000000 &&
                                                    `${vnd(item.priceBigger)} đến ${vnd(
                                                        item.priceLess,
                                                    )}`}
                                                {item.priceBigger === 40000000 &&
                                                    `Trên ${vnd(item.priceBigger)}`}
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
