import { Button, Form, Input, InputRef, message, Modal, Spin } from 'antd';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import WriteInput from '../../components/blog/WriteTtile';
import FileLists from '../../components/blog/FileLists';
import FileUpload from '../../components/blog/FileUpload';
import * as Cheerio from 'cheerio';
import { rlto } from '../../util';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import wrapper from '../../store/configStore';
import axios from 'axios';
import { checkUserloginThunk } from '../../thunk/userThunk';
import { getCategoriMenuThunk, getDetailBoardThunk, isnertBoard } from '../../thunk/blogThunk';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';
import { fileBackUrl } from '../../config';
import { constants } from 'fs';
import Router, { useRouter } from 'next/router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { addUploadFiles, deleteUploadFile } from '../../reducer/blog/fileProgress';
import { deleteBoardFiles, IBoardData } from '../../reducer/blog/boardData';
import { ICategoriMenus } from '../../reducer/blog/categoriMenus';
import Seo from '../../components/Seo';

dayjs().format();

const QuillEditor = dynamic(() => import('../../components/blog/QuillEditor'), { ssr: false });

const Wrapper = styled.div`
    width: 100%;
    margin-left: 0.63em;
    margin-top: 3.74em;
    position: relative;
    z-index: 0;
`;

const SpinWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 99;
    position: absolute;
    .ant-spin-spinning {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ant-spin-text {
        margin-top: 0.313em;
    }
`;

const WriteBox = styled.div`
    display: flex;
    flex-direction: column;
    /* margin-top: 1.56rem; */
`;

const ContentBox = styled.div`
    width: 100%;
    /* min-height: 20rem; */
    display: flex;
    flex-direction: column;
    .ql-editor {
        height: 27rem;
    }
    .ql-editor {
        overflow-y: auto;
        resize: vertical;
    }
    strong {
        font-weight: bold;
    }
    em {
        font-style: italic;
    }
`;

const SendBox = styled.div`
    padding-top: 0.63em;
    text-align: right;
`;

const Write = () => {
    const router = useRouter();
    const { categoriMenus } = useAppSelector((state) => state.categoriMenus);
    const detailBoard = useAppSelector((state) => state.boardData);
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const titleInputRef = useRef<InputRef | null>(null);
    const quillRef = useRef<any>(null);

    const [menu, setMenu] = useState<string>('');
    const [categoriId, setCategoriId] = useState<number>(0);
    const [files, setFiles] = useState<File[]>([]);
    const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);

    const changeMenu = (value: string) => {
        setMenu(value);
        // setCategoris(categoriMenus?.find((cData) => cData.menu_name === value).categoris);
        const c = categoriMenus?.find((cData) => cData.menu_name === value)?.categoris[0];
        if (c) {
            setCategoriId(c.categori_id);
        }
    };

    const changeCategori = (value: number) => {
        setCategoriId(value);
    };

    const onUploadFileButtonClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, [inputRef.current]);

    const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 0) {
            return;
        }
        const tempFiles = [...(e.target.files as FileList)];

        for (const file of tempFiles) {
            const extName = path.extname(file.name);
            if (!['.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pptx'].includes(extName)) {
                message.error('엑셀, 워드, 파워포인트 이외에 파일은 선택하실 수 없습니다.');
                return;
            }
        }

        const insertFiles = tempFiles.filter((newFile) => {
            const boardFileFlag = !detailBoard?.board_files?.find((file) => file.name === newFile.name);
            const viewFileFlag = !files?.some((prevFile) => prevFile.name === newFile.name);
            if (boardFileFlag && viewFileFlag) {
                return true;
            }
        });

        setFiles((prevFiles) => [...prevFiles, ...insertFiles]);

        if (insertFiles.length) {
            dispatch(
                addUploadFiles({
                    uploadFileInfo: insertFiles.map((file) => ({
                        fileId: file.lastModified + '',
                        fileName: file.name,
                        progress: 0,
                    })),
                }),
            );
        }
        e.target.value = '';
    };
    const deleteFile = (type: string, fileName: string | number) => {
        if (type === 'new') {
            setFiles((prevFiles) => {
                return prevFiles.filter((file) => file.name !== (fileName as string));
            });
            dispatch(deleteUploadFile(fileName as string));
        } else {
            const fileId = fileName as number;
            dispatch(deleteBoardFiles(fileId));
            setDeleteFileIds((prev) => {
                return [...prev, fileId];
            });
        }
    };

    const submit = async () => {
        try {
            const title = titleInputRef?.current?.input?.value;
            if (!title?.trim()) {
                message.warn('제목은 필수 입니다.');
                titleInputRef?.current?.input?.focus();
                return;
            }
            const $ = quillRef?.current?.state?.value.trim()
                ? Cheerio.load(`<div id='quillContent'>${quillRef?.current?.state?.value}</div>`)
                : '';
            const fileArr: File[] = [...files];
            const allFileDeleteIds: number[] = [];
            const uuid = router?.query?.mode === 'modify' ? detailBoard?.board_id : uuidv4().split('-').join('');

            // 삭제된 이미지 파일 체크를 위한 이미지 이름 배열
            let prevBoardFileNames: string[] =
                router?.query?.mode === 'modify'
                    ? detailBoard?.board_files
                        ? detailBoard?.board_files
                              .map((file) => file.name)
                              .filter((file) => path.extname(file) === '.png')
                        : []
                    : [];
            const boardData = { board_id: uuid } as IBoardData;

            // 에디터 내용이 존재하면
            if ($) {
                const allTags = Array.from($('#quillContent').find('*'));
                // 이미지 변환 병렬처리
                await Promise.all(
                    allTags.map(async (tag) => {
                        if ($(tag).prop('tagName') === 'IMG') {
                            const base64Img = $(tag).prop('src') as string;
                            // 기존 파일이 아닌것만 파일추가 작업 진행
                            if (!base64Img.includes(fileBackUrl)) {
                                const fileName =
                                    dayjs().valueOf() +
                                    base64Img
                                        .slice(-8)
                                        .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '') +
                                    '.png';
                                const filePath = fileBackUrl + uuid + '/' + fileName;
                                const convertIamgeFile = await rlto(base64Img, fileName, { type: 'image/*' });
                                fileArr.push(convertIamgeFile);
                                $(tag).prop('src', filePath);
                                // 기존 추가된 이미지에서 없으면 삭제진행
                            } else if (
                                prevBoardFileNames.length &&
                                prevBoardFileNames.find((name) => base64Img.includes(name))
                            ) {
                                prevBoardFileNames = prevBoardFileNames.filter((name) => !base64Img.includes(name));
                            }
                        }
                    }),
                );
                for (const removeName of prevBoardFileNames) {
                    const removeId = detailBoard?.board_files?.find((file) => file.name === removeName)?.file_id;
                    allFileDeleteIds.push(removeId as number);
                }
                const content = $.html().replace('<html><head></head><body>', '').replace('</body></html>', '');
                boardData.content = content;
            }

            boardData.title = title;
            boardData.categori_id = categoriId as number;
            boardData.uploadFiles = fileArr;
            allFileDeleteIds.push(...deleteFileIds);

            await dispatch(isnertBoard({ boardData, allFileDeleteIds })).unwrap();
            message.success('게시글을 저장했습니다.');
            router.push(`/blog/${detailBoard.board_id}`);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                message.error(err.message);
            } else {
                message.error(err as string);
            }
        }
    };

    const initPage = async () => {
        const result = await dispatch(getCategoriMenuThunk());
        const resultCategoris = result.payload as ICategoriMenus;
        if (router?.query?.mode === 'modify') {
            const boardResult = await (await dispatch(getDetailBoardThunk(router.query.detail as string))).payload;
            for (const c of resultCategoris.categoriMenus) {
                const findC = c.categoris.find((childC) => childC.categori_id === boardResult.boardInfo.categori_id);
                if (findC) {
                    setMenu(Object.values(c)[0] as string);
                    setCategoriId(findC.categori_id);
                    break;
                }
            }
        } else {
            setMenu(resultCategoris?.categoriMenus[0]?.menu_name);
            setCategoriId(resultCategoris?.categoriMenus[0]?.categoris[0].categori_id);
        }
    };

    useEffect(() => {
        initPage();
    }, [router.query.mode]);

    return (
        <Wrapper>
            <>
                <Seo title="Ice Man | 블로그"></Seo>
                <WriteBox>
                    {detailBoard.loading ? (
                        <SpinWrapper>
                            <Spin tip="게시글 작성하는 중..." />
                        </SpinWrapper>
                    ) : null}
                    <WriteInput
                        {...{
                            titleInputRef,
                            // menuInputRef,
                            // categoriInputRef,
                            menu,
                            categoriMenus,
                            // categoris,
                            categoriId,
                            changeMenu,
                            changeCategori,
                        }}
                    />
                    <FileUpload {...{ inputRef, onUploadFile, onUploadFileButtonClick }} />
                    <FileLists {...{ deleteFile }} />
                    <ContentBox>
                        <QuillEditor {...{ quillRef }} />
                    </ContentBox>
                </WriteBox>
                <SendBox>
                    <Button disabled={detailBoard.loading} onClick={submit} type="primary">
                        작성완료
                    </Button>
                </SendBox>
            </>
        </Wrapper>
    );
};

export default Write;

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async ({ req }) => {
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        // 로그인 사용자 체크
        await dispatch(checkUserloginThunk());
        // await dispatch(getCategoriMenu());

        return {
            props: {},
        };
    };
});
