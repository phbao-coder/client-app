import { Routes, Route } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import routers from './routes';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import './App.css';

function App() {
    // const scrollToTop = () => {
    //     window.scrollTo(0, 0);
    // };
    return (
        <div>
            <Header />
            <Routes>
                {routers.map((route, index) => (
                    <Route key={index} path={route.path} element={route.component} />
                ))}
            </Routes>
            <Footer />
            {/* <button id="totop" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faArrowUp} />
            </button> */}
        </div>
    );
}

export default App;
