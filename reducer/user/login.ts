import { createSlice } from '@reduxjs/toolkit';
import { checkExUserThunk, loginThunk } from '../../thunk/userThunk';

export interface ILogin {
    userId: string;
    password: string;
    loading?: boolean;
    hydration?: boolean;
}

const login = createSlice({
    name: 'login',
    initialState: { hydration: false } as ILogin,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(loginThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(checkExUserThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(checkExUserThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(checkExUserThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            });
    },
});

// export const { togglLogin, togglDashBoard, loading } = login.actions;
export default login.reducer;
