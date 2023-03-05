import vnd from '~/utils/vnd';
import classNames from 'classnames/bind';
import style from './ProfileCard.module.css';

const cx = classNames.bind(style);

function ProfileCard({ info, orders }) {
    const ordersNotCancelled = orders.filter((item) => item.orderStatus !== 'Cancelled');
    const arrCost = ordersNotCancelled?.map((item) => item.paymentIntent.amount);
    const sumCost = arrCost?.reduce((value, curr) => value + curr, 0);

    return (
        <div className={cx('card')}>
            <div className={cx('card-image')}>
                <img
                    src="https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_05_20/hansara.official_91565310_844475592737706_3368894882940378725_n.jpg"
                    alt="avt"
                />
            </div>
            <div className={cx('card-info')}>
                <div className={cx('card-info-address')}>
                    <h2>{info.name}</h2>
                    <p>
                        {info.address} <br /> {info.email} <br /> {info.phone}
                    </p>
                </div>
                <div className={cx('card-info-order')}>
                    <div className={cx('left')}>
                        <h3>{orders?.length}</h3>
                        <p>Tổng số đơn</p>
                    </div>
                    <div className={cx('right')}>
                        <h3>{vnd(sumCost)} VND</h3>
                        <p>Chi phí</p>
                    </div>
                </div>
            </div>
            <button>Cập nhật</button>
        </div>
    );
}

export default ProfileCard;
