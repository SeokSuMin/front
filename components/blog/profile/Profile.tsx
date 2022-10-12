import { Dropdown, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GitHub from '../../../public/github.svg';
import FaceBook from '../../../public/facebook.svg';
import Instagram from '../../../public/instagram.svg';
import Mail from '../../../public/mail.svg';
import EllipsisDot from '../../../public/ellipsis-dot.svg';
import StarSolid from '../../../public/star-solid.svg';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fileBackUrl } from '../../../config';
import { getFavoriteBoardIdList } from '../../../thunk/blogThunk';

const Wrapper = styled.div`
    width: 100%;
    border: 0.063em solid rgb(217, 217, 217);

    border-radius: 0.63em;
    /* margin-right: 3.63em; */
    padding: 0.938em;
    //position: sticky;
    top: 3.9em;
    @media screen and (max-width: 36rem) {
        display: none;
    }
`;

const ProfileImgeBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.63em;
    font-size: 0.813rem;
    span:first-child {
        text-decoration: underline;
        svg {
            width: 1rem;
            height: 1rem;
        }
    }
    p {
        font-size: 0.75rem;
        line-height: 1.2rem;
        margin-top: 1.538em;
    }
`;

const ProfileImg = styled.div<{ adminPath: string | undefined }>`
    width: 5rem;
    height: 5rem;
    background-image: url(${(props) => (props.adminPath ? fileBackUrl + props.adminPath : '/profile.png')});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin-top: 0.938em;
    margin-bottom: 0.938em;
`;

const FavoriteListBox = styled.div`
    width: 100%;
    border-top: 0.063em solid rgb(217, 217, 217);
    border-bottom: 0.063em solid rgb(217, 217, 217);
    margin-top: 1.245em;
    padding: 1em 1em 1em 0.63em;
    display: flex;
    align-items: center;
    span {
        font-size: 0.75rem;
        margin-top: 0.083em;
        margin-left: 0.167em;
        cursor: pointer;
    }
    span:hover {
        text-decoration: underline;
    }
    .active {
        text-decoration: underline;
        font-weight: bold;
    }
    svg {
        width: 0.9em;
        fill: rgb(250, 225, 0);
        cursor: pointer;
    }
`;

const CategoriBox = styled.div<{ userId: string }>`
    width: 100%;
    display: flex;
    border-top: ${(props) => (props.userId ? 'none' : '0.063em solid rgb(217, 217, 217)')};
    margin-top: ${(props) => (props.userId ? '0px' : '1.245em')};
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1.875em 0em 1.875em 0.63em;
    .writeBox {
        width: 100%;
        text-align: right;
        margin-bottom: 1.25em;
        svg {
            width: 1rem;
            height: 1rem;
            fill: gray;
        }
    }
    span {
        font-size: 0.75rem;
    }
    /* span:first-child {
        margin-bottom: 1em;
    } */
    span:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const Categoris = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0.938em;
    ul {
        width: 100%;
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    li:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    li:first-child {
        margin-bottom: 0.625em;
        font-weight: bold;
        pointer-events: none;
    }
    li:not(:first-of-type) {
        margin-bottom: 0.5em;
    }
    .active {
        font-weight: bold;
        text-decoration: underline;
    }
`;

const EtcBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-top: 1.25em; */
    border-top: 0.063em solid rgb(217, 217, 217);
    text-align: center;
    padding-top: 0.63em;

    a {
        margin-left: 0.5em;
        width: 1.25rem;
    }

    a:first-child {
        margin-left: 0px;
    }
`;

const Profile = () => {
    const router = useRouter();
    const { userId, adminInfo } = useAppSelector((state) => state.userInfo);
    const { viewType } = useAppSelector((state) => state.blogToggle);
    const { categoriMenus, categoriTotal } = useAppSelector((state) => state.categoriMenus);
    const { board_ids } = useAppSelector((state) => state.blogFavorite);
    const { countList } = useAppSelector((state) => state.paging);
    const [categoriId, setCategoriId] = useState<string>('');
    const dispatch = useAppDispatch();

    const moveWritePage = () => {
        if (router.query.mode === 'modify' || router.pathname !== '/blog/write') {
            router.push(
                {
                    pathname: '/blog/write',
                    query: { mode: 'write' },
                },
                // '/blog/write',
            );
        }
    };

    const movemenuManager = () => {
        if (router.pathname !== '/blog/menuManager') {
            router.push('/blog/menuManager');
        }
    };

    const moveCategoriBoards = (currentCategoriId: number, newCategoriId: number | string) => {
        if (router.pathname !== '/blog' || currentCategoriId !== newCategoriId) {
            // dispatch(changeCurrentCategoriId(newCategoriId));
            // if (router.pathname !== '/blog/[categoris]') {
            //     router.push({
            //         pathname: `/blog/categori_${newCategoriId}`,
            //         query: { page: '1', type: viewType },
            //     });
            // }
            router.push({
                pathname: `/blog/categori_${newCategoriId}`,
                query: { page: '1', countList, type: viewType },
            });
        }
    };

    useEffect(() => {
        if (userId && !board_ids.length) {
            dispatch(getFavoriteBoardIdList());
        }
    }, [userId]);

    useEffect(() => {
        if (router?.query?.categoris) {
            setCategoriId((router.query.categoris as string).split('_')[1]);
        } else {
            setCategoriId('');
        }
    }, [router?.query?.categoris]);

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: <div onClick={moveWritePage}>글쓰기</div>,
                },
                {
                    key: '2',
                    label: <div onClick={movemenuManager}>메뉴관리</div>,
                },
            ]}
        />
    );

    return (
        <Wrapper>
            <ProfileImgeBox>
                <ProfileImg adminPath={adminInfo?.imgPath}></ProfileImg>
                <span>IceMan</span>
                <p>될 때 까지 하는 개발자 입니다.</p>
            </ProfileImgeBox>

            {userId ? (
                <FavoriteListBox>
                    <StarSolid />
                    <span
                        className={categoriId === 'favorite' ? 'active' : ''}
                        onClick={() => moveCategoriBoards(+categoriId, 'favorite')}
                    >
                        Favorite ({board_ids.length})
                    </span>
                    {/* <span>({favoriteTotal ? favoriteTotal : 0})</span> */}
                </FavoriteListBox>
            ) : null}

            <CategoriBox userId={userId}>
                {userId === 'iceMan' ? (
                    <div className="writeBox">
                        <span>
                            <Dropdown overlay={menu} placement="bottomRight" arrow>
                                <EllipsisDot />
                            </Dropdown>
                        </span>
                    </div>
                ) : null}
                <span
                    style={{
                        textDecoration: categoriId === '0' ? 'underline' : 'none',
                        fontWeight: categoriId === '0' ? 'bold' : 'none',
                        marginBottom: '1.25em',
                    }}
                    onClick={() => moveCategoriBoards(+categoriId, 0)}
                >
                    전체보기 ({categoriTotal})
                </span>
                {categoriMenus?.map((categoriMenu, i) => {
                    return (
                        <Categoris key={categoriMenu.menu_id}>
                            <ul>
                                <li>
                                    <span>• {categoriMenu.menu_name}</span>
                                </li>
                                {categoriMenu.categoris?.map((categori) => {
                                    if (categori !== null) {
                                        return (
                                            <li
                                                className={+categoriId === categori.categori_id ? 'active' : ''}
                                                onClick={() => moveCategoriBoards(+categoriId, categori.categori_id)}
                                                key={categori.categori_name}
                                            >
                                                <span>
                                                    └ {categori.categori_name} ({categori.total_count})
                                                </span>
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </Categoris>
                    );
                })}
            </CategoriBox>
            <EtcBox>
                <a href="https://www.instagram.com/seoks00min/" target="_blank" rel="noreferrer">
                    <Instagram />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100004078510540" target="_blank" rel="noreferrer">
                    <FaceBook />
                </a>
                <a onClick={() => window.open('mailto:yahoo2344@naver.com?subject=&body=')}>
                    <Mail />
                </a>
                <a href="https://github.com/SeokSuMin/front" target="_blank" rel="noreferrer">
                    <GitHub />
                </a>
            </EtcBox>
        </Wrapper>
    );
};

export default Profile;
