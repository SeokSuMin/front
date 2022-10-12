import styled from 'styled-components';
import { IComment } from '../../reducer/blog/comment';
import { useAppSelector } from '../../store/hooks';
import { getDifferenceTime } from '../../util';

const Wrapper = styled.div`
    width: 100%;
    // margin-top: 4.375em;
`;

const Comment = styled.div`
    width: 100%;
    display: flex;
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
    span:nth-child(2) {
        font-size: 0.875rem;
        color: rgb(160, 160, 160);
        margin-left: 0.313em;
    }
    span:last-child {
        font-size: 0.875rem;
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

const ReplyOption = styled.div`
    width: 100%;
    margin-top: 1.25em;
    display: flex;
    span {
        font-size: 0.75em;
        color: rgb(160, 160, 160);
        cursor: pointer;
    }
    .modify {
        margin-left: auto;
        margin-right: 0.625em;
    }
    .delete {
        margin-right: 0.313em;
    }
`;

interface ICommentContentProps {
    comment: IComment;
    replyToggle: (commentId: number) => void;
    modifyToggle: (commentId: number, content: string) => void;
    allComments: {
        [key: string]: { replyToggles: boolean; childToggles: boolean; content: string; modify_flag: boolean };
    };
    deletefirm: (commentId: number, parentId: number | null) => void;
}

const CommentContent = ({ comment, replyToggle, modifyToggle, allComments, deletefirm }: ICommentContentProps) => {
    const { userId } = useAppSelector((state) => state.userInfo);
    return (
        <Wrapper>
            <Comment>
                {/* <ProfileImg
                    path={comment.strategy_type === 'local' ? fileBackUrl + comment.img_path : comment.img_path}
                ></ProfileImg> */}
                <ContentBox>
                    <WriterInfo>
                        <span>
                            {comment.strategy_type === 'local' ? comment.user_id : comment.user_id?.split('_')[1]}
                        </span>
                        <span>{getDifferenceTime(comment.createdAt as string)}</span>
                        <span>{comment.modify_flag ? ' (수정 됨)' : ''}</span>
                    </WriterInfo>
                    <Content>
                        <div style={{ lineHeight: '1.250em' }}>
                            {comment.parent_user_id ? (
                                <span style={{ color: 'rgb(6, 95, 212)' }}>
                                    @
                                    {comment.parent_user_id.includes('_')
                                        ? comment.parent_user_id?.split('_')[1]
                                        : comment.parent_user_id}
                                    &nbsp;&nbsp;
                                </span>
                            ) : null}
                            {comment.content.split('\n').map((line, i) => {
                                if (line.trim()) {
                                    return (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    );
                                }
                            })}
                        </div>
                    </Content>
                    <ReplyOption>
                        {userId !== comment.user_id ? (
                            <span onClick={() => replyToggle(comment.comment_id as number)}>
                                {allComments[`${comment.comment_id as number}`]?.replyToggles ? '숨기기' : '답글'}
                            </span>
                        ) : null}

                        {userId === comment.user_id ? (
                            <span
                                className="modify"
                                onClick={() => modifyToggle(comment.comment_id as number, comment.content)}
                            >
                                수정
                            </span>
                        ) : null}
                        {userId === comment.user_id ? (
                            <span
                                className="delete"
                                onClick={() => deletefirm(comment.comment_id as number, comment.parent_id)}
                            >
                                삭제
                            </span>
                        ) : null}
                    </ReplyOption>
                </ContentBox>
            </Comment>
        </Wrapper>
    );
};

export default CommentContent;
