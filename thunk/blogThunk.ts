import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { BackUrl } from '../config';
import { ReducerType } from '../reducer/rootReducer';
import path from 'path';
import { getComments, IComment } from '../reducer/blog/comment';
import { IBoardData } from '../reducer/blog/boardData';
import { IBlogToggle } from '../reducer/blog/blogToggle';
import { progress } from '../reducer/blog/fileProgress';

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
    async (board_id: string, { dispatch, getState, requestId, rejectWithValue }) => {
        try {
            const { blogToggle } = getState() as { blogToggle: IBlogToggle };
            const response = await axios.get(`/blog/${board_id}/${blogToggle.currentCategoriId}`);
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
        insertData: { boardData: IBoardData; allFileDeleteIds: number[] },
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
            const fileNames = insertData.boardData.uploadFiles.map((file) => {
                return {
                    board_id: insertData.boardData.board_id,
                    name: file.name,
                };
            });
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
    async (boardId: string, { getState, requestId, rejectWithValue }) => {
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

export const updateCategorisThunk = createAsyncThunk(
    'UPDATE_CATEGORIS',
    async (
        categoriData: {
            updateData: { menu_name: string; sort: number; categori_id?: number | null }[];
            deleteMenuIds: string[];
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
