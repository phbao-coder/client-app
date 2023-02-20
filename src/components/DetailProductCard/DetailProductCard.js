import classNames from 'classnames/bind';
import style from './DetailProductCard.module.css';

const cx = classNames.bind(style);

function DetailProductCard({
    name,
    images,
    price,
    description,
    camBack,
    camFront,
    ram,
    memory,
    os,
    pin,
    color,
    ...others
}) {
    return (
        <div className={cx('container', 'flex')}>
            <div className={cx('left')}>
                <div className={cx('main-image')}>
                    <img src={images} alt={name} className={cx('slide')} />
                </div>
            </div>
            <div className={cx('right')}>
                <h3>{name}</h3>
                <h4>{price} $</h4>
                {others.category === 'accessories' && (
                    <p>
                        {description} <br />
                    </p>
                )}
                {others.category === 'mobile' && (
                    <p>
                        Screen: {description} <br />
                        Camera Back: {camBack} <br />
                        Camera Front: {camFront} <br />
                        Ram: {ram} GB
                        <br />
                        Rom: {memory} GB <br />
                        OS: {os} <br />
                        Pin: {pin} mAh
                        <br />
                    </p>
                )}
                <button>Add to cart</button>
            </div>
        </div>
    );
}

export default DetailProductCard;
