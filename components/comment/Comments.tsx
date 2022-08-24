import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import { useAppSelector } from '../../store/hooks';
import React, { useEffect, useState } from 'react';
import { fileBackUrl } from '../../config';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getDifferenceTime } from '../../util';
import { message } from 'antd';
import CommentContent from './CommentContent';
import WriteReply from './WriteReply';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const Wrapper = styled.div`
    width: 98%;
`;

const LeftAreaBox = styled.div`
    width: 3.012em;
`;

const CommentWriteBox = styled.div`
    width: 100%;
    margin-top: 50px;
`;

const CommentWriteTitle = styled.div`
    width: 100%;
    margin-bottom: 1.25em;
    span {
        font-size: 1rem;
        font-weight: bold;
    }
`;

const CommentWriteArea = styled.div`
    width: 100%;
`;

const CommentSubmitBox = styled.div`
    width: 100%;
    margin-top: 1.25em;
    text-align: right;
    button {
        border: none;
        background-color: rgb(18, 184, 134);
        color: white;
        padding: 0.5em 0.813em;
        border-radius: 0.313rem;
        font-weight: bold;
        cursor: pointer;
    }
    button:hover {
        background-color: rgb(32, 201, 151);
    }
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

interface ICommentsProps {
    submit: (
        comment_id: number,
        content: string,
        modify_flag: boolean,
        parent_id: number | null,
        parent_user_id: string | null,
    ) => void;
}

const Comments = ({ submit }: ICommentsProps) => {
    const { detailBoard } = useAppSelector((state) => state.blog);
    const [content, setContent] = useState('');
    const [mainComments, setMainComments] = useState<{
        [key: string]: { replyToggles: boolean; childToggles: boolean; content: string; modify_flag: boolean };
    }>({});
    const [childComments, setChildComments] = useState<{
        [key: string]: { replyToggles: boolean; content: string; modify_flag: boolean };
    }>({});

    const changeMainComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.currentTarget.value);
    };

    const replyToggle = (type: string, commentId: number) => {
        if (type === 'main') {
            setMainComments((prev) => {
                const findComment = prev[`${commentId}`];
                const newToggle = { ...findComment, content: '', replyToggles: !findComment.replyToggles };
                return {
                    ...prev,
                    [`${commentId}`]: newToggle,
                };
            });
        } else {
            setChildComments((prev) => {
                const findComment = prev[`${commentId}`];
                const newToggle = { ...findComment, content: '', replyToggles: !findComment.replyToggles };
                return {
                    ...prev,
                    [`${commentId}`]: newToggle,
                };
            });
        }
    };

    const toggleReplyList = (commentId: number) => {
        setMainComments((prev) => {
            const findComment = prev[`${commentId}`];
            const newToggle = { ...findComment, childToggles: !findComment.childToggles };
            return {
                ...prev,
                [`${commentId}`]: newToggle,
            };
        });
    };

    const modifyToggle = (type: string, commentId: number) => {
        if (type === 'main') {
            setMainComments((prev) => {
                const findComment = prev[`${commentId}`];
                const newToggle = { ...findComment, content: '', modify_flag: !findComment.modify_flag };
                return {
                    ...prev,
                    [`${commentId}`]: newToggle,
                };
            });
        } else {
            setChildComments((prev) => {
                const findComment = prev[`${commentId}`];
                const newToggle = { ...findComment, content: '', modify_flag: !findComment.modify_flag };
                return {
                    ...prev,
                    [`${commentId}`]: newToggle,
                };
            });
        }
    };

    const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>, type: string, commentId: number) => {
        if (type === 'main') {
            setMainComments((prev) => {
                const findComment = prev[`${commentId}`];
                const newContent = { ...findComment, content: e.currentTarget.value };
                return {
                    ...prev,
                    [`${commentId}`]: newContent,
                };
            });
        } else {
            setChildComments((prev) => {
                const findComment = prev[`${commentId}`];
                const newToggle = { ...findComment, content: e.currentTarget.value };
                return {
                    ...prev,
                    [`${commentId}`]: newToggle,
                };
            });
        }
    };

    const submitComment = (
        type: string,
        comment_id: number | null,
        modify_flag: boolean,
        parent_id: number | null,
        parent_user_id: string | null,
    ) => {
        if (!comment_id) {
            submit(comment_id, content, modify_flag, parent_id, parent_user_id);
        } else {
            const content =
                type === 'main' ? mainComments[`${comment_id}`].content : childComments[`${comment_id}`].content;
            if (!content.trim()) {
                message.error('내용은 필수입니다.');
                return;
            }
            const checkModifyId = modify_flag ? comment_id : null;
            submit(checkModifyId, content, modify_flag, parent_id, parent_user_id);
        }
    };

    useEffect(() => {
        if (detailBoard?.comments) {
            for (const comment of detailBoard.comments) {
                setMainComments((prev) => {
                    const mainComment = { replyToggles: false, content: '', childToggles: false, modify_flag: false };
                    return {
                        ...prev,
                        [`${comment.comment_id}`]: mainComment,
                    };
                });
                if (comment?.child_comment) {
                    for (const childComment of comment.child_comment) {
                        setChildComments((prev) => {
                            const cComment = { replyToggles: false, content: '', modify_flag: false };
                            return {
                                ...prev,
                                [`${childComment.comment_id}`]: cComment,
                            };
                        });
                    }
                }
            }
        }
    }, [detailBoard?.comments]);

    return (
        <Wrapper>
            <CommentWriteBox>
                <CommentWriteTitle>
                    <span>{detailBoard?.comments ? detailBoard.comments.length : 0}개의 댓글</span>
                </CommentWriteTitle>
                <CommentWriteArea>
                    <TextArea
                        placeholder="댓글을 작성하세요"
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        value={content}
                        onChange={changeMainComment}
                    />
                </CommentWriteArea>
                <CommentSubmitBox>
                    <button onClick={() => submitComment('main', null, false, null, null)}>댓글 작성</button>
                </CommentSubmitBox>
            </CommentWriteBox>
            <CommentListBox>
                <CommentList>
                    {detailBoard?.comments?.map((comment) => {
                        return (
                            <React.Fragment key={comment.comment_id}>
                                <CommentContent
                                    {...{ type: 'main', comment, replyToggle, modifyToggle, allComments: mainComments }}
                                />
                                {mainComments[`${comment.comment_id}`]?.replyToggles ? (
                                    <WriteReply
                                        {...{
                                            type: 'main',
                                            comment,
                                            allComments: mainComments,
                                            changeComment,
                                            submitComment,
                                            replyToggle,
                                        }}
                                    />
                                ) : null}
                                {comment?.child_comment ? (
                                    <ReplyCountBox>
                                        <LeftAreaBox />
                                        <span onClick={() => toggleReplyList(comment.comment_id)}>
                                            <div
                                                className={
                                                    mainComments[`${comment.comment_id}`]?.childToggles
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
                                {mainComments[`${comment.comment_id}`]?.childToggles ? (
                                    <ChildCommentListBox>
                                        <LeftAreaBox />
                                        <ChildCommentList>
                                            {comment?.child_comment?.map((childComment) => {
                                                return (
                                                    <React.Fragment key={childComment.comment_id}>
                                                        <CommentContent
                                                            {...{
                                                                type: 'child',
                                                                comment: childComment,
                                                                replyToggle,
                                                                modifyToggle,
                                                                allComments: childComments,
                                                            }}
                                                        />
                                                        {childComments[`${childComment.comment_id}`]?.replyToggles ? (
                                                            <WriteReply
                                                                {...{
                                                                    type: 'child',
                                                                    parentId: comment.comment_id,
                                                                    comment: childComment,
                                                                    allComments: childComments,
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
