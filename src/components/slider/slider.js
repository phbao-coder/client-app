// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Slider.css';

function SliderHomePage() {
    return (
        <Swiper
            // install Swiper modules
            modules={[EffectCoverflow, Navigation, Pagination, Scrollbar]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            }}
            className="swiper_container"
        >
            <SwiperSlide>
                <div className="slide-item" style={{ backgroundImage: `url(${''})` }}>
                    <h1>Iphone 14</h1>
                    <p>1999$</p>
                    <button>Buy</button>
                </div>
            </SwiperSlide>
            <div className="slider-controler">
                <div className="swiper-pagination"></div>
            </div>
        </Swiper>
    );
}

export default SliderHomePage;
