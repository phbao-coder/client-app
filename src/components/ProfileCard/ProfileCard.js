import classNames from 'classnames/bind';
import style from './ProfileCard.module.css';

const cx = classNames.bind(style);

function ProfileCard({ name, username, email, phone }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('image')}></div>
                <h4>{name}</h4>
                <p>{username}</p>
            </div>
            <div className={cx('right')}>
                <div className={cx('info')}>
                    <h3>Thông tin liên hệ</h3>
                    <div className={cx('info-data')}>
                        <div className={cx('data')}>
                            <h4>Địa chỉ Gmail</h4>
                            <p>{email}</p>
                        </div>
                        <div className={cx('data')}>
                            <h4>Số điện thoại</h4>
                            <p>{phone}</p>
                        </div>
                    </div>
                </div>

                <div className={cx('projects')}>
                    <h3>Thống kê</h3>
                    <div className={cx('projects-data')}>
                        <div className={cx('data')}>
                            <h4>Tổng số đơn hàng</h4>
                            <p>10</p>
                        </div>
                        <div className={cx('data')}>
                            <h4>Tổng chi phí</h4>
                            <p>19.000.000 VND</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
