import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDetailBoardThunk, isnertBoard } from '../../thunk/blogThunk';

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
            const prevDetailBoard = state as IBoardData;
            const detailBoard = {
                ...prevDetailBoard,
                board_files: prevDetailBoard?.board_files?.filter((file) => file.file_id !== fildId),
            };
            return {
                ...state,
                detailBoard,
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
            .addCase(getDetailBoardThunk.fulfilled, (state, action) => {
                const prevNextIds = action.payload.prevNextBoardIds[0];
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
            });
    },
});

export const { deleteBoardFiles } = boardData.actions;
export default boardData.reducer;
