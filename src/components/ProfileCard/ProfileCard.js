import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import vnd from '~/utils/vnd';
import classNames from 'classnames/bind';
import style from './ProfileCard.module.css';

const cx = classNames.bind(style);

function ProfileCard({ info, orders }) {
    const ordersNotCancelled = orders.filter((item) => item.orderStatus !== 'Cancelled');
    const arrCost = ordersNotCancelled?.map((item) => item.paymentIntent.amount);
    const sumCost = arrCost?.reduce((value, curr) => value + curr, 0);

    const { name, address, phone, username, email } = info;

    return (
        <div className={cx('container')}>
            <div className={cx('container--left')}>
                <div
                    className={cx('container__avatar')}
                    style={{
                        backgroundImage: `url('https://media.thieunien.vn/thumb//uploads/2021/11/18/han-sara-sinh-nhat-tuoi-21-viet-tam-thu-no-luc-de-truong-thanh-tu-nhung-dieu-chua-hoan-hao_48097.jpg')`,
                    }}
                ></div>
            </div>
            <div className={cx('container--right')}>
                <div className={cx('container__information')}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Tên:</th>
                                <th className={cx('container__information--name')}>{name}</th>
                            </tr>
                            <tr>
                                <th>Username:</th>
                                <th>{username}</th>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <th>{email}</th>
                            </tr>
                            <tr>
                                <th>Số điện thoại:</th>
                                <th>{phone}</th>
                            </tr>
                            <tr>
                                <th>Địa chỉ: </th>
                                <th>{address}</th>
                            </tr>
                            <tr>
                                <th>Số đơn: </th>
                                <th>{arrCost.length}</th>
                            </tr>
                            <tr>
                                <th>Chi: </th>
                                <th>{vnd(sumCost)} VND</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={cx('container__edit')}>
                    <button className={cx('container__edit--button')}>
                        Chỉnh sửa thông tin <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
