import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { IPopular } from '../reducer/movie';
import { ReducerType } from '../reducer/rootReducer';

export const getMovies = createAsyncThunk<IPopular, void, { state: ReducerType }>(
    'GET_MOVIES',
    async (_, { getState, requestId, rejectWithValue }) => {
        try {
            // const { loading } = getState().movie;
            const response = await axios.get('http://localhost:3001/api/movies');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    },
);
