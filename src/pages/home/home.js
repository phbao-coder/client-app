import homepage from '~/assets/images';
import Section from '~/components/Section/Section';

import classNames from 'classnames/bind';
import style from './Home.module.css';
import FeatureProducts from '~/components/FeaturedProduct/FeaturesProduct';
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
                name={'Iphone 14'}
                products={productsFeature}
            />
            <Section
                contents={homepage.samsung}
                backgroundPosition="left"
                alignItems="end"
                textAlign="end"
            />
            <FeatureProducts
                title={'Samsung Z Series'}
                name={'Samsung Galaxy Z'}
                products={productsFeature}
            />
        </div>
    );
}

export default Home;
