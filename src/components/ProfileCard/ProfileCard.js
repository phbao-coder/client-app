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
                    <h3>Infomation</h3>
                    <div className={cx('info-data')}>
                        <div className={cx('data')}>
                            <h4>Email</h4>
                            <p>{email}</p>
                        </div>
                        <div className={cx('data')}>
                            <h4>Phone</h4>
                            <p>{phone}</p>
                        </div>
                    </div>
                </div>

                <div className={cx('projects')}>
                    <h3>Projects</h3>
                    <div className={cx('projects-data')}>
                        <div className={cx('data')}>
                            <h4>Number Cart</h4>
                            <p>123</p>
                        </div>
                        <div className={cx('data')}>
                            <h4>Sum cost</h4>
                            <p>19.000$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
