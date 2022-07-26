import { Tag } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

interface IFourBoxListProps {
    viewType: number;
    leaving: boolean;
    toggleLeaving: () => void;
}

const CardBox = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Card = styled(motion.div)`
    width: 23%;
    border-radius: 0.313em;
`;

const CardContent = styled(motion.div)`
    width: 100%;
    height: 90%;
    cursor: pointer;
    background-color: white;
`;

const ThumImg = styled.div`
    width: 100%;
    height: 65%;
    img {
        border-radius: 0.313em;
        width: 100%;
        height: 100%;
    }
    //
`;
const Content = styled.div`
    width: 100%;
    height: 35%;
    padding: 0.63em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span:first-child {
        border-radius: 0.313em;
        background-color: rgb(245, 245, 245);
        border: none;
    }
    h2 {
        font-size: 0.875rem;
        font-weight: bold;
        line-height: 1.2rem;
    }
`;

const TagInfo = styled.div`
    width: 100%;
    padding-top: 0.313em;
    padding-bottom: 0.313em;
`;

const WriteInfo = styled.div`
    display: flex;
    align-items: center;
    color: gray;
    margin-bottom: 0.63em;
`;

const ProfileImg = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    background-image: url('/profile.png');
    background-position: center;
    background-size: contain;
    border-radius: 50%;
    margin-right: 0.55em;
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

const FourBoxList = ({ viewType, leaving, toggleLeaving }: IFourBoxListProps) => {
    return (
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            {viewType === 1 && !leaving ? (
                <CardBox variants={fourBox} initial="hidden" animate="visible" exit="exit">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
                        return (
                            <Card key={v} variants={fourBoxItem}>
                                <CardContent whileHover={{ scale: 1.03 }} transition={{ type: 'tween', duration: 0.2 }}>
                                    <ThumImg>
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    </ThumImg>
                                    <Content>
                                        <TagInfo>
                                            <Tag color="blue">여행</Tag>
                                        </TagInfo>
                                        <h2>안녕하세요 반갑습니다, 잘부탁 드립니다. 잘부탁 드립니다.</h2>
                                        <WriteInfo>
                                            <ProfileImg />
                                            <span>IceMan</span>
                                            <div style={{ width: '10%', textAlign: 'center' }}>|</div>
                                            <span>2022-07-25</span>
                                        </WriteInfo>
                                    </Content>
                                </CardContent>
                            </Card>
                        );
                    })}
                </CardBox>
            ) : null}
        </AnimatePresence>
    );
};

export default FourBoxList;
