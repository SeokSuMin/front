import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import user, { IUser } from './user';
import blog, { IBlog } from './blog';

interface IState {
    user: IUser;
    blog: IBlog;
}

const rootReducer = (state: IState, action: AnyAction): CombinedState<IState> => {
    switch (action.type) {
        case HYDRATE: {
            const newPayload = {} as IState;
            Object.keys(action.payload).map((name) => {
                // if (!state[name].hydration) {
                //     newPayload[name] = action.payload[name];
                // }
                // if (state[name].hydration && action.payload[name].hydration) {
                //     newPayload[name] = state[name];
                // }
                if (state[name].hydration && !action.payload[name].hydration) {
                    newPayload[name] = state[name];
                }
            });
            // console.log('state', state);
            // console.log('action.payload', action.payload);
            // console.log('newPayload', newPayload);
            return {
                ...state,
                ...action.payload,
                ...newPayload, // 뒤로가기 또는 다른 페이지에서 서버사이드 렌더링 해도 스토어 유지
            };
        }
        default: {
            const reducer = combineReducers({
                blog,
                user,
            });
            return reducer(state, action);
        }
    }
};

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
