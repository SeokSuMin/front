import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkExUser, checkUserlogin, joinMembers, login } from '../thunk/userThunk';

export interface IUser {
    loginVisible?: boolean;
    userId?: string;
    password?: string;
    profileImg?: File | null;
    loading?: boolean;
    error: boolean;
    hydration?: boolean;
}

const user = createSlice({
    name: 'user',
    initialState: { loginVisible: false } as IUser,
    reducers: {
        togglLogin: (state, action: PayloadAction<IUser>) => {
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
            });
    },
});

export const { togglLogin, loading } = user.actions;
export default user.reducer;
