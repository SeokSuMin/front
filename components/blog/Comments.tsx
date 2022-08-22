import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';
import { useAppSelector } from '../../store/hooks';
import { useState } from 'react';
import { fileBackUrl } from '../../config';
import dayjs from 'dayjs';

const Wrapper = styled.div`
    width: 98%;
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
    // ${(props) => props.path}
    // http://localhost:3006/shark/1661161148886rkJggg==.png
    background-image: url('http://localhost:3006/shark/1661161148886rkJggg==.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin-right: 0.55em;
`;

const ContentBox = styled.div`
    width: 100%;
    margin-left: 5px;
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
    const [word, setWord] = useState('');
    const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWord(e.currentTarget.value);
    };

    const submitComment = (
        comment_id: number | null,
        modify_flag: boolean,
        parent_id: number | null,
        parent_user_id: string | null,
    ) => {
        const content = word;
        submit(comment_id, content, modify_flag, parent_id, parent_user_id);
    };

    return (
        <Wrapper>
            <CommentWriteBox>
                <CommentWriteTitle>
                    <span>{detailBoard?.comments.length}개의 댓글</span>
                </CommentWriteTitle>
                <CommentWriteArea>
                    <TextArea
                        placeholder="댓글을 작성하세요"
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        value={word}
                        onChange={changeComment}
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
                            <Comment key={comment.comment_id}>
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
                                        <span>{dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                                    </WriterInfo>
                                    <Content>
                                        <span>{comment.content}</span>
                                    </Content>
                                </ContentBox>
                            </Comment>
                        );
                    })}
                </CommentList>
            </CommentListBox>
        </Wrapper>
    );
};

export default Comments;
