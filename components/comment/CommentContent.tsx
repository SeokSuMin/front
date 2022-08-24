import styled from 'styled-components';
import { fileBackUrl } from '../../config';
import { IBoardComment } from '../../reducer/blog';
import { useAppSelector } from '../../store/hooks';
import { getDifferenceTime } from '../../util';

const Wrapper = styled.div`
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
    type: string;
    comment: IBoardComment;
    replyToggle: (type: string, commentId: number) => void;
    modifyToggle: (type: string, commentId: number) => void;
    allComments: { [key: string]: { replyToggles: boolean; childToggles?: boolean; content: string } };
}

const CommentContent = ({ type, comment, replyToggle, modifyToggle, allComments }: ICommentContentProps) => {
    const { userId } = useAppSelector((state) => state.user);
    return (
        <Wrapper>
            <Comment>
                <ProfileImg
                    path={comment.strategy_type === 'local' ? fileBackUrl + comment.img_path : comment.img_path}
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
                            <span onClick={() => replyToggle(type, comment.comment_id)}>
                                {allComments[`${comment.comment_id}`]?.replyToggles ? '숨기기' : '답글'}
                            </span>
                        ) : null}

                        {userId === comment.user_id ? (
                            <span className="modify" onClick={() => modifyToggle(type, comment.comment_id)}>
                                수정
                            </span>
                        ) : null}
                        {userId === comment.user_id ? <span className="delete">삭제</span> : null}
                    </ReplyOption>
                </ContentBox>
            </Comment>
        </Wrapper>
    );
};

export default CommentContent;
