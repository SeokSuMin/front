import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    changePassowrd,
    checkUserlogin,
    deleteMember,
    joinMembers,
    login,
    logout,
    searchUser,
    updateMember,
} from '../thunk/userThunk';

export interface IUser {
    loginVisible: boolean;
    dashBoardVisible: boolean;
    userId: string;
    email: string;
    password: string;
    strategyType: string;
    profileImg: File;
    imgPath: string;
    loading: boolean;
    error: boolean;
    createdAt: string;
    hydration: boolean;
}

const user = createSlice({
    name: 'user',
    initialState: { loginVisible: false, dashBoardVisible: false } as IUser,
    reducers: {
        togglLogin: (state, action) => {
            const loginVisible = action.payload as PayloadAction<IUser>;
            return { ...state, ...loginVisible };
        },
        togglDashBoard: (state, action) => {
            const dashBoardVisible = action.payload as PayloadAction<IUser>;
            return { ...state, ...dashBoardVisible };
        },
        loading: (state, action) => {
            const loading = action.payload as PayloadAction<IUser>;
            return { ...state, ...loading };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(joinMembers.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(joinMembers.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginVisible: true,
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
                    imgPath: '',
                    loading: false,
                };
            })
            .addCase(searchUser.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(searchUser.fulfilled, (state, action) => {
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
            })
            .addCase(deleteMember.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteMember.fulfilled, (state, action) => {
                return {
                    ...state,
                    userId: '',
                    password: '',
                    imgPath: '',
                    loading: false,
                };
            });
    },
});

export const { togglLogin, togglDashBoard, loading } = user.actions;
export default user.reducer;
