import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getOrdersByUser } from '~/store/orders/orderState';

import ProfileCard from '~/components/ProfileCard/ProfileCard';

import classNames from 'classnames/bind';
import style from './Profile.module.css';
import OrderCard from '~/components/OrderCard/OrderCard';

const cx = classNames.bind(style);

function Profile() {
    const user = useSelector((state) => state.user.user);
    const isUser = useSelector((state) => state.user.isUser);
    const orders = useSelector((state) => state?.orders?.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isUser === false) {
            navigate('/login');
        } else {
            dispatch(getOrdersByUser(user.id));
        }
    }, [isUser, navigate, dispatch, user.id]);

    console.log(orders);

    return (
        <div className={cx('container')}>
            <ProfileCard info={user} orders={orders} />
            <div className={cx('orders')}>
                <h1>Danh sách giỏ hàng</h1>
                <div className={cx('order')}>
                    {orders?.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
