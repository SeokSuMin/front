import { CommentOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import path from 'path';
import { memo } from 'react';
import styled from 'styled-components';
import { fileBackUrl } from '../../config';
import { IBoardData } from '../../reducer/blog/boardData';
import { IComment } from '../../reducer/blog/comment';
import { useAppSelector } from '../../store/hooks';
import * as Cheerio from 'cheerio';

const Content = styled.div`
    font-size: 0.938rem;
    font-weight: bold;
    color: black;
`;

const Description = styled.div`
    font-size: 0.825rem;
    margin-left: 3.692em;
    margin-top: 1.538em;
    color: gray;
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
}

const OneBoxList = ({ leaving, toggleLeaving }: IOneBoxListProps) => {
    const router = useRouter();
    const { viewType, currentCategoriId } = useAppSelector((state) => state.blogToggle);
    const { boardList } = useAppSelector((state) => state.boardList);
    const moveDetailPage = (boardId: string) => {
        router.push(`/blog/categori_${currentCategoriId}/${boardId}`);
    };

    return (
        <AnimatePresence initial={false}>
            {viewType === 'LIST' ? (
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
                                                        item.board_files?.find(
                                                            (file) => path.extname(file.name) === '.png',
                                                        )?.name
                                                    }`}
                                                />
                                            ) : (
                                                <img
                                                    style={{ width: '8.5rem', height: '8.5rem' }}
                                                    alt="example"
                                                    src="../../no-image.JPG"
                                                />
                                            )}
                                        </span>
                                    }
                                    style={{ padding: 0 }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={'/profile.png'} />}
                                        title={
                                            <>
                                                <span>{item.writer}</span>
                                                <span style={{ fontSize: '0.750rem' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                                <span style={{ fontSize: '0.750rem', color: 'gray' }}>
                                                    {dayjs(item.createdAt).format('YYYY MM DD HH:mm')}
                                                </span>
                                            </>
                                        }
                                        description={
                                            <>
                                                <Content>
                                                    <a onClick={() => moveDetailPage(item.board_id)}>
                                                        {item.title}
                                                        {item?.comments?.length ? (
                                                            <span style={{ marginLeft: '1em' }}>
                                                                <CommentOutlined /> (
                                                                {
                                                                    item?.comments?.filter((c) => c.parent_id === null)
                                                                        .length
                                                                }
                                                                )
                                                            </span>
                                                        ) : null}
                                                    </a>
                                                </Content>
                                            </>
                                        }
                                    />
                                    <Description>
                                        <a onClick={() => moveDetailPage(item.board_id)}>
                                            {Cheerio.load(item.content).text().length
                                                ? Cheerio.load(item.content).text().slice(0, 100)
                                                : '(내용없음)'}
                                        </a>
                                    </Description>
                                </List.Item>
                            </motion.div>
                        )}
                    />
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default memo(OneBoxList);
