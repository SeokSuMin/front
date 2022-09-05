import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategoriMenuThunk, updateCategorisThunk } from '../../thunk/blogThunk';

export interface ICategoriMenus {
    categoriMenus: { menu_name: string; sort: number; categoris: [{ [key: string]: number }] }[];
    categoriTotal: number;
    loading?: boolean;
    hydration?: boolean;
}

const categoriMenus = createSlice({
    name: 'categoriMenus',
    initialState: { hydration: false } as ICategoriMenus,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriMenuThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getCategoriMenuThunk.fulfilled, (state, action) => {
                const totalCount = action.payload.totalCount;
                return {
                    ...state,
                    categoriMenus: action.payload.categoriMenus,
                    categoriTotal: totalCount,
                    hydration: true,
                    loading: false,
                };
            })
            .addCase(updateCategorisThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateCategorisThunk.fulfilled, (state, action) => {
                const totalCount = action.payload.totalCount as number;
                return {
                    ...state,
                    categoriMenus: action.payload.categoriMenus,
                    categoriTotal: totalCount,
                    loading: false,
                };
            });
    },
});

// export const {} = categoriMenus.actions;
export default categoriMenus.reducer;
