import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchUserThunk } from '../../thunk/userThunk';

export interface ISearchUser {
    email: string;
    loading?: boolean;
    hydration?: boolean;
}

const searchUser = createSlice({
    name: 'searchUser',
    initialState: { hydration: false } as ISearchUser,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchUserThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(searchUserThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(searchUserThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            });
    },
});

// export const { togglLogin, togglDashBoard, loading } = login.actions;
export default searchUser.reducer;
