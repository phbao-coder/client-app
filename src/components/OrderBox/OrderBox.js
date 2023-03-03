import classNames from 'classnames/bind';
import style from './OrderBox.module.css';

const cx = classNames.bind(style);

function OrderBox() {
    return <div className={cx('container')}>Order Box</div>;
}

export default OrderBox;
