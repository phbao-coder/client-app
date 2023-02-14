import classNames from 'classnames/bind';
import style from './Cards.module.css';

const cx = classNames.bind(style);

function Cards() {
    return (
        <div className={cx('container')}>
            <div className={cx('card')}>
                <img src="" alt="" />
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
