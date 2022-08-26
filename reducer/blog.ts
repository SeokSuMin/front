import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getCategoriMenu,
    getDetailBoard,
    isnertBoard,
    insertComment,
    deleteComment,
    deleteBoard,
    updateCategoris,
} from '../thunk/blogThunk';

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
    modify_flag?: boolean;
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
    categoriMenus?: { menu_name: string; sort: number; categoris: [{ [key: string]: number }] }[];
    categoriTotal?: number;
    detailBoard?: IBoardData;
    uploadFileInfo?: { fileId: string; fileName: string; progress?: number }[];
    paging?: IPaging;
    currentCategoriId?: number;
    viewType?: number;
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
        viewType: 1,
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
        deleteBoardFiles: (state, action: PayloadAction<number>) => {
            const fildId = action.payload;
            const detailBoard = {
                ...state.detailBoard,
                board_files: state.detailBoard.board_files.filter((file) => file.file_id !== fildId),
            };
            return {
                ...state,
                detailBoard,
            };
        },
        changeBoardViewType: (state, action: PayloadAction<number>) => {
            const viewType = action.payload;
            return {
                ...state,
                viewType,
            };
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
            .addCase(getCategoriMenu.fulfilled, (state, action) => {
                const totalCount = action.payload.totalCount;
                return {
                    ...state,
                    categoriMenus: action.payload.categoriMenus,
                    uploadFileInfo: [],
                    categoriTotal: totalCount,
                    loading: false,
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
            .addCase(getDetailBoard.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getDetailBoard.fulfilled, (state, action) => {
                const prevNextIds = action.payload.prevNextBoardIds[0];
                const detailBoard = {
                    ...action.payload.boardInfo,
                    prevBoardId: prevNextIds ? prevNextIds.prev : null,
                    nextBoardId: prevNextIds ? prevNextIds.next : null,
                };
                return {
                    ...state,
                    detailBoard,
                    loading: false,
                };
            })
            .addCase(insertComment.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(insertComment.fulfilled, (state, action) => {
                const comments = action.payload.comments;
                const detailBoard = {
                    ...state.detailBoard,
                    comments,
                };
                return {
                    ...state,
                    detailBoard,
                };
            })
            .addCase(deleteComment.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const commentId = +action.payload.commentId;
                const parentId = +action.payload.parentId;
                const detailBoard = {
                    ...state.detailBoard,
                };
                if (parentId) {
                    const comments = state.detailBoard.comments.map((comment) => {
                        if (comment.comment_id === parentId) {
                            const newChildComments = comment.child_comment.filter(
                                (childComment) => childComment.comment_id !== commentId,
                            );
                            return {
                                ...comment,
                                child_comment: newChildComments,
                            };
                        } else {
                            return {
                                ...comment,
                            };
                        }
                    });
                    detailBoard.comments = comments;
                } else {
                    const comments = state.detailBoard.comments.filter((comment) => comment.comment_id !== commentId);
                    detailBoard.comments = comments;
                }
                return {
                    ...state,
                    detailBoard,
                    loading: false,
                };
            })
            .addCase(deleteBoard.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteBoard.fulfilled, (state, action) => {
                return {
                    ...state,
                    detailBoard: null,
                    loading: false,
                };
            })
            .addCase(updateCategoris.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateCategoris.fulfilled, (state, action) => {
                const totalCount = action.payload.totalCount;
                return {
                    ...state,
                    categoriMenus: action.payload.categoriMenus,
                    categoriTotal: totalCount,
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
    deleteBoardFiles,
    changeBoardViewType,
} = blog.actions;
export default blog.reducer;
