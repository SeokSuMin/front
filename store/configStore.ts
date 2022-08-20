import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import reducer from '../reducer/rootReducer';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
    });
};

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default createWrapper(makeStore);
