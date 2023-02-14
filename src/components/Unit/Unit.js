import routes from '~/config/routes';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import style from './Unit.module.css';

const cx = classNames.bind(style);

function Unit({ image, title }) {
    return (
        <div className={cx('unit-one')}>
            <div className={cx('unit-one-content')}>
                <h1>{title}</h1>
                <div>
                    <Link to={routes.detailProduct}>More information...</Link>
                    <button>Buy</button>
                </div>
            </div>
            <div className={cx('unit-one-img')}>
                <img src={image} alt={title} />
            </div>
        </div>
    );
}

export default Unit;
