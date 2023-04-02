import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import classNames from 'classnames/bind';
import style from './Banner.module.css';

const cx = classNames.bind(style);

function Banner() {
    return (
        <div className={cx('container')}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
            >
                <SwiperSlide>
                    <div className={cx('container--background', 'iphone')}>
                        <div
                            className={cx('container--image')}
                            style={{
                                backgroundImage:
                                    "url('https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896')",
                            }}
                        >
                            <div className={cx('filter')}>
                                <div className={cx('content')}>
                                    <h1 className={cx('content--heading')}>Iphone 14 Pro Max</h1>
                                    <p className={cx('content--paragraph')}>
                                        Sở hữu lối tạo hình vuông vức đi kèm với vật liệu cao cấp{' '}
                                        <br />
                                        giúp thiết bị toát lên được vẻ ngoài sang trọng đầy tính
                                        thời thượng
                                    </p>
                                    <button className={cx('content--button')}>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('container--background', 'samsung')}>
                        <div
                            className={cx('container--image')}
                            style={{
                                backgroundImage:
                                    "url('https://images.samsung.com/vn/smartphones/galaxy-z-fold4/images/galaxy-z-fold4_highlights_kv.jpg')",
                            }}
                        >
                            <div className={cx('filter')}>
                                <div className={cx('content')}>
                                    <h1 className={cx('content--heading')}>
                                        Samsung galaxy Z fold 4
                                    </h1>
                                    <p className={cx('content--paragraph')}>
                                        Với cơ chế gập/mở giúp trải nghiệm nội dung to rõ hơn,{' '}
                                        <br />
                                        hỗ trợ các tác vụ ghi chép hay phác họa nhanh một cách tiện
                                        lợi
                                    </p>
                                    <button className={cx('content--button')}>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('container--background', 'oppo')}>
                        <div
                            className={cx('container--image')}
                            style={{
                                backgroundImage:
                                    "url('https://cdn.tgdd.vn/2023/03/campaign/Tim-600x600.png')",
                            }}
                        >
                            <div className={cx('filter')}>
                                <div className={cx('content')}>
                                    <h1 className={cx('content--heading')}>Oppo N Flip</h1>
                                    <p className={cx('content--paragraph')}>
                                        Vật liệu cao cấp cùng bản lề hình giọt nước, <br />
                                        nếp gấp gần như tàng hình dù bạn gập mỡ nhiều lần
                                    </p>
                                    <button className={cx('content--button')}>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('container--background', 'xiaomi')}>
                        <div
                            className={cx('container--image')}
                            style={{
                                backgroundImage:
                                    "url('https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1678185397.67422332!800x800!85.png')",
                            }}
                        >
                            <div className={cx('filter')}>
                                <div className={cx('content')}>
                                    <h1 className={cx('content--heading')}>Xiaomi 13 Pro 5G</h1>
                                    <p className={cx('content--paragraph')}>
                                        Mặt lưng sử dụng gốm sinh học nano <br />
                                        tích hợp tăng tính sang trọng và thẩm mỹ
                                    </p>
                                    <button className={cx('content--button')}>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Banner;
