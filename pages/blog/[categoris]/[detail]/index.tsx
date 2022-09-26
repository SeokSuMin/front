import { CommentOutlined, ExclamationCircleOutlined, PaperClipOutlined } from '@ant-design/icons';
import { message, Modal, Spin, Tag } from 'antd';
import styled from 'styled-components';
import { deleteBoardThunk, getCategoriMenuThunk, getDetailBoardThunk } from '../../../../thunk/blogThunk';
import { checkUserloginThunk, getAdminInfoThunk } from '../../../../thunk/userThunk';
import wrapper from '../../../../store/configStore';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { fileBackUrl, imgExtFormat } from '../../../../config';
import path from 'path';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Comments from '../../../../components/comment/Comments';
import Seo from '../../../../components/Seo';
import { goPage, initTotalCount } from '../../../../reducer/blog/paging';
import LeftProfileBox from '../../../../components/blog/LeftProfileBox';
import { ICategoriMenus } from '../../../../reducer/blog/categoriMenus';

const { confirm } = Modal;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
    .ant-spin-spinning {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ant-spin-spinning div {
        margin-bottom: 2.324em;
    }
`;

const SpinWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
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

const TopMenuBox = styled.div`
    width: 98%;
    display: flex;
    // justify-content: space-between;
    justify-content: flex-end;
    padding-bottom: 0.688em;
    button {
        margin-left: 0.357em;
        border: none;
        border-radius: 0.357em;
        padding: 0.5em 0.714em;
        font-size: 0.75rem;
        font-weight: bold;
        cursor: pointer;
    }
    button:active {
        background-color: rgb(210, 210, 210);
    }
`;
const Title = styled.div`
    margin-right: auto;
    margin-top: auto;
    font-size: 0.875rem;
    font-weight: 900;
    /* .menu {
        font-size: 0.875rem;
        font-weight: 900;
    } */
    /* .categori {
        color: gray;
        font-size: 0.75rem;
    } */
`;

const MoveBoardButtonBox = styled.div``;
const ModifyBoardButtonBox = styled.div``;

const BoardBox = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 0.63em;
    padding: 1.563em 0.938em;
`;

const TitleBox = styled.div`
    h1 {
        font-size: 2rem;
        line-height: 3rem;
        font-weight: bold;
    }
`;
const WriterInfoBox = styled.div`
    margin-top: 1.25em;
    display: flex;
    align-items: center;
    span:first-child {
        font-size: 1rem;
        .blogManage {
            font-size: 0.75rem;
        }
    }
    span:nth-child(2) {
        margin: 0 0.625em;
    }
    span:nth-child(3) {
        font-size: 0.938em;
    }
    .comment {
        display: flex;
        align-items: center;
        margin-left: auto;
        cursor: pointer;
        svg {
            margin-right: 0.313em;
        }
    }
`;

const TagBox = styled.div`
    width: 100%;
    margin-top: 1.25em;
    .ant-tag {
        border-radius: 0.313em;
        color: gray;
        background-color: rgb(245, 245, 245);
        border: none;
        font-size: 0.938rem;
        padding: 5px;
    }
`;

const FileList = styled.div`
    margin-top: 1.25em;
    font-size: 0.875rem;
    line-height: 1.4rem;
`;

const Files = styled.div`
    border-radius: 0.188rem;
    margin-bottom: 0.357em;
    font-size: 0.813rem;
    span {
        cursor: pointer;
        margin-right: 0.2em;
    }
`;

const Boundary = styled.div`
    width: 100%;
    border-bottom: 1px solid rgb(217, 217, 217);
    padding: 0.625em 0px;
`;
const Content = styled.div`
    width: 100%;
    min-height: 25rem;
    padding-top: 1.25em;
`;

const DetailBoard = () => {
    const quillInlineStyle = `
        <style>
            h1 {
                font-size: 26px;
            }
            h2 {
                font-size: 19.5px;
            }
            h3 {
                font-size: 15.21px;
            }
            em {
                font-style : italic;
            }
            .ql-syntax {
                background-color: #23241f;
                color: #f8f8f2;
                overflow: visible;
                white-space: pre-wrap;
                margin-bottom: 5px;
                margin-top: 5px;
                padding: 5px 10px;
            }
            #quillContent {
                overflow-y: hidden;
                overflow-x: auto;
            }
        </style>
    `;
    const commentDivRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const detailBoard = useAppSelector((state) => state.boardData);
    const { comments } = useAppSelector((state) => state.comment);
    const { userId } = useAppSelector((state) => state.userInfo);
    const { viewType } = useAppSelector((state) => state.blogToggle);
    const { page, countList, totalCount } = useAppSelector((state) => state.paging);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [categoriId, setCategoriId] = useState((router.query.categoris as string).split('_')[1]);
    const [menuTitle, setMenuTitle] = useState('');
    const [categoriTitle, setCategoriTitle] = useState('');
    const dispatch = useAppDispatch();

    const moveDetailBoard = async (boardId: string) => {
        router.push(`/blog/categori_${categoriId}/${boardId}`);
    };

    const deletefirm = (boardId: string) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: '게시글 삭제',
            content: <p>해당 게시글 및 파일이 모두 삭제됩니다.</p>,
            okText: '삭제',
            cancelText: '취소',
            async onOk() {
                try {
                    await dispatch(deleteBoardThunk(boardId)).unwrap();
                    dispatch(initTotalCount(totalCount - 1));
                    dispatch(goPage(page));
                    setDeleteFlag(true);
                    // router.push({
                    //     pathname: `/blog/categori_${currentCategoriId}`,
                    //     query: { page, countList, type: viewType },
                    // });
                } catch (err) {
                    if (err instanceof Error) {
                        console.log(err.message);
                        message.error(err.message);
                    } else {
                        message.error(err as string);
                    }
                }
            },
            onCancel() {
                // Modal.destroyAll();
            },
        });
    };

    const initPage = async () => {
        try {
            await dispatch(
                getDetailBoardThunk({ boardId: router.query.detail as string, categoriId: +categoriId }),
            ).unwrap();
            const menuResult = (await (await dispatch(getCategoriMenuThunk())).payload) as ICategoriMenus;
            if (+categoriId === 0) {
                setMenuTitle('전체보기');
                setCategoriTitle('');
            } else {
                for (const menu of menuResult.categoriMenus) {
                    const findCategori = menu.categoris.find((c) => c?.categori_id === +categoriId);
                    if (findCategori) {
                        setMenuTitle(menu.menu_name);
                        setCategoriTitle(findCategori.categori_name);
                        break;
                    }
                }
            }
        } catch (err) {
            message.warn('존재하지 않는 게시글 입니다.');
            window.history.back();
        }
    };

    useEffect(() => {
        if (deleteFlag) {
            router.push({
                pathname: `/blog/categori_${categoriId}`,
                query: { page, countList, type: viewType },
            });
        } else {
            initPage();
        }
    }, [router.query.detail, deleteFlag]);

    return (
        <Wrapper>
            <Seo title="Ice Man | 블로그"></Seo>
            {detailBoard.loading ? (
                <SpinWrapper>
                    <Spin tip="Loading..." />
                </SpinWrapper>
            ) : (
                <>
                    <TopMenuBox>
                        <Title>
                            <span className="menu">{menuTitle}</span>
                            {+categoriId !== 0 ? (
                                <>
                                    <span>, </span>
                                    <span className="categori">{categoriTitle}</span>
                                </>
                            ) : null}
                        </Title>
                        <ModifyBoardButtonBox>
                            {userId === 'iceMan' ? (
                                <>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                {
                                                    pathname: '/blog/write',
                                                    query: {
                                                        mode: 'modify',
                                                        categoriId,
                                                        detail: router.query.detail as string,
                                                    },
                                                },
                                                '/blog/write',
                                            )
                                        }
                                    >
                                        수정
                                    </button>
                                    <button onClick={() => deletefirm(detailBoard.board_id)}>삭제</button>
                                </>
                            ) : null}
                        </ModifyBoardButtonBox>
                        <button onClick={() => commentDivRef?.current?.scrollIntoView({ behavior: 'smooth' })}>
                            댓글 ▼
                        </button>
                        <MoveBoardButtonBox>
                            {detailBoard?.prevBoardId ? (
                                <button onClick={() => moveDetailBoard(detailBoard.prevBoardId as string)}>
                                    이전글
                                </button>
                            ) : null}
                            {detailBoard?.nextBoardId ? (
                                <button onClick={() => moveDetailBoard(detailBoard.nextBoardId as string)}>
                                    다음글
                                </button>
                            ) : null}
                            <button
                                onClick={() =>
                                    router.push({
                                        pathname: `/blog/categori_${categoriId}`,
                                        query: { page, countList, type: viewType },
                                    })
                                }
                            >
                                목록
                            </button>
                        </MoveBoardButtonBox>
                    </TopMenuBox>
                    <BoardBox>
                        <TitleBox>
                            <h1>{detailBoard?.title}</h1>
                            <WriterInfoBox>
                                <span>
                                    {detailBoard?.writer} <span className="blogManage">[블로그 관리자]</span>
                                </span>
                                <span>·</span>
                                <span>{dayjs(detailBoard?.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                                {/* {comments?.length ? (
                                    <span
                                        onClick={() => commentDivRef?.current?.scrollIntoView({ behavior: 'smooth' })}
                                        className="comment"
                                    >
                                        <CommentOutlined /> 댓글 ({comments.length})
                                    </span>
                                ) : null} */}
                            </WriterInfoBox>
                            {/* <TagBox>
                                <Tag>{detailBoard?.categoris?.categori_name}</Tag>
                            </TagBox> */}
                            <FileList>
                                {detailBoard?.board_files?.map((file) => {
                                    const extName = path.extname(file.name);
                                    if (!imgExtFormat.includes(extName.toLocaleLowerCase())) {
                                        return (
                                            <Files key={file.file_id}>
                                                <a
                                                    href={`${fileBackUrl}${file.board_id}/${file.name}`}
                                                    target="_self"
                                                    download
                                                    rel="noreferrer"
                                                >
                                                    <span>
                                                        <PaperClipOutlined />
                                                        {file.name}
                                                    </span>
                                                </a>
                                            </Files>
                                        );
                                    }
                                })}
                            </FileList>
                        </TitleBox>
                        <Boundary />
                        <Content>{parse(detailBoard ? quillInlineStyle + detailBoard?.content : '')}</Content>
                    </BoardBox>
                    <Comments divRef={commentDivRef} />
                </>
            )}
        </Wrapper>
    );
};

export default DetailBoard;

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async ({ req, resolvedUrl }) => {
        const boardId = resolvedUrl.split('/')[resolvedUrl.split('/').length - 1];
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        // 로그인 사용자 체크
        await dispatch(checkUserloginThunk());
        await dispatch(getAdminInfoThunk());
        // await dispatch(getCategoriMenu());
        // await dispatch(getDetailBoard(boardId));

        return {
            props: {},
        };
    };
});
