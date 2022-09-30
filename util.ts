import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { BackUrl, fileBackUrl } from './config';
import { IState } from './reducer/rootReducer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { idText } from 'typescript';
import * as Cheerio from 'cheerio';
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
    } catch (err: any) {
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

const copyPasteImageUpload = async ($: Cheerio.CheerioAPI, boardId: string) => {
    const allTags = Array.from($('#quillContent').find('*'));

    for (const tag of allTags) {
        if ($(tag).prop('tagName') === 'IMG') {
            const imgSrc = $(tag).prop('src') as string;
            if (imgSrc.includes('data:image')) {
                const formData = new FormData();
                const fileName =
                    imgSrc.slice(-8).replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '') + '.png';
                const convertIamgeFile = await rlto(imgSrc, fileName, {
                    type: 'image/png',
                });
                formData.append('boardId', boardId);
                formData.append('file', convertIamgeFile);
                const response = await axios.post('/blog/uploadBoardFile', formData);
                const fileNames = response.data.fileNames as string[];
                $(tag).prop('src', `${fileBackUrl}${boardId}/${fileNames[0]}`);
            }
        }
    }

    return $;
};

export { rlto, getBoardList, getDifferenceTime, copyPasteImageUpload };
