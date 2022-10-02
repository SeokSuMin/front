import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';

const Wrapper = styled.div`
    width: 100%;
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
    textarea {
        padding: 0.625em;
    }
`;

const CommentSubmitBox = styled.div`
    width: 100%;
    margin-top: 1.25em;
    text-align: right;
    button {
        border: none;
        background-color: rgb(30, 59, 72);
        color: white;
        padding: 0.5em 0.813em;
        border-radius: 0.313rem;
        font-weight: bold;
        cursor: pointer;
    }
    button:hover {
        background-color: rgb(99, 124, 139);
    }
`;

interface ITopWriteCommentProps {
    submitComment: (
        comment_id: number | null,
        modify_flag: boolean,
        parent_id: number | null,
        parent_user_id: string | null,
        content: string,
    ) => void;
}

const TopWriteComment = ({ submitComment }: ITopWriteCommentProps) => {
    const { comments, loading } = useAppSelector((state) => state.comment);
    const { userId } = useAppSelector((state) => state.userInfo);
    const [content, setContent] = useState('');
    const changeMainComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.currentTarget.value);
    };

    const submit = () => {
        submitComment(null, false, null, null, content);
        setContent('');
    };
    return (
        <Wrapper>
            <CommentWriteBox>
                <CommentWriteTitle>
                    <span>{comments ? comments.length : 0}개의 댓글</span>
                </CommentWriteTitle>
                <CommentWriteArea>
                    <TextArea
                        disabled={!userId}
                        placeholder={userId ? '댓글을 작성하세요' : '로그인후 작성하실 수 있습니다.'}
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        value={content}
                        onChange={changeMainComment}
                    />
                </CommentWriteArea>
                <CommentSubmitBox>
                    <button disabled={!userId || loading} onClick={submit}>
                        댓글 작성
                    </button>
                </CommentSubmitBox>
            </CommentWriteBox>
        </Wrapper>
    );
};

export default TopWriteComment;
