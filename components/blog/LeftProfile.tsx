import { Dropdown, Menu, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import PencilToggle from '../../public/pencil-solid.svg';
import GitHub from '../../public/github.svg';
import EllipsisDot from '../../public/ellipsis-dot.svg';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeCurrentCategoriId } from '../../reducer/blog';

const Wrapper = styled.div`
    width: 20%;
    min-width: 8.125rem;
    height: 100%;
    border: 0.063em solid rgb(217, 217, 217);
    margin-top: 2.324em;
    border-radius: 0.63em;
    /* margin-right: 3.63em; */
    padding: 0.938em;
    position: sticky;
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

const ProfileImg = styled.div`
    width: 5rem;
    height: 5rem;
    background-image: url('/profile.png');
    background-position: center;
    background-size: contain;
    border-radius: 50%;
    margin-top: 0.938em;
    margin-bottom: 0.938em;
`;

const CategoriBox = styled.div`
    width: 100%;
    margin-top: 1.25em;
    border-top: 0.063em solid rgb(217, 217, 217);
    display: flex;
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
    /* margin-top: 1.25em; */
    border-top: 0.063em solid rgb(217, 217, 217);
    text-align: center;
    padding: 0.63em;
    svg {
        margin-top: 0.313em;
        width: 1.875rem;
    }
`;

interface ILeftProfileProps {
    categoris: { name: string; isActive: boolean }[];
    openCategori: (name: string, isActive: boolean) => void;
}

const LeftProfile = ({ categoris, openCategori }: ILeftProfileProps) => {
    const router = useRouter();
    const { userId } = useAppSelector((state) => state.user);
    const { categoriMenus, currentCategoriId, categoriTotal } = useAppSelector((state) => state.blog);

    const dispatch = useAppDispatch();

    const moveWritePage = () => {
        router.push(
            {
                pathname: '/blog/write',
                query: { mode: 'write' },
            },
            '/blog/write',
        );
    };

    const moveCategoriBoards = (currentCategoriId: number, newCategoriId: number) => {
        if (currentCategoriId !== newCategoriId) {
            dispatch(changeCurrentCategoriId(newCategoriId));
            if (router.pathname !== '/blog') {
                router.push('/blog');
            }
        }
    };

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: <div onClick={moveWritePage}>글쓰기</div>,
                },
                {
                    key: '2',
                    label: <div onClick={() => router.push('/blog/menuManager')}>메뉴관리</div>,
                },
            ]}
        />
    );

    return (
        <Wrapper>
            <ProfileImgeBox>
                <ProfileImg></ProfileImg>
                <span>IceMan</span>
                <p>아이스맨 같은 개발자가 되고 싶은 사람입니다.</p>
            </ProfileImgeBox>
            <CategoriBox>
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
                        textDecoration: currentCategoriId === 0 ? 'underline' : '',
                        fontWeight: currentCategoriId === 0 ? 'bold' : '',
                        marginBottom: '1.25em',
                    }}
                    onClick={() => moveCategoriBoards(currentCategoriId, 0)}
                >
                    전체보기 ({categoriTotal})
                </span>
                {categoriMenus?.map((categoriMenu) => {
                    return (
                        <Categoris key={categoriMenu.menu_name}>
                            <ul>
                                <li>
                                    <span>• {categoriMenu.menu_name}</span>
                                </li>
                                {categoriMenu.categoris?.map((categori) => {
                                    const categoriName = Object.keys(categori)[0];
                                    const totalCount = Object.values(categori)[0];
                                    return (
                                        <li
                                            className={currentCategoriId == categori.categori_id ? 'active' : ''}
                                            onClick={() => moveCategoriBoards(currentCategoriId, categori.categori_id)}
                                            key={categoriName}
                                        >
                                            <span>
                                                └ {categoriName} ({totalCount})
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Categoris>
                    );
                })}
            </CategoriBox>
            <EtcBox>
                <a href="">
                    <GitHub />
                </a>
            </EtcBox>
        </Wrapper>
    );
};

export default LeftProfile;
