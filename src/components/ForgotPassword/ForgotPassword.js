import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import classNames from 'classnames/bind';
import style from './ForgotPassword.module.css';
import { useDispatch } from 'react-redux';
import { getPassword } from '~/store/user/userState';

const cx = classNames.bind(style);

function ForgotPassword({ handleForgotDisplay }) {
    const dispatch = useDispatch();

    const handleGetPassword = (data) => {
        dispatch(getPassword({ ...data }));
    };

    const schema = yup.object().shape({
        username: yup.string().required('Chưa nhập username'),
        email: yup.string().required('Chưa nhập email'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    return (
        <div className={cx('forgot--main')}>
            <form onSubmit={handleSubmit(handleGetPassword)}>
                <h1>Nhập Username và Email để khôi phục mật khẩu</h1>
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
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <input
                        type="text"
                        placeholder="Gmail..."
                        {...register('email')}
                        spellCheck={false}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className={cx('row')}>
                    <button type="submit">Gửi</button>
                </div>
            </form>
            <button onClick={() => handleForgotDisplay()}>Đóng</button>
        </div>
    );
}

export default ForgotPassword;
