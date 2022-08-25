import { MessageOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import path from 'path';
import styled from 'styled-components';
import { fileBackUrl } from '../../config';
import { IBoardData } from '../../reducer/blog';
import { useAppSelector } from '../../store/hooks';

const Content = styled.div`
    margin-top: 2em;
    margin-left: 3.2em;
    font-size: 0.938rem;
    font-weight: bold;
`;

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

interface IOneBoxListProps {
    leaving: boolean;
    toggleLeaving: () => void;
    boardList: IBoardData[];
}

const OneBoxList = ({ leaving, toggleLeaving, boardList }: IOneBoxListProps) => {
    const router = useRouter();
    const { viewType } = useAppSelector((state) => state.blog);
    const moveDetailPage = (boardId: string) => {
        router.push(`/blog/${boardId}`);
    };

    return (
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            {viewType === 2 && !leaving ? (
                <motion.div variants={oneBox} initial="hidden" animate="visible" exit="exit">
                    <List
                        size="small"
                        itemLayout="vertical"
                        dataSource={boardList}
                        renderItem={(item) => (
                            <motion.div
                                variants={oneBoxItem}
                                style={{ marginBottom: '10px', borderBottom: '1px solid black' }}
                            >
                                <List.Item
                                    key={item.title}
                                    extra={
                                        <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => moveDetailPage(item.board_id)}
                                        >
                                            {item.board_files?.find((file) => path.extname(file.name) === '.png') ? (
                                                <img
                                                    style={{ width: '8.5rem', height: '8.5rem' }}
                                                    alt="example"
                                                    src={`${fileBackUrl}${item.board_id}/${
                                                        item.board_files.find(
                                                            (file) => path.extname(file.name) === '.png',
                                                        ).name
                                                    }`}
                                                />
                                            ) : (
                                                <img
                                                    style={{ width: '8.5rem', height: '8.5rem' }}
                                                    alt="example"
                                                    src="no-image.JPG"
                                                />
                                            )}
                                        </span>
                                    }
                                    style={{ padding: 0 }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={'/profile.png'} />}
                                        title={<span>{item.writer}</span>}
                                        description={
                                            <>
                                                <span>{dayjs(item.createdAt).format('YYYY MM DD HH:mm')}</span>
                                                <span style={{ marginLeft: '1em' }}>
                                                    <MessageOutlined /> (6)
                                                </span>
                                            </>
                                        }
                                    />
                                    <Content>
                                        <a onClick={() => moveDetailPage(item.board_id)}>{item.title}</a>
                                    </Content>
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
