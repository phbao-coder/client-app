import routes from '../config/routes';

import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Products from '~/pages/Products/Products';
import Cart from '~/pages/Cart/Cart';
import About from '~/pages/About/About';
import DetailProduct from '~/pages/DetaiProduct/DetailProduct';
import Profile from '~/pages/Profile/Profile';
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
        path: routes.notFound,
        component: <NotFound />,
    },
];

export default routers;
