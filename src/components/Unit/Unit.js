import routes from '~/config/routes';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import style from './Unit.module.css';

const cx = classNames.bind(style);

function Unit() {
    return (
        <div className={cx('unit-one')}>
            <div className={cx('unit-one-content')}>
                <h1>Iphone 14 Pro Max</h1>
                <div>
                    <Link to={routes.detailProduct}>More information...</Link>
                    <button>Buy</button>
                </div>
            </div>
            <div className={cx('unit-one-img')}>
                <img
                    src="https://www.apple.com/v/home/ay/images/heroes/iphone-14-pro/hero_iphone14pro__e5xbgo5ffhg2_medium.jpg"
                    alt=""
                />
            </div>
        </div>
    );
}

export default Unit;
