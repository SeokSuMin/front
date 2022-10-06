import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addLikeThunk, deleteLikeThunk } from '../../thunk/blogThunk';

export interface IblogLike {
    board_id: string;
    user_id: string;
    loading?: boolean;
    hydration?: boolean;
}

const blogLike = createSlice({
    name: 'blogLike',
    initialState: {} as IblogLike,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addLikeThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(addLikeThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(addLikeThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(deleteLikeThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteLikeThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(deleteLikeThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            });
    },
});

// export const { getComments } = commblogLikeent.actions;
export default blogLike.reducer;
