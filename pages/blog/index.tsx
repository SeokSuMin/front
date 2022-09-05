import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FourBoxList from '../../components/blog/FourBoxList';
import OneBoxList from '../../components/blog/OneBoxList';
import TopMenu from '../../components/blog/TopMenu';
import wrapper from '../../store/configStore';
import axios from 'axios';
import { checkUserloginThunk } from '../../thunk/userThunk';
import { getCategoriMenuThunk } from '../../thunk/blogThunk';
import Paging from '../../components/blog/Paging';
import { useQuery } from 'react-query';
import { BackTop, Empty, message, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoardList } from '../../util';
import { goPage, initTotalCount } from '../../reducer/blog/paging';
import { useRouter } from 'next/router';
import { changeCurrentCategoriId, changeBoardViewType } from '../../reducer/blog/blogToggle';

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
    const { currentCategoriId, viewType } = useAppSelector((state) => state.blogToggle);
    const { comments } = useAppSelector((state) => state.comment);
    const { countList, page } = useAppSelector((state) => state.paging);
    const dispatch = useAppDispatch();
    const [leaving, setLeaving] = useState(false);

    const { isLoading, isError, data, error } = useQuery(
        ['boardList', page, countList, currentCategoriId],
        () => getBoardList(page, countList, currentCategoriId),
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                // console.log('data 실행됨', data);
                if (data.boardList.length) {
                    dispatch(initTotalCount(data.totalCount));
                    dispatch(goPage(0));
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }
            },
            onError: (err: Error) => {
                message.error(err.message);
            },
        },
    );

    const changeListView = (type: string) => {
        if (type === viewType) {
            return;
        }
        if (leaving) {
            return;
        }
        // dispatch(changeBoardViewType(type));
        router.push({
            pathname: '/blog',
            query: { page, categori: currentCategoriId, type },
        });
        setLeaving(true);
    };

    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };

    const initPage = async () => {
        try {
            // const numberRegExp = /[0-9]/;
            let pageNumber = router?.query?.page ? router?.query?.page : 1;
            let categoriNumber = router?.query?.categori ? router?.query?.categori : 0;
            const type = router?.query?.type ? router?.query?.type : 'CARD';
            if (isNaN(pageNumber as number)) {
                pageNumber = 1;
            }
            if (isNaN(categoriNumber as number)) {
                categoriNumber = 0;
            }
            dispatch(goPage(+pageNumber));
            dispatch(changeCurrentCategoriId(+categoriNumber));
            dispatch(changeBoardViewType(type as string));
            await dispatch(getCategoriMenuThunk());
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                message.error(err.message);
            } else {
                message.error(err as string);
            }
        }
    };

    useEffect(() => {
        initPage();
    }, [router?.query?.categori, router?.query?.page, router?.query?.type]);

    return (
        <Wrapper>
            {isLoading ? (
                <Spin tip="Loading..." />
            ) : data?.boardList?.length ? (
                <ContentBox>
                    <TopMenu {...{ viewType, changeListView, scrollRef }} />
                    <FourBoxList {...{ leaving, toggleLeaving, boardList: data?.boardList }} />
                    <OneBoxList {...{ leaving, toggleLeaving, boardList: data?.boardList }} />
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
    return async ({ req }) => {
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        // 로그인 사용자 체크
        await dispatch(checkUserloginThunk());
        // await dispatch(getCategoriMenu());
        // await dispatch(getBoardList());
        return {
            props: {},
        };
    };
});
