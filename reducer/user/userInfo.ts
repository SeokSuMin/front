import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkUserlogin, logoutThunk } from '../../thunk/userThunk';

export interface IUserInfo {
    userId: string;
    email: string;
    strategyType: string;
    imgPath: string;
    updatedAt: string;
    createdAt: string;
    hydration?: boolean;
}

const userInfo = createSlice({
    name: 'userInfo',
    initialState: { hydration: false } as IUserInfo,
    reducers: {
        loginUserInfo: (state, action: PayloadAction<IUserInfo>) => {
            return { ...state, ...action.payload };
        },
        deleteUserInfo: (state) => {
            return {
                ...state,
                userId: '',
                email: '',
                strategyType: '',
                imgPath: '',
                updatedAt: '',
                createdAt: '',
                loading: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserlogin.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(checkUserlogin.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
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
            .addCase(logoutThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    userId: '',
                    email: '',
                    strategyType: '',
                    imgPath: '',
                    updatedAt: '',
                    createdAt: '',
                    loading: false,
                };
            });
    },
});

export const { loginUserInfo, deleteUserInfo } = userInfo.actions;
export default userInfo.reducer;
