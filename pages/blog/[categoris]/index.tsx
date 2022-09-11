import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FourBoxList from '../../../components/blog/FourBoxList';
import OneBoxList from '../../../components/blog/OneBoxList';
import TopMenu from '../../../components/blog/TopMenu';
import wrapper from '../../../store/configStore';
import axios from 'axios';
import { checkUserloginThunk } from '../../../thunk/userThunk';
import { getBoardListThunk, getCategoriMenuThunk } from '../../../thunk/blogThunk';
import Paging from '../../../components/blog/Paging';
import { useQuery } from 'react-query';
import { BackTop, Empty, message, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getBoardList } from '../../../util';
import { changeCountList, goPage, initTotalCount } from '../../../reducer/blog/paging';
import { useRouter } from 'next/router';
import { changeCurrentCategoriId, changeBoardViewType } from '../../../reducer/blog/blogToggle';
import Seo from '../../../components/Seo';

const Wrapper = styled.div`
    width: 100%;
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
    padding-left: 1.875em;
    position: relative;
`;

const Home = () => {
    const router = useRouter();
    // const page = router?.query?.page ? +router.query.page : 1;
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { boardList } = useAppSelector((state) => state.boardList);
    const { currentCategoriId, viewType } = useAppSelector((state) => state.blogToggle);
    const { countList, page } = useAppSelector((state) => state.paging);
    const [leaving, setLeaving] = useState(false);

    // const [categoris, setCategoris] = useState(0);
    // const [pageNumber, setPageNumber] = useState(0);
    // const [countLists, setCountLists] = useState(0);
    // const [type, setType] = useState('');
    // const [queryEnabled, setQueryEnabled] = useState(false);

    // const { isLoading, isError, data, error } = useQuery(
    //     ['boardList', pageNumber, countLists, categoris, type],
    //     () => getBoardList(pageNumber, countLists, categoris),
    //     {
    //         refetchOnWindowFocus: false,
    //         onSuccess: (data) => {
    //             console.log('data 실행됨', data);
    //             if (data.boardList?.length) {
    //                 dispatch(initTotalCount(data.totalCount));
    //                 dispatch(goPage(pageNumber));
    //                 dispatch(changeCurrentCategoriId(categoris));
    //                 dispatch(changeBoardViewType(type));
    //                 window.scrollTo({
    //                     top: 0,
    //                     behavior: 'smooth',
    //                 });
    //             }
    //         },
    //         onError: (err: Error) => {
    //             message.error(err.message);
    //         },
    //         enabled: queryEnabled,
    //     },
    // );

    const changeListView = (type: string) => {
        if (type === viewType) {
            return;
        }
        if (leaving) {
            return;
        }
        // dispatch(changeBoardViewType(type));
        router.push({
            pathname: `/blog/categori_${currentCategoriId}`,
            query: { page, countList, type },
        });
        setLeaving(true);
    };

    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };

    // const initPage = async () => {
    //     try {
    //         // const numberRegExp = /[0-9]/;
    //         let page = router?.query?.page ? router?.query?.page : 1;
    //         let categoriNumber = router?.query?.categoris ? (router?.query?.categoris as string).split('_')[1] : 0;
    //         if (isNaN(page as number)) {
    //             page = 1;
    //         }
    //         if (isNaN(categoriNumber as number)) {
    //             categoriNumber = 0;
    //         }
    //         setCategoris(+categoriNumber);
    //         setPageNumber(+page);
    //         setType(router?.query?.type as string);
    //         setCountLists(15);
    //         setQueryEnabled(true);
    //         // dispatch(goPage(+pageNumber));
    //         // dispatch(changeCurrentCategoriId(+categoriNumber));
    //         // dispatch(changeBoardViewType(router?.query?.type as string));
    //         await dispatch(getCategoriMenuThunk());
    //     } catch (err) {
    //         if (err instanceof Error) {
    //             console.log(err.message);
    //             message.error(err.message);
    //         } else {
    //             message.error(err as string);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     initPage();
    // }, [router?.query?.page, router?.query?.categoris, router?.query?.type]);

    return (
        <Wrapper>
            <Seo title="Ice Man | 블로그"></Seo>
            {boardList?.length ? (
                <ContentBox>
                    <TopMenu {...{ viewType, changeListView, scrollRef }} />
                    <FourBoxList {...{ leaving, toggleLeaving }} />
                    <OneBoxList {...{ leaving, toggleLeaving }} />
                    <Paging />
                </ContentBox>
            ) : (
                <Empty description={<span>게시글이 없습니다.</span>} style={{ marginTop: 100 }} />
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
        let categoriId = +query.split('?')[0].split('_')[1];
        const querys = query.split('?')[1];
        const params = new URLSearchParams(querys);

        let page = params.get('page') ?? 1;
        let countList = params.get('countList') ?? 15;
        const type = params.get('type') ?? 'CARD';

        if (isNaN(page as number)) {
            page = 1;
        }
        if (isNaN(categoriId)) {
            categoriId = 0;
        }
        if (isNaN(countList as number)) {
            countList = 15;
        }
        // console.log(categoriId);
        // console.log(type);

        // 로그인 사용자 체크
        // console.log('서버사이드');
        await dispatch(checkUserloginThunk());
        await dispatch(getCategoriMenuThunk());
        const result = await dispatch(
            getBoardListThunk({ page: page as number, countList: countList as number, categoriId }),
        );
        dispatch(initTotalCount(result.payload.totalCount));
        dispatch(goPage(+page));
        dispatch(changeCountList(+countList));
        dispatch(changeCurrentCategoriId(+categoriId));
        dispatch(changeBoardViewType(type));

        return {
            props: {},
        };
    };
});
