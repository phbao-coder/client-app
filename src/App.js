import { Routes, Route } from 'react-router-dom';

import routers from './routes';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import './App.css';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                {routers.map((route, index) => (
                    <Route key={index} path={route.path} element={route.component} />
                ))}
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
