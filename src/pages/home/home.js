import Section from '~/components/Section/Section';

import classNames from 'classnames/bind';
import style from './Home.module.css';

const cx = classNames.bind(style);

function Home() {
    return (
        <div className={cx('container')}>
            <Section />
        </div>
    );
}

export default Home;
