import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addfavoriteThunk, addLikeThunk, deletefavoriteThunk, deleteLikeThunk } from '../../thunk/blogThunk';

export interface IBlogFavorite {
    board_id: string;
    loading?: boolean;
    hydration?: boolean;
}

const blogFavorite = createSlice({
    name: 'blogLike',
    initialState: {} as IBlogFavorite,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addfavoriteThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(addfavoriteThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(addfavoriteThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(deletefavoriteThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deletefavoriteThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(deletefavoriteThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            });
    },
});

// export const { getComments } = commblogLikeent.actions;
export default blogFavorite.reducer;
