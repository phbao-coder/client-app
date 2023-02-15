import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import style from './Profile.module.css';

const cx = classNames.bind(style);

function Profile() {
    const user = useSelector((state) => state.user.user);
    return (
        <div className={cx('container')}>
            <div className={cx('card-profile')}>
                <div className={cx('avatar')}></div>
                <h2>{user.username}</h2>
                <div className={cx('information')}>
                    <h4>Email: {user.email}</h4>
                    <h4>Address: {user.address}</h4>
                </div>
            </div>
            <div className={cx('card-order')}>
                <h1>Your Order</h1>
            </div>
        </div>
    );
}

export default Profile;
