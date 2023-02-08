import iphone14 from './images/iphone14_homage_slider.jpg';
import iphone14plus from './images/iphone14plus_homage_slider.jpg';
import iphone14pro from './images/iphone14pro_homepage_slider.jpg';

import classNames from 'classnames/bind';
import style from './Cards.module.css';

const cx = classNames.bind(style);

function Cards() {
    return (
        <div className={cx('container')}>
            <div className={cx('card')}>
                <img src={iphone14} alt="" />
                <div className={cx('content')}>
                    <h2>Iphone 14</h2>
                    <p>1999$</p>
                    <button>Buy</button>
                </div>
            </div>

            <div className={cx('card')}>
                <img src={iphone14plus} alt="" />
                <div className={cx('content')}>
                    <h2>Iphone 14</h2>
                    <p>1999$</p>
                    <button>Buy</button>
                </div>
            </div>

            <div className={cx('card')}>
                <img src={iphone14pro} alt="" />
                <div className={cx('content')}>
                    <h2>Iphone 14</h2>
                    <p>1999$</p>
                    <button>Buy</button>
                </div>
            </div>
        </div>
    );
}

export default Cards;
