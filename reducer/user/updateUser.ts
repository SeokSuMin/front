import { createSlice } from '@reduxjs/toolkit';
import { deleteMemberThunk, updateUserThunk } from '../../thunk/userThunk';

export interface IUpdateUser {
    userId: string;
    email: string;
    profileImg: File | string;
    loading?: boolean;
    hydration?: boolean;
}

const updateUser = createSlice({
    name: 'updateUser',
    initialState: { hydration: false } as IUpdateUser,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(deleteMemberThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteMemberThunk.fulfilled, (state, action) => {
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

// export const { togglLogin, togglDashBoard, loading } = login.actions;
export default updateUser.reducer;
