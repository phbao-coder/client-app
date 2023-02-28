import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsSearch } from '~/store/products/productsState';

import classNames from 'classnames/bind';
import style from './SearchBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import vnd from '~/utils/vnd';

const cx = classNames.bind(style);

function SearchBox() {
    const [value, setValue] = useState('');
    const products = useSelector((state) => state.products.productsSearch);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsSearch(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div>
            <Tippy
                trigger="click"
                delay={[0, 0]}
                interactive={true}
                placement="bottom"
                offset={[0, 20]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs} className={cx('box-items')}>
                        <h2>Sản phẩm gợi ý</h2>
                        {products === [] ? (
                            <ul>Không tìm thấy sản phẩm</ul>
                        ) : (
                            <ul>
                                {products?.map((product) => (
                                    <li key={product._id} className={cx('item-search')}>
                                        <div className={cx('left')}>
                                            <img src={product.images} alt={product.name} />
                                        </div>
                                        <div className={cx('right')}>
                                            <Link
                                                to={`${routes.product}/${product._id}`}
                                                className={cx('name')}
                                            >
                                                {product.name}
                                            </Link>
                                            <p className={cx('price')}>{vnd(product.price)} VND</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            >
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
            </Tippy>
        </div>
    );
}

export default SearchBox;
