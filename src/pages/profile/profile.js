import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { getOrdersByUser, orderFilter, orderSort } from '~/store/orders/orderState';

import ProfileCard from '~/components/ProfileCard/ProfileCard';

import classNames from 'classnames/bind';
import style from './Profile.module.css';
import OrderCard from '~/components/OrderCard/OrderCard';
import { getCoupons } from '~/store/coupons/couponsState';

const cx = classNames.bind(style);

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

const menu = [
    { value: 'Tăng dần', label: 'Tăng dần' },
    { value: 'Giảm dần', label: 'Giảm dần' },
];

const status = [
    { value: 'all', label: 'Tất cả' },
    { value: 'Processing', label: 'Đang xử lý' },
    { value: 'Delivered', label: 'Đã giao' },
    { value: 'Dispatch', label: 'Đang giao' },
    { value: 'Cancelled', label: 'Đã hủy' },
];

function Profile() {
    const user = useSelector((state) => state.user.user);
    const isUser = useSelector((state) => state.user.isUser);
    const orders = useSelector((state) => state?.orders?.orders);
    const ordersFilter = useSelector((state) => state?.orders?.ordersFilter);
    const coupons = useSelector((state) => state.coupons?.coupons);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSort = (e) => {
        if (e.value === 'Tăng dần') {
            const ordersSorted = ascending(ordersFilter);
            dispatch(orderSort(ordersSorted));
        } else {
            const ordersSorted = decrease(ordersFilter);
            dispatch(orderSort(ordersSorted));
        }
    };

    const handleFilterDay = (e) => {
        const ordersTemp = [...orders];
        const newOrders = ordersTemp.filter(
            (item) => item.createdAt.slice(0, 10) === e.target.value,
        );
        dispatch(orderFilter(newOrders));
    };

    const handleStatus = (e) => {
        if (e.value !== 'all') {
            // lấy ds orders gốc để filter, ordersFilter chỉ làm nv render dữ liệu dự trên orders
            const ordersTemp = [...orders];
            const newOrders = ordersTemp.filter((item) => item.orderStatus === e.value);
            dispatch(orderFilter(newOrders));
        } else {
            dispatch(getOrdersByUser(user?.id));
        }
    };

    useEffect(() => {
        if (isUser === false) {
            navigate('/login');
        }
        dispatch(getOrdersByUser(user?.id));
        dispatch(getCoupons());
    }, [dispatch, isUser, navigate, user?.id]);

    return (
        <div className={cx('container')}>
            <div className={cx('profile')}>
                <ProfileCard info={user} orders={orders} />
            </div>
            <div className={cx('orders')}>
                <div className={cx('action')}>
                    <h1>Danh sách đơn hàng</h1>
                    <div className={cx('action-filter')}>
                        <input
                            type="date"
                            onChange={(e) => handleFilterDay(e)}
                            className={cx('input-date')}
                        />
                        <Select
                            className={cx('selected')}
                            onChange={(e) => handleSort(e)}
                            placeholder="Sắp xếp"
                            options={menu}
                        />
                        <Select
                            className={cx('selected')}
                            onChange={(e) => handleStatus(e)}
                            placeholder="Trạng thái đơn"
                            options={status}
                        />
                    </div>
                </div>
                <div className={cx('order')}>
                    {ordersFilter?.map((order, index) => (
                        <OrderCard
                            key={index}
                            order={order}
                            user={user}
                            index={index}
                            coupons={coupons}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
