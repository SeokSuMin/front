import { useRouter } from 'next/router';
import styled from 'styled-components';
import wrapper from '../../store/configStore';
import { useState } from 'react';
import TopMenu from '../../components/freeboard/TopMenu';
import BasicList from '../../components/freeboard/BasicList';
import FourBoxList from '../../components/freeboard/FourBoxList';
import OneBoxList from '../../components/freeboard/OneBoxList';
import SearchBox from '../../components/freeboard/SearchBox';

const Wrapper = styled.div`
    width: 100%;
`;

const BoardBox = styled.div`
    width: 800px;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
`;

const Freeboard = () => {
    const router = useRouter();
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
            <TopMenu viewType={viewType} changeListView={changeListView} />
            <BoardBox>
                <BasicList viewType={viewType} leaving={leaving} toggleLeaving={toggleLeaving} />
                <FourBoxList viewType={viewType} leaving={leaving} toggleLeaving={toggleLeaving} />
                <OneBoxList viewType={viewType} leaving={leaving} toggleLeaving={toggleLeaving} />
            </BoardBox>
            <SearchBox />
        </Wrapper>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async (context) => {
        return {
            props: {},
        };
    };
});

export default Freeboard;
