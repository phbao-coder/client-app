const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    product: '/product',
    cart: '/cart',
    about: '/about',
    detailProduct: '/product/:_id', // With tag Link to={product._id}
    profile: '/profile',
    notFound: '*',
};

export default routes;
