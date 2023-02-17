import { Link } from 'react-router-dom';
import { faFacebook, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import routes from '~/config/routes';
import classNames from 'classnames/bind';
import style from './Footer.module.css';

const cx = classNames.bind(style);

function Footer() {
    return (
        <div>
            <section className={cx('footer')}>
                <div className={cx('social')}>
                    <a href="http://facebook.com">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="http://facebook.com">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="http://facebook.com">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="http://facebook.com">
                        <FontAwesomeIcon icon={faTiktok} />
                    </a>
                </div>

                <ul className={cx('list')}>
                    <li>
                        <Link to={routes.home}>Home</Link>
                    </li>
                    <li>
                        <Link to={routes.about}>About</Link>
                    </li>
                    <li>
                        <Link to={routes.about}>Term</Link>
                    </li>
                    <li>
                        <Link to={routes.about}>Service</Link>
                    </li>
                    <li>
                        <Link to={routes.about}>Privacy policy</Link>
                    </li>
                </ul>

                <p className={cx('copyright')}>didong @ 2023</p>
            </section>
        </div>
    );
}

export default Footer;
