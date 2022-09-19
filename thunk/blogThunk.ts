import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { BackUrl } from '../config';
import { ReducerType } from '../reducer/rootReducer';
import path from 'path';
import { getComments, IComment } from '../reducer/blog/comment';
import { IBoardData } from '../reducer/blog/boardData';
import { IBlogToggle } from '../reducer/blog/blogToggle';
import { progress } from '../reducer/blog/fileProgress';
import { goPage, initTotalCount, IPaging } from '../reducer/blog/paging';

axios.defaults.baseURL = BackUrl;
axios.defaults.withCredentials = true;

export const getCategoriMenuThunk = createAsyncThunk(
    'GET_CATEGORI_MENU',
    async (_, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.get(`/blog/categori`);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const getBoardListThunk = createAsyncThunk(
    'GET_BOARD_LIST',
    async (
        condition: { page: number; countList: number; categoriId: number },
        { getState, requestId, rejectWithValue },
    ) => {
        try {
            const offset = (condition.page - 1) * condition.countList;
            const limit = condition.countList;
            const response = await axios.get(`/blog/${offset}/${limit}/${condition.categoriId}`);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const getDetailBoardThunk = createAsyncThunk(
    'GET_DETAIL_BOARD',
    async (condition: { boardId: string; categoriId: number }, { dispatch, getState, requestId, rejectWithValue }) => {
        try {
            // const { blogToggle } = getState() as { blogToggle: IBlogToggle };
            const response = await axios.get(`/blog/${condition.boardId}/${condition.categoriId}`);
            const comments = response.data.boardInfo.comments;
            dispatch(getComments({ comments }));
            delete response.data.boardInfo.comments;
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const isnertBoard = createAsyncThunk(
    'INSERT_BOARD',
    async (
        insertData: {
            boardData: IBoardData;
            allFileDeleteIds: number[];
            imgFileName: { board_id: string; name: string }[];
        },
        { dispatch, getState, requestId, rejectWithValue },
    ) => {
        try {
            for (const file of insertData.boardData.uploadFiles) {
                const formData = new FormData();
                formData.append('boardId', insertData.boardData.board_id);
                formData.append('file', file);

                await axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;',
                    },
                    url: '/blog/uploadBoardFile',
                    method: 'post',
                    data: formData,
                    onUploadProgress: (p) => {
                        //onUploadProgress업로드, onDownloadProgress다운로드 실시간 현황
                        const { loaded, total } = p;
                        const percentageProgress = Math.floor((loaded / total) * 100);
                        const extName = path.extname(file.name);
                        if (extName !== '.png') {
                            dispatch(progress({ fileId: String(file.lastModified), progress: percentageProgress }));
                        }
                    },
                });
            }
            // 일반 파일 처리
            const fileNames = insertData.boardData.uploadFiles.map((file) => {
                return {
                    board_id: insertData.boardData.board_id,
                    name: file.name,
                };
            });
            // 이미지 파일처리
            fileNames.push(...insertData.imgFileName);
            // delete insertData.boardData.uploadFiles;
            await axios.post(`/blog/board/insert`, {
                boardData: insertData.boardData,
                fileNames,
                deleteFileIds: insertData.allFileDeleteIds,
            });
            return true;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const insertCommentThunk = createAsyncThunk(
    'INSERT_COMMENT',
    async (commentData: IComment, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post(`/blog/comment/insert`, commentData);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const deleteBoardThunk = createAsyncThunk(
    'DELETE_BOARD',
    async (boardId: string, { dispatch, getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.delete(`/blog/board/${boardId}`);
            return true;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const deleteCommentThunk = createAsyncThunk(
    'DELETE_COMMENT',
    async (commentIds: { commentId: number; parentId: number | null }, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.delete(`/blog/comment/${commentIds.commentId}`);
            return commentIds;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const updateMenuThunk = createAsyncThunk(
    'UPDATE_MENU',
    async (
        categoriData: {
            updateData: { menu_id: number | null; menu_name: string; sort: number }[];
            deleteMenuIds: number[];
        },
        { getState, requestId, rejectWithValue },
    ) => {
        try {
            const response = await axios.patch(`/blog/menu/update`, categoriData);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const updateCategorisThunk = createAsyncThunk(
    'UPDATE_CATEGORI',
    async (
        categoriData: {
            updateData: { categori_id: number | null; menu_id: number; categori_name: string; sort: number }[];
            deleteCategoriIds: number[];
        },
        { getState, requestId, rejectWithValue },
    ) => {
        try {
            const response = await axios.patch(`/blog/categori/update`, categoriData);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);
