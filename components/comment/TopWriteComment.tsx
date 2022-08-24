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
    const { detailBoard } = useAppSelector((state) => state.blog);
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
                    <button onClick={submit}>댓글 작성</button>
                </CommentSubmitBox>
            </CommentWriteBox>
        </Wrapper>
    );
};

export default TopWriteComment;
