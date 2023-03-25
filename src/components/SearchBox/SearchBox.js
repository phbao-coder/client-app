import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { getProductsSearch } from '~/store/products/productsState';

import routes from '~/config/routes';
import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './SearchBox.module.css';

const cx = classNames.bind(style);

function SearchBox({ onHandleDisplaySearchBox }) {
    const [value, setValue] = useState(null);
    const products = useSelector((state) => state.products.productsSearch);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsSearch(value));
    }, [value, dispatch]);

    return (
        <>
            <div className={cx('container')}>
                <input
                    type="text"
                    placeholder="Nhập tên sản phẩm mà bạn cần tìm..."
                    onChange={(e) => setValue(e.target.value)}
                    spellCheck={false}
                />
                <span>
                    <FontAwesomeIcon icon={faSearch} />
                </span>
            </div>
            {products.length !== 0 && (
                <div className={cx('box')}>
                    <h2>Sản phẩm gợi ý</h2>
                    <ul className={cx('box--container')}>
                        {products?.map((product) => (
                            <li key={product._id} className={cx('box__item')}>
                                <div className={cx('box__item--left')}>
                                    <img src={product.images} alt={product.name} />
                                </div>
                                <div className={cx('box__item--right')}>
                                    <Link
                                        onClick={onHandleDisplaySearchBox}
                                        to={`${routes.product}/${product._id}`}
                                        className={cx('box__item--right--name')}
                                    >
                                        {product.name}
                                    </Link>
                                    <p className={cx('box__item--right--price')}>
                                        <span className={cx('box__item--right--price--price')}>
                                            {vnd(
                                                product.price -
                                                    (product.price / 100) *
                                                        product.sale.salePercentage,
                                            )}
                                        </span>
                                        <span className={cx('box__item--right--price--sale')}>
                                            {vnd(product.price)}{' '}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default SearchBox;
