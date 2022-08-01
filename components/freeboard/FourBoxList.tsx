import { Tag } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
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
    align-content: space-between;
`;

const Card = styled(motion.div)`
    width: 22%;
    border: 0.063rem solid rgb(230, 230, 230);
    max-height: 42vh;
    min-height: 21rem;
    margin-top: 1.875rem;
    &:first-child,
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
        margin-top: 0px;
    }
`;

const CardContent = styled(motion.div)`
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: white;
    transform-origin: center right;
`;

const ThumImg = styled.div`
    width: 100%;
    height: 65%;
    img {
        width: 100%;
        height: 100%;
    }
    //
`;
const Content = styled.div`
    width: 100%;
    height: 35%;
    padding: 0.438em 0.63em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span:first-child {
        border-radius: 0.313em;
        background-color: rgb(245, 245, 245);
        border: none;
    }
    h2 {
        width: 100%;
        font-size: 0.813rem;
        font-weight: bold;
        line-height: 1.2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
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
    font-size: 13px;
`;

const ProfileImg = styled.div`
    width: 1.9rem;
    height: 1.9rem;
    background-image: url('/profile.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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
    const router = useRouter();
    const moveDetailPage = () => {
        router.push(`/blog/${1}`);
    };

    return (
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            {viewType === 1 && !leaving ? (
                <CardBox variants={fourBox} initial="hidden" animate="visible" exit="exit">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
                        return (
                            <Card key={v} variants={fourBoxItem}>
                                <CardContent
                                    onClick={moveDetailPage}
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow: '0.313em 0.313em 0.313em rgb(230, 230, 230)',
                                    }}
                                    transition={{ type: 'tween', duration: 0.2 }}
                                >
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
