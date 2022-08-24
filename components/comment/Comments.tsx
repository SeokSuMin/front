import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import React, { useEffect, useState } from 'react';
import { fileBackUrl } from '../../config';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { message, Modal } from 'antd';
import CommentContent from './CommentContent';
import WriteReply from './WriteReply';
import Modify from './Modify';
import { deleteComment, insertComment } from '../../thunk/blogThunk';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IBoardComment } from '../../reducer/blog';
import TopWriteComment from './TopWriteComment';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const { confirm } = Modal;

const Wrapper = styled.div`
    width: 98%;
`;

const LeftAreaBox = styled.div`
    width: 3.012em;
`;

const CommentListBox = styled.div`
    width: 100%;
`;

const CommentList = styled.div`
    width: 100%;
`;

const Boundary = styled.div`
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(217, 217, 217);
    padding: 0.625em 0px;
`;

const ReplyCountBox = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1.25em;
    span {
        font-size: 0.875rem;
        color: rgb(0, 150, 200);
        margin-left: 0.313em;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .toggle {
        transform: rotate(180deg);
        transition: all 0.2s ease-in-out;
    }
    .unToggle {
        transform: rotate(360deg);
        transition: all 0.2s ease-in-out;
    }
`;
const ChildCommentListBox = styled.div`
    width: 100%;
    display: flex;
    div.child {
        margin-top: 0px;
    }
`;

const ChildCommentList = styled.div`
    width: 100%;
    div.child {
        margin-top: 0px;
    }
`;

const ProfileImg = styled.div<{ path: string }>`
    width: 2.5rem;
    height: 2.5rem;
    // ${(props) => props.path}
    // http://localhost:3006/shark/1661161148886rkJggg==.png
    background-image: url(${(props) => props.path});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin-right: 0.55em;
`;

const Comments = () => {
    const { userId } = useAppSelector((state) => state.user);
    const { detailBoard } = useAppSelector((state) => state.blog);
    const dispatch = useAppDispatch();
    const [allComments, setAllComments] = useState<{
        [key: string]: { replyToggles: boolean; childToggles: boolean; content: string; modify_flag: boolean };
    }>({});

    const replyToggle = (commentId: number) => {
        if (!userId) {
            message.error('로그인한 사용자만 가능합니다.');
            return;
        }
        setAllComments((prev) => {
            const findComment = prev[`${commentId}`];
            const newToggle = { ...findComment, content: '', replyToggles: !findComment.replyToggles };
            return {
                ...prev,
                [`${commentId}`]: newToggle,
            };
        });
    };

    const toggleReplyList = (commentId: number) => {
        setAllComments((prev) => {
            const findComment = prev[`${commentId}`];
            const newToggle = { ...findComment, childToggles: !findComment.childToggles };
            return {
                ...prev,
                [`${commentId}`]: newToggle,
            };
        });
    };

    const modifyToggle = (commentId: number, content: string) => {
        setAllComments((prev) => {
            const findComment = prev[`${commentId}`];
            const newToggle = { ...findComment, content, modify_flag: !findComment.modify_flag };
            return {
                ...prev,
                [`${commentId}`]: newToggle,
            };
        });
    };

    const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>, commentId: number) => {
        setAllComments((prev) => {
            const findComment = prev[`${commentId}`];
            const newContent = { ...findComment, content: e.currentTarget.value };
            return {
                ...prev,
                [`${commentId}`]: newContent,
            };
        });
    };

    const deletefirm = (commentId: number, parentId: number) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: '댓글 삭제',
            content: <p>댓글을 삭제하면 해당 댓글과, 답글이 모두 삭제됩니다.</p>,
            okText: '삭제',
            cancelText: '취소',
            async onOk() {
                try {
                    await dispatch(deleteComment({ commentId, parentId })).unwrap();
                    message.success('삭제되었습니다.');
                } catch (err) {
                    message.success(err);
                }
            },
            onCancel() {
                // Modal.destroyAll();
            },
        });
    };

    const submitComment = async (
        comment_id: number | null,
        modify_flag: boolean,
        parent_id: number | null,
        parent_user_id: string | null,
        content?: string,
    ) => {
        const insertData = {
            comment_id: null,
            board_id: detailBoard.board_id,
            content: '',
            modify_flag,
            parent_id,
            parent_user_id,
            user_id: userId,
        } as IBoardComment;

        if (!comment_id) {
            if (!content.trim()) {
                message.error('내용은 필수입니다.');
                return;
            }
            insertData.content = content;
        } else {
            const allContent = allComments[`${comment_id}`].content;
            if (!allContent.trim()) {
                message.error('내용은 필수입니다.');
                return;
            }
            const checkModifyId = modify_flag ? comment_id : null;
            insertData.content = allContent;
            insertData.comment_id = checkModifyId;
        }
        await dispatch(insertComment(insertData)).unwrap();
        if (modify_flag) {
            allComments[`${comment_id}`].modify_flag = false;
        } else if (parent_id) {
            allComments[`${comment_id}`].replyToggles = false;
        }
        message.success(modify_flag ? '수정되었습니다.' : '댓글이 작성되었습니다.');
    };

    // 댓글 수 만큼 각 댓글에 고유 state 처리 작업 진행
    useEffect(() => {
        if (detailBoard?.comments) {
            for (const comment of detailBoard.comments) {
                setAllComments((prev) => {
                    const mainComment = { replyToggles: false, content: '', childToggles: false, modify_flag: false };
                    if (prev[`${comment.comment_id}`] && userId) {
                        return {
                            ...prev,
                        };
                    } else {
                        return {
                            ...prev,
                            [`${comment.comment_id}`]: mainComment,
                        };
                    }
                });
                if (comment?.child_comment) {
                    for (const childComment of comment.child_comment) {
                        setAllComments((prev) => {
                            const cComment = {
                                replyToggles: false,
                                content: '',
                                childToggles: false,
                                modify_flag: false,
                            };
                            if (prev[`${childComment.comment_id}`] && userId) {
                                return {
                                    ...prev,
                                };
                            } else {
                                return {
                                    ...prev,
                                    [`${childComment.comment_id}`]: cComment,
                                };
                            }
                        });
                    }
                }
            }
        }
    }, [detailBoard?.comments, userId]);

    return (
        <Wrapper>
            <TopWriteComment {...{ submitComment }} />
            <CommentListBox>
                <CommentList>
                    {detailBoard?.comments?.map((comment) => {
                        return (
                            <React.Fragment key={comment.comment_id}>
                                <div style={{ display: 'flex', marginTop: '4.375em' }}>
                                    <ProfileImg
                                        path={
                                            comment.strategy_type === 'local'
                                                ? fileBackUrl + comment.img_path
                                                : comment.img_path
                                        }
                                    ></ProfileImg>
                                    {allComments[`${comment.comment_id}`]?.modify_flag ? (
                                        <Modify
                                            {...{
                                                parentId: null,
                                                comment,
                                                allComments,
                                                changeComment,
                                                modifyToggle,
                                                submitComment,
                                            }}
                                        />
                                    ) : (
                                        <CommentContent
                                            {...{
                                                comment,
                                                allComments,
                                                replyToggle,
                                                modifyToggle,
                                                deletefirm,
                                            }}
                                        />
                                    )}
                                </div>
                                {allComments[`${comment.comment_id}`]?.replyToggles ? (
                                    <WriteReply
                                        {...{
                                            comment,
                                            allComments,
                                            changeComment,
                                            submitComment,
                                            replyToggle,
                                        }}
                                    />
                                ) : null}
                                {comment?.child_comment?.length ? (
                                    <ReplyCountBox>
                                        <LeftAreaBox />
                                        <span onClick={() => toggleReplyList(comment.comment_id)}>
                                            <div
                                                className={
                                                    allComments[`${comment.comment_id}`]?.childToggles
                                                        ? 'toggle'
                                                        : 'unToggle'
                                                }
                                            >
                                                ▼
                                            </div>
                                            <span>답글 {comment?.child_comment?.length}개</span>
                                        </span>
                                    </ReplyCountBox>
                                ) : null}
                                {allComments[`${comment.comment_id}`]?.childToggles ? (
                                    <ChildCommentListBox>
                                        <LeftAreaBox />
                                        <ChildCommentList>
                                            {comment?.child_comment?.map((childComment) => {
                                                return (
                                                    <React.Fragment key={childComment.comment_id}>
                                                        <div style={{ display: 'flex', marginTop: '4.375em' }}>
                                                            <ProfileImg
                                                                path={
                                                                    childComment.strategy_type === 'local'
                                                                        ? fileBackUrl + childComment.img_path
                                                                        : childComment.img_path
                                                                }
                                                            ></ProfileImg>
                                                            {allComments[`${childComment.comment_id}`]?.modify_flag ? (
                                                                <Modify
                                                                    {...{
                                                                        parentId: comment.comment_id,
                                                                        comment: childComment,
                                                                        allComments,
                                                                        changeComment,
                                                                        modifyToggle,
                                                                        submitComment,
                                                                    }}
                                                                />
                                                            ) : (
                                                                <CommentContent
                                                                    {...{
                                                                        comment: childComment,
                                                                        replyToggle,
                                                                        modifyToggle,
                                                                        allComments,
                                                                        deletefirm,
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                        {allComments[`${childComment.comment_id}`]?.replyToggles ? (
                                                            <WriteReply
                                                                {...{
                                                                    parentId: comment.comment_id,
                                                                    comment: childComment,
                                                                    allComments,
                                                                    changeComment,
                                                                    submitComment,
                                                                    replyToggle,
                                                                }}
                                                            />
                                                        ) : null}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </ChildCommentList>
                                    </ChildCommentListBox>
                                ) : null}
                                <div style={{ width: '100%', display: 'flex' }}>
                                    <LeftAreaBox />
                                    <Boundary />
                                </div>
                            </React.Fragment>
                        );
                    })}
                </CommentList>
            </CommentListBox>
        </Wrapper>
    );
};

export default Comments;