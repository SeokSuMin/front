import { createSlice } from '@reduxjs/toolkit';
import { joinMemberThunk } from '../../thunk/userThunk';

export interface IJoinMember {
    userId: string;
    email: string;
    password: string;
    profileImg: File | string;
    loading?: boolean;
    hydration?: boolean;
}

const joinMember = createSlice({
    name: 'joinMember',
    initialState: { hydration: false } as IJoinMember,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(joinMemberThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(joinMemberThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(joinMemberThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            });
    },
});

// export const { togglLogin, togglDashBoard, loading } = login.actions;
export default joinMember.reducer;
