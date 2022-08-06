import { useState } from 'react';
import styled from 'styled-components';
import FourBoxList from '../../components/freeboard/FourBoxList';
import OneBoxList from '../../components/freeboard/OneBoxList';
import TopMenu from '../../components/freeboard/TopMenu';
import wrapper from '../../store/configStore';
import { CaretRightOutlined } from '@ant-design/icons';
import { motion, useScroll } from 'framer-motion';
import axios from 'axios';
import { checkUserlogin } from '../../thunk/userThunk';

const Wrapper = styled.div`
    width: 100%;
`;

const ContentBox = styled.div`
    width: 100%;
    padding-left: 1.875em;
    position: relative;
`;

const Content = styled.div`
    width: 100%;
    /* border-top: 1px solid rgb(217, 217, 217); */
    //background-color: rgb(245, 245, 245);
`;

const Home = () => {
    const [viewType, setViewType] = useState(1);
    const [leaving, setLeaving] = useState(false);

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
            <ContentBox>
                <TopMenu {...{ viewType, changeListView }} />
                <FourBoxList {...{ viewType, leaving, toggleLeaving }} />
                <OneBoxList {...{ viewType, leaving, toggleLeaving }} />
            </ContentBox>
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
        return {
            props: {},
        };
    };
});
