import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '~/store/user/userState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMobile, faUser } from '@fortawesome/free-solid-svg-icons';

import SearchBox from '../SearchBox/SearchBox';

import routes from '~/config/routes';
import classNames from 'classnames/bind';
import style from './Header.module.css';

const cx = classNames.bind(style);

function Header() {
    const user = useSelector((state) => state.user.user);
    const isUser = useSelector((state) => state.user.isUser);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState({ active: false });
    const [quantityCart, setQuantityCart] = useState(0);

    useEffect(() => {
        setQuantityCart(
            cart?.products
                ?.map((item) => item.quantity)
                ?.reduce((quantity, currQuantity) => quantity + currQuantity, 0),
        );
    }, [cart, quantityCart]);

    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/login');
    };

    const handleActiveMenu = () => {
        setActiveMenu((prev) => {
            return {
                active: !prev.active,
            };
        });
    };

    return (
        <header className={cx('header')}>
            <div className={cx('logo')}>
                <Link to={routes.home}>
                    <FontAwesomeIcon icon={faMobile} /> <span>Garden's phone</span>
                </Link>
            </div>
            <SearchBox />
            <nav className={cx('nav', activeMenu)}>
                <div className={cx('logo')}>
                    <Link to={routes.home}>
                        <FontAwesomeIcon icon={faMobile} />
                        Garden's phone
                    </Link>
                </div>
                <ul>
                    <li>
                        <Link to={routes.home} onClick={handleActiveMenu}>
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.product} onClick={handleActiveMenu}>
                            Sản phẩm
                        </Link>
                    </li>
                    <li>
                        {isUser && (
                            <Link to={routes.cart} onClick={handleActiveMenu}>
                                Giỏ hàng {quantityCart !== 0 && <span>{quantityCart}</span>}
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link to={routes.about} onClick={handleActiveMenu}>
                            Liên hệ
                        </Link>
                    </li>
                    <li>
                        {isUser ? (
                            <Link to={routes.profile} onClick={handleActiveMenu}>
                                <FontAwesomeIcon icon={faUser} className={cx('icon')} />{' '}
                                {user.username}
                            </Link>
                        ) : (
                            <Link to={routes.login} onClick={handleActiveMenu}>
                                <FontAwesomeIcon icon={faUser} className={cx('icon')} /> Đăng nhập
                            </Link>
                        )}
                    </li>
                    <li>
                        {isUser ? (
                            <button onClick={handleLogout} className={cx('button-logout')}>
                                Đăng xuất
                            </button>
                        ) : (
                            <Link to={routes.register} onClick={handleActiveMenu}>
                                Đăng ký
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
            <div className={cx('hamburger')} onClick={handleActiveMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </header>
    );
}

export default Header;
