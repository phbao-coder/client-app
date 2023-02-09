// import images temp
import img1 from './images/ETE41.jpg';
import img2 from './images/MGN13.jpg';
import img3 from './images/MHJE3.jpg';
import img4 from './images/MLL82.jpg';
import img5 from './images/MLWK3.jpg';
import img6 from './images/MQGH2.jpg';
import img7 from './images/opporeno8pro_xanh.jpg';
import img8 from './images/opporeno8pro_xanh.jpg';

import classNames from 'classnames/bind';
import style from './FeatureProduct.module.css';

const cx = classNames.bind(style);

function FeatureProduct() {
    const imgs = [img1, img2, img3, img4, img5, img6, img7, img8];
    return (
        <div>
            <div className={cx('container')}>
                {imgs.map((item, index) => (
                    <div key={index} className={cx('item')}>
                        <div className={cx('item-header')}>
                            <img src={item} alt="" />
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
                ))}
            </div>
        </div>
    );
}

export default FeatureProduct;
