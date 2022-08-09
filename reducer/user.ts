import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    changePassowrd,
    checkExUser,
    checkUserlogin,
    gitHubLogin,
    joinMembers,
    login,
    logout,
    searchUser,
    updateMember,
} from '../thunk/userThunk';

export interface IUser {
    loginVisible?: boolean;
    dashBoardVisible?: boolean;
    userId?: string;
    email?: string;
    password?: string;
    strategyType?: string;
    profileImg?: File | null;
    imgPath?: string;
    loading?: boolean;
    error?: boolean;
    createdAt?: string;
    hydration?: boolean;
}

const user = createSlice({
    name: 'user',
    initialState: { loginVisible: false, dashBoardVisible: false } as IUser,
    reducers: {
        togglLogin: (state, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload };
        },
        togglDashBoard: (state, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload };
        },
        loading: (state, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(joinMembers.pending, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                    loading: true,
                    hydration: false,
                };
            })
            .addCase(joinMembers.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginVisible: true,
                    hydration: true,
                };
            })
            .addCase(login.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                    loading: false,
                };
            })
            .addCase(gitHubLogin.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(gitHubLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                    loading: false,
                };
            })
            .addCase(checkUserlogin.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(checkUserlogin.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                };
            })
            .addCase(checkUserlogin.rejected, (state, action) => {
                const error = action.error.code === 'ERR_BAD_REQUEST' ? false : true;
                return {
                    ...state,
                    error,
                    loading: false,
                };
            })
            .addCase(logout.fulfilled, (state, action) => {
                return {
                    ...state,
                    userId: '',
                    password: '',
                    imgPath: null,
                };
            })
            .addCase(searchUser.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(searchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(changePassowrd.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateMember.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateMember.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                    loading: false,
                };
            });
    },
});

export const { togglLogin, togglDashBoard, loading } = user.actions;
export default user.reducer;
