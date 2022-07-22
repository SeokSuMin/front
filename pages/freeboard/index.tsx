import { useRouter } from 'next/router';
import styled from 'styled-components';
import wrapper from '../../store/configStore';
import { useEffect, useState } from 'react';
import TopMenu from '../../components/freeboard/TopMenu';
import BasicList from '../../components/freeboard/BasicList';
import FourBoxList from '../../components/freeboard/FourBoxList';
import OneBoxList from '../../components/freeboard/OneBoxList';
import SearchBox from '../../components/freeboard/SearchBox';
import Progress from '../../components/animation/Progress';
import { useScroll } from 'framer-motion';
import DetailInfo from '../../components/freeboard/DetailInfo';

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
    const [boardId, setBoardId] = useState<number | null>(Number(router?.query?.boardId) || null);
    const { scrollY, scrollYProgress } = useScroll();
    const windowScrollY = typeof window !== 'undefined' ? window.screenY : 0;

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

    const openDetailInfo = (boardId: number | null) => {
        if (boardId) {
            router.push(`/freeboard/?boardId=${boardId}`, undefined, { shallow: true });
        }
        setBoardId(boardId);
    };

    const detailViewExitComplate = () => {
        router.push('/freeboard/', undefined, { shallow: true });
    };

    console.log('windowScrollY', windowScrollY);

    return (
        <Wrapper>
            <Progress scrollYProgress={scrollYProgress} />
            <TopMenu viewType={viewType} changeListView={changeListView} />
            <BoardBox>
                <BasicList
                    viewType={viewType}
                    leaving={leaving}
                    toggleLeaving={toggleLeaving}
                    openDetailInfo={openDetailInfo}
                />
                <FourBoxList
                    viewType={viewType}
                    leaving={leaving}
                    toggleLeaving={toggleLeaving}
                    openDetailInfo={openDetailInfo}
                />
                <OneBoxList
                    viewType={viewType}
                    leaving={leaving}
                    toggleLeaving={toggleLeaving}
                    openDetailInfo={openDetailInfo}
                />
            </BoardBox>
            <SearchBox />
            <DetailInfo
                boardId={boardId}
                scrollY={boardId && scrollY.get() === 0 ? windowScrollY : scrollY.get()}
                openDetailInfo={openDetailInfo}
                detailViewExitComplate={detailViewExitComplate}
            />
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
