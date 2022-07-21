import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { AnimatePresence, motion } from 'framer-motion';

interface IFourBoxListProps {
    viewType: number;
    leaving: boolean;
    toggleLeaving: () => void;
}

const fourBox = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.15,
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
            {viewType === 2 && !leaving ? (
                <motion.div variants={fourBox} initial="hidden" animate="visible" exit="exit">
                    <Row gutter={16}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
                            return (
                                <Col key={v} span={6}>
                                    <motion.div variants={fourBoxItem}>
                                        <Card
                                            style={{ marginBottom: '20px' }}
                                            hoverable
                                            bordered={false}
                                            cover={
                                                <img
                                                    style={{ height: '200px' }}
                                                    alt="example"
                                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                                />
                                            }
                                        >
                                            <Meta title="Europe Street beat" description="www.instagram.com" />
                                        </Card>
                                    </motion.div>
                                </Col>
                            );
                        })}
                    </Row>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default FourBoxList;
