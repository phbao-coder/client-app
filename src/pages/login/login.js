import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ForgotPassword from '~/components/ForgotPassword/ForgotPassword';

import { userLogin } from '~/store/user/userState';
import routes from '~/config/routes';

import classNames from 'classnames/bind';
import style from './Login.module.css';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(style);

function Login() {
    const [displayForgot, setDisplayForgot] = useState(false);

    const handleForgotDisplay = () => {
        displayForgot ? setDisplayForgot(false) : setDisplayForgot(true);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isUser = useSelector((state) => state.user.isUser);
    const isLoading = useSelector((state) => state.user.isLoading);

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
        <>
            <div className={cx('container')}>
                <div className={cx('container--filter')}>
                    <div className={cx('login')}>
                        <div className={cx('login--heading')}>
                            <h1>Đăng nhập</h1>
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
                            </div>
                            <div className={cx('link')}>
                                <Link to={routes.register}>Đăng ký</Link>
                                <span onClick={() => handleForgotDisplay()}>Quên mật khẩu?</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {displayForgot && (
                <div className={cx('forgot--container')}>
                    <ForgotPassword handleForgotDisplay={handleForgotDisplay} />
                </div>
            )}
            <Loading isLoading={isLoading} />
        </>
    );
}

export default Login;
