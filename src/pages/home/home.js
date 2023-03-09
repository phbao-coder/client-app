import homepage from '~/assets/images';
import Section from '~/components/Section/Section';

import classNames from 'classnames/bind';
import style from './Home.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProductsFeature } from '~/store/products/productsState';

const cx = classNames.bind(style);

function Home() {
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
            <Section
                contents={homepage.samsung}
                backgroundPosition="left"
                alignItems="end"
                textAlign="end"
            />
        </div>
    );
}

export default Home;
