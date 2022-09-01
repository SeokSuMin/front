import { createSlice } from '@reduxjs/toolkit';
import { changePassowrdThunk } from '../../thunk/userThunk';

export interface IChangePassword {
    userId: string;
    password: string;
    loading?: boolean;
    hydration?: boolean;
}

const changePassword = createSlice({
    name: 'changePassword',
    initialState: { hydration: false } as IChangePassword,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changePassowrdThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(changePassowrdThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(changePassowrdThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            });
    },
});

// export const { togglLogin, togglDashBoard, loading } = login.actions;
export default changePassword.reducer;
