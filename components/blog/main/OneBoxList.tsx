import { Avatar, List } from 'antd';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import path from 'path';
import { memo } from 'react';
import styled from 'styled-components';
import { fileBackUrl, imgExtFormat } from '../../../config';
import { useAppSelector } from '../../../store/hooks';
import * as Cheerio from 'cheerio';
import Heart from '../../../public/heart.svg';
import Comment from '../../../public/comment.svg';
// import HeartSolid from '../../../public/heart-solid.svg';
// import CommentSolid from '../../../public/comment-solid.svg';

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

const TitleBox = styled.div`
    display: flex;
    align-items: center;
`;

const HeartIcon = styled.span`
    margin-left: 10px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    font-size: 0.688rem;
    span {
        margin-left: 2px;
    }
    svg {
        width: 1em;
        height: 1em;
        fill: rgb(195, 0, 16);
    }
`;
const CommentIcon = styled.span`
    margin-right: 3px;
    display: flex;
    align-items: center;
    font-size: 0.688rem;
    span {
        margin-left: 2px;
    }
    svg {
        width: 1em;
        height: 1em;
        fill: gray;
    }
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
    const { adminInfo, userId } = useAppSelector((state) => state.userInfo);
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
                                            {item.thumb_img_name ? (
                                                <img
                                                    style={{ width: '8.5rem', height: '8.5rem' }}
                                                    src={fileBackUrl + item.board_id + '/' + item.thumb_img_name}
                                                    alt="thumbImg"
                                                />
                                            ) : item.board_files?.find((file) => {
                                                  if (file) {
                                                      return imgExtFormat.includes(
                                                          path.extname(file?.name).toLocaleLowerCase(),
                                                      );
                                                  }
                                              }) ? (
                                                <img
                                                    style={{ width: '8.5rem', height: '8.5rem' }}
                                                    alt="example"
                                                    src={
                                                        [1].map((v) => {
                                                            const $ = Cheerio.load(item.content);
                                                            const firstImage = Array.from(
                                                                $('#quillContent').find('*'),
                                                            ).find((tag) => {
                                                                if ($(tag).prop('tagName') === 'IMG') {
                                                                    return true;
                                                                } else {
                                                                    return false;
                                                                }
                                                            });
                                                            return $(firstImage).prop('src') as string;
                                                        })[0]
                                                    }
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
                                        avatar={
                                            <Avatar
                                                src={
                                                    adminInfo?.imgPath
                                                        ? fileBackUrl + adminInfo.imgPath
                                                        : '/profile.png'
                                                }
                                            />
                                        }
                                        title={
                                            <TitleBox>
                                                <span>{item.writer}</span>
                                                <span style={{ fontSize: '0.750rem' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                                <span style={{ fontSize: '0.750rem', color: 'gray' }}>
                                                    {dayjs(item.createdAt).format('YYYY MM DD')}
                                                </span>
                                                <HeartIcon className="heart">
                                                    {/* {item.like_id && userId ? <HeartSolid /> : <Heart />} */}
                                                    <Heart />
                                                    <span>{item.like_count ? item.like_count : 0}</span>
                                                </HeartIcon>
                                                <CommentIcon className="comment">
                                                    {/* {item.comment_id && userId ? <CommentSolid /> : <Comment />} */}
                                                    <Comment />
                                                    <span>{item.comment_count ? item.comment_count : 0}</span>
                                                </CommentIcon>
                                            </TitleBox>
                                        }
                                        description={
                                            <>
                                                <Content>
                                                    <a onClick={() => moveDetailPage(item.board_id)}>
                                                        {item.title}
                                                        {item?.comment_count ? (
                                                            <span style={{ marginLeft: '1em' }}>
                                                                ({item.comment_count})
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
