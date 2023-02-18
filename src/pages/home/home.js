import homepage from '~/assets/images';
import Section from '~/components/Section/Section';

import classNames from 'classnames/bind';
import style from './Home.module.css';

const cx = classNames.bind(style);

function Home() {
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
