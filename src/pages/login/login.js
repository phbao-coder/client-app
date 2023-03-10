import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { userLogin } from '~/store/user/userState';
import routes from '~/config/routes';

import classNames from 'classnames/bind';
import style from './Login.module.css';

const cx = classNames.bind(style);

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isUser = useSelector((state) => state.user.isUser);

    const schema = yup.object().shape({
        username: yup.string().required('Vui lòng nhập tài khoản người dùng!'),
        password: yup.string().required('Vui lòng nhập mật khẩu!'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleLogin = (user) => {
        dispatch(userLogin(user));
    };

    useEffect(() => {
        if (isUser) {
            navigate('/');
        }
    }, [isUser, navigate]);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <span>Đăng nhập</span>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input
                            type="text"
                            placeholder="Nhập tài khoản người dùng..."
                            spellCheck={false}
                            {...register('username')}
                        />
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu..."
                            spellCheck={false}
                            {...register('password')}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <button type="submit">Đăng nhập</button>
                        <div className={cx('signup-link')}>
                            <p>Bạn không phải là thành viên?</p>{' '}
                            <Link to={routes.register}>Đăng ký</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
