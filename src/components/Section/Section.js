import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import routes from '~/config/routes';
import classNames from 'classnames/bind';
import style from './Section.module.css';

const cx = classNames.bind(style);

function Section({
    contents,
    backgroundPosition = 'right',
    alignItems = 'start',
    textAlign = 'start',
}) {
    // process responsive when width < 500px for mobile
    const getWindowWidth = () => {
        const innerWidth = window.innerWidth;
        return innerWidth;
    };

    const [innerWidth, setInnerWidth] = useState(getWindowWidth());

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(getWindowWidth());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (innerWidth < 500) {
        backgroundPosition = 'top';
    }

    const { name, title, content, image } = contents;

    return (
        <section
            className={cx('home')}
            style={{ backgroundImage: `url(${image})`, backgroundPosition: backgroundPosition }}
        >
            <div className={cx('text')} style={{ alignItems: alignItems, textAlign: textAlign }}>
                <h4>New phone</h4>
                <h1>
                    {name} <br /> {title}
                </h1>

                <p>{content}</p>

                <Link to={routes.product} className={cx('btn')}>
                    Shop now
                </Link>
            </div>
        </section>
    );
}

Section.prototype = {
    contents: PropTypes.object.isRequired,
    backgroundPosition: PropTypes.string,
    alignItems: PropTypes.string,
    textAlign: PropTypes.string,
};

export default Section;
