import { List } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

interface IOneBoxListProps {
    viewType: number;
    leaving: boolean;
    toggleLeaving: () => void;
    openDetailInfo: (boardId: number | null) => void;
}

interface IColumn {
    key: number;
    no: number;
    title: string;
    writer: string;
    date: string;
    searchCount: number;
}

const oneBox = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            staggerChildren: 0.15,
            type: 'linear',
        },
    },
    exit: { y: -20, opacity: 0 },
};

const oneBoxItem = {
    hidden: { x: -10, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
    },
};

// 임시
const data: IColumn[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
    return {
        key: v,
        no: v,
        title: v + 'John Brown shark  Brown shark',
        writer: 'shark',
        date: '2022-07-21',
        searchCount: v + 1,
    };
});

const OneBoxList = ({ viewType, leaving, toggleLeaving, openDetailInfo }: IOneBoxListProps) => {
    return (
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            {viewType === 3 && !leaving ? (
                <motion.div variants={oneBox} initial="hidden" animate="visible" exit="exit">
                    <List
                        size="small"
                        itemLayout="vertical"
                        dataSource={data}
                        renderItem={(item) => (
                            <motion.div
                                variants={oneBoxItem}
                                style={{ marginBottom: '10px', borderBottom: '1px solid black' }}
                            >
                                <List.Item
                                    key={item.title}
                                    extra={
                                        <img
                                            style={{ width: '150px', height: '100px' }}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                    }
                                    style={{ padding: 0 }}
                                >
                                    <List.Item.Meta
                                        title={<a onClick={() => openDetailInfo(item.key)}>{item.title}</a>}
                                    />
                                </List.Item>
                            </motion.div>
                        )}
                    />
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default OneBoxList;
