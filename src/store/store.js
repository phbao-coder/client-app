import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducers } from './reducers';
import rootSaga from './rootSaga';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducers = persistReducer(persistConfig, reducers);

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(saga),
});

saga.run(rootSaga);

export let persitor = persistStore(store);
