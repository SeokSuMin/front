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
    async (boardData: IBoardData, { dispatch, getState, requestId, rejectWithValue }) => {
        try {
            for (const file of boardData.uploadFiles) {
                const formData = new FormData();
                formData.append('boardId', boardData.board_id);
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
            const fileNames = boardData.uploadFiles.map((file) => {
                return {
                    board_id: boardData.board_id,
                    name: file.name,
                };
            });
            delete boardData.uploadFiles;
            await axios.post(`/blog/insert`, { boardData, fileNames });
            return true;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const isnertComment = createAsyncThunk(
    'INSERT_COMMENT',
    async (commentData: IBoardComment, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post(`/blog/insert/comment`, commentData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);
