import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import { useAppSelector } from '../../store/hooks';
import React, { useEffect, useState } from 'react';
import { fileBackUrl } from '../../config';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getDifferenceTime } from '../../util';
import { message } from 'antd';
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
const Comment = styled.div`
    width: 100%;
    display: flex;
    margin-top: 4.375em;
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

const ContentBox = styled.div`
    width: 100%;
    margin-left: 0.313em;
`;
const WriterInfo = styled.div`
    span:first-child {
        font-weight: bold;
        text-decoration: underline;
    }
    span:last-child {
        color: rgb(160, 160, 160);
        margin-left: 0.313em;
    }
`;
const Content = styled.div`
    width: 100%;
    margin-top: 0.938em;
    span {
        font-size: 0.938rem;
    }
`;

const Boundary = styled.div`
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(217, 217, 217);
    padding: 0.625em 0px;
`;

const ReplyOption = styled.div`
    width: 100%;
    margin-top: 1.25em;
    display: flex;
    span {
        font-size: 0.75em;
        color: rgb(160, 160, 160);
        cursor: pointer;
    }
    span:nth-child(2) {
        margin-left: auto;
        margin-right: 10px;
    }
`;

const Reply = styled.div`
    width: 100%;
`;

const ReplyContent = styled.div`
    width: 100%;
    display: flex;
    margin-top: 0.938em;
`;

const ReplyButtonBox = styled.div`
    width: 100%;
    text-align: right;
    margin-top: 1.25em;
    button:first-child {
        border: none;
        background-color: rgb(18, 184, 134);
        color: white;
        padding: 0.5em 0.813em;
        border-radius: 0.313rem;
        font-weight: bold;
        margin-right: 0.625em;
        cursor: pointer;
    }
    button:last-child {
        border: none;
        padding: 0.5em 0.813em;
        border-radius: 0.313rem;
        font-weight: bold;
        cursor: pointer;
    }
`;

const ReplyCountBox = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1.25em;
    span {
        font-size: 0.875rem;
        margin-left: 0.313em;
        display: flex;
        align-items: center;
    }
`;
const ChildCommentListBox = styled.div`
    width: 100%;
    display: flex;
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
    const { userId } = useAppSelector((state) => state.user);
    const [content, setContent] = useState('');
    const [childComments, setChildComments] = useState<{ [key: string]: { replyToggles: boolean; content: string } }>(
        {},
    );

    const changeMainComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.currentTarget.value);
    };

    const submitComment = (
        comment_id: number | null,
        modify_flag: boolean,
        parent_id: number | null,
        parent_user_id: string | null,
    ) => {
        if (!comment_id) {
            submit(comment_id, content, modify_flag, parent_id, parent_user_id);
        } else {
            const childContent = childComments[`${comment_id}`].content;
            if (!childContent.trim()) {
                message.error('내용은 필수입니다.');
                return;
            }
            const checkModifyId = modify_flag ? comment_id : null;
            submit(checkModifyId, childContent, modify_flag, parent_id, parent_user_id);
        }
    };

    const replyToggle = (commentId: number) => {
        setChildComments((prev) => {
            const findComment = prev[`${commentId}`];
            const newToggle = { content: '', replyToggles: !findComment.replyToggles };
            return {
                ...prev,
                [`${commentId}`]: newToggle,
            };
        });
    };

    const changeChildComment = (e: React.ChangeEvent<HTMLTextAreaElement>, commentId: number) => {
        setChildComments((prev) => {
            const findComment = prev[`${commentId}`];
            const newContent = { ...findComment, content: e.currentTarget.value };
            return {
                ...prev,
                [`${commentId}`]: newContent,
            };
        });
    };

    useEffect(() => {
        if (detailBoard?.comments) {
            for (const comment of detailBoard.comments) {
                setChildComments((prev) => {
                    const childComment = { replyToggles: false, content: '' };
                    return {
                        ...prev,
                        [`${comment.comment_id}`]: childComment,
                    };
                });
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
                    <button onClick={() => submitComment(null, false, null, null)}>댓글 작성</button>
                </CommentSubmitBox>
            </CommentWriteBox>
            <CommentListBox>
                <CommentList>
                    {detailBoard?.comments?.map((comment) => {
                        return (
                            <React.Fragment key={comment.comment_id}>
                                <Comment>
                                    <ProfileImg
                                        path={
                                            comment.strategy_type === 'local'
                                                ? fileBackUrl + comment.img_path
                                                : comment.img_path
                                        }
                                    ></ProfileImg>
                                    <ContentBox>
                                        <WriterInfo>
                                            <span>{comment.user_id}</span>
                                            <span>{getDifferenceTime(comment.createdAt)}</span>
                                        </WriterInfo>
                                        <Content>
                                            <span>{comment.content}</span>
                                        </Content>
                                        <ReplyOption>
                                            {userId !== comment.user_id ? (
                                                <span onClick={() => replyToggle(comment.comment_id)}>
                                                    {childComments[`${comment.comment_id}`]?.replyToggles
                                                        ? '숨기기'
                                                        : '답글'}
                                                </span>
                                            ) : null}
                                            {userId === comment.user_id ? <span>수정</span> : null}
                                            {userId === comment.user_id ? <span>삭제</span> : null}
                                        </ReplyOption>
                                    </ContentBox>
                                </Comment>
                                {childComments[`${comment.comment_id}`]?.replyToggles ? (
                                    <Reply>
                                        <ReplyContent>
                                            <LeftAreaBox />
                                            <TextArea
                                                placeholder="답글을 작성하세요"
                                                autoSize={{ minRows: 2, maxRows: 3 }}
                                                value={childComments[`${comment.comment_id}`]?.content}
                                                onChange={(e) => changeChildComment(e, comment.comment_id)}
                                            />
                                        </ReplyContent>
                                        <ReplyButtonBox>
                                            <button
                                                onClick={() =>
                                                    submitComment(
                                                        comment.comment_id,
                                                        false,
                                                        comment.comment_id,
                                                        comment.user_id,
                                                    )
                                                }
                                            >
                                                답글 작성
                                            </button>
                                            <button onClick={() => replyToggle(comment.comment_id)}>취소</button>
                                        </ReplyButtonBox>
                                    </Reply>
                                ) : null}
                                <ReplyCountBox>
                                    <LeftAreaBox />
                                    <span>
                                        <div className="toggleArrow">▼&nbsp;</div> 답글 1개
                                    </span>
                                </ReplyCountBox>
                                <ChildCommentListBox>
                                    <LeftAreaBox />
                                    <ChildCommentList>
                                        {comment.child_comment.map((childComment) => {
                                            return (
                                                <React.Fragment key={childComment.comment_id}>
                                                    <Comment style={{ marginTop: '2em' }}>
                                                        <ProfileImg
                                                            path={
                                                                childComment.strategy_type === 'local'
                                                                    ? fileBackUrl + childComment.img_path
                                                                    : childComment.img_path
                                                            }
                                                        ></ProfileImg>
                                                        <ContentBox>
                                                            <WriterInfo>
                                                                <span>{childComment.user_id}</span>
                                                                <span>{getDifferenceTime(childComment.createdAt)}</span>
                                                            </WriterInfo>
                                                            <Content>
                                                                <span>{childComment.content}</span>
                                                            </Content>
                                                            <ReplyOption>
                                                                {userId !== childComment.user_id ? (
                                                                    <span
                                                                        onClick={() =>
                                                                            replyToggle(childComment.comment_id)
                                                                        }
                                                                    >
                                                                        {childComments[`${comment.comment_id}`]
                                                                            ?.replyToggles
                                                                            ? '숨기기'
                                                                            : '답글'}
                                                                    </span>
                                                                ) : null}
                                                                {userId === childComment.user_id ? (
                                                                    <span>수정</span>
                                                                ) : null}
                                                                {userId === childComment.user_id ? (
                                                                    <span>삭제</span>
                                                                ) : null}
                                                            </ReplyOption>
                                                        </ContentBox>
                                                    </Comment>
                                                </React.Fragment>
                                            );
                                        })}
                                    </ChildCommentList>
                                </ChildCommentListBox>

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
