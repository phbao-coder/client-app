import classNames from 'classnames';
import style from './Home.module.css';

const cx = classNames.bind(style);

function Home() {
    return (
        <div>
            <div>
                <section className={cx('tranding')}>
                    <div className={cx('container')}>
                        <h3 className={cx('text-center section-subheading')}>Iphone</h3>
                        <h1 className={cx()}>Series 14</h1>
                    </div>
                    <div className={cx('container')}>
                        <div className={cx('swiper tranding-slider')}>
                            <div className={cx('swiper-wraper')}>
                                <div className={cx('swiper-slide tranding-slide')}>
                                    <div className={cx('tranding-slide-img')}>
                                        <img src="" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
