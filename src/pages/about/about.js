import Iframe from 'react-iframe';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';

import classNames from 'classnames/bind';
import style from './About.module.css';
import { configToastFailed, ToastFailed } from '~/minxin';

const cx = classNames.bind(style);

function About() {
    const handleSumit = (e) => {
        e.preventDefault();
        ToastFailed.fire({
            ...configToastFailed,
            title: 'Lỗi',
            text: 'Hiện chức năng đang trong quá trình phát triển, mong bạn thông cảm!',
        });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('contact')}>
                <h1 className={cx('title')}>Liên hệ với chúng tôi</h1>
                <div className={cx('box')}>
                    <div className={cx('contact-form')}>
                        <h2>Điền thông tin của bạn ở đây</h2>
                        <form onSubmit={handleSumit}>
                            <div className={cx('form-box')}>
                                <div className={cx('row-info')}>
                                    <div className={cx('input')}>
                                        <span>Họ</span>
                                        <input type="text" placeholder="Điền họ của bạn..." />
                                    </div>
                                    <div className={cx('input')}>
                                        <span>Tên</span>
                                        <input type="text" placeholder="Điền tên của bạn..." />
                                    </div>
                                </div>
                                <div className={cx('row-info')}>
                                    <div className={cx('input')}>
                                        <span>Địa chỉ email</span>
                                        <input
                                            type="text"
                                            placeholder="Điền địa chỉ email của bạn..."
                                        />
                                    </div>
                                    <div className={cx('input')}>
                                        <span>Số điện thoại</span>
                                        <input
                                            type="text"
                                            placeholder="Điền số điện thoại của bạn..."
                                        />
                                    </div>
                                </div>

                                <div className={cx('row-message')}>
                                    <div className={cx('input')}>
                                        <span>Lời nhắn:</span>
                                        <textarea placeholder="Nhập lời nhắn của bạn ở đây..." />
                                    </div>
                                </div>

                                <div className={cx('row-button')}>
                                    <div className={cx('input')}>
                                        <button type="submit">Gửi</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className={cx('contact-info')}>
                        <h2>Thông tin liên hệ</h2>
                        <div className={cx('info')}>
                            <div className={cx('info-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faHouse} />
                                </span>
                                <p>
                                    Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
                                    <br /> <b>Việt Nam</b>
                                </p>
                            </div>
                            <div className={cx('info-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faMailBulk} />
                                </span>
                                <p>phbao.coder.1999@gmail.com</p>
                            </div>
                            <div className={cx('info-item')}>
                                <span>
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <p>+84 123456789</p>
                            </div>

                            <ul className={cx('social')}>
                                <li>
                                    <a href="https://www.facebook.com/">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com/">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.tiktok.com/">
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx('contact-map')}>
                        <Iframe
                            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d442.80786052709266!2d105.75169936187406!3d10.04034686812696!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1678372467839!5m2!1svi!2s"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className={cx('map')}
                        ></Iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
