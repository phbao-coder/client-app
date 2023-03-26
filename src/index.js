import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persitor } from './store/store';
import ScrollToTop from './components/ScrollToTop/ScrollTotop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persitor}>
            <Router>
                <ScrollToTop />
                <App />
            </Router>
        </PersistGate>
    </Provider>,
);
