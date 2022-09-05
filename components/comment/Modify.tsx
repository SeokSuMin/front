import { Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styled from 'styled-components';
import { fileBackUrl } from '../../config';
import { IComment } from '../../reducer/blog/comment';

const Wrapper = styled.div`
    width: 100%;
`;

const ModifyCommentBox = styled.div`
    margin-left: 0.313em;
`;

const ModifyComment = styled.div`
    width: 100%;
    display: flex;
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

interface IModifyProps {
    parentId: number | null;
    comment: IComment;
    modifyToggle: (commentId: number, content: string) => void;
    allComments: {
        [key: string]: { replyToggles: boolean; childToggles: boolean; content: string; modify_flag: boolean };
    };
    changeComment: (e: React.ChangeEvent<HTMLTextAreaElement>, commentId: number) => void;
    submitComment: (
        comment_id: number | null,
        modify_flag: boolean,
        parent_id: number | null,
        parent_user_id: string | null,
        content: string,
    ) => void;
}

const Modify = ({ parentId, comment, modifyToggle, allComments, changeComment, submitComment }: IModifyProps) => {
    return (
        <Wrapper>
            <ModifyCommentBox>
                <ModifyComment>
                    <TextArea
                        placeholder="댓글을 작성하세요"
                        autoSize={{ minRows: 3, maxRows: 4 }}
                        value={allComments[comment.comment_id as number].content}
                        onChange={(e) => changeComment(e, comment.comment_id as number)}
                    />
                </ModifyComment>
                <ReplyButtonBox>
                    <button
                        onClick={() =>
                            submitComment(
                                comment.comment_id,
                                true,
                                parentId,
                                parentId ? comment.parent_user_id : null,
                                '',
                            )
                        }
                    >
                        댓글 수정
                    </button>
                    <button onClick={() => modifyToggle(comment.comment_id as number, '')}>취소</button>
                </ReplyButtonBox>
            </ModifyCommentBox>
        </Wrapper>
    );
};

export default Modify;
