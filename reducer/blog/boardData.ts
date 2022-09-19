import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteBoardThunk, getBoardListThunk, getDetailBoardThunk, isnertBoard } from '../../thunk/blogThunk';
import { IComment } from './comment';

interface IBoardFile {
    board_id: string;
    file_id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBoardData {
    board_id: string;
    categori_id: number;
    categoris: { categori_name: string };
    title: string;
    content: string;
    writer: string;
    uploadFiles: File[];
    board_files?: IBoardFile[];
    comments?: IComment[];
    prevBoardId?: string;
    nextBoardId?: string;
    createdAt?: string;
    loading?: boolean;
    hydration?: boolean;
}

const boardData = createSlice({
    name: 'boardData',
    initialState: { hydration: false } as IBoardData,
    reducers: {
        deleteBoardFiles: (state, action: PayloadAction<number>) => {
            const fildId = action.payload;
            const newFiles = state.board_files?.filter((file) => file.file_id !== fildId);
            return {
                ...state,
                board_files: newFiles,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(isnertBoard.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(isnertBoard.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(isnertBoard.fulfilled, (state, action) => {
                return {
                    ...state,
                    // loading: false,
                };
            })
            .addCase(getDetailBoardThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getDetailBoardThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(getDetailBoardThunk.fulfilled, (state, action) => {
                const prevNextIds = action.payload.prevNextBoardIds ? action.payload.prevNextBoardIds[0] : '';
                const detailBoard = {
                    ...action.payload.boardInfo,
                    prevBoardId: prevNextIds ? prevNextIds.prev : '',
                    nextBoardId: prevNextIds ? prevNextIds.next : '',
                };
                return {
                    ...state,
                    ...detailBoard,
                    loading: false,
                };
            })
            .addCase(deleteBoardThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteBoardThunk.fulfilled, (state, action) => {
                const empty = { hydration: false } as IBoardData;
                return {
                    ...empty,
                    loading: true,
                };
            });
    },
});

export const { deleteBoardFiles } = boardData.actions;
export default boardData.reducer;
