import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '~/components/ProfileCard/ProfileCard';
import { getOrdersByUser } from '~/store/orders/orderState';
import style from './Profile.module.css';

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
            <ProfileCard {...user} />
        </div>
    );
}

export default Profile;
