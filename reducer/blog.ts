import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategoriMenu, isnertBoard } from '../thunk/blogThunk';

export interface IBlog {
    categoriMenus?: { menu_categori: string; categoris: [{ [key: string]: string }] }[];
    uploadFiles?: { fileId: string; fileName: string; progress?: number; imgFile: boolean }[];
    menu?: string;
    categori?: string;
    title?: string;
    content?: string;
    loading?: boolean;
    hydration?: boolean;
}

const blog = createSlice({
    name: 'blog',
    initialState: { loading: false, categoriMenus: [], uploadFiles: [] } as IBlog,
    reducers: {
        loading: (state, action: PayloadAction<IBlog>) => {
            return { ...state, ...action.payload };
        },
        addUploadFiles: (state, action) => {
            return { ...state, uploadFiles: [...state.uploadFiles, ...action.payload] };
        },
        deleteUploadFile: (state, action) => {
            const files = state.uploadFiles.filter((file) => file.fileName !== action.payload);
            return { ...state, uploadFiles: files };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriMenu.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getCategoriMenu.fulfilled, (state, action: PayloadAction<IBlog>) => {
                return {
                    ...state,
                    categoriMenus: action.payload.categoriMenus,
                    loading: false,
                    hydration: true,
                };
            })
            .addCase(isnertBoard.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(isnertBoard.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            });
    },
});

export const { loading, addUploadFiles, deleteUploadFile } = blog.actions;
export default blog.reducer;
