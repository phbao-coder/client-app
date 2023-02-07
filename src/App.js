import { Routes, Route } from 'react-router-dom';

import routers from './routes';

import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
    return (
        <div>
            <Header />
            <div>
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
