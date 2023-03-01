/**
 * Not for func
 *
 * product cái mà được thêm vào giỏ hàng
 * action => obj chứa các action cần thiết
 *
 */
const addToCart = (cart, product, dispatch, action) => {
    const productsCartTemp = [...cart.products]; // tạo mảng temp
    // tìm xem sản phẩm có trong giỏ hay chưa
    const isProductInCart = productsCartTemp?.findIndex((item) => item.product._id === product._id);
    if (isProductInCart === -1) {
        // thêm sản phẩm vào ds products có trong cart trước đó
        const newProductsCart = [
            ...cart.products,
            { product: product, count: 1, price: product.price },
        ];
        dispatch(action.addProductToCart({ products: newProductsCart }));
    } else if (isProductInCart !== -1) {
        // sản phẩm đã tồn tại trong giỏ tăng count lên 1
        dispatch(action.updateIncreaProductInCart(isProductInCart));
    }
};

export default addToCart;
