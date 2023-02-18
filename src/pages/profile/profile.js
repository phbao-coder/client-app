import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '~/components/ProfileCard/ProfileCard';
import style from './Profile.module.css';

const cx = classNames.bind(style);

function Profile() {
    const user = useSelector((state) => state.user.user);
    const isUser = useSelector((state) => state.user.isUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUser === false) {
            navigate('/login');
        }
    }, [isUser, navigate]);

    return (
        <div className={cx('container')}>
            <ProfileCard {...user} />
        </div>
    );
}

export default Profile;
