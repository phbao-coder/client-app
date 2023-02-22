import Glider from 'react-glider';
import 'glider-js/glider.min.css';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import style from './FeaturesProduct.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function FeatureProducts({ title, name, products }) {
    const productsFeature = products?.filter((product) => product.name.includes(name));
    return (
        <section className={cx('p-slider')}>
            <h1 className={cx('product-slider-heading')}>{title}</h1>
            <Glider
                hasArrows
                hasDots
                slidesToShow={3}
                slidesToScroll={3}
                responsive={[
                    {
                        breakpoint: 300,
                        settings: {
                            slidesToShow: 'auto',
                            slidesToScroll: 1,
                            itemWidth: 300,
                            duration: 0.25,
                        },
                    },
                ]}
                iconLeft={<FontAwesomeIcon icon={faArrowLeft} className={cx('icon')} />}
                iconRight={<FontAwesomeIcon icon={faArrowRight} className={cx('icon')} />}
            >
                {productsFeature?.map((product) => (
                    <div className={cx('product-box')} key={product._id}>
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
                                <span>{product.price} $</span>
                                <Link
                                    className={cx('p-buy-btn')}
                                    to={`${routes.product}/${product._id}`}
                                >
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Glider>
        </section>
    );
}

export default FeatureProducts;
