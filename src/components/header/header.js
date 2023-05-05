import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

import { userLogout } from '~/store/user/userState';

import SearchBox from '../SearchBox/SearchBox';
import routes from '~/config/routes';
import icon_cart from '~/assets/icons/cart_icon.png';

import classNames from 'classnames/bind';
import style from './Header.module.css';

const cx = classNames.bind(style);

function Header() {
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart.cart);
    const isUser = useSelector((state) => state.user.isUser);
    const dispatch = useDispatch();

    const [sumCountCart, setSumCountCart] = useState(0);
    const [displaySearchBox, setDisplaySearchBox] = useState(false);
    const [displayMenuCenter, setDisplayMenuCenter] = useState({ active: false });

    useEffect(() => {
        setSumCountCart(
            cart?.products
                ?.map((item) => item.count)
                ?.reduce((count, currCount) => count + currCount, 0),
        );
    }, [cart]);

    const handleLogout = () => {
        dispatch(userLogout());
    };

    const handleDisplaySearchBox = () => {
        if (displaySearchBox) {
            setDisplaySearchBox(false);
            document.body.style.overflow = '';
        } else {
            setDisplaySearchBox(true);
            document.body.style.overflow = 'hidden';
        }
    };

    const handleDisplayMenuCenter = () => {
        setDisplayMenuCenter((prev) => ({ active: !prev.active }));
        console.log(displayMenuCenter);
    };

    return (
        <>
            <header>
                <div className={cx('menu')}>
                    <div className={cx('menu__container')}>
                        <div className={cx('menu__item--left')}>
                            <div className={cx('logo')}>
                                <Link to={routes.home} className={cx('logo__item')}>
                                    Phone's garden
                                </Link>
                            </div>
                            <div className={cx('menu__item--cart')}>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className={cx('menu__item--cart--icon')}
                                        onClick={handleDisplayMenuCenter}
                                    />
                                </span>
                                <Link to={routes.cart}>
                                    <img
                                        src={icon_cart}
                                        alt=""
                                        className={cx('menu__item__cart--icon')}
                                    />
                                    <span className={cx('menu__item__cart--number')}>
                                        {sumCountCart}
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className={cx('menu__item--center', displayMenuCenter)}>
                            <nav>
                                <Link to={routes.home}>Trang chủ</Link>
                                <Link to={routes.product}>Sản phẩm</Link>
                                <Link to={routes.about}>Liên hệ</Link>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={cx('menu__item--center--icon')}
                                    onClick={handleDisplayMenuCenter}
                                />
                            </nav>
                        </div>
                        <div className={cx('menu__item--right')}>
                            <div
                                className={cx('menu__item__search')}
                                onClick={handleDisplaySearchBox}
                            >
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className={cx('menu__item__search--icon')}
                                />
                            </div>
                            <div className={cx('menu__item__user')}>
                                {isUser ? (
                                    <div>
                                        <Link to={routes.profile}>{user?.username}</Link>
                                        <Link to={routes.home} onClick={handleLogout}>
                                            Đăng xuất
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        <Link to={routes.login}>Đăng nhập</Link>
                                        <Link to={routes.register}>Đăng ký</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {displaySearchBox && (
                    <div className={cx('search__box')}>
                        <div className={cx('search__box--container')}>
                            <div className={cx('search__box--container--header')}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={cx('search__box--container--header--icon')}
                                    onClick={handleDisplaySearchBox}
                                />
                            </div>
                            <div className={cx('search__box--container--body')}>
                                <SearchBox onHandleDisplaySearchBox={handleDisplaySearchBox} />
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
