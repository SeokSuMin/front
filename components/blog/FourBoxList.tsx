import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import path from 'path';
import { memo } from 'react';
import styled from 'styled-components';
import { fileBackUrl, imgExtFormat } from '../../config';
import { useAppSelector } from '../../store/hooks';
import * as Cheerio from 'cheerio';
import Heart from '../../public/heart.svg';
import Comment from '../../public/comment.svg';
import HeartSolid from '../../public/heart-solid.svg';
import CommentSolid from '../../public/comment-solid.svg';

const CardBox = styled(motion.div)`
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
`;

const Card = styled(motion.div)`
    flex: 0 1 30%;
    margin-right: 5%;
    margin-top: 12%;

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
    @media screen and (min-width: 53.1rem) {
        &:nth-child(3n + 0) {
            margin-right: 0;
        }
    }
    @media screen and (max-width: 53.1rem) {
        flex: 0 1 47%;
        margin-right: 6%;
        margin-top: 18%;
        &:nth-child(2n + 0) {
            margin-right: 0;
        }
        &:first-child,
        &:nth-child(2) {
            margin-top: 0px;
        }
        &:nth-child(3) {
            margin-top: 18%;
        }
    }
`;

const CardContent = styled(motion.div)`
    width: 100%;
    height: 125%;
    border: 0.063rem solid rgb(230, 230, 230);
    border-radius: 0.63em;
    overflow: hidden;
    /* @media screen and (max-width: 53rem) {
        height: 115%;
    } */
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
    height: 50%;
    display: flex;
    border-bottom: 0.063rem solid rgb(230, 230, 230);
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
    height: 50%;
    border-top: none;
    padding: 0.75em;
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    height: 35%;
    display: flex;
    align-items: center;
    h2 {
        width: 100%;
        margin-bottom: auto;
        font-size: 0.813rem;
        font-weight: 900;
        line-height: 1.2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        @media screen and (max-width: 61.875rem) and (min-width: 53.125rem) {
            -webkit-line-clamp: 1;
        }
        @media screen and (max-width: 46rem) {
            -webkit-line-clamp: 1;
        }
    }
`;

// const TagInfo = styled.div`
//     width: 100%;
//     padding: 0.125em 0px;
// `;

const WriteInfo = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    // margin-top: 0.625em;
    color: gray;
    font-size: 0.75rem;
    .registDate {
        margin-top: 0.091em;
        color: gray;
        font-size: 0.688rem;
        line-height: 1.2em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        @media screen and (max-width: 55rem) and (min-width: 53rem) {
            -webkit-line-clamp: 1;
        }
        @media screen and (max-width: 40rem) {
            -webkit-line-clamp: 1;
        }
    }
    .heart {
        margin-left: auto;
        margin-right: 5px;
        display: flex;
        align-items: center;
        font-size: 0.688rem;
        span {
            margin-left: 0.125em;
            @media screen and (max-width: 610px) {
                display: none;
            }
        }
        svg {
            width: 1em;
            height: 1em;
            fill: rgb(195, 0, 16);
        }
    }
    .comment {
        margin-right: 3px;
        display: flex;
        align-items: center;
        font-size: 0.688rem;
        span {
            margin-left: 0.125em;
            @media screen and (max-width: 610px) {
                display: none;
            }
        }
        svg {
            width: 1em;
            height: 1em;
            fill: gray;
        }
    }
`;

const ProfileImg = styled.div<{ adminPath: string | undefined }>`
    width: 12%;
    height: 75%;
    flex-shrink: 0;
    background-image: url(${(props) => (props.adminPath ? fileBackUrl + props.adminPath : '/profile.png')});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin-right: 0.55em;
`;

const Description = styled.div`
    height: 45%;
    display: flex;
    align-items: flex-end;
    span {
        color: gray;
        width: 100%;
        font-size: 0.688rem;
        line-height: 1.5em;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        @media screen and (max-width: 62.5rem) and (min-width: 53.125rem) {
            -webkit-line-clamp: 2;
        }
        @media screen and (max-width: 46rem) {
            -webkit-line-clamp: 2;
        }
        @media screen and (max-width: 38.125rem) and (min-width: 36.063rem) {
            -webkit-line-clamp: 1;
        }
    }
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
    const { adminInfo, userId } = useAppSelector((state) => state.userInfo);
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
                                        {board.board_files?.find((file) => {
                                            if (file) {
                                                return imgExtFormat.includes(
                                                    path.extname(file?.name).toLocaleLowerCase(),
                                                );
                                            }
                                        }) ? (
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
                                            <ProfileImg adminPath={adminInfo?.imgPath} />
                                            <span>{board.writer}</span>
                                            <div style={{ width: '5%', textAlign: 'center' }}>|</div>
                                            <span className="registDate">
                                                {dayjs(board.createdAt).format('YYYY MM DD')}
                                            </span>
                                            <span className="heart">
                                                {board.like_id && userId ? <HeartSolid /> : <Heart />}
                                                <span>{board.like_count ? board.like_count : 0}</span>
                                            </span>
                                            <span className="comment">
                                                {board.comment_id && userId ? <CommentSolid /> : <Comment />}
                                                <span>{board.comment_count ? board.comment_count : 0}</span>
                                            </span>
                                        </WriteInfo>
                                        <Description>
                                            <span>
                                                {Cheerio.load(board.content).text().length
                                                    ? Cheerio.load(board.content).text().slice(0, 100)
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
