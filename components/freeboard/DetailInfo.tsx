import { AnimatePresence, motion, useScroll } from 'framer-motion';
import styled from 'styled-components';

const DetailInfoBox = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

const BoardInfo = styled(motion.div)`
    width: 500px;
    height: 500px;
    margin-top: -50px;
    border: 1px solid red;
    background-color: white;
    position: absolute;
`;

interface IDetailInfoProps {
    boardId: null | number;
    scrollY: number;
    openDetailInfo: (boardId: null | number) => void;
    detailViewExitComplate: () => void;
}

const DetailInfo = ({ boardId, scrollY, openDetailInfo, detailViewExitComplate }: IDetailInfoProps) => {
    console.log('scrollY', scrollY);
    return (
        <AnimatePresence initial={false} onExitComplete={detailViewExitComplate}>
            {boardId ? (
                <DetailInfoBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => openDetailInfo(null)}
                >
                    <BoardInfo
                        style={{
                            top: scrollY + 200,
                        }}
                    >
                        <h1>게시글</h1>
                    </BoardInfo>
                </DetailInfoBox>
            ) : null}
        </AnimatePresence>
    );
};

export default DetailInfo;
