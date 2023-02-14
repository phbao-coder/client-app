import classNames from 'classnames/bind';
import style from './FeatureProduct.module.css';

const cx = classNames.bind(style);

function FeatureProduct() {
    return (
        <div>
            <div className={cx('container')}>
                <div className={cx('item')}>
                    <div className={cx('item-header')}>
                        <img src="" alt="" />
                        <div className={cx('content-transform')}>
                            <h2>Information</h2>
                            <p>Info 1</p>
                            <p>Info 1</p>
                            <p>Info 1</p>
                            <p>Info 1</p>
                            <p>Info 1</p>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <h2>Oppo reno 8 pro</h2>
                        <p>Price 199$</p>
                        <button>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeatureProduct;
