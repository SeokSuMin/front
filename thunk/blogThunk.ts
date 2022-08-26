import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BackUrl } from '../config';
import { ReducerType } from '../reducer/rootReducer';
import { fileProgress, IBlog, IBoardComment, IBoardData } from '../reducer/blog';
import path from 'path';

axios.defaults.baseURL = BackUrl;
axios.defaults.withCredentials = true;

export const getCategoriMenu = createAsyncThunk(
    'GET_CATEGORI_MENU',
    async (_, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.get(`/blog/categori`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const getDetailBoard = createAsyncThunk(
    'GET_DETAIL_BOARD',
    async (board_id: string, { getState, requestId, rejectWithValue }) => {
        try {
            const {
                blog: { currentCategoriId },
            } = getState() as { blog: IBlog };
            const response = await axios.get(`/blog/${board_id}/${currentCategoriId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const isnertBoard = createAsyncThunk(
    'INSERT_BOARD',
    async (
        insertData: { boardData: IBoardData; deleteFileIds: number[] },
        { dispatch, getState, requestId, rejectWithValue },
    ) => {
        try {
            for (const file of insertData.boardData.uploadFiles) {
                const formData = new FormData();
                formData.append('boardId', insertData.boardData.board_id);
                formData.append('file', file);
                await axios({
                    headers: {
                        'Content-Type': 'multipart/form-data; charset: UTF-8;',
                    },
                    url: '/blog/uploadBoardFile',
                    method: 'post',
                    data: formData,
                    onUploadProgress: (progress) => {
                        //onUploadProgress업로드, onDownloadProgress다운로드 실시간 현황
                        const { loaded, total } = progress;
                        const percentageProgress = Math.floor((loaded / total) * 100);
                        const extName = path.extname(file.name);
                        if (extName !== '.png') {
                            dispatch(fileProgress({ fileId: String(file.lastModified), progress: percentageProgress }));
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
            delete insertData.boardData.uploadFiles;
            await axios.post(`/blog/board/insert`, {
                boardData: insertData.boardData,
                fileNames,
                deleteFileIds: insertData.deleteFileIds,
            });
            return true;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const insertComment = createAsyncThunk(
    'INSERT_COMMENT',
    async (commentData: IBoardComment, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post(`/blog/comment/insert`, commentData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const deleteBoard = createAsyncThunk(
    'DELETE_BOARD',
    async (boardId: string, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.delete(`/blog/board/${boardId}`);
            return true;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const deleteComment = createAsyncThunk(
    'DELETE_COMMENT',
    async (commentIds: { commentId: number; parentId: number }, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.delete(`/blog/comment/${commentIds.commentId}`);
            return commentIds;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const updateCategoris = createAsyncThunk(
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
            return rejectWithValue(err.response.data);
        }
    },
);
