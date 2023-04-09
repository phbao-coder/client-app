import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import style from './ChangePassword.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '~/store/user/userState';

const cx = classNames.bind(style);

function ChangePassword({ handleChangePassword }) {
    const id = useSelector((state) => state.user.user.id);
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        currentPassword: yup.string().required('Chưa nhập mật khẩu'),
        newPassword: yup.string().min(9, 'Mật khẩu ít nhất 9 ký tự').required('Chưa nhập mật khẩu'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleSubmitForm = (data) => {
        dispatch(changePassword({ ...data, id }));
    };

    return (
        <div className={cx('container')}>
            <div className={cx('form')}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu củ..."
                            {...register('currentPassword')}
                            spellCheck={false}
                        />
                        {errors.currentPassword && <span>{errors.currentPassword.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới..."
                            {...register('newPassword')}
                            spellCheck={false}
                        />
                        {errors.newPassword && <span>{errors.newPassword.message}</span>}
                    </div>
                    <div className={cx('row')}>
                        <button type="submit">Thay đổi</button>
                    </div>
                </form>
                <button className={cx('close')} onClick={handleChangePassword}>
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default ChangePassword;
