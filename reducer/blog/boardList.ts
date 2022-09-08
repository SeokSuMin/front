import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBoardListThunk } from '../../thunk/blogThunk';
import { IBoardData } from './boardData';

export interface IBoardList {
    boardList: IBoardData[];
    loading?: boolean;
    hydration?: boolean;
}

const boardList = createSlice({
    name: 'boardList',
    initialState: { hydration: false } as IBoardList,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBoardListThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getBoardListThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(getBoardListThunk.fulfilled, (state, action) => {
                const boardList = action.payload.boardList as IBoardData[];
                return {
                    ...state,
                    boardList: [...boardList],
                    loading: false,
                };
            });
    },
});

// export const { changeCurrentCategoriId, changeBoardViewType } = boardList.actions;
export default boardList.reducer;
