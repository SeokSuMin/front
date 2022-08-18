import { useRef, useState } from 'react';
import styled from 'styled-components';
import FourBoxList from '../../components/freeboard/FourBoxList';
import OneBoxList from '../../components/freeboard/OneBoxList';
import TopMenu from '../../components/freeboard/TopMenu';
import wrapper from '../../store/configStore';
import { CaretRightOutlined } from '@ant-design/icons';
import { motion, useScroll } from 'framer-motion';
import axios from 'axios';
import { checkUserlogin } from '../../thunk/userThunk';
import { getCategoriMenu } from '../../thunk/blogThunk';
import Paging from '../../components/blog/Paging';
import { useQuery } from 'react-query';
import { BackTop, message, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoardList } from '../../util';
import { goPage, IBoardData, initTotalCount } from '../../reducer/blog';

const Wrapper = styled.div`
    width: 100%;
    .ant-spin-spinning {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ant-spin-spinning div {
        margin-bottom: 2.324em;
    }
`;

const ContentBox = styled.div`
    width: 100%;
    padding-left: 1.875em;
    position: relative;
`;

const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
};

const Home = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const {
        paging: { page, countList },
    } = useAppSelector((state) => state.blog);
    const dispath = useAppDispatch();
    const [viewType, setViewType] = useState(1);
    const [leaving, setLeaving] = useState(false);
    const { isLoading, isError, data, error } = useQuery(
        ['boardList', page, countList],
        () => getBoardList(page, countList),
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                dispath(initTotalCount(data.totalCount));
                dispath(goPage());
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            },
            onError: (err: Error) => {
                message.error(err.message);
            },
        },
    );

    const changeListView = (type: number) => {
        if (type === viewType) {
            return;
        }
        if (leaving) {
            return;
        }
        setViewType(type);
        setLeaving(true);
    };

    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };

    return (
        <Wrapper>
            {isLoading ? (
                <Spin tip="Loading..." />
            ) : (
                <ContentBox>
                    <TopMenu {...{ viewType, changeListView, scrollRef }} />
                    <FourBoxList {...{ viewType, leaving, toggleLeaving, boardList: data?.boardList }} />
                    <OneBoxList {...{ viewType, leaving, toggleLeaving }} />
                    <Paging />
                    <BackTop>
                        <div style={style}>UP</div>
                    </BackTop>
                </ContentBox>
            )}
        </Wrapper>
    );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async ({ req }) => {
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        // 로그인 사용자 체크
        await dispatch(checkUserlogin());
        await dispatch(getCategoriMenu());
        //  await dispatch(getBoardList());
        return {
            props: {},
        };
    };
});
