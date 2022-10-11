import { Button, message, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoriManage from '../../components/blog/CategoriManage';
import MenuManage from '../../components/blog/MenuManage';
import Seo from '../../components/Seo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCategoriMenuThunk, getFavoriteBoardIdList } from '../../thunk/blogThunk';
import wrapper from '../../store/configStore';
import axios from 'axios';
import { checkUserloginThunk, getAdminInfoThunk } from '../../thunk/userThunk';
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    button {
        padding: 0.125em 0.313em;
        height: 1.875em;
        margin-left: 0.313em;
    }
`;

const SpinWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 99;
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

const ChangeWorkBox = styled.div`
    width: 100%;
    text-align: right;
    padding-bottom: 0.625em;
`;

const ManagerBox = styled.div`
    width: 100%;
    padding: 1.875em 0em 1.875em 1.875em;
`;

const MenuManager = () => {
    const router = useRouter();
    const { userId } = useAppSelector((state) => state.userInfo);
    const { countList } = useAppSelector((state) => state.paging);
    const { viewType } = useAppSelector((state) => state.blogToggle);
    const dispatch = useAppDispatch();
    const [manageType, setManageType] = useState(1);
    const [permissionLoading, setPermissionLoading] = useState(true);

    const changeManageType = (type: number) => {
        setManageType(type);
    };

    const initPage = async () => {
        await dispatch(getCategoriMenuThunk());
        setPermissionLoading(false);
    };

    useEffect(() => {
        if (!userId || userId !== 'iceMan') {
            message.warn('권한이 없으므로 메인페이지로 돌아갑니다.');
            router.push({
                pathname: `/blog/categori_0`,
                query: { page: '1', countList, type: viewType },
            });
        } else {
            initPage();
        }
    }, [userId]);

    return (
        <Wrapper>
            <Seo title="Ice Man | 블로그"></Seo>
            {permissionLoading ? (
                <SpinWrapper>
                    <Spin tip="Loading..." />
                </SpinWrapper>
            ) : (
                <>
                    <ChangeWorkBox>
                        <Button onClick={() => changeManageType(1)} type={manageType === 1 ? 'primary' : 'default'}>
                            메뉴관리
                        </Button>
                        <Button onClick={() => changeManageType(2)} type={manageType === 2 ? 'primary' : 'default'}>
                            카테고리
                        </Button>
                    </ChangeWorkBox>
                    <ManagerBox>
                        {manageType === 1 ? <MenuManage /> : null}
                        {manageType === 2 ? <CategoriManage /> : null}
                    </ManagerBox>
                </>
            )}
        </Wrapper>
    );
};

export default MenuManager;

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async ({ req }) => {
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        // 로그인 사용자 체크
        await dispatch(checkUserloginThunk());
        await dispatch(getAdminInfoThunk());
        const userId = getState().userInfo.userId;
        if (userId) {
            await dispatch(getFavoriteBoardIdList());
        }

        return {
            props: {},
        };
    };
});
