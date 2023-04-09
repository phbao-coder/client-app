import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '~/store/user/userState';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import vnd from '~/utils/vnd';
import routes from '~/config/routes';

import classNames from 'classnames/bind';
import style from './ProfileCard.module.css';

const cx = classNames.bind(style);

function ProfileCard({ info, orders }) {
    const ordersNotCancelled = orders.filter((item) => item.orderStatus !== 'Cancelled');
    const arrCost = ordersNotCancelled?.map((item) => item.paymentIntent.amount);
    const sumCost = arrCost?.reduce((value, curr) => value + curr, 0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const { name, address, phone, username, email } = info;

    const [avatar, setAvatar] = useState(user?.avatar);
    const [images, setImages] = useState(null);

    const handleChangeFiles = (e) => {
        const file = e.target.files[0];
        file.url = URL.createObjectURL(file);
        setAvatar(file.url);
        setImages(file);
        console.log(images);
    };

    const handleUpdateAvatar = () => {
        const id = user.id;
        const formData = new FormData();
        formData.append('images', images);
        dispatch(updateAvatar({ id, formData }));
    };

    const handleToEditPage = () => {
        navigate(routes.editProfile);
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(images?.url);
        };
    }, [images]);

    return (
        <div className={cx('container')}>
            <div className={cx('container--left')}>
                {avatar ? (
                    <div
                        className={cx('container__avatar')}
                        style={{
                            backgroundImage: `url('${avatar}')`,
                        }}
                    ></div>
                ) : (
                    <div
                        className={cx('container__avatar')}
                        style={{
                            backgroundImage: `url('https://static.thenounproject.com/png/559587-200.png')`,
                        }}
                    ></div>
                )}
                <div className={cx('update')}>
                    <label htmlFor="file">Chọn ảnh</label>
                    <input type="file" id="file" onChange={handleChangeFiles} />
                    <button onClick={handleUpdateAvatar}>Update</button>
                </div>
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
                    <button className={cx('container__edit--button')} onClick={handleToEditPage}>
                        Chỉnh sửa thông tin <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
