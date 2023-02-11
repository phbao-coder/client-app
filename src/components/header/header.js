import { Link } from 'react-router-dom';
import routes from '../../config/routes';

import classNames from 'classnames/bind';
import style from './Header.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars, faUser } from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react/headless';
import NavBar from '../Navbar/Navbar';

const cx = classNames.bind(style);

function Header() {
    return (
        <header>
            <Link to={routes.home} className={cx('logo')}>
                <FontAwesomeIcon icon={faBagShopping} className={cx('logo-icon')} />
                <span>didong</span>
            </Link>

            <div className={cx('navbar')}>
                <NavBar />
            </div>

            <div className={cx('main')}>
                <Link to={routes.login} className={cx('user')}>
                    <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                    Login
                </Link>
                <Link to={routes.register}>Register</Link>
                <Tippy
                    trigger="click"
                    placement="bottom-end"
                    delay={100}
                    interactive={true}
                    render={(attrs) => (
                        <div tabIndex="-1" {...attrs}>
                            <ul className={cx('menu')}>
                                <li>
                                    <Link to={routes.home}>Home</Link>
                                </li>
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
                        </div>
                    )}
                >
                    <div className={cx('menu-icon')}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </Tippy>
            </div>
        </header>
    );
}

export default Header;
