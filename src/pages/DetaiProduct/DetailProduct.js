import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductId } from '~/store/products/productsState';

import classNames from 'classnames/bind';
import style from './DetailProduct.module.css';
import DetailProductCard from '~/components/DetailProductCard/DetailProductCard';
import FeatureProducts from '~/components/FeaturedProduct/FeaturesProduct';

const cx = classNames.bind(style);

function DetailProduct() {
    const productsFeature = useSelector((state) => state.products.productsFeature);
    const productID = useParams()._id;
    const product = useSelector((state) => state.products.product);
    const dispatch = useDispatch();

    // sử dụng trong việc hiển thị một số sản phẩm gợi ý
    const [productsMobile, setProductsMobile] = useState([]);
    const [productsAccessories, setProductAccessories] = useState([]);

    useEffect(() => {
        dispatch(getProductId(productID));
        if (product.category === 'mobile') {
            // lọc lấy các sản phẩm mobile cùng thương hiệu
            const name = product.name.split(' ')[0];
            const products = productsFeature.filter(
                (product) => product.category === 'mobile' && product.name.includes(name),
            );
            setProductsMobile(products);
            // lấy toàn bộ accessories hoặc một phần
            setProductAccessories(
                productsFeature.filter((product) => product.category === 'accessories'),
            );
        }

        if (product.category === 'accessories') {
            // lọc lấy một ít các sản phẩm mobile nổi bật
            const products = productsFeature.filter((product) => product.category === 'mobile');
            setProductsMobile(products.slice(0, 9));

            // lấy toàn bộ accessories hoặc một phần
            setProductAccessories(
                productsFeature.filter((product) => product.category === 'accessories'),
            );
        }
    }, [dispatch, product.category, product.name, productID, productsFeature]);

    return (
        <div className={cx('main')}>
            <DetailProductCard {...product} />
            <FeatureProducts
                title={
                    product.category === 'mobile'
                        ? 'Các phụ kiện thường mua cùng'
                        : 'Một số phụ kiện khác'
                }
                positionTitle="left"
                fontSizeTitle={30}
                letterScpacing={0}
                wordScpacing={0}
                products={productsAccessories}
            />
            <FeatureProducts
                title={
                    product.category === 'mobile'
                        ? 'Một số điện thoại khác cùng dòng'
                        : 'Một số điện thoại khác'
                }
                positionTitle="left"
                fontSizeTitle={30}
                letterScpacing={0}
                wordScpacing={0}
                products={productsMobile}
            />
        </div>
    );
}

export default DetailProduct;
