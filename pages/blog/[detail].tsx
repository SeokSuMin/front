import { CommentOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const TopMenuBox = styled.div`
    width: 98%;
    padding-bottom: 0.625em;
    margin-top: 2.188em;
    text-align: right;
    button {
        margin-left: 0.357em;
        border: none;
        border-radius: 0.357em;
        padding: 0.5em 0.714em;
        font-size: 0.875rem;
        font-weight: bold;
        cursor: pointer;
    }
    button:active {
        background-color: rgb(210, 210, 210);
    }
`;

const BoardBox = styled.div`
    width: 98%;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 0.63em;
`;

const TitleBox = styled.div`
    padding: 1.563em 0.938em;
    h1 {
        font-size: 2.813rem;
        line-height: 3.5rem;
        font-weight: bold;
    }
    .ant-tag {
        border-radius: 0.313em;
        color: gray;
        background-color: rgb(245, 245, 245);
        border: none;
        font-size: 0.938rem;
        padding: 5px;
        margin-top: 1.25em;
    }
`;
const WriterInfoBox = styled.div`
    margin-top: 1.25em;
    display: flex;
    align-items: center;
    span:first-child {
        font-size: 1.25rem;
    }
    span:nth-child(2) {
        margin: 0 0.625em;
    }
    span:nth-child(3) {
        font-size: 0.938em;
    }
    .comment {
        display: flex;
        align-items: center;
        margin-left: auto;
        cursor: pointer;
        svg {
            margin-right: 0.313em;
        }
    }
`;
const ContentBox = styled.div``;

const CommunicationBox = styled.div``;
const PrevNextBlogBox = styled.div``;
const CommentWriteBox = styled.div``;
const CommentListBox = styled.div``;

const Detail = () => {
    return (
        <Wrapper>
            <TopMenuBox>
                <button>이전글</button>
                <button>다음글</button>
                <button>목록</button>
            </TopMenuBox>
            <BoardBox>
                <TitleBox>
                    <h1>스타트업 4년을 마무리 하며, 스타트업 4년을 마무리 하며 </h1>
                    <WriterInfoBox>
                        <span>ice man [블로그 관리자]</span>
                        <span>·</span>
                        <span>2022-07-29</span>
                        <span className="comment">
                            <CommentOutlined /> 댓글 (6)
                        </span>
                    </WriterInfoBox>
                    <Tag>여행</Tag>
                </TitleBox>
            </BoardBox>
        </Wrapper>
    );
};

export default Detail;
