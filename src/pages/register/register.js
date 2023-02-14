import { Link, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import classNames from 'classnames/bind';
import style from './Register.module.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '~/store/user/userState';

const cx = classNames.bind(style);

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10).required(),
        address: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleRegisterUser = (data) => {
        dispatch(registerUser(data));
        navigate('/login');
    };

    return (
        <div className={cx('container')}>
            <div className={cx('center')}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit(handleRegisterUser)}>
                    <div className={cx('txt-field')}>
                        <label>Username</label>
                        <input type="text" {...register('username')} />
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div className={cx('txt-field')}>
                        <label>Email</label>
                        <input type="text" {...register('email')} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className={cx('txt-field')}>
                        <label>Password</label>
                        <input type="password" {...register('password')} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className={cx('txt-field')}>
                        <label>Phone</label>
                        <input type="number" {...register('phone')} />
                        {errors.phone && <span>{errors.phone.message}</span>}
                    </div>
                    <div className={cx('txt-field')}>
                        <label>Address</label>
                        <input type="text" {...register('address')} />
                        {errors.address && <span>{errors.address.message}</span>}
                    </div>
                    <button type="submit">Register</button>
                    <div className={cx('signup-link')}>
                        Don't you have an account? <Link to={routes.login}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
