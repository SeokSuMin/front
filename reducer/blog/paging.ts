import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPaging {
    page: number;
    startPage: number;
    endPage: number;
    countList: number;
    countPage: number;
    totalPage: number;
    totalCount: number;
    hydration?: boolean;
}

const paging = createSlice({
    name: 'paging',
    initialState: {
        page: 1,
        startPage: 1,
        endPage: 1,
        countList: 15,
        countPage: 10,
        totalPage: 0,
        totalCount: 1,
        hydration: false,
    } as IPaging,
    reducers: {
        initTotalCount: (state, action: PayloadAction<number>) => {
            const totalCount = action.payload;
            return {
                ...state,
                // uploadFileInfo: [],
                totalCount,
            };
        },
        goPage: (state, action: PayloadAction<number>) => {
            let totalPage = Math.floor(state.totalCount / state.countList);
            let page = action.payload ? action.payload : state.page;
            if (page < 1) {
                page = 1;
            }
            if (state.totalCount % state.countList > 0) {
                totalPage++;
            }
            if (totalPage < state.page) {
                page = totalPage;
            }
            const startPage = parseInt(String((page - 1) / state.countPage)) * state.countPage + 1;
            let endPage = startPage + state.countPage - 1;
            if (endPage > totalPage) {
                endPage = totalPage;
            }
            return { ...state, page, totalPage, startPage, endPage, hydration: true };
        },
        changeCountList: (state, action: PayloadAction<number>) => {
            const countList = action.payload;
            const page = 1;
            return {
                ...state,
                page,
                countList,
                hydration: true,
            };
        },
    },
});

export const { initTotalCount, goPage, changeCountList } = paging.actions;
export default paging.reducer;
