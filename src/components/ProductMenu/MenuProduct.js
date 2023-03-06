import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Select from 'react-select';

import {
    getProductsByPrice,
    getProductsByNameAndCategoryAndPrice,
} from '~/store/products/productsState';

import classNames from 'classnames/bind';
import style from './MenuProduct.module.css';

const cx = classNames.bind(style);

const menuCategory = [
    { value: 'All', label: 'Tất cả' },
    { value: 'mobile', label: 'Điện thoại' },
    { value: 'accessories', label: 'Phụ kiện' },
];

const menuPhone = [
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Iphone', label: 'Iphone' },
    { value: 'Oppo', label: 'Oppo' },
    { value: 'Xiaomi', label: 'Xiaomi' },
];

const menuPrices = [
    { value: { priceBigger: 0, priceLess: 1000000 }, label: 'Dưới 1 triệu' },
    { value: { priceBigger: 1000000, priceLess: 2000000 }, label: 'Từ 1 triệu đến 2 triệu' },
    { value: { priceBigger: 2000000, priceLess: 5000000 }, label: 'Từ 2 triệu đến 5 triệu' },
    {
        value: { priceBigger: 10000000, priceLess: 20000000 },
        label: 'Từ 10 triệu đến 20 triệu',
    },
    { value: { priceBigger: 20000000, priceLess: 99000000 }, label: 'Trên 20 triệu' },
];

function MenuProduct() {
    const dispatch = useDispatch();

    const [isAll, setIsAll] = useState(true);
    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState({ priceBigger: 0, priceLess: 99999999 });

    useEffect(() => {
        if (isAll) {
            dispatch(getProductsByPrice(price));
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
    }, [category, dispatch, isAll, nameProduct, price]);

    return (
        <div className={cx('filter')}>
            <Select
                className={cx('filter-item')}
                placeholder="Tất cả"
                onChange={(e) => {
                    if (e.value === 'All') {
                        setIsAll(true);
                        setPrice({ priceBigger: 0, priceLess: 999999999 });
                        setCategory('All');
                    } else {
                        setIsAll(false);
                        setNameProduct('');
                        setCategory(e.value);
                    }
                }}
                options={menuCategory}
            />
            <Select
                className={cx('filter-item')}
                isDisabled={category === 'accessories' || category === 'All'}
                placeholder="Hãng"
                onChange={(e) => setNameProduct(e.value)}
                options={menuPhone}
            />
            <Select
                className={cx('filter-item')}
                placeholder="Giá"
                onChange={(e) => setPrice(e.value)}
                options={menuPrices}
            />
        </div>
    );
}

export default MenuProduct;
