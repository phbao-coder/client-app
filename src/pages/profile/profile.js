import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { getOrdersByUser, orderSort } from '~/store/orders/orderState';

import ProfileCard from '~/components/ProfileCard/ProfileCard';

import classNames from 'classnames/bind';
import style from './Profile.module.css';
import OrderCard from '~/components/OrderCard/OrderCard';

const cx = classNames.bind(style);

const menu = [
    { value: 'Tăng dần', label: 'Tăng dần' },
    { value: 'Giảm dần', label: 'Giảm dần' },
];

const ascending = (orders) => {
    let ordersTemp = [...orders];
    for (let i = 0; i < ordersTemp.length - 1; i++) {
        for (let j = i + 1; j < ordersTemp.length; j++) {
            if (ordersTemp[i].paymentIntent.amount > ordersTemp[j].paymentIntent.amount) {
                let temp = ordersTemp[i];
                ordersTemp[i] = ordersTemp[j];
                ordersTemp[j] = temp;
            }
        }
    }
    return ordersTemp;
};

const decrease = (orders) => {
    let ordersTemp = [...orders];
    for (let i = 0; i < ordersTemp.length - 1; i++) {
        for (let j = i + 1; j < ordersTemp.length; j++) {
            if (ordersTemp[i].paymentIntent.amount < ordersTemp[j].paymentIntent.amount) {
                let temp = ordersTemp[i];
                ordersTemp[i] = ordersTemp[j];
                ordersTemp[j] = temp;
            }
        }
    }
    return ordersTemp;
};

function Profile() {
    const user = useSelector((state) => state.user.user);
    const isUser = useSelector((state) => state.user.isUser);
    const orders = useSelector((state) => state?.orders?.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSort = (e) => {
        if (e.value === 'Tăng dần') {
            const ordersSorted = ascending(orders);
            dispatch(orderSort(ordersSorted));
        } else {
            const ordersSorted = decrease(orders);
            dispatch(orderSort(ordersSorted));
        }
    };

    useEffect(() => {
        if (isUser === false) {
            navigate('/login');
        }
        dispatch(getOrdersByUser(user?.id));
    }, [dispatch, isUser, navigate, user?.id]);

    return (
        <div className={cx('container')}>
            <div className={cx('profile')}>
                <ProfileCard info={user} orders={orders} />
            </div>
            <div className={cx('orders')}>
                <div className={cx('action')}>
                    <h1>Danh sách giỏ hàng</h1>
                    <Select onChange={(e) => handleSort(e)} placeholder="Sắp xếp" options={menu} />
                </div>
                <div className={cx('order')}>
                    {orders?.map((order, index) => (
                        <OrderCard key={index} order={order} user={user} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
