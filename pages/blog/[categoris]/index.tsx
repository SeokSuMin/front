import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FourBoxList from '../../../components/blog/main/FourBoxList';
import OneBoxList from '../../../components/blog/main/OneBoxList';
// import TopMenu from '../../../components/blog/TopMenu';
import wrapper from '../../../store/configStore';
import axios from 'axios';
import { checkUserloginThunk, getAdminInfoThunk } from '../../../thunk/userThunk';
import { getBoardListThunk, getCategoriMenuThunk, getFavoriteBoardIdList } from '../../../thunk/blogThunk';
import Paging from '../../../components/blog/Paging';
import { Empty, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeCountList, goPage, initTotalCount } from '../../../reducer/blog/paging';
import { useRouter } from 'next/router';
import { changeCurrentCategoriId, changeBoardViewType } from '../../../reducer/blog/blogToggle';
import { useCookies } from 'react-cookie';
import Seo from '../../../components/Seo';
import dynamic from 'next/dynamic';

// 쿠키 사용을 위한 ssr로딩안함
const TopMenu = dynamic(() => import('../../../components/blog/main/TopMenu'), { ssr: false });

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 0.2em;
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

const ContentBox = styled.div`
    width: 100%;
    padding-left: 5%;
    @media screen and (max-width: 36rem) {
        padding-left: 0px;
    }
    position: relative;
`;

const Home = () => {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(['order', 'myLike', 'myComment', 'viewType']);
    const { userId } = useAppSelector((state) => state.userInfo);
    const { boardList } = useAppSelector((state) => state.boardList);
    const { currentCategoriId, viewType } = useAppSelector((state) => state.blogToggle);
    const { countList, page } = useAppSelector((state) => state.paging);
    const [leaving, setLeaving] = useState(false);
    const [order, setOrder] = useState(cookies.order ? cookies.order : 'createdAt desc');
    const [myLike, setMyLike] = useState(cookies.myLike ? cookies.myLike : '');
    const [myComment, setMyComment] = useState(cookies.myComment ? cookies.myComment : '');
    const [initRander, setInitRander] = useState(true);
    const dispatch = useAppDispatch();

    const changeListView = (type: string) => {
        setCookie('viewType', type);
        if (type === viewType) {
            return;
        }
        if (leaving) {
            return;
        }
        router.push({
            pathname: `/blog/categori_${currentCategoriId}`,
            query: { page, countList, type },
        });
        // if (boardList?.length) {
        //     setLeaving(true);
        // }
    };

    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };

    const changeBoardOrder = async (order: string) => {
        setCookie('order', order, {
            path: '/',
        });
        setOrder(order);
    };

    const toggleMyHeart = async (type: string) => {
        if (type === 'like') {
            setCookie('myLike', type, {
                // httpOnly: true,
                path: '/',
            });
        } else {
            removeCookie('myLike', { path: '/' });
        }
        setMyLike(type);
    };

    const toggleMyComment = async (type: string) => {
        if (type === 'comment') {
            setCookie('myComment', type, {
                path: '/',
            });
        } else {
            removeCookie('myComment', { path: '/' });
        }
        setMyComment(type);
    };

    const reloadBoardList = async () => {
        const page = router.query?.page ? +router.query.page : 1;
        const countList = router.query?.countList ? +router.query.countList : 15;
        const categoriId = (router.query.categoris as string).split('_')[1];
        const where: string[] = [myLike, myComment];
        await dispatch(getBoardListThunk({ page, countList, categoriId, where, order }));
    };

    useEffect(() => {
        if (router.query.categoris === 'categori_favorite' && !userId) {
            message.warn('권한이 없거나 없는 페이지 입니다.');
            router.push({
                pathname: `/blog/categori_0`,
                query: { page: '1', countList: '15', type: 'CARD' },
            });
        }
    }, [router.query.categoris]);

    useEffect(() => {
        //(첫 랜더링은 X)
        if (!initRander) {
            reloadBoardList();
        }
    }, [order, myLike, myComment]);

    useEffect(() => {
        // 사용자가 로그인 또는 로그아웃 하면 리스트정보 갱신 (첫 랜더링은 X)
        if (initRander) {
            if (router.query.categoris === 'categori_favorite' && !userId) {
                message.warn('권한이 없거나 없는 페이지 입니다.');
                router.push({
                    pathname: `/blog/categori_0`,
                    query: { page: '1', countList: '15', type: 'CARD' },
                });
            }
            setInitRander(false);
        } else {
            if (userId) {
                // 임시로 주석처리 (좋아요, 댓글 표시)
                // reloadBoardList();
            } else {
                //로그아웃하면 쿠키 초기화
                removeCookie('myLike', { path: '/' });
                removeCookie('myComment', { path: '/' });
                setMyLike('');
                setMyComment('');
            }
        }
    }, [userId]);

    return (
        <Wrapper>
            <Seo title="Ice Man | 블로그"></Seo>
            <ContentBox>
                <TopMenu
                    {...{
                        viewType,
                        changeListView,
                        scrollRef,
                        order,
                        changeBoardOrder,
                        myLike,
                        myComment,
                        toggleMyHeart,
                        toggleMyComment,
                    }}
                />
                {boardList?.length ? (
                    <>
                        <FourBoxList {...{ leaving, toggleLeaving }} />
                        <OneBoxList {...{ leaving, toggleLeaving }} />
                        <Paging />
                    </>
                ) : null}
            </ContentBox>
            {boardList?.length ? null : (
                <Empty description={<span>게시글이 없습니다.</span>} style={{ marginTop: 200 }} />
            )}
        </Wrapper>
    );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async ({ req, resolvedUrl }) => {
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        const url = resolvedUrl;
        const query = url.split('/blog/')[1];
        let categoriId = query.split('?')[0].split('_')[1];
        const querys = query.split('?')[1];
        const params = new URLSearchParams(querys);

        let page = params.get('page') ?? 1;
        let countList = params.get('countList') ?? 15;
        const type = params.get('type') ?? 'CARD';

        if (isNaN(page as number)) {
            page = 1;
        }
        if (categoriId !== 'favorite' && isNaN(+categoriId)) {
            categoriId = '0';
        }
        if (isNaN(countList as number)) {
            countList = 15;
        }
        // console.log(categoriId);
        // console.log(type);
        const order = req.cookies['order'] ? req.cookies['order'] : 'createdAt desc';
        const myLike = req.cookies['myLike'] ? req.cookies['myLike'] : '';
        const myComment = req.cookies['myComment'] ? req.cookies['myComment'] : '';
        const viewType = req.cookies['viewType'] ? req.cookies['viewType'] : type;
        const where: string[] = [myLike, myComment];

        // 로그인 사용자 체크
        await dispatch(checkUserloginThunk());
        await dispatch(getAdminInfoThunk());
        await dispatch(getCategoriMenuThunk());
        const result = await dispatch(
            getBoardListThunk({ page: page as number, countList: countList as number, categoriId, where, order }),
        );
        dispatch(initTotalCount(result.payload.totalCount));
        dispatch(changeCountList(+countList));
        dispatch(goPage(+page));
        dispatch(changeCurrentCategoriId(categoriId === 'favorite' ? categoriId : +categoriId));
        dispatch(changeBoardViewType(viewType));

        const userId = getState().userInfo.userId;
        if (userId) {
            await dispatch(getFavoriteBoardIdList());
        }

        return {
            props: {},
        };
    };
});
