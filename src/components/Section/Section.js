import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import style from './Section.module.css';

const cx = classNames.bind(style);

function Section() {
    return (
        <section className={cx('home')}>
            <div className={cx('text')}>
                <h4>New Fashion</h4>
                <h1>
                    Spring Summer <br /> Collection
                </h1>
                <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                    used to demonstrate the visual form of a document or a typeface without relying
                    on meaningful content.
                </p>

                <Link to={routes.product} className={cx('btn')}>
                    Shop now
                </Link>
            </div>
        </section>
    );
}

export default Section;
