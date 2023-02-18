import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faLocationDot,
    faLock,
    faPhone,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
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

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup.object().shape({
        username: yup.string().required('Username is require'),
        email: yup.string().email().required('Email is require'),
        name: yup.string().required('Name is require'),
        phone: yup
            .string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10)
            .required('Phone number is require'),
        address: yup.string().required('Address is require'),
        password: yup.string().required('Password is require'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleRegisterUser = (data) => {
        dispatch(registerUser(data));
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <span>Register From</span>
                </div>
                <form onSubmit={handleSubmit(handleRegisterUser)}>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input
                            type="text"
                            placeholder="Your username..."
                            spellCheck={false}
                            {...register('username')}
                        />
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input
                            type="text"
                            placeholder="Your email..."
                            spellCheck={false}
                            {...register('email')}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input
                            type="text"
                            placeholder="Your name..."
                            spellCheck={false}
                            {...register('name')}
                        />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            type="password"
                            placeholder="Your password..."
                            spellCheck={false}
                            {...register('password')}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <input
                            type="text"
                            placeholder="Your phone..."
                            spellCheck={false}
                            {...register('phone')}
                        />
                        {errors.phone && <span>{errors.phone.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <input
                            type="text"
                            placeholder="Your address..."
                            spellCheck={false}
                            {...register('address')}
                        />
                        {errors.address && <span>{errors.address.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <button type="submit">Register</button>
                        <div className={cx('signup-link')}>
                            <p>Your are member?</p> <Link to={routes.login}>Login now</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
