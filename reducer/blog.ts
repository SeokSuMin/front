import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategoriMenu, getDetailBoard, isnertBoard, isnertComment } from '../thunk/blogThunk';

interface IPaging {
    page: number;
    startPage: number;
    endPage: number;
    countList: number;
    countPage: number;
    totalPage: number;
    totalCount: number;
}

interface IBoardFile {
    board_id: string;
    file_id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBoardComment {
    comment_id: number;
    board_id?: string;
    parent_id: number | null;
    content: string;
    parent_user_id: string;
    user_id: string;
    strategy_type?: string;
    img_path?: string;
    child_comment?: IBoardComment[];
    createdAt?: string;
    updatedAt?: string;
}

export interface IBoardData {
    board_id?: string;
    categori_id?: number;
    categoris: { categori_name: string };
    title?: string;
    content?: string;
    writer: string;
    uploadFiles?: File[];
    board_files?: IBoardFile[];
    comments?: IBoardComment[];
    prevBoardId?: string | null;
    nextBoardId?: string | null;
    createdAt: string;
}

export interface IBlog {
    categoriMenus?: { menu_name: string; categoris: [{ [key: string]: number }] }[];
    categoriTotal?: number;
    detailBoard?: IBoardData;
    uploadFileInfo?: { fileId: string; fileName: string; progress?: number }[];
    paging?: IPaging;
    currentCategoriId?: number;
    loading?: boolean;
    hydration?: boolean;
}

const blog = createSlice({
    name: 'blog',
    initialState: {
        categoriMenus: [],
        uploadFileInfo: [],
        currentCategoriId: 0,
        loading: false,
        paging: { page: 1, startPage: 1, endPage: 1, countList: 15, countPage: 10, totalCount: 1 },
        hydration: false,
    } as IBlog,
    reducers: {
        loading: (state, action: PayloadAction<IBlog>) => {
            return { ...state, ...action.payload };
        },
        addUploadFiles: (state, action) => {
            return { ...state, uploadFileInfo: [...state.uploadFileInfo, ...action.payload] };
        },
        deleteUploadFile: (state, action) => {
            const files = state.uploadFileInfo.filter((file) => file.fileName !== action.payload);
            return { ...state, uploadFileInfo: files };
        },
        fileProgress: (state, action) => {
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
        initTotalCount: (state, action: PayloadAction<number>) => {
            const totalCount = action.payload;
            return {
                ...state,
                uploadFileInfo: [],
                paging: { ...state.paging, totalCount },
            };
        },
        goPage: (state, action: PayloadAction<number>) => {
            let totalPage = Math.floor(state.paging.totalCount / state.paging.countList);
            let page = action.payload ? action.payload : state.paging.page;
            if (page < 1) {
                page = 1;
            }
            if (state.paging.totalCount % state.paging.countList > 0) {
                totalPage++;
            }
            if (totalPage < state.paging.page) {
                page = totalPage;
            }
            const startPage = parseInt(String((page - 1) / state.paging.countPage)) * state.paging.countPage + 1;
            let endPage = startPage + state.paging.countPage - 1;
            if (endPage > totalPage) {
                endPage = totalPage;
            }
            return { ...state, paging: { ...state.paging, page, totalPage, startPage, endPage } };
        },
        changeCountList: (state, action: PayloadAction<number>) => {
            const countList = action.payload;
            const page = 1;
            return {
                ...state,
                paging: { ...state.paging, page, countList },
            };
        },
        changeCurrentCategoriId: (state, action: PayloadAction<number>) => {
            const categoriId = action.payload;
            const page = 1;
            return {
                ...state,
                currentCategoriId: categoriId,
                paging: { ...state.paging, page },
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriMenu.fulfilled, (state, action) => {
                const totalCount = action.payload.totalCount;
                return {
                    ...state,
                    categoriMenus: action.payload.categoriMenus,
                    uploadFileInfo: [],
                    categoriTotal: totalCount,
                    hydration: true, // 페이지 번호 유지를 위한 true
                };
            })
            // .addCase(getBoardList.pending, (state, action) => {
            //     return {
            //         ...state,
            //         loading: true,
            //     };
            // })
            // .addCase(getBoardList.fulfilled, (state, action) => {
            //     const totalCount = action.payload.totalCount;
            //     return {
            //         ...state,
            //         boardList: action.payload.boardList,
            //         paging: { ...state.paging, totalCount },
            //         loading: false,
            //     };
            // })
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
            })
            .addCase(getDetailBoard.fulfilled, (state, action) => {
                const prevNextIds = action.payload.prevNextBoardIds[0];
                const detailBoard = {
                    ...action.payload.boardInfo,
                    prevBoardId: prevNextIds.prev,
                    nextBoardId: prevNextIds.next,
                };
                return {
                    ...state,
                    detailBoard,
                };
            })
            .addCase(isnertComment.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(isnertComment.fulfilled, (state, action) => {
                // const detailBoard = {
                //     ...state.detailBoard,
                // };
                // if (state.detailBoard.comments.length) {
                //     const commentId = action.payload.comment_id;
                //     const newComments = state.detailBoard.comments.map((comment) => {
                //         if (comment.comment_id !== commentId) {
                //             return comment;
                //         } else {
                //             return { ...action.payload };
                //         }
                //     });
                //     detailBoard.comments = newComments;
                // } else {
                //     detailBoard.comments = action.payload;
                // }
                return {
                    ...state,
                    loading: false,
                };
            });
    },
});

export const {
    loading,
    addUploadFiles,
    deleteUploadFile,
    fileProgress,
    goPage,
    changeCountList,
    changeCurrentCategoriId,
    initTotalCount,
} = blog.actions;
export default blog.reducer;
