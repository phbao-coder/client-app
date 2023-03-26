import { Link } from 'react-router-dom';

import routes from '~/config/routes';

import classNames from 'classnames/bind';
import style from './Footer.module.css';

const cx = classNames.bind(style);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <ul className={cx('footer__list')}>
                <li>
                    <Link to={routes.home}>Trang chủ</Link>
                </li>
                <li>
                    <Link to={routes.about}>Liên hệ</Link>
                </li>
                <li>
                    <Link to={routes.about}>Chính sách</Link>
                </li>
                <li>
                    <Link to={routes.about}>Dịch vụ</Link>
                </li>
                <li>
                    <Link to={routes.about}>Điều khoản</Link>
                </li>
            </ul>
            <p className={cx('footer__copyright')}>Garden's phone @ 2023</p>
        </footer>
    );
}

export default Footer;
