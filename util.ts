import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { BackUrl } from './config';
import { fileProgress } from './reducer/blog';
import { IState } from './reducer/rootReducer';

const rlto = async (url: string, filename: string, mimeType: { type: string }) => {
    return await fetch(url)
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new File([buf], filename, mimeType);
        });
};

const getBoardList = async (page: number, countList: number) => {
    try {
        const offset = (page - 1) * countList;
        const limit = countList;
        const response = await axios.get(`/blog/${offset}/${limit}`);
        return response.data;
    } catch (err) {
        throw Error(err);
    }
};

export { rlto, getBoardList };
