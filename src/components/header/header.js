import { Link } from 'react-router-dom';
import routes from '../../config/routes';

function Header() {
    return (
        <div>
            <Link to={routes.home}>Home</Link>
            <Link to={routes.product}>Product</Link>
            <Link to={routes.cart}>Cart</Link>
            <Link to={routes.about}>About</Link>
            <Link to={routes.login}>Login</Link>
            <Link to={routes.register}>Register</Link>
            <Link to={routes.profile}>Profile</Link>
        </div>
    );
}

export default Header;
