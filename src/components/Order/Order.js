import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { order } from '~/store/orders/orderState';

import {
    district as districtData,
    district_CR as district_CR_Data,
    district_NK as district_NK_Data,
} from '~/utils/city';
import vnd from '~/utils/vnd';

import Select from 'react-select';

import classNames from 'classnames/bind';
import style from './Order.module.css';

const cx = classNames.bind(style);

const options = [{ value: 'Cần Thơ', label: 'Cần Thơ' }];

function Order() {
    const [city, setCity] = useState(options[0].value);
    const [district, setDistrict] = useState(districtData[0].value);
    const [subDistrict, setSubDistrict] = useState(district_NK_Data[0].value);

    const cart = useSelector((state) => state.cart.cart);
    const userID = useSelector((state) => state.user.user.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOrder = () => {
        const address = `${subDistrict}, ${district}, ${city}`;
        console.log(address);
        // dispatch(order({ _id: userID, method: 'Cash on Delivery', navigate }));
    };

    return (
        <div className={cx('order')}>
            <div className={cx('info-user')}>
                <h1>Thông tin nhận hàng</h1>
                <form>
                    <div className={cx('row')}>
                        <label>Tên người nhận</label>
                        <input type="text" />
                    </div>
                    <div className={cx('row')}>
                        <label>Số điện thoại</label>
                        <input type="text" />
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
                        <input type="text" />
                    </div>
                    <div className={cx('row')}>
                        <label>Ghi chú</label>
                        <input type="text" />
                    </div>
                </form>
            </div>
            <div className={cx('action')}>
                <div className={cx('cost')}>
                    <h2>Tổng tiền:</h2>
                    <h2>{vnd(cart.cartTotal)} VND</h2>
                </div>
                <button onClick={() => handleOrder()}>Đặt hàng</button>
            </div>
        </div>
    );
}

export default Order;
