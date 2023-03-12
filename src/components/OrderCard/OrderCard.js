import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    styled,
    tableCellClasses,
} from '@mui/material';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderCancell } from '~/store/orders/orderState';
import vnd from '~/utils/vnd';
import style from './OrderCard.module.css';

const cx = classNames.bind(style);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 20,
        fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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

function OrderCard({ order, user, index }) {
    const products = order.products;
    const day = order.createdAt.slice(0, 10);
    const hours = order.createdAt.slice(11, 16);

    const [productsDisplay, setProductsDisplay] = useState(products);

    const [sortCost, setSortCost] = useState(true);
    const [sortPrice, setSortPirce] = useState(true);
    const [sortCount, setSortCount] = useState(true);

    const dispatch = useDispatch();

    const handleCancelledOrder = () => {
        const idOrder = order._id;
        const idUser = user.id;
        dispatch(orderCancell({ idUser, idOrder, index }));
    };

    return (
        <div className={cx('order')}>
            <div className={cx('products')}>
                <TableContainer component={Paper} sx={{ minWidth: '1000px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Tên sản phẩm</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className={cx('action-sort')}>
                                        <span>
                                            {sortPrice ? (
                                                <FontAwesomeIcon
                                                    className={cx('icon')}
                                                    icon={faUpLong}
                                                    onClick={() => {
                                                        setSortPirce((prev) => !prev);
                                                        setProductsDisplay(
                                                            ascendingPrice(products),
                                                        );
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
                                        </span>
                                        <p>Giá thành</p>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className={cx('action-sort')}>
                                        <span>
                                            {sortCount ? (
                                                <FontAwesomeIcon
                                                    className={cx('icon')}
                                                    icon={faUpLong}
                                                    onClick={() => {
                                                        setSortCount((prev) => !prev);
                                                        setProductsDisplay(
                                                            ascendingCount(products),
                                                        );
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
                                        </span>
                                        <p>Số lượng</p>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className={cx('action-sort')}>
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
                                        </span>
                                        <p>Thành tiền</p>
                                    </div>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsDisplay.map((product, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{product.product.name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <p className={cx('price-original')}>
                                            {vnd(product.product.price)}
                                        </p>
                                        {product.product.sale.isOnSale && (
                                            <p className={cx('price-sale')}>
                                                {vnd(
                                                    product.product.price -
                                                        (product.product.price / 100) *
                                                            product.product.sale.salePercentage,
                                                )}
                                            </p>
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{product.count}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {vnd(product.price * product.count)} VND
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={cx('info-order')}>
                <div className={cx('info-order-day')}>
                    <h3>Đặt hàng vào:</h3>
                    <p>
                        {day}
                        <br />
                        {hours}
                    </p>
                    <h3>Thông tin nhận hàng:</h3>
                    <p>
                        <b>Địa chỉ nhận hàng:</b> <i>{order.paymentIntent.destination}</i> <br />
                        <b>Số điện thoại nhận hàng: </b>
                        <i>{order.paymentIntent.phone}</i>
                        <br />
                        <b>Phương thức thanh toán</b>: {methods(order.paymentIntent.method)}
                    </p>
                </div>
                <div className={cx('info-order-action')}>
                    <h3>Tổng giá trị đơn hàng</h3>
                    <p>{vnd(order.paymentIntent.amount)} VND</p>
                    <p className={cx('method')}>{status(order.orderStatus)}</p>
                    <button
                        onClick={() => handleCancelledOrder()}
                        disabled={order.orderStatus === 'Cancelled'}
                    >
                        {order.orderStatus === 'Cancelled' ? 'Đã hủy' : 'Hủy đơn'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
