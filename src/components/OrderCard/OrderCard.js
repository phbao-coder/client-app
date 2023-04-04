import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderCancell } from '~/store/orders/orderState';

import vnd from '~/utils/vnd';

import classNames from 'classnames/bind';
import style from './OrderCard.module.css';
import { Toast } from '~/minxin';

const cx = classNames.bind(style);

// sort theo tung gia thanh cua tung san pham
const ascendingPrice = (products) => {
    let productsTemp = [...products];
    for (let i = 0; i < productsTemp.length - 1; i++) {
        for (let j = i + 1; j < productsTemp.length; j++) {
            if (productsTemp[i].product.price > productsTemp[j].product.price) {
                let temp = productsTemp[i];
                productsTemp[i] = productsTemp[j];
                productsTemp[j] = temp;
            }
        }
    }
    return productsTemp;
};

const decreasePrice = (products) => {
    let productsTemp = [...products];
    for (let i = 0; i < productsTemp.length - 1; i++) {
        for (let j = i + 1; j < productsTemp.length; j++) {
            if (productsTemp[i].product.price < productsTemp[j].product.price) {
                let temp = productsTemp[i];
                productsTemp[i] = productsTemp[j];
                productsTemp[j] = temp;
            }
        }
    }
    return productsTemp;
};

// sort theo so luong san pham
const ascendingCount = (products) => {
    let productsTemp = [...products];
    for (let i = 0; i < productsTemp.length - 1; i++) {
        for (let j = i + 1; j < productsTemp.length; j++) {
            if (productsTemp[i].count > productsTemp[j].count) {
                let temp = productsTemp[i];
                productsTemp[i] = productsTemp[j];
                productsTemp[j] = temp;
            }
        }
    }
    return productsTemp;
};

const decreaseCount = (products) => {
    let productsTemp = [...products];
    for (let i = 0; i < productsTemp.length - 1; i++) {
        for (let j = i + 1; j < productsTemp.length; j++) {
            if (productsTemp[i].count < productsTemp[j].count) {
                let temp = productsTemp[i];
                productsTemp[i] = productsTemp[j];
                productsTemp[j] = temp;
            }
        }
    }
    return productsTemp;
};

// sort theo gia thanh
const ascendingCost = (products) => {
    let productsTemp = [...products];
    for (let i = 0; i < productsTemp.length - 1; i++) {
        for (let j = i + 1; j < productsTemp.length; j++) {
            if (
                productsTemp[i].product.price * productsTemp[i].count >
                productsTemp[j].product.price * productsTemp[j].count
            ) {
                let temp = productsTemp[i];
                productsTemp[i] = productsTemp[j];
                productsTemp[j] = temp;
            }
        }
    }
    return productsTemp;
};

const decreaseCost = (products) => {
    let productsTemp = [...products];
    for (let i = 0; i < productsTemp.length - 1; i++) {
        for (let j = i + 1; j < productsTemp.length; j++) {
            if (
                productsTemp[i].product.price * productsTemp[i].count <
                productsTemp[j].product.price * productsTemp[j].count
            ) {
                let temp = productsTemp[i];
                productsTemp[i] = productsTemp[j];
                productsTemp[j] = temp;
            }
        }
    }
    return productsTemp;
};

const methods = (method) => {
    switch (method) {
        case 'Cash on Delivery':
            return 'Thanh toán khi nhận hàng';
        default:
            return 'Thanh toán khi nhận hàng';
    }
};

const status = (state) => {
    switch (state) {
        case 'Processing':
            return 'Đơn hàng đang được xử lý';
        case 'Dispatched':
            return 'Đơn hàng đang được vận chuyển';
        case 'Cancelled':
            return 'Đơn hàng đã bị hủy';
        default:
            return 'Đơn hàng đang được xử lý';
    }
};

function OrderCard({ order, user, index, coupons }) {
    const products = order.products;
    const hours = order.createdAt.slice(11, 16);
    const day = order.createdAt.slice(0, 10);

    const [productsDisplay, setProductsDisplay] = useState(products);

    const [sortCost, setSortCost] = useState(true);
    const [sortPrice, setSortPirce] = useState(true);
    const [sortCount, setSortCount] = useState(true);

    const dispatch = useDispatch();

    const handleCancelledOrder = () => {
        const idOrder = order._id;
        const idUser = user.id;
        Toast.fire({
            title: 'Hủy đơn',
            text: 'Bạn có muốn hủy đơn hàng?',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(orderCancell({ idUser, idOrder, index }));
            }
        });
    };

    // tính lại giá trị gốc của đơn hàng khi chưa giảm giá
    const sumPriceOrinal = order.products
        ?.map((item) => item.price * item.count)
        ?.reduce((value, curr) => value + curr, 0);

    const coupon = coupons.find((item) => item._id === order.paymentIntent.couponUsed);

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('container__table')}>
                    <table>
                        <thead>
                            <tr>
                                <td>Tên sản phẩm</td>
                                <td>
                                    <span>
                                        {sortPrice ? (
                                            <FontAwesomeIcon
                                                className={cx('icon')}
                                                icon={faUpLong}
                                                onClick={() => {
                                                    setSortPirce((prev) => !prev);
                                                    setProductsDisplay(ascendingPrice(products));
                                                }}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                className={cx('icon')}
                                                icon={faDownLong}
                                                onClick={() => {
                                                    setSortPirce((prev) => !prev);
                                                    setProductsDisplay(decreasePrice(products));
                                                }}
                                            />
                                        )}
                                        <p>Giá thành</p>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {sortCount ? (
                                            <FontAwesomeIcon
                                                className={cx('icon')}
                                                icon={faUpLong}
                                                onClick={() => {
                                                    setSortCount((prev) => !prev);
                                                    setProductsDisplay(ascendingCount(products));
                                                }}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                className={cx('icon')}
                                                icon={faDownLong}
                                                onClick={() => {
                                                    setSortCount((prev) => !prev);
                                                    setProductsDisplay(decreaseCount(products));
                                                }}
                                            />
                                        )}
                                        <p>Số lượng</p>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {sortCost ? (
                                            <FontAwesomeIcon
                                                className={cx('icon')}
                                                icon={faUpLong}
                                                onClick={() => {
                                                    setSortCost((prev) => !prev);
                                                    setProductsDisplay(ascendingCost(products));
                                                }}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                className={cx('icon')}
                                                icon={faDownLong}
                                                onClick={() => {
                                                    setSortCost((prev) => !prev);
                                                    setProductsDisplay(decreaseCost(products));
                                                }}
                                            />
                                        )}
                                        <p>Thành tiền</p>
                                    </span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {productsDisplay.map((product, index) => (
                                <tr key={index}>
                                    <th>{product.product.name}</th>
                                    <th>
                                        <p className={cx('price__original')}>
                                            {vnd(product.product.price)}
                                        </p>
                                        <p className={cx('price__sale')}>
                                            {vnd(
                                                product.product.price -
                                                    (product.product.price / 100) *
                                                        product.product.sale.salePercentage,
                                            )}
                                        </p>
                                    </th>
                                    <th>{product.count}</th>
                                    <th>
                                        {vnd(
                                            (product.product.price -
                                                (product.product.price / 100) *
                                                    product.product.sale.salePercentage) *
                                                product.count,
                                        )}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={cx('container__info')}>
                    <div className={cx('container__info__detail')}>
                        <div>
                            <p>
                                <b>Đặt hàng vào: </b> {hours} {day}
                            </p>
                            <span>
                                <ul>
                                    <li>
                                        <b>Địa chỉ nhận hàng: </b> {order.paymentIntent.destination}
                                    </li>
                                    <li>
                                        <b>Số điện thoại nhận hàng: </b> {order.paymentIntent.phone}
                                    </li>
                                    <li>
                                        <b>Phương thức thanh toán: </b>{' '}
                                        {methods(order.paymentIntent.method)}
                                    </li>
                                    <li>
                                        {coupon && (
                                            <>
                                                <b>Mã giảm giá: </b> {coupon?.code} <b>Giảm:</b>{' '}
                                                {coupon?.discountAmount}%
                                            </>
                                        )}
                                    </li>
                                </ul>
                            </span>
                        </div>
                    </div>
                    <div className={cx('container__info__action')}>
                        <span>
                            <p>
                                <b>Tổng giá trị đơn hàng </b>
                            </p>
                            {coupon && (
                                <>
                                    <p className={cx('container__info__action--price--original')}>
                                        {vnd(sumPriceOrinal)} VND{' '}
                                    </p>
                                </>
                            )}
                            <p className={cx('container__info__action--price--discount')}>
                                {vnd(order.paymentIntent.amount)} VND
                            </p>
                            <p>{status(order.orderStatus)}</p>
                        </span>
                        <button
                            onClick={() => handleCancelledOrder()}
                            disabled={order.orderStatus === 'Cancelled'}
                        >
                            {order.orderStatus === 'Cancelled' ? 'Đã hủy' : 'Hủy đơn'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCard;
