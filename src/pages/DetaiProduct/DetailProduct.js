import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductId } from '~/store/products/productsState';

import classNames from 'classnames/bind';
import style from './DetailProduct.module.css';
import DetailProductCard from '~/components/DetailProductCard/DetailProductCard';

const cx = classNames.bind(style);

function DetailProduct() {
    const productID = useParams()._id;
    const product = useSelector((state) => state.products.product);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductId(productID));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('main')}>
            <DetailProductCard {...product} />
        </div>
    );
}

export default DetailProduct;
