import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { getOrdersByUser } from '~/store/orders/orderState';

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

    const [ordersRender, setOrderRender] = useState(orders);

    const handleSort = (e) => {
        if (e.value === 'Tăng dần') {
            setOrderRender(ascending(orders));
        } else {
            setOrderRender(decrease(orders));
        }
    };

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
            <div className={cx('profile')}>
                <ProfileCard info={user} orders={orders} />
            </div>
            <div className={cx('orders')}>
                <div className={cx('action')}>
                    <h1>Danh sách giỏ hàng</h1>
                    <Select
                        onChange={(e) => handleSort(e)}
                        placeholder="Sắp xếp"
                        options={menu}
                    ></Select>
                </div>
                <div className={cx('order')}>
                    {ordersRender?.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
