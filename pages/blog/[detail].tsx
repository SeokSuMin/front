import { Tag } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    padding-right: 0.63em;
    display: flex;
    justify-content: center;
`;

const BoardBox = styled.div`
    margin-top: 1.875em;
    max-width: 62.5rem;
`;

const TitleBox = styled.div`
    h1 {
        font-size: 2.813rem;
        line-height: 3.2rem;
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
    span:first-child {
        font-size: 1.25rem;
    }
    span:nth-child(2) {
        margin: 0 0.625em;
    }
    span:nth-child(3) {
        font-size: 0.938em;
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
            <BoardBox>
                <TitleBox>
                    <h1>스타트업 4년을 마무리 하며</h1>
                    <WriterInfoBox>
                        <span>ice man</span>
                        <span>·</span>
                        <span>2022-07-29</span>
                    </WriterInfoBox>
                    <Tag>여행</Tag>
                </TitleBox>
            </BoardBox>
        </Wrapper>
    );
};

export default Detail;
