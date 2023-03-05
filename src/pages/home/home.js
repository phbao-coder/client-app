import homepage from '~/assets/images';
import Section from '~/components/Section/Section';

import classNames from 'classnames/bind';
import style from './Home.module.css';
import FeatureProducts from '~/components/ProductSilder/FeaturesProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductsFeature } from '~/store/products/productsState';

const cx = classNames.bind(style);

function Home() {
    const productsFeature = useSelector((state) => state.products?.productsFeature);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsFeature());
    }, [dispatch]);

    return (
        <div className={cx('container')}>
            <Section
                contents={homepage.iphone}
                backgroundPosition="right"
                alignItems="start"
                textAlign="start"
            />
            <FeatureProducts
                title={'Iphone 14 Series'}
                products={productsFeature?.filter((product) => product.name.includes('Iphone 14'))}
            />
            <Section
                contents={homepage.samsung}
                backgroundPosition="left"
                alignItems="end"
                textAlign="end"
            />
            <FeatureProducts
                title={'Samsung Z Series'}
                products={productsFeature?.filter((product) =>
                    product.name.includes('Samsung Galaxy Z'),
                )}
            />
        </div>
    );
}

export default Home;
