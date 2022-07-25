import { Col, Row, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

interface IFourBoxListProps {
    viewType: number;
    leaving: boolean;
    toggleLeaving: () => void;
    openDetailInfo: (boardId: number | null) => void;
}

const CardBox = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Card = styled.div`
    width: 22%;

    border: 1px solid rgb(217, 217, 217);
    border-radius: 5px;
    margin-bottom: 20px;
`;

const CardContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
`;

const ThumImg = styled.div`
    width: 100%;
    height: 65%;
    img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
    }
    //
`;
const Content = styled.div`
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span:first-child {
        border-radius: 5px;
        background-color: rgb(245, 245, 245);
        border: none;
    }
    h2 {
        font-size: 15px;
        font-weight: bold;
        line-height: 20px;
    }
`;

const TagInfo = styled.div`
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const WriteInfo = styled.div`
    display: flex;
    align-items: center;
    color: gray;
`;

const ProfileImg = styled.div`
    width: 40px;
    height: 40px;
    background-image: url('/profile.png');
    background-position: center;
    background-size: contain;
    border-radius: 50%;
    margin-right: 5px;
`;

const fourBox = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            type: 'linear',
        },
    },
    exit: { y: -20, opacity: 0 },
};

const fourBoxItem = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const FourBoxList = ({ viewType, leaving, toggleLeaving, openDetailInfo }: IFourBoxListProps) => {
    return (
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            {viewType === 1 && !leaving ? (
                <CardBox variants={fourBox} initial="hidden" animate="visible" exit="exit">
                    <Card>
                        <CardContent>
                            <ThumImg>
                                <img alt="example" src="/banner1.png" />
                            </ThumImg>
                            <Content>
                                <TagInfo>
                                    <Tag color="blue">여행</Tag>
                                </TagInfo>
                                <h2>안녕하세요 반갑습니다, 잘부탁 드립니다. 잘부탁 드립니다.</h2>
                                <WriteInfo>
                                    <ProfileImg />
                                    <span>IceMan</span>
                                    <span> | </span>
                                    <span>2022-07-25</span>
                                </WriteInfo>
                            </Content>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardContent></CardContent>
                    </Card>
                </CardBox>
            ) : null}
        </AnimatePresence>
    );
};

export default FourBoxList;
