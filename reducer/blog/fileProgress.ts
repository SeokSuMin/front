import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFileProgress {
    uploadFileInfo: { fileId: string; fileName: string; progress: number }[];
    hydration?: boolean;
}

const fileProgress = createSlice({
    name: 'fileProgress',
    initialState: { uploadFileInfo: [], hydration: false } as IFileProgress,
    reducers: {
        addUploadFiles: (state, action: PayloadAction<IFileProgress>) => {
            return { ...state, uploadFileInfo: [...state.uploadFileInfo, ...action.payload.uploadFileInfo] };
        },
        deleteUploadFile: (state, action: PayloadAction<string>) => {
            const files = state.uploadFileInfo.filter((file) => file.fileName !== action.payload);
            return { ...state, uploadFileInfo: files };
        },
        progress: (state, action: PayloadAction<{ fileId: string; progress: number }>) => {
            const fileId = action.payload.fileId;
            const progress = action.payload.progress;
            const uploadFileInfo = state.uploadFileInfo.map((file) => {
                if (file.fileId !== fileId) {
                    return file;
                } else {
                    return { ...file, progress };
                }
            });
            return {
                ...state,
                uploadFileInfo: uploadFileInfo,
            };
        },
    },
});

export const { addUploadFiles, deleteUploadFile, progress } = fileProgress.actions;
export default fileProgress.reducer;
