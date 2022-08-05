import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BackUrl } from '../config';
import { ReducerType } from '../reducer/rootReducer';
import { IUser } from '../reducer/user';

axios.defaults.baseURL = BackUrl + '/user';
axios.defaults.withCredentials = true;

export const joinMember = createAsyncThunk<IUser, void, { state: ReducerType }>(
    'JOIN_MEMBER',
    async (_, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post('/join');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);
