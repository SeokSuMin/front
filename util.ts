import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { BackUrl } from './config';
import { fileProgress } from './reducer/blog';
import { IState } from './reducer/rootReducer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { idText } from 'typescript';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const rlto = async (url: string, filename: string, mimeType: { type: string }) => {
    return await fetch(url)
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new File([buf], filename, mimeType);
        });
};

const getBoardList = async (page: number, countList: number, currentCategoriId: number) => {
    try {
        const offset = (page - 1) * countList;
        const limit = countList;
        const response = await axios.get(`/blog/${offset}/${limit}/${currentCategoriId}`);
        return response.data;
    } catch (err) {
        throw Error(err);
    }
};

const getDifferenceTime = (time: string) => {
    if (dayjs().diff(time, 'minute') < 1) {
        return '방금 전';
    } else if (dayjs().diff(time, 'minute') < 60) {
        return dayjs().diff(time, 'minute') + '분 전';
    } else if (dayjs().diff(time, 'hour') >= 1 && dayjs().diff(time, 'day') === 0) {
        return dayjs().diff(time, 'hour') + '시간 전';
    } else if (dayjs().diff(time, 'day') >= 1 && dayjs().diff(time, 'month') === 0) {
        return dayjs().diff(time, 'day') + '일 전';
    } else if (dayjs().diff(time, 'month') >= 1 && dayjs().diff(time, 'year') === 0) {
        return dayjs().diff(time, 'month') + '개월 전';
    } else {
        return dayjs().diff(time, 'year') + '년 전';
    }
};

export { rlto, getBoardList, getDifferenceTime };
