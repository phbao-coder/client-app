import { Routes, Route } from 'react-router-dom';

import routers from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
