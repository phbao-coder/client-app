import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEnvelope, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

import { updateAvatar } from '~/store/user/userState';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    district as districtData,
    district_NK as district_NK_Data,
    district_CR as district_CR_Data,
} from '~/utils/city';

import classNames from 'classnames/bind';
import style from './EditProfile.module.css';
import { updateUser } from '~/store/user/userState';
import Loading from '~/components/Loading/Loading';
import ChangePassword from '~/components/ChangePassword/ChangePassword';

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

const cx = classNames.bind(style);

function EditProfile() {
    const user = useSelector((state) => state.user.user);
    const isLoading = useSelector((state) => state.user.isLoading);
    const { username, name, phone, email, address, id } = user;
    const addressDetail = address.split(','); // [street, sub district, district, city]

    const dispatch = useDispatch();

    const [isChangePassword, setIsChangePassword] = useState(false);

    const handleChangePassword = () => {
        if (isChangePassword) {
            setIsChangePassword(false);
        } else {
            setIsChangePassword(true);
        }
    };

    const [city, setCity] = useState(addressDetail[3]);
    const [district, setDistrict] = useState(addressDetail[2]?.trim());
    const [subDistrict, setSubDistrict] = useState(addressDetail[1]);

    const [avatar, setAvatar] = useState(user?.avatar);
    const [images, setImages] = useState(null);

    const handleChangeFiles = (e) => {
        const file = e.target.files[0];
        file.url = URL.createObjectURL(file);
        setAvatar(file.url);
        setImages(file);
    };

    const handleUpdateAvatar = () => {
        if (images) {
            const id = user.id;
            const formData = new FormData();
            formData.append('images', images);
            dispatch(updateAvatar({ id, formData }));
        }
    };

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup.object().shape({
        username: yup
            .string()
            .min(12, 'Tên tài khoản ít nhất 12 ký tự')
            .required('Vui lòng nhập tài khoản người dùng!'),
        email: yup.string().email('Định dạng Gmail không đúng!').required('Vui lòng nhập Gmail!'),
        name: yup.string().required('Vui lòng nhập tên!'),
        phone: yup
            .string()
            .matches(phoneRegExp, 'Định dạng số điện thoại không đúng!')
            .min(10)
            .required('Vui lòng nhập số điện thoại!'),
        address: yup.string().required('Vui lòng nhập địa chỉ!'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleUpdateUser = (data) => {
        // console.log({ ...data, address: `${data.address}, ${subDistrict}, ${district}, ${city}` });
        dispatch(
            updateUser({
                ...data,
                id,
                address: `${data.address}, ${subDistrict}, ${district}, ${city}`,
            }),
        );
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(images?.url);
        };
    }, [images]);

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className={cx('page')}>
                <div className={cx('page--heading')}>
                    <h1>Chỉnh sửa thông tin</h1>
                </div>
                <div className={cx('container')}>
                    <div className={cx('container--left')}>
                        {avatar ? (
                            <div
                                className={cx('container__avatar')}
                                style={{
                                    backgroundImage: `url('${avatar}')`,
                                }}
                            ></div>
                        ) : (
                            <div
                                className={cx('container__avatar')}
                                style={{
                                    backgroundImage: `url('https://static.thenounproject.com/png/559587-200.png')`,
                                }}
                            ></div>
                        )}
                        <div className={cx('update')}>
                            <label htmlFor="file">Chọn ảnh</label>
                            <input type="file" id="file" onChange={handleChangeFiles} />
                            <button onClick={handleUpdateAvatar}>Chọn</button>
                        </div>
                    </div>
                    <div className={cx('container--right')}>
                        <div className={cx('container__information')}>
                            <div className={cx('register')}>
                                <form onSubmit={handleSubmit(handleUpdateUser)}>
                                    <div className={cx('row')}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Tên người dùng..."
                                            defaultValue={username}
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
                                            defaultValue={email}
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
                                            defaultValue={name}
                                            spellCheck={false}
                                            {...register('name')}
                                        />
                                        {errors.name && <span>{errors.name.message}</span>}
                                    </div>
                                    <div className={cx('row')}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Số điện thoại..."
                                            defaultValue={phone}
                                            spellCheck={false}
                                            {...register('phone')}
                                        />
                                        {errors.phone && <span>{errors.phone.message}</span>}
                                    </div>
                                    <div className={cx('select')}>
                                        <Select
                                            className={cx('select--item')}
                                            defaultValue={{
                                                label: addressDetail[3],
                                                value: addressDetail[3],
                                            }}
                                            options={options}
                                            onChange={(e) => setCity(e.value)}
                                            theme={theme}
                                        />
                                        <Select
                                            className={cx('select--item')}
                                            defaultValue={{
                                                label: addressDetail[2],
                                                value: addressDetail[2],
                                            }}
                                            options={districtData}
                                            onChange={(e) => setDistrict(e.value)}
                                            theme={theme}
                                        />
                                        {district === 'Ninh Kiều' && (
                                            <Select
                                                className={cx('select--item')}
                                                defaultValue={{
                                                    label: addressDetail[1],
                                                    value: addressDetail[1],
                                                }}
                                                options={district_NK_Data}
                                                onChange={(e) => setSubDistrict(e.value)}
                                                theme={theme}
                                            />
                                        )}
                                        {district === 'Cái Răng' && (
                                            <Select
                                                className={cx('select--item')}
                                                defaultValue={{
                                                    label: addressDetail[1],
                                                    value: addressDetail[1],
                                                }}
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
                                            defaultValue={addressDetail[0]}
                                            spellCheck={false}
                                            {...register('address')}
                                        />
                                        {errors.address && <span>{errors.address.message}</span>}
                                    </div>
                                    <div className={cx('row')}>
                                        <button type="submit">Chỉnh sửa</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <button
                                    className={cx('button__change--password')}
                                    onClick={handleChangePassword}
                                >
                                    Thay đổi mật khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isChangePassword && <ChangePassword handleChangePassword={handleChangePassword} />}
        </>
    );
}

export default EditProfile;
