import { Link } from 'react-router-dom';
import routes from '~/config/routes';

import classNames from 'classnames/bind';
import style from './Navbar.mudule.css';

const cx = classNames.bind(style);

function NavBar() {
    return (
        <ul className={cx('navbar')}>
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
    );
}

export default NavBar;
