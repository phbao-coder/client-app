import {
    faAnchorCircleExclamation,
    faChevronCircleLeft,
    faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './NotFound.module.css';

const cx = classNames.bind(style);

function NotFound() {
    return (
        <div className={cx('container')}>
            <div>
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} className={cx('icon')} />
                </Link>
            </div>
            <h1>
                Không tìm thấy trang <FontAwesomeIcon icon={faAnchorCircleExclamation} />
                <span>
                    <FontAwesomeIcon icon={faChevronCircleLeft} /> Trở về trang chủ
                </span>
            </h1>
        </div>
    );
}

export default NotFound;
