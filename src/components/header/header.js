import { Link } from 'react-router-dom';
import routes from '../../config/routes';

import classNames from 'classnames/bind';
import style from './Header.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(style);

function Header() {
    const [menuActive, setMenuActive] = useState({ open: false });
    return (
        <header>
            <Link to={routes.home} className={cx('logo')}>
                <FontAwesomeIcon icon={faBagShopping} className={cx('logo-icon')} />
                <span>didong</span>
            </Link>

            <ul className={cx('navbar', menuActive)}>
                <li>
                    <Link to={routes.product}>Product</Link>
                </li>
                <li>
                    <Link to={routes.cart}>Cart</Link>
                </li>
                <li>
                    <Link to={routes.about}>About</Link>
                </li>
            </ul>

            <div className={cx('main')}>
                <Link to={routes.login} className={cx('user')}>
                    <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                    Login
                </Link>
                <Link to={routes.register}>Register</Link>
                <div
                    className={cx('menu-icon')}
                    onClick={() =>
                        setMenuActive((prev) => {
                            return {
                                open: !prev.open,
                            };
                        })
                    }
                >
                    <FontAwesomeIcon icon={menuActive.open ? faXmark : faBars} />
                </div>
            </div>
        </header>
    );
}

export default Header;
