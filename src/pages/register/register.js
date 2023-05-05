import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faLocationDot,
    faLock,
    faPhone,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { registerUser } from '~/store/user/userState';
import routes from '~/config/routes';

import {
    district as districtData,
    district_NK as district_NK_Data,
    district_CR as district_CR_Data,
} from '~/utils/city';

import classNames from 'classnames/bind';
import style from './Register.module.css';
import { useState } from 'react';

const cx = classNames.bind(style);
const options = [{ value: 'Cần Thơ', label: 'Cần Thơ' }];

const theme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#ddd',
        primary: '#282828',
    },
});

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [city, setCity] = useState(options[0].value);
    const [district, setDistrict] = useState(districtData[0].value);
    const [subDistrict, setSubDistrict] = useState(district_NK_Data[0].value);

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup.object().shape({
        username: yup
            .string()
            .min(12, 'Tên tài khoản ít nhất 12 ký tự')
            .required('Vui lòng nhập tài khoản người dùng!'),
        email: yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email!'),
        name: yup.string().required('Vui lòng nhập tên!'),
        phone: yup
            .string()
            .matches(phoneRegExp, 'Định dạng số điện thoại không đúng!')
            .max(10, 'Định dạng số điện thoại không đúng!')
            .min(10, 'Định dạng số điện thoại không đúng!')
            .required('Vui lòng nhập số điện thoại!'),
        address: yup.string().required('Vui lòng nhập địa chỉ!'),
        password: yup
            .string()
            .min(9, 'Mật khẩu ít nhất 9 ký tự')
            .required('Vui lòng nhập mật khẩu!'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleRegisterUser = (data) => {
        // console.log({ ...data, address: `${data.address}, ${subDistrict}, ${district}, ${city}` });
        dispatch(
            registerUser({
                data: {
                    ...data,
                    address: `${data.address}, ${subDistrict}, ${district}, ${city}`,
                },
                navigate,
            }),
        );
    };

    return (
        <div className={cx('container')}>
            <div className={cx('container--filter')}>
                <div className={cx('register')}>
                    <div className={cx('register--heading')}>
                        <h1>Đăng ký</h1>
                    </div>
                    <form onSubmit={handleSubmit(handleRegisterUser)}>
                        <div className={cx('row')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <input
                                type="text"
                                placeholder="Tên người dùng..."
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
                                placeholder="Họ và tên..."
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
                                placeholder="Mật khẩu..."
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
                                placeholder="Số điện thoại..."
                                spellCheck={false}
                                {...register('phone')}
                            />
                            {errors.phone && <span>{errors.phone.message}</span>}
                        </div>
                        <div className={cx('select')}>
                            <Select
                                defaultValue={options[0]}
                                options={options}
                                onChange={(e) => setCity(e.value)}
                                theme={theme}
                            />
                            <Select
                                defaultValue={districtData[0]}
                                options={districtData}
                                onChange={(e) => setDistrict(e.value)}
                                theme={theme}
                            />
                            {district === 'Ninh Kiều' && (
                                <Select
                                    defaultValue={district_NK_Data[0]}
                                    options={district_NK_Data}
                                    onChange={(e) => setSubDistrict(e.value)}
                                    theme={theme}
                                />
                            )}
                            {district === 'Cái Răng' && (
                                <Select
                                    defaultValue={district_CR_Data[0]}
                                    options={district_CR_Data}
                                    onChange={(e) => setSubDistrict(e.value)}
                                    theme={theme}
                                />
                            )}
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <input
                                type="text"
                                placeholder="Địa chỉ..."
                                spellCheck={false}
                                {...register('address')}
                            />
                            {errors.address && <span>{errors.address.message}</span>}
                        </div>
                        <div className={cx('row')}>
                            <button type="submit">Đăng ký</button>
                        </div>
                        <div className={cx('link')}>
                            <p>Bạn đã có tài khoản?</p> <Link to={routes.login}>Đăng nhập</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
