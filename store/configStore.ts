import { Action, AnyAction, CombinedState, configureStore, Reducer, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import reducer, { IState } from '../reducer/rootReducer';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => {
    return configureStore({
        reducer: reducer as Reducer<CombinedState<IState>, AnyAction>,
        //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        middleware: (getDefaultMiddleware) =>
            process.env.NODE_ENV === 'development' ? getDefaultMiddleware().concat() : getDefaultMiddleware().concat(),
        devTools: process.env.NODE_ENV === 'development',
    });
};

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default createWrapper(makeStore);
