import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BackUrl } from '../config';
import { ReducerType } from '../reducer/rootReducer';
import { IBlog } from '../reducer/blog';

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

export const isnertBoard = createAsyncThunk(
    'INSERT_BOARD',
    async (boardData: IBlog, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post(`/blog/insert`, boardData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);
