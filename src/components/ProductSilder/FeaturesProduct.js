import { useRef } from 'react';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Product from '../product/product';

import classNames from 'classnames/bind';
import style from './FeaturesProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

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
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);

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
                navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                slidesPerView={'auto'}
                className={cx('swiper')}
            >
                <div className={cx('swiper__item--button')}>
                    <button className={cx('swiper__item--button--item')} ref={navigationNextRef}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    </button>
                    <button className={cx('swiper__item--button--item')} ref={navigationPrevRef}>
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </button>
                </div>
                {products?.map((product) => (
                    <SwiperSlide className={cx('swiper__item')} key={product._id}>
                        <Product product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default FeatureProducts;
