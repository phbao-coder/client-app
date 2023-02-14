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
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onHandleLogin = (user) => {
        dispatch(userLogin(user));
    };

    useEffect(() => {
        if (isUser) {
            navigate('/');
        }
    }, [isUser, navigate]);

    return (
        <div className={cx('container')}>
            <div className={cx('center')}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onHandleLogin)}>
                    <div className={cx('txt-field')}>
                        <label>Username</label>
                        <input type="text" {...register('username')} />
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div className={cx('txt-field')}>
                        <label>Password</label>
                        <input type="password" {...register('password')} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <button type="submit">Login</button>
                    <div className={cx('signup-link')}>
                        Don't you have an account? <Link to={routes.register}>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
