import { message, Modal, Spin } from 'antd';
import styled from 'styled-components';
import { getCategoriMenuThunk, getDetailBoardThunk, getFavoriteBoardIdList } from '../../../../thunk/blogThunk';
import { checkUserloginThunk, getAdminInfoThunk } from '../../../../thunk/userThunk';
import wrapper from '../../../../store/configStore';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Comments from '../../../../components/comment/Comments';
import Seo from '../../../../components/Seo';
import { ICategoriMenus } from '../../../../reducer/blog/categoriMenus';
import { useCookies } from 'react-cookie';
import TopMenu from '../../../../components/blog/detail/TopMenu';
import ContentBox from '../../../../components/blog/detail/ContentBox';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
    .ant-spin-spinning {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ant-spin-spinning div {
        margin-bottom: 2.324em;
    }
`;

const SpinWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
    position: absolute;
    .ant-spin-spinning {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ant-spin-text {
        margin-top: 0.313em;
    }
`;

const DetailBoard = () => {
    const commentDivRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['order']);
    const detailBoard = useAppSelector((state) => state.boardData);
    const { userId } = useAppSelector((state) => state.userInfo);
    const { viewType } = useAppSelector((state) => state.blogToggle);
    const { board_ids } = useAppSelector((state) => state.blogFavorite);
    const { page, countList } = useAppSelector((state) => state.paging);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [categoriId, setCategoriId] = useState((router.query.categoris as string).split('_')[1]);
    const [menuTitle, setMenuTitle] = useState('');
    const [categoriTitle, setCategoriTitle] = useState('');
    const [checkLikeTime, setCheckLikeTime] = useState(true);
    const [checkFavoriteTime, setCheckFavoriteTime] = useState(true);
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [initRander, setInitRander] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const dispatch = useAppDispatch();

    const initPage = async () => {
        try {
            const order = cookies.order ? cookies.order : 'createdAt desc';
            const response = await dispatch(
                getDetailBoardThunk({ boardId: router.query.detail as string, categoriId: categoriId, order }),
            ).unwrap();
            setLike(!!response.boardInfo.like_id);
            setLikeCount(+response.boardInfo.like_count);
            setFavorite(!!response.boardInfo.favorite_id);
            const menuResult = (await (await dispatch(getCategoriMenuThunk())).payload) as ICategoriMenus;
            if (categoriId === '0') {
                setMenuTitle('전체보기');
                setCategoriTitle('');
            } else if (categoriId === 'favorite') {
                setMenuTitle('즐겨찾기');
                setCategoriTitle('');
            } else {
                for (const menu of menuResult.categoriMenus) {
                    const findCategori = menu.categoris.find((c) => c?.categori_id === +categoriId);
                    if (findCategori) {
                        setMenuTitle(menu.menu_name);
                        setCategoriTitle(findCategori.categori_name);
                        break;
                    }
                }
            }
        } catch (err) {
            message.warn('존재하지 않는 게시글 입니다.');
            router.push({
                pathname: `/blog/categori_${categoriId}`,
                query: { page, countList, type: viewType },
            });
        }
    };

    useEffect(() => {
        //(첫 랜더링은 X)
        if (!initRander) {
            if (userId) {
                initPage();
            } else {
                setFavorite(false);
                setLike(false);
            }
        }
    }, [userId]);

    useEffect(() => {
        if (deleteFlag) {
            router.push({
                pathname: `/blog/categori_${categoriId}`,
                query: { page, countList, type: viewType },
            });
        } else {
            if (router.query.categoris === 'categori_favorite' && !board_ids.includes(router.query.detail as string)) {
                message.warn('권한이 없거나 없는 페이지 입니다.');
                router.push({
                    pathname: `/blog/categori_0`,
                    query: { page: '1', countList: '15', type: 'CARD' },
                });
            }
            initPage();
            setInitRander(false);
        }
    }, [router.query.detail, deleteFlag]);

    return (
        <Wrapper>
            <Seo title="Ice Man | 블로그"></Seo>
            {detailBoard.loading ? (
                <SpinWrapper>
                    <Spin tip="Loading..." />
                </SpinWrapper>
            ) : (
                <>
                    <TopMenu {...{ menuTitle, categoriId, categoriTitle, setDeleteFlag, commentDivRef }} />
                    <ContentBox
                        {...{
                            checkLikeTime,
                            setCheckLikeTime,
                            like,
                            setLike,
                            likeCount,
                            setLikeCount,
                            checkFavoriteTime,
                            setCheckFavoriteTime,
                            favorite,
                            setFavorite,
                        }}
                    />
                    <Comments divRef={commentDivRef} />
                </>
            )}
        </Wrapper>
    );
};

export default DetailBoard;

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async ({ req, resolvedUrl }) => {
        const boardId = resolvedUrl.split('/')[resolvedUrl.split('/').length - 1];
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        // 로그인 사용자 체크
        await dispatch(checkUserloginThunk());
        await dispatch(getAdminInfoThunk());
        // await dispatch(getCategoriMenu());
        // await dispatch(getDetailBoard(boardId));
        const userId = getState().userInfo.userId;
        if (userId) {
            await dispatch(getFavoriteBoardIdList());
        }

        return {
            props: {},
        };
    };
});
