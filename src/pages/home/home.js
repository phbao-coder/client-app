import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductsFeature } from '~/store/products/productsState';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Banner from '~/components/Banner/Banner';
import Product from '~/components/product/product';
import Section from '~/components/Section/Section';

import homepage from '~/assets/images';

import classNames from 'classnames/bind';
import style from './Home.module.css';
const cx = classNames.bind(style);

function Home() {
    const dispatch = useDispatch();

    const productsFeature = useSelector((state) => state?.products?.productsFeature);
    const productsAccessoriesOfWeek = productsFeature.filter(
        (product) => product.sold > 10 && product.category === 'accessories',
    );
    const productsMobileOfWeek = productsFeature.filter(
        (product) => product.sold > 5 && product.category === 'mobile',
    );
    const productsOfSale = productsFeature.filter((product) => product.sale.salePercentage >= 30);

    useEffect(() => {
        dispatch(getProductsFeature());
    }, [dispatch]);

    return (
        <div className={cx('container')}>
            <div>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                >
                    <SwiperSlide>
                        <Section
                            contents={homepage.iphone}
                            backgroundPosition="right"
                            alignItems="start"
                            textAlign="start"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Section
                            contents={homepage.samsung}
                            backgroundPosition="left"
                            alignItems="end"
                            textAlign="end"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Section
                            contents={homepage.oppo}
                            backgroundPosition="left"
                            alignItems="end"
                            textAlign="end"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={cx('section')}>
                <div className={cx('section--container')}>
                    <h1 className={cx('section--heading')}>Sản phẩm của tuần</h1>
                    <div className={cx('product')}>
                        <h2 className={cx('product--heading')}>Điện thoại</h2>
                        <div className={cx('product--container')}>
                            {productsMobileOfWeek?.slice(0, 3)?.map((product) => (
                                <div key={product._id} className={cx('product--item')}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('product')}>
                        <h2 className={cx('product--heading')}>Điện thoại</h2>
                        <div className={cx('product--container')}>
                            {productsAccessoriesOfWeek?.slice(0, 3)?.map((product) => (
                                <div key={product._id} className={cx('product--item')}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Banner />
            <div className={cx('product')}>
                <h2 className={cx('product--heading')}>Gợi ý trong ngày</h2>
                <div className={cx('product--container')}>
                    {productsOfSale?.slice(0, 16).map((product) => (
                        <div key={product._id} className={cx('product--item')}>
                            <Product product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
