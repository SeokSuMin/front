import { createSlice } from '@reduxjs/toolkit';
import { getFavoriteBoardIdList } from '../../thunk/blogThunk';

export interface IBlogFavorite {
    board_ids: string[];
    loading?: boolean;
    hydration?: boolean;
}

const blogFavorite = createSlice({
    name: 'blogLike',
    initialState: { board_ids: [] } as IBlogFavorite,
    reducers: {
        deleteFavoriteBoardIdList: (state) => {
            const board_ids: string[] = [];
            return {
                ...state,
                board_ids,
                // hydration: true,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFavoriteBoardIdList.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getFavoriteBoardIdList.fulfilled, (state, action) => {
                const board_ids: string[] = action.payload.favoriteBoardList.map(
                    (v: { board_id: string }) => v.board_id,
                );
                return {
                    ...state,
                    board_ids,
                    loading: false,
                };
            });
    },
});

export const { deleteFavoriteBoardIdList } = blogFavorite.actions;
export default blogFavorite.reducer;
