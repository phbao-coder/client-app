import { useDispatch } from 'react-redux';
import { useEffect, useState, memo } from 'react';
import Select from 'react-select';

import {
    getProductsByPrice,
    getProductsByNameAndCategoryAndPrice,
} from '~/store/products/productsState';

import classNames from 'classnames/bind';
import style from './MenuProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

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
    { value: { priceBigger: 0, priceLess: 99000001 }, label: 'Tất cả' },
    { value: { priceBigger: 0, priceLess: 1000000 }, label: 'Dưới 1 triệu' },
    { value: { priceBigger: 1000000, priceLess: 2000000 }, label: 'Từ 1 - 2 triệu' },
    { value: { priceBigger: 2000000, priceLess: 5000000 }, label: 'Từ 2 - 5 triệu' },
    { value: { priceBigger: 5000000, priceLess: 10000000 }, label: 'Từ 5 - 10 triệu' },
    {
        value: { priceBigger: 10000000, priceLess: 20000000 },
        label: 'Từ 10 - 20 triệu',
    },
    { value: { priceBigger: 20000000, priceLess: 99000000 }, label: 'Trên 20 triệu' },
];

const theme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#ddd',
        primary: '#282828',
    },
});

function MenuProduct() {
    const dispatch = useDispatch();

    const [isAll, setIsAll] = useState(true);
    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState({ priceBigger: 0, priceLess: 99999999 });

    const [displayFilter, setDisplayFilter] = useState(false);

    const handleDisplayFilter = () => {
        if (displayFilter) {
            setDisplayFilter(false);
            document.body.style.overflow = '';
        } else {
            setDisplayFilter(true);
            document.body.style.overflow = 'hidden';
        }
    };

    const handleCancelFilter = () => {
        setIsAll(true);
        setCategory('');
        setNameProduct('');
        setPrice({ priceBigger: 0, priceLess: 99999999 });
        handleDisplayFilter();
    };

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
        <>
            <div className={cx('container')}>
                <div className={cx('container__pc')}>
                    <Select
                        className={cx('select')}
                        placeholder="Tất cả"
                        onChange={(e) => {
                            if (e.value === 'All') {
                                setIsAll(true);
                                setPrice({ priceBigger: 0, priceLess: 999999999 });
                                setCategory('All');
                            } else {
                                setIsAll(false);
                                setCategory(e.value);
                                setNameProduct('');
                            }
                        }}
                        options={menuCategory}
                        theme={theme}
                    />
                    <Select
                        className={cx('select')}
                        isDisabled={category === 'accessories' || category === 'All'}
                        placeholder="Hãng"
                        onChange={(e) => {
                            setIsAll(false);
                            setCategory('mobile');
                            setNameProduct(e.value);
                        }}
                        options={menuPhone}
                        theme={theme}
                    />
                    <Select
                        className={cx('select')}
                        placeholder="Giá"
                        onChange={(e) => setPrice(e.value)}
                        options={menuPrices}
                        theme={theme}
                    />
                </div>
                <div className={cx('container__mobile')}>
                    <button
                        className={cx('container__mobile--button')}
                        onClick={handleDisplayFilter}
                    >
                        <FontAwesomeIcon icon={faFilter} /> Lọc
                    </button>
                </div>
            </div>
            {displayFilter && (
                <div className={cx('container__filter')}>
                    <div className={cx('container__filter--body')}>
                        <div className={cx('container__filter--body--item')}>
                            <h3>Loại</h3>
                            <div>
                                <button
                                    onClick={() => {
                                        setIsAll(false);
                                        setCategory('mobile');
                                        setNameProduct('');
                                    }}
                                >
                                    Điện thoại
                                </button>
                                <button
                                    onClick={() => {
                                        setIsAll(false);
                                        setCategory('accessories');
                                        setNameProduct('');
                                    }}
                                >
                                    Phụ kiện
                                </button>
                            </div>
                        </div>
                        <div className={cx('container__filter--body--item')}>
                            <h3>Hãng</h3>
                            <div>
                                {menuPhone.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => {
                                            setIsAll(false);
                                            setCategory('mobile');
                                            setNameProduct(item.value);
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={cx('container__filter--body--item')}>
                            <h3>Giá</h3>
                            <div>
                                {menuPrices.map((item) => (
                                    <button key={item.label} onClick={() => setPrice(item.value)}>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={cx('container__filter--body--item')}>
                            <h3>Đã chọn</h3>
                            <div>
                                <div>
                                    {nameProduct !== '' && <button>{nameProduct}</button>}
                                    {category !== '' && (
                                        <button>
                                            {(category === 'mobile' && 'Điện thoại') ||
                                                (category === 'accessories' && 'Phụ kiện')}
                                        </button>
                                    )}
                                    {menuPrices.filter(
                                        (item) => item.value.priceLess === price.priceLess,
                                    )[0]?.label && (
                                        <button>
                                            {
                                                menuPrices.filter(
                                                    (item) =>
                                                        item.value.priceLess === price.priceLess,
                                                )[0]?.label
                                            }
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('container__filter--footer')}>
                        <button onClick={handleCancelFilter}>Hủy</button>
                        <button onClick={handleDisplayFilter}>Xác nhận</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default memo(MenuProduct);
