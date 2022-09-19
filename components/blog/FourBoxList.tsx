import { CommentOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import path from 'path';
import { memo } from 'react';
import styled from 'styled-components';
import { fileBackUrl, imgExtFormat } from '../../config';
import { IBoardData } from '../../reducer/blog/boardData';
import { IComment, IComments } from '../../reducer/blog/comment';
import { useAppSelector } from '../../store/hooks';
import * as Cheerio from 'cheerio';

const CardBox = styled(motion.div)`
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
`;

const Card = styled(motion.div)`
    flex: 0 1 30%;
    margin-right: 5%;
    margin-top: 10%;
    position: relative;
    &::after {
        display: block;
        content: '';
        padding-bottom: 100%;
    }
    &:first-child,
    &:nth-child(2),
    &:nth-child(3) {
        margin-top: 0px;
    }
    @media screen and (min-width: 53rem) {
        &:nth-child(3n + 0) {
            margin-right: 0;
        }
    }
    @media screen and (max-width: 53rem) {
        flex: 0 1 47%;
        margin-right: 6%;
        &:nth-child(2n + 0) {
            margin-right: 0;
        }
        &:nth-child(3),
        &:nth-child(4) {
            margin-top: 10%;
        }
    }
`;

const CardContent = styled(motion.div)`
    width: 100%;
    height: 120%;
    @media screen and (max-width: 53rem) {
        height: 110%;
    }
    cursor: pointer;
    background-color: white;
    transform-origin: center right;
    position: absolute;
    margin-top: 5.75em;
    &:first-child {
        margin-top: 0px;
    }
`;

const ThumImg = styled(motion.div)`
    width: 100%;
    height: 55%;
    border: 0.063rem solid rgb(230, 230, 230);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        height: 100%;
    }
    //
`;
const Content = styled(motion.div)`
    width: 100%;
    height: 45%;
    border: 0.063rem solid rgb(230, 230, 230);
    border-top: none;
    padding: 0.625em;
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    height: 30%;
    display: flex;
    align-items: center;
    h2 {
        width: 100%;
        font-size: 0.875rem;
        font-weight: 900;
        line-height: 1.2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        @media screen and (max-width: 54rem) and (min-width: 53rem) {
            -webkit-line-clamp: 1;
        }
        @media screen and (max-width: 40rem) {
            -webkit-line-clamp: 1;
        }
    }
`;
const Description = styled.div`
    height: 30%;
    display: flex;
    align-items: center;
    span {
        color: gray;
        width: 100%;
        font-size: 0.75rem;
        line-height: 1.2em;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        @media screen and (max-width: 54rem) and (min-width: 53rem) {
            -webkit-line-clamp: 1;
        }
        @media screen and (max-width: 40rem) {
            -webkit-line-clamp: 1;
        }
    }
`;

const TagInfo = styled.div`
    width: 100%;
    padding: 0.125em 0px;
`;

const WriteInfo = styled.div`
    height: 40%;
    display: flex;
    align-items: center;
    color: gray;
    font-size: 0.813rem;
    .comment {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 0.813em;
        cursor: pointer;
        svg {
            fill: black;
            margin-right: 0.313em;
        }
    }
`;

const ProfileImg = styled.div`
    width: 1.7rem;
    height: 1.7rem;
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

interface IFourBoxListProps {
    leaving: boolean;
    toggleLeaving: () => void;
}

const FourBoxList = ({ leaving, toggleLeaving }: IFourBoxListProps) => {
    const router = useRouter();
    const { viewType, currentCategoriId } = useAppSelector((state) => state.blogToggle);
    const { boardList } = useAppSelector((state) => state.boardList);
    const moveDetailPage = (boardId: string) => {
        router.push(`/blog/categori_${currentCategoriId}/${boardId}`);
    };
    return (
        <AnimatePresence initial={false}>
            {viewType === 'CARD' ? (
                <CardBox variants={fourBox} initial="hidden" animate="visible" exit="exit">
                    {boardList?.map((board) => {
                        return (
                            <Card key={board.board_id} variants={fourBoxItem}>
                                <CardContent
                                    onClick={() => moveDetailPage(board.board_id)}
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow: '0.313em 0.313em 0.313em rgb(230, 230, 230)',
                                    }}
                                    transition={{ type: 'tween', duration: 0.2 }}
                                >
                                    <ThumImg>
                                        {board.board_files?.find((file) =>
                                            imgExtFormat.includes(path.extname(file.name).toLocaleLowerCase()),
                                        ) ? (
                                            <img
                                                alt="example"
                                                src={
                                                    [1].map((v) => {
                                                        const $ = Cheerio.load(board.content);
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
                                                // src={`${fileBackUrl}${board.board_id}/${
                                                //     board.board_files?.find((file) =>
                                                //         imgExtFormat.includes(
                                                //             path.extname(file.name).toLocaleLowerCase(),
                                                //         ),
                                                //     )?.name
                                                // }`}
                                            />
                                        ) : (
                                            <img alt="example" src="../../no-image.JPG" />
                                        )}
                                    </ThumImg>
                                    <Content>
                                        {/* <TagInfo>
                                            <Tag color="blue">{board.categoris.categori_name}</Tag>
                                        </TagInfo> */}
                                        <Title>
                                            <h2>{board.title}</h2>
                                        </Title>
                                        <WriteInfo>
                                            <ProfileImg />
                                            <span>{board.writer}</span>
                                            <div style={{ width: '10%', textAlign: 'center' }}>|</div>
                                            <span>{dayjs(board.createdAt).format('YYYY MM DD HH:mm')}</span>
                                            {board?.comments?.length ? (
                                                <span className="comment">
                                                    <CommentOutlined />(
                                                    {board?.comments?.filter((c) => c.parent_id === null).length})
                                                </span>
                                            ) : null}
                                        </WriteInfo>
                                        <Description>
                                            <span>
                                                {Cheerio.load(board.content).text().length
                                                    ? Cheerio.load(board.content).text().slice(0, 50)
                                                    : '(내용없음)'}
                                            </span>
                                        </Description>
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

export default memo(FourBoxList);
