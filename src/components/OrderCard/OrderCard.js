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

function OrderCard({ order }) {
    const products = order.products;
    const day = order.createdAt.slice(0, 10);
    const hours = order.createdAt.slice(11, 16);

    return (
        <div className={cx('order')}>
            <div className={cx('products')}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Tên sản phẩm</StyledTableCell>
                                <StyledTableCell align="right">Giá thành</StyledTableCell>
                                <StyledTableCell align="right">Số lượng</StyledTableCell>
                                <StyledTableCell align="right">Thành tiền</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{product.product.name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {vnd(product.price)} VND
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
                </div>
                <div className={cx('info-order-action')}>
                    <h3>Tổng giá trị đơn hàng</h3>
                    <p>{vnd(order.paymentIntent.amount)} VND</p>
                    <p className={cx('method')}>
                        {' '}
                        {order.paymentIntent.method === 'Cash on Delivery'
                            ? 'Nhận hàng khi thanh toán'
                            : ''}
                    </p>
                    <button>Hủy đơn</button>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
