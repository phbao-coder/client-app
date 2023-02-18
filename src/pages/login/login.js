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
        username: yup.string().required('Username is require'),
        password: yup.string().required('Password is require'),
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
                    <span>Login From</span>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input
                            type="text"
                            placeholder="Your username..."
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
                            placeholder="Your password..."
                            {...register('password')}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <button type="submit">Login</button>
                        <div className={cx('signup-link')}>
                            <p>Not a member?</p> <Link to={routes.register}>Signup now</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
