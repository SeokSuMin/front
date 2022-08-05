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
