import classNames from 'classnames/bind';
import style from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductsFeature } from '~/store/products/productsState';
import Banner from '~/components/Banner/Banner';
import Product from '~/components/product/product';
import Section from '~/components/Section/Section';
import homepage from '~/assets/images';

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

    useEffect(() => {
        dispatch(getProductsFeature());
    }, [dispatch]);

    return (
        <div className={cx('container')}>
            <Banner />
            <Section
                contents={homepage.iphone}
                backgroundPosition="right"
                alignItems="start"
                textAlign="start"
            />
            <Section
                contents={homepage.samsung}
                backgroundPosition="left"
                alignItems="end"
                textAlign="end"
            />
            <div className={cx('section')}>
                <div className={cx('section--container')}>
                    <h1 className={cx('section--heading')}>Sản phẩm của tuần</h1>
                    <div className={cx('mobile')}>
                        <h2 className={cx('mobile--heading')}>Điện thoại</h2>
                        <div className={cx('mobile--container')}>
                            {productsMobileOfWeek?.slice(0, 3)?.map((product) => (
                                <div className={cx('mobile--item')}>
                                    <Product key={product._id} product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('accessories')}>
                        <h2 className={cx('accessories--heading')}> Phụ kiện</h2>
                        <div className={cx('accessories--container')}>
                            {productsAccessoriesOfWeek?.slice(0, 3)?.map((product) => (
                                <div className={cx('accessories--item')}>
                                    <Product key={product._id} product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
