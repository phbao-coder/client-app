import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import { reducers } from './reducers';
import rootSaga from './rootSaga';

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: reducers,
    middleware: [saga],
});
saga.run(rootSaga);

export default store;
