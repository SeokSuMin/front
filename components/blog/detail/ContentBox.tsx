import styled from 'styled-components';
import { fileBackUrl, imgExtFormat } from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import path from 'path';
import dayjs from 'dayjs';
import { PaperClipOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';
import LikeBox from './LikeBox';
import FavoriteBox from './FavoriteBox';
import { message } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { addfavoriteThunk, addLikeThunk, deletefavoriteThunk, deleteLikeThunk } from '../../../thunk/blogThunk';

const Wrapper = styled.div`
    width: 97%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 0.63em;
    padding: 1.563em 2.813em 2.813em 2.813em;
    position: relative;
    @media screen and (max-width: 39.375rem) {
        width: 100%;
    }
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
    line-height: 2em;
    min-height: 25rem;
    padding-top: 1.25em;
    // padding: 2.031em 2.031em 2.031em 2.031em;
`;

const ToggleBox = styled.div`
    width: 100%;
    display: flex;
`;

interface IContentBoxProps {
    checkLikeTime: boolean;
    setCheckLikeTime: Dispatch<SetStateAction<boolean>>;
    like: boolean;
    setLike: Dispatch<SetStateAction<boolean>>;
    likeCount: number;
    setLikeCount: Dispatch<SetStateAction<number>>;
    checkFavoriteTime: boolean;
    setCheckFavoriteTime: Dispatch<SetStateAction<boolean>>;
    favorite: boolean;
    setFavorite: Dispatch<SetStateAction<boolean>>;
}

const ContentBox = ({
    checkLikeTime,
    setCheckLikeTime,
    like,
    setLike,
    likeCount,
    setLikeCount,
    checkFavoriteTime,
    setCheckFavoriteTime,
    favorite,
    setFavorite,
}: IContentBoxProps) => {
    const quillInlineStyle = `
        <style>
            #quillContent h1 {
                font-size: 26px;
            }
            #quillContent h2 {
                font-size: 19.5px;
            }
            #quillContent h3 {
                font-size: 15.21px;
            }
            #quillContent em {
                font-style : italic;
            }
            #quillContent a {
                color: blue;
                text-decoration: underline;
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

    const detailBoard = useAppSelector((state) => state.boardData);
    const { userId } = useAppSelector((state) => state.userInfo);
    const dispatch = useAppDispatch();

    const likeToggle = async (type: string) => {
        try {
            if (!userId) {
                message.warn('로그인 후 이용하실 수 있습니다.');
                return;
            }
            if (checkLikeTime) {
                if (type === 'like') {
                    setCheckLikeTime(false);
                    setLike(true);
                    setLikeCount((prevCount) => prevCount + 1);
                    await dispatch(addLikeThunk(detailBoard.board_id)).unwrap();
                    // 좋아요 누를경우 10초뒤 다시 누르게 시간지정
                    setTimeout(() => {
                        setCheckLikeTime(true);
                    }, 10000);
                } else {
                    setLike(false);
                    setLikeCount((prevCount) => prevCount - 1);
                    await dispatch(deleteLikeThunk(detailBoard.board_id)).unwrap();
                }
            } else {
                if (type === 'unlike') {
                    setLike(false);
                    setLikeCount((prevCount) => prevCount - 1);
                    await dispatch(deleteLikeThunk(detailBoard.board_id)).unwrap();
                    return;
                }
                message.warn('좋아요는 10초마다 한 번만 클릭할 수 있습니다.');
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                message.error(err.message);
            } else {
                message.error(err as string);
            }
        }
    };

    const favoriteToggle = async (type: string) => {
        try {
            if (!userId) {
                message.warn('로그인 후 이용하실 수 있습니다.');
                return;
            }
            if (checkFavoriteTime) {
                if (type === 'favorite') {
                    setCheckFavoriteTime(false);
                    setFavorite(true);
                    await dispatch(addfavoriteThunk(detailBoard.board_id)).unwrap();
                    // 즐겨찾기 누를경우 10초뒤 다시 누르게 시간지정
                    setTimeout(() => {
                        setCheckFavoriteTime(true);
                    }, 10000);
                } else {
                    setFavorite(false);
                    await dispatch(deletefavoriteThunk(detailBoard.board_id)).unwrap();
                }
            } else {
                if (type === 'unfavorite') {
                    setFavorite(false);
                    await dispatch(deletefavoriteThunk(detailBoard.board_id)).unwrap();
                    return;
                }
                message.warn('즐겨찾기는 10초마다 한 번만 클릭할 수 있습니다.');
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                message.error(err.message);
            } else {
                message.error(err as string);
            }
        }
    };
    return (
        <Wrapper>
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
            <ToggleBox>
                <LikeBox {...{ likeToggle, like, likeCount }} />
                <FavoriteBox {...{ favoriteToggle, favorite }} />
            </ToggleBox>
        </Wrapper>
    );
};

export default ContentBox;
