import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Product from '../product/product';

import classNames from 'classnames/bind';
import style from './FeaturesProduct.module.css';

const cx = classNames.bind(style);

SwiperCore.use(Navigation);

function FeatureProducts({
    title,
    positionTitle = 'left',
    fontSizeTitle = 18,
    letterScpacing = 0,
    wordScpacing = 0,
    products,
}) {
    return (
        <section className={cx('container')}>
            <h1
                className={cx('container--heading')}
                style={{
                    textAlign: positionTitle,
                    fontSize: `${fontSizeTitle}px`,
                    letterSpacing: `${letterScpacing}px`,
                    wordSpacing: `${wordScpacing}px`,
                }}
            >
                {title}
            </h1>
            <Swiper
                className={cx('swiper')}
                slidesPerView={'auto'}
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
            >
                {products?.map((product) => (
                    <SwiperSlide className={cx('swiper__item')} key={product._id}>
                        <Product product={product} isDisplayButton={false} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default FeatureProducts;
