import routes from '../config/routes';

import Home from '~/pages/home/home';
import Login from '~/pages/login/login';
import Register from '~/pages/register/register';
import Products from '~/pages/products/pageProducts';
import Cart from '~/pages/cart/cart';
import About from '~/pages/about/about';
import DetailProduct from '~/pages/DetaiProduct/DetailProduct';
import Profile from '~/pages/profile/profile';
import EditProfile from '~/pages/editProfile/EditProfile';
import NotFound from '~/pages/NotFound/NotFound';

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
        component: <Products />,
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
    {
        path: routes.editProfile,
        component: <EditProfile />,
    },
    {
        path: routes.notFound,
        component: <NotFound />,
    },
];

export default routers;
