import routes from '../config/routes';

import Home from '../pages/home/home';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import Product from '../pages/products/products';
import Cart from '../pages/cart/cart';
import About from '../pages/about/about';
import DetailProduct from '../pages/detailProduct/detailProduct';
import Profile from '../pages/profile/profile';

const routers = [
    {
        path: routes.home,
        component: <Home />,
    },
    {
        path: routes.login,
        component: <Login />,
    },
    {
        path: routes.register,
        component: <Register />,
    },
    {
        path: routes.product,
        component: <Product />,
    },
    {
        path: routes.about,
        component: <About />,
    },
    {
        path: routes.detailProduct,
        component: <DetailProduct />,
    },
    {
        path: routes.cart,
        component: <Cart />,
    },
    {
        path: routes.profile,
        component: <Profile />,
    },
];

export default routers;
