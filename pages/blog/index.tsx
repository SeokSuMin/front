import { useState } from 'react';
import styled from 'styled-components';
import FourBoxList from '../../components/freeboard/FourBoxList';
import OneBoxList from '../../components/freeboard/OneBoxList';
import TopMenu from '../../components/freeboard/TopMenu';
import wrapper from '../../store/configStore';
import { CaretRightOutlined } from '@ant-design/icons';
import { motion, useScroll } from 'framer-motion';

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
    return async (context) => {
        return {
            props: {},
        };
    };
});
