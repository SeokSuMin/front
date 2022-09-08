import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IBlogToggle {
    currentCategoriId: number;
    viewType: string;
    hydration?: boolean;
}

const blogToggle = createSlice({
    name: 'blogToggle',
    initialState: { hydration: false, currentCategoriId: 0 } as IBlogToggle,
    reducers: {
        changeCurrentCategoriId: (state, action: PayloadAction<number>) => {
            const categoriId = action.payload;
            return {
                ...state,
                currentCategoriId: categoriId,
                hydration: true,
            };
        },
        changeBoardViewType: (state, action: PayloadAction<string>) => {
            const viewType = action.payload;
            return {
                ...state,
                viewType,
                hydration: true,
            };
        },
    },
});

export const { changeCurrentCategoriId, changeBoardViewType } = blogToggle.actions;
export default blogToggle.reducer;
