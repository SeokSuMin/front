import { CommentOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import styled from 'styled-components';
import { getCategoriMenu, getDetailBoard } from '../../thunk/blogThunk';
import { checkUserlogin } from '../../thunk/userThunk';
import wrapper from '../../store/configStore';
import axios from 'axios';
import { useAppSelector } from '../../store/hooks';
import dayjs from 'dayjs';
import parse from 'html-react-parser';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
`;

const TopMenuBox = styled.div`
    width: 98%;
    padding-bottom: 0.625em;
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
    height: 100%;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 0.63em;
    padding: 1.563em 0.938em;
    /* overflow-x: auto; */
`;

const TitleBox = styled.div`
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
const Boundary = styled.div`
    width: 100%;
    border-bottom: 1px solid rgb(217, 217, 217);
    padding: 0.625em 0px;
`;
const ContentBox = styled.div`
    padding-top: 1.25em;
    overflow-x: auto;
`;
const Content = styled.div``;

const CommunicationBox = styled.div``;
const PrevNextBlogBox = styled.div``;
const CommentWriteBox = styled.div``;
const CommentListBox = styled.div``;

const DetailBoard = () => {
    const quillInlineStyle = `
        <style>
            h1 {
                font-size: 26px;
            }
            h2 {
                font-size: 19.5px;
            }
            h3 {
                font-size: 15.21px;
            }
            em {
                font-style : italic;
            }
            .ql-syntax {
                background-color: #23241f;
                color: #f8f8f2;
                overflow: visible;
                white-space: pre-wrap;
                margin-bottom: 5px;
                margin-top: 5px;
                padding: 5px 10px;
            }
        </style>
    `;
    const { detailBoard } = useAppSelector((state) => state.blog);

    return (
        <Wrapper>
            <TopMenuBox>
                <button>이전글</button>
                <button>다음글</button>
                <button>목록</button>
            </TopMenuBox>
            <BoardBox>
                <TitleBox>
                    <h1>{detailBoard?.title}</h1>
                    <WriterInfoBox>
                        <span>{detailBoard?.writer} [블로그 관리자]</span>
                        <span>·</span>
                        <span>{dayjs(detailBoard?.createdAt).format('YYYY-MM-DD')}</span>
                        <span className="comment">
                            <CommentOutlined /> 댓글 (6)
                        </span>
                    </WriterInfoBox>
                    <Tag>{detailBoard?.categori}</Tag>
                </TitleBox>
                <Boundary />
                <ContentBox>
                    <Content>{parse(detailBoard ? quillInlineStyle + detailBoard?.content : '')}</Content>
                </ContentBox>
            </BoardBox>
        </Wrapper>
    );
};

export default DetailBoard;

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async ({ req, resolvedUrl }) => {
        const boardId = resolvedUrl.split('/')[resolvedUrl.split('/').length - 1];
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        // 로그인 사용자 체크
        await dispatch(checkUserlogin());
        await dispatch(getCategoriMenu());
        await dispatch(getDetailBoard(boardId));

        return {
            props: {},
        };
    };
});
