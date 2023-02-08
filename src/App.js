import { Routes, Route } from 'react-router-dom';

import routers from './routes';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import classNames from 'classnames/bind';
import style from './Globle.module.css';

const cx = classNames.bind(style);

function App() {
    return (
        <div>
            <Header />
            <div className={cx('main-container')}>
                <Routes>
                    {routers.map((route, index) => (
                        <Route key={index} path={route.path} element={route.component} />
                    ))}
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
