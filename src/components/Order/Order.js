import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { order } from '~/store/orders/orderState';

import {
    district as districtData,
    district_CR as district_CR_Data,
    district_NK as district_NK_Data,
} from '~/utils/city';
import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './Order.module.css';
import { applyCoupon } from '~/store/cart/cartState';

const cx = classNames.bind(style);

const options = [{ value: 'Cần Thơ', label: 'Cần Thơ' }];
const methods = [{ value: 'Cash on Delivery', label: 'Thanh toán khi nhận hàng' }];

function Order() {
    const cart = useSelector((state) => state.cart.cart);
    const userID = useSelector((state) => state.user.user.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [method, setMethod] = useState(methods[0].value);

    const [city, setCity] = useState(options[0].value);
    const [district, setDistrict] = useState(districtData[0].value);
    const [subDistrict, setSubDistrict] = useState(district_NK_Data[0].value);

    const [code, setCode] = useState(
        cart?.isUsedCoupon?.couponTnfo?.code ? cart?.isUsedCoupon?.couponTnfo?.code : '',
    );

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên người nhận hàng!'),
        phone: yup
            .string()
            .matches(phoneRegExp, 'Định dạng số điện thoại không đúng!')
            .min(10)
            .required('Vui lòng nhập số điện thoại!'),
        address: yup.string().required('Vui lòng nhập địa chỉ!'),
        note: yup.string(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleOrder = (data) => {
        const address = `${data.address},Phường ${subDistrict},Quận ${district},Th.phố ${city}`;
        const obj = {
            idUser: userID,
            method: method,
            destination: address,
            phone: data.phone,
            note: data.note,
            navigate,
        };
        dispatch(order(obj));
    };

    const handleApplyCoupon = () => {
        if (code !== null) {
            const idCart = cart._id;
            dispatch(applyCoupon({ userID, idCart, code }));
        }
    };

    useEffect(() => {
        setCode(cart?.isUsedCoupon?.couponTnfo?.code ? cart?.isUsedCoupon?.couponTnfo?.code : '');
    }, [cart?.isUsedCoupon?.couponTnfo?.code]);

    return (
        <form onSubmit={handleSubmit(handleOrder)} className={cx('order')}>
            <div className={cx('info-user')}>
                <h1>Thông tin nhận hàng</h1>
                <div>
                    <div className={cx('row')}>
                        <label>Tên người nhận</label>
                        <div className={cx('row-item')}>
                            <input
                                type="text"
                                placeholder="Nhập tên..."
                                spellCheck={false}
                                {...register('name')}
                            />
                            {errors.name && <span>{errors.name.message}</span>}
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <label>Số điện thoại</label>
                        <div className={cx('row-item')}>
                            <input
                                type="text"
                                placeholder="Nhập số điện thoại..."
                                spellCheck={false}
                                {...register('phone')}
                            />
                            {errors.phone && <span>{errors.phone.message}</span>}
                        </div>
                    </div>
                    <div className={cx('address')}>
                        <Select
                            className={cx('select')}
                            onChange={(e) => {
                                setCity(e.value);
                            }}
                            defaultValue={options[0]}
                            options={options}
                        />
                        <Select
                            className={cx('select')}
                            onChange={(e) => {
                                setDistrict(e.value);
                            }}
                            defaultValue={districtData[0]}
                            options={districtData}
                        />
                        {district === 'Ninh Kiều' && (
                            <Select
                                className={cx('select')}
                                onChange={(e) => {
                                    setSubDistrict(e.value);
                                }}
                                defaultValue={district_NK_Data[0]}
                                options={district_NK_Data}
                            />
                        )}
                        {district === 'Cái Răng' && (
                            <Select
                                className={cx('select')}
                                onChange={(e) => {
                                    setSubDistrict(e.value);
                                }}
                                defaultValue={district_CR_Data[0]}
                                options={district_CR_Data}
                            />
                        )}
                    </div>
                    <div className={cx('row')}>
                        <label>Tên đường, Số nhà / hẻm</label>
                        <div className={cx('row-item')}>
                            <input
                                type="text"
                                placeholder="Nhập địa chỉ chi tiết..."
                                spellCheck={false}
                                {...register('address')}
                            />
                            {errors.address && <span>{errors.address.message}</span>}
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <label>Ghi chú</label>
                        <div className={cx('row-item')}>
                            <input
                                type="text"
                                placeholder="Ghi chú..."
                                spellCheck={false}
                                {...register('note')}
                            />
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <label>Phương thức thanh toán</label>
                        <Select
                            className={cx('select-method')}
                            onChange={(e) => {
                                setMethod(e.value);
                            }}
                            defaultValue={methods[0]}
                            options={methods}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('action')}>
                <div className={cx('coupon')}>
                    <input
                        placeholder="Mã giảm giá"
                        onChange={(e) => setCode(e.target.value)}
                        defaultValue={code}
                    />
                    {cart?.isUsedCoupon?.status === true && (
                        <span className={cx('coupon-apply')}>
                            Đã áp dụng -{cart?.isUsedCoupon?.couponTnfo?.discountAmount} %
                        </span>
                    )}
                    <span className={cx('coupon-button')} onClick={() => handleApplyCoupon()}>
                        Áp dụng
                    </span>
                </div>
                <div className={cx('cost')}>
                    <h2>Tổng tiền:</h2>
                    <h2>{vnd(cart.cartTotal)} VND</h2>
                </div>
                <button type="submit">Đặt hàng</button>
            </div>
        </form>
    );
}

export default Order;
