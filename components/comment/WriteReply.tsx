import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';
import { IBoardComment } from '../../reducer/blog';

const Wrapper = styled.div`
    width: 100%;
`;

const LeftAreaBox = styled.div`
    width: 3.012em;
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

interface IWriteReplyProps {
    parentId?: number;
    comment: IBoardComment;
    allComments: { [key: string]: { replyToggles: boolean; childToggles?: boolean; content: string } };
    changeComment: (e: React.ChangeEvent<HTMLTextAreaElement>, commentId: number) => void;
    submitComment: (
        comment_id: number | null,
        modify_flag: boolean,
        parent_id: number | null,
        parent_user_id: string | null,
    ) => void;
    replyToggle: (commentId: number) => void;
}

const WriteReply = ({
    parentId,
    comment,
    allComments,
    changeComment,
    submitComment,
    replyToggle,
}: IWriteReplyProps) => {
    return (
        <Wrapper>
            <Reply>
                <ReplyContent>
                    <LeftAreaBox />
                    <TextArea
                        placeholder="답글을 작성하세요"
                        autoSize={{ minRows: 2, maxRows: 3 }}
                        value={allComments[`${comment.comment_id}`]?.content}
                        onChange={(e) => changeComment(e, comment.comment_id)}
                    />
                </ReplyContent>
                <ReplyButtonBox>
                    <button
                        onClick={() =>
                            submitComment(
                                comment.comment_id,
                                false,
                                parentId ? parentId : comment.comment_id,
                                comment.user_id,
                            )
                        }
                    >
                        답글 작성
                    </button>
                    <button onClick={() => replyToggle(comment.comment_id)}>취소</button>
                </ReplyButtonBox>
            </Reply>
        </Wrapper>
    );
};

export default WriteReply;
