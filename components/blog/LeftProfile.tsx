import { Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import PencilToggle from '../../public/pencil-solid.svg';
import GitHub from '../../public/github.svg';
import { EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';

const Wrapper = styled.div`
    width: 20%;
    min-width: 8.125rem;
    height: 100%;
    border: 0.063em solid rgb(217, 217, 217);
    margin-top: 2.188em;
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
    margin-top: 1.25em;
    margin-bottom: 0.938em;
    &:last-child {
        margin-bottom: 0px;
        margin-top: 0px;
    }
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
    const { categoriMenus } = useAppSelector((state) => state.blog);
    const moveWritePage = () => {
        router.push('/blog/write');
    };

    return (
        <Wrapper>
            <ProfileImgeBox>
                <ProfileImg></ProfileImg>
                <span>IceMan</span>
                <p>아이스맨 같은 개발자가 되고 싶은 사람입니다.</p>
            </ProfileImgeBox>
            <CategoriBox>
                {userId === 'shark' ? (
                    <div className="writeBox">
                        <span onClick={moveWritePage}>
                            <EditOutlined />
                            글쓰기
                        </span>
                    </div>
                ) : null}
                <span style={{ fontWeight: 'bold' }}>전체보기 (23)</span>
                {categoriMenus?.map((categoriMenu) => {
                    return (
                        <Categoris key={categoriMenu.menu_categori}>
                            <ul>
                                <li>
                                    <span>• {categoriMenu.menu_categori}</span>
                                </li>
                                {categoriMenu.categoris?.map((categori) => {
                                    const categoriName = Object.keys(categori)[0];
                                    const totalCount = Object.values(categori)[0];
                                    return (
                                        <li key={categoriName}>
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
