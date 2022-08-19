import { Button, Form, Input, InputRef, message } from 'antd';
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
import { checkUserlogin } from '../../thunk/userThunk';
import { getCategoriMenu, isnertBoard } from '../../thunk/blogThunk';
import path from 'path';
import { addUploadFiles, deleteUploadFile, fileProgress, IBlog, IBoardData, loading } from '../../reducer/blog';
import { v4 as uuidv4 } from 'uuid';
import { fileBackUrl } from '../../config';
import { constants } from 'fs';
import Router, { useRouter } from 'next/router';

dayjs().format();

const QuillEditor = dynamic(() => import('../../components/blog/QuillEditor'), { ssr: false });

const Wrapper = styled.div`
    width: 100%;
    margin-left: 0.63em;
    margin-top: 3.74em;
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
    const { categoriMenus } = useAppSelector((state) => state.blog);
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const titleInputRef = useRef<InputRef | null>(null);
    const menuInputRef = useRef<InputRef | null>(null);
    const categoriInputRef = useRef<InputRef | null>(null);
    const quillRef = useRef(null);

    const [menu, setMenu] = useState<string>();
    const [categoris, setCategoris] = useState<
        [
            {
                [key: string]: string;
            },
        ]
    >();
    const [categoriId, setCategoriId] = useState<string>();
    const [files, setFiles] = useState<File[] | null>([]);

    useEffect(() => {
        if (categoriMenus.length) {
            setMenu(categoriMenus[0].menu_categori);
            setCategoris(categoriMenus[0]?.categoris);
            setCategoriId(Object.keys(categoriMenus[0]?.categoris[0])[0]);
        }
    }, []);

    const changeMenu = (value: string) => {
        setMenu(value);
        if (value !== 'direct') {
            setCategoris(categoriMenus?.find((cData) => cData.menu_categori === value).categoris);
            const c = categoriMenus?.find((cData) => cData.menu_categori === value)?.categoris[0];
            if (c) {
                setCategoriId(Object.keys(c)[0]);
            }
        }
    };

    const changeCategori = (value: string) => {
        setCategoriId(value);
    };

    const onUploadFileButtonClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, [inputRef.current]);

    const onUploadFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
                return;
            }
            const tempFiles = [...e.target.files];

            for (const file of tempFiles) {
                const extName = path.extname(file.name);
                if (!['.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pptx'].includes(extName)) {
                    message.error('엑셀, 워드, 파워포인트 이외에 파일은 선택하실 수 없습니다.');
                    return;
                }
            }

            const insertFiles = tempFiles.filter((newFile) => {
                if (!files.some((prevFile) => prevFile.name === newFile.name)) {
                    return true;
                }
            });
            setFiles((prevFiles) => [...prevFiles, ...insertFiles]);

            if (insertFiles.length) {
                dispatch(
                    addUploadFiles(
                        insertFiles.map((file) => ({
                            fileId: file.lastModified + '',
                            fileName: file.name,
                            progress: 0,
                        })),
                    ),
                );
            }
            e.target.value = '';
        },
        [files],
    );

    const deleteFile = (fileName: string) => {
        setFiles((prevFiles) => {
            return prevFiles.filter((file) => file.name !== fileName);
        });
        dispatch(deleteUploadFile(fileName));
    };

    const submit = async () => {
        try {
            const $ = quillRef.current.state.value.trim()
                ? Cheerio.load(`<div id='quillContent'>${quillRef.current.state.value}</div>`)
                : '';
            const fileArr: File[] = [...files];
            const uuid = uuidv4().split('-').join('');
            const boardData = { board_id: uuid } as IBoardData;
            // console.log('$$$', quillRef.current.state.value);

            // 에디터 내용이 존재하면
            if ($) {
                const allTags = Array.from($('#quillContent').find('*'));
                // 이미지 변환 병렬처리
                await Promise.all(
                    allTags.map(async (tag) => {
                        if ($(tag).prop('tagName') === 'IMG') {
                            const base64Img = $(tag).prop('src');
                            const fileName = dayjs().valueOf() + base64Img.slice(-8).replace(/\//g, '') + '.png';
                            const filePath = fileBackUrl + uuid + '/' + fileName;
                            const convertIamgeFile = await rlto(base64Img, fileName, { type: 'image/*' });
                            fileArr.push(convertIamgeFile);
                            $(tag).prop('src', filePath);
                        }
                    }),
                );
                const content = $.html().replace('<html><head></head><body>', '').replace('</body></html>', '');
                boardData.content = content;
            }

            const title = titleInputRef.current.input.value;
            const menuTitle = menu !== 'direct' ? menu : menuInputRef.current.input.value;
            const categoriTitle = categoriId !== 'direct' ? categoriId : categoriInputRef.current.input.value;
            boardData.title = title;
            boardData.menu_categori = menuTitle;
            boardData.categori = categoriTitle;
            boardData.uploadFiles = fileArr;
            await dispatch(isnertBoard(boardData)).unwrap();
            message.success('게시글을 저장했습니다.');
            router.push('/blog');
        } catch (err) {
            message.error(err);
            dispatch(loading({ loading: false }));
        }
    };

    return (
        <Wrapper>
            <WriteBox>
                <WriteInput
                    {...{
                        titleInputRef,
                        menuInputRef,
                        categoriInputRef,
                        menu,
                        categoriMenus,
                        categoris,
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
                <Button onClick={submit} type="primary">
                    작성완료
                </Button>
            </SendBox>
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
        await dispatch(checkUserlogin());
        await dispatch(getCategoriMenu());

        return {
            props: {},
        };
    };
});
