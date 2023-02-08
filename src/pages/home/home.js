import SliderHomePage from '~/components/Slider/Slider';
import Cards from '~/components/Cards/Cards';

import classNames from 'classnames/bind';
import style from './Home.module.css';

const cx = classNames.bind(style);

function Home() {
    return (
        <div className={cx('container')}>
            <div className={cx('slider')}>
                <h2 className={cx('heading')}>Iphone 14 series</h2>
                <SliderHomePage />
            </div>
            <div className={cx('cards')}>
                <h2 className={cx('heading')}>Samsung series</h2>
                <Cards />
            </div>
        </div>
    );
}

export default Home;
