import classNames from 'classnames/bind';
import style from './Loading.module.css';

const cx = classNames.bind(style);

function Loading({ isLoading }) {
    isLoading ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');
    return (
        <>
            {isLoading && (
                <div className={cx('container')}>
                    <div className={cx('loading')}></div>
                </div>
            )}
        </>
    );
}

export default Loading;
