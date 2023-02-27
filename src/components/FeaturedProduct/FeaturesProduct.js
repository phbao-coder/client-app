import { Link } from 'react-router-dom';
import routes from '~/config/routes';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import classNames from 'classnames/bind';
import style from './FeaturesProduct.module.css';
import vnd from '~/config/vnd';

const cx = classNames.bind(style);

function FeatureProducts({
    title,
    positionTitle = 'center',
    fontSizeTitle = 55,
    letterScpacing = 10,
    wordScpacing = 20,
    products,
}) {
    return (
        <section className={cx('p-slider')}>
            <h1
                className={cx('product-slider-heading')}
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
                slidesPerView={'auto'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className={cx('swiper')}
            >
                {products?.map((product) => (
                    <SwiperSlide className={cx('product-box')} key={product._id}>
                        <div className={cx('p-img-container')}>
                            <div className={cx('p-img')}>
                                <Link to={`${routes.product}/${product._id}`}>
                                    <img src={product.images} alt={product.name} />
                                </Link>
                            </div>
                        </div>
                        <div className={cx('p-box-text')}>
                            <div className={cx('product-category')}>
                                <span>{product.category}</span>
                            </div>
                            <Link
                                className={cx('product-title')}
                                to={`${routes.product}/${product._id}`}
                            >
                                {product.name}
                            </Link>
                            <div className={cx('price-buy')}>
                                <span>{vnd(product.price)} VND</span>
                                <Link
                                    className={cx('p-buy-btn')}
                                    to={`${routes.product}/${product._id}`}
                                >
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default FeatureProducts;
