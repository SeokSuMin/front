import { Tag } from 'antd';
import styled from 'styled-components';
import { fileBackUrl } from '../../config';
import { IBoardComment } from '../../reducer/blog';
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
        color: rgb(160, 160, 160);
        margin-left: 0.313em;
    }
    span:last-child {
        font-size: 0.75rem;
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
    comment: IBoardComment;
    replyToggle: (commentId: number) => void;
    modifyToggle: (commentId: number, content: string) => void;
    allComments: {
        [key: string]: { replyToggles: boolean; childToggles: boolean; content: string; modify_flag: boolean };
    };
    deletefirm: (commentId: number, parentId: number) => void;
}

const CommentContent = ({ comment, replyToggle, modifyToggle, allComments, deletefirm }: ICommentContentProps) => {
    const { userId } = useAppSelector((state) => state.user);
    return (
        <Wrapper>
            <Comment>
                {/* <ProfileImg
                    path={comment.strategy_type === 'local' ? fileBackUrl + comment.img_path : comment.img_path}
                ></ProfileImg> */}
                <ContentBox>
                    <WriterInfo>
                        <span>{comment.user_id}</span>
                        <span>{getDifferenceTime(comment.createdAt)}</span>
                        <span>{comment.modify_flag ? ' (수정 됨)' : ''}</span>
                    </WriterInfo>
                    <Content>
                        <div>
                            {comment.parent_user_id ? <Tag color="#2db7f5">{comment.parent_user_id}</Tag> : null}
                            {comment.content.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </div>
                    </Content>
                    <ReplyOption>
                        {userId !== comment.user_id ? (
                            <span onClick={() => replyToggle(comment.comment_id)}>
                                {allComments[`${comment.comment_id}`]?.replyToggles ? '숨기기' : '답글'}
                            </span>
                        ) : null}

                        {userId === comment.user_id ? (
                            <span className="modify" onClick={() => modifyToggle(comment.comment_id, comment.content)}>
                                수정
                            </span>
                        ) : null}
                        {userId === comment.user_id ? (
                            <span className="delete" onClick={() => deletefirm(comment.comment_id, comment.parent_id)}>
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
