import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkUserloginThunk, getAdminInfoThunk, logoutThunk } from '../../thunk/userThunk';

interface IAdminUserInfo {
    userId: string;
    imgPath: string;
}

export interface IUserInfo {
    userId: string;
    email: string;
    strategyType: string;
    imgPath: string;
    updatedAt: string;
    createdAt: string;
    adminInfo?: IAdminUserInfo;
    hydration?: boolean;
}

const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        hydration: false,
        userId: '',
        email: '',
        strategyType: '',
        imgPath: '',
        updatedAt: '',
        createdAt: '',
        loading: false,
    } as IUserInfo,
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
        updateAdminProfileImage: (state, action: PayloadAction<IAdminUserInfo>) => {
            return { ...state, adminInfo: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserloginThunk.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(checkUserloginThunk.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
                return {
                    ...state,
                    ...action.payload,
                };
            })
            .addCase(checkUserloginThunk.rejected, (state, action) => {
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
            })
            .addCase(getAdminInfoThunk.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(getAdminInfoThunk.fulfilled, (state, action: PayloadAction<IAdminUserInfo>) => {
                return {
                    ...state,
                    adminInfo: action.payload,
                };
            });
    },
});

export const { loginUserInfo, deleteUserInfo, updateAdminProfileImage } = userInfo.actions;
export default userInfo.reducer;
