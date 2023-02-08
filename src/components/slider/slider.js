// image
import iphone14 from './images/iphone14_homage_slider.jpg';
import iphone14plus from './images/iphone14plus_homage_slider.jpg';
import iphone14pro from './images/iphone14pro_homepage_slider.jpg';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, EffectCoverflow } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
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
                <div className="slide-item" style={{ backgroundImage: `url(${iphone14})` }}>
                    <h1>Iphone 14</h1>
                    <h2>1999$</h2>
                    <button>Buy</button>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-item" style={{ backgroundImage: `url(${iphone14plus})` }}>
                    <h1>Iphone 14</h1>
                    <h2>1999$</h2>
                    <button>Buy</button>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-item" style={{ backgroundImage: `url(${iphone14pro})` }}>
                    <h1>Iphone 14</h1>
                    <h2>1999$</h2>
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
