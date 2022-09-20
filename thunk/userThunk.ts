import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { BackUrl } from '../config';
import { ReducerType } from '../reducer/rootReducer';
import { IChangePassword } from '../reducer/user/changePassword';
import { IJoinMember } from '../reducer/user/joinMember';
import { ILogin } from '../reducer/user/login';
import { IUpdateUser } from '../reducer/user/updateUser';
import { loginUserInfo, deleteUserInfo, IUserInfo, updateAdminProfileImage } from '../reducer/user/userInfo';
import { togglLogin } from '../reducer/user/userToggle';

axios.defaults.baseURL = BackUrl;
axios.defaults.withCredentials = true;

export const checkExUserThunk = createAsyncThunk(
    'CEHCK_EX_USER',
    async (userId: string, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post('/user/check', { userId });
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

export const joinMemberThunk = createAsyncThunk(
    'JOIN_MEMBER',
    async (memberInfo: IJoinMember, { dispatch, getState, requestId, rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('userId', memberInfo.userId as string);
            formData.append('email', memberInfo.email as string);
            formData.append('password', memberInfo.password as string);
            if (memberInfo.profileImg) {
                formData.append('file', memberInfo.profileImg);
            }
            await axios({
                method: 'post',
                url: '/user/profileUpload',
                data: formData,
            });
            dispatch(togglLogin({ loginVisible: true, dashBoardVisible: false }));
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

export const loginThunk = createAsyncThunk(
    'LOGIN',
    async (userInfo: ILogin, { dispatch, getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.post('/user/login', userInfo);
            dispatch(loginUserInfo(response.data));
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const checkUserloginThunk = createAsyncThunk(
    'CHECK_USER_LOGIN',
    async (_, { getState, requestId, rejectWithValue }) => {
        const response = await axios.get('/user/');
        return response.data;
    },
);

export const getAdminInfoThunk = createAsyncThunk(
    'GET_ADMIN_INFO',
    async (_, { getState, requestId, rejectWithValue }) => {
        const response = await axios.get('/user/adminInfo');
        return response.data;
    },
);

export const logoutThunk = createAsyncThunk('LOGOUT', async (_, { getState, requestId, rejectWithValue }) => {
    try {
        const response = await axios.post('/user/logout', {});
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data);
        } else {
            return rejectWithValue(err);
        }
    }
});

export const searchUserThunk = createAsyncThunk(
    'SEARCH_USER',
    async (email: string, { getState, requestId, rejectWithValue }) => {
        try {
            const response = await axios.get(`/user/${email}`);
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

export const changePassowrdThunk = createAsyncThunk(
    'CHANGE_PASSWORD',
    async (userInfo: IChangePassword, { getState, requestId, rejectWithValue }) => {
        try {
            await axios.post('/user/change/password', userInfo);
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

export const updateUserThunk = createAsyncThunk(
    'UPDATE_MEMBER',
    async (memberInfo: IUpdateUser, { dispatch, getState, requestId, rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('userId', memberInfo.userId as string);
            formData.append('email', memberInfo.email as string);
            if (memberInfo.profileImg instanceof File) {
                formData.append('file', memberInfo.profileImg);
            } else {
                formData.append('profileImg', memberInfo.profileImg);
            }
            const response = await axios.patch('/user/update', formData);
            const checkAdmin = (response.data as IUserInfo).userId;
            if (checkAdmin === 'iceMan') {
                dispatch(updateAdminProfileImage({ userId: response.data.userId, imgPath: response.data.imgPath }));
            }
            dispatch(loginUserInfo(response.data));
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            } else {
                return rejectWithValue(err);
            }
        }
    },
);

export const deleteMemberThunk = createAsyncThunk(
    'DELETE_MEMBER',
    async (userId: string, { dispatch, getState, requestId, rejectWithValue }) => {
        try {
            await axios.delete(`/user/${userId}`);
            dispatch(deleteUserInfo());
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
