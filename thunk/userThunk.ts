import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BackUrl } from '../config';
import { ReducerType } from '../reducer/rootReducer';
import { IUser } from '../reducer/user';

axios.defaults.baseURL = BackUrl;
axios.defaults.withCredentials = true;

export const checkExUser = createAsyncThunk(
    'CEHCK_EX_USER',
    async (userId: string, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post('/user/check', { userId });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const joinMembers = createAsyncThunk(
    'JOIN_MEMBER',
    async (memberInfo: IUser, { getState, requestId, rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('userId', memberInfo.userId);
            formData.append('email', memberInfo.email);
            formData.append('password', memberInfo.password);
            formData.append('file', memberInfo.profileImg);

            await axios({
                method: 'post',
                url: '/user/profileUpload',
                data: formData,
            });
            return true;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const login = createAsyncThunk('LOGIN', async (userInfo: IUser, { getState, requestId, rejectWithValue }) => {
    try {
        const response = await axios.post('/user/login', userInfo);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const gitHubLogin = createAsyncThunk('GITHUB_LOGIN', async (_, { getState, requestId, rejectWithValue }) => {
    try {
        const response = await axios.get('/user/github/login');
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const checkUserlogin = createAsyncThunk(
    'CHECK_USER_LOGIN',
    async (_, { getState, requestId, rejectWithValue }) => {
        const response = await axios.get('/user/');
        return response.data;
    },
);

export const logout = createAsyncThunk('LOGOUT', async (_, { getState, requestId, rejectWithValue }) => {
    try {
        const response = await axios.post('/user/logout', {});
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const searchUser = createAsyncThunk(
    'SEARCH_USER',
    async (email: string, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post('/user/search', { email });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const changePassowrd = createAsyncThunk(
    'CHANGE_PASSWORD',
    async (userInfo: IUser, { getState, requestId, rejectWithValue }) => {
        try {
            await axios.post('/user/change/password', userInfo);
            return true;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);
