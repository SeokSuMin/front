import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import login, { ILogin } from './user/login';
import userToggle, { IUserToggle } from './user/userToggle';
import searchUser, { ISearchUser } from './user/searchUser';
import userInfo, { IUserInfo } from './user/userInfo';
import joinMember, { IJoinMember } from './user/joinMember';
import changePassword, { IChangePassword } from './user/changePassword';
import updateUser, { IUpdateUser } from './user/updateUser';
import categoriMenus, { ICategoriMenus } from './blog/categoriMenus';
import blogToggle, { IBlogToggle } from './blog/blogToggle';
import paging, { IPaging } from './blog/paging';
import boardList, { IBoardList } from './blog/boardList';
import boardData, { IBoardData } from './blog/boardData';
import comment, { IComments } from './blog/comment';
import fileProgress, { IFileProgress } from './blog/fileProgress';
import blogLike, { IblogLike } from './blog/blogLike';

export interface IState {
    login: ILogin;
    userToggle: IUserToggle;
    searchUser: ISearchUser;
    userInfo: IUserInfo;
    joinMember: IJoinMember;
    changePassword: IChangePassword;
    updateUser: IUpdateUser;
    categoriMenus: ICategoriMenus;
    blogToggle: IBlogToggle;
    paging: IPaging;
    boardList: IBoardList;
    boardData: IBoardData;
    comment: IComments;
    fileProgress: IFileProgress;
    blogLike: IblogLike;
}

const rootReducer = (state: IState, action: AnyAction): CombinedState<IState> => {
    switch (action.type) {
        case HYDRATE: {
            const newPayload = {} as any;
            Object.keys(action.payload).map((name) => {
                const stateName = name as keyof IState;
                // if (!state[name].hydration) {
                //     newPayload[name] = action.payload[name];
                // }
                // if (state[name].hydration && action.payload[name].hydration) {
                //     newPayload[name] = state[name];
                // }
                if (state[stateName].hydration && !action.payload[stateName].hydration) {
                    newPayload[name] = state[stateName];
                }
            });
            // console.log('하이드레이션 state', state);
            // console.log('하이드레이션 action.payload', action.payload);
            // console.log('newPayload', newPayload);
            return {
                ...state,
                ...action.payload,
                ...newPayload, // 뒤로가기 또는 다른 페이지에서 서버사이드 렌더링 해도 스토어 유지
            };
        }
        default: {
            const reducer = combineReducers({
                login,
                userToggle,
                searchUser,
                userInfo,
                joinMember,
                changePassword,
                updateUser,
                categoriMenus,
                blogToggle,
                paging,
                boardList,
                boardData,
                comment,
                fileProgress,
                blogLike,
            });
            return reducer(state, action);
        }
    }
};

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
