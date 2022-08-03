import { Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import PencilToggle from '../../public/pencil-solid.svg';
import GitHub from '../../public/github.svg';

const Wrapper = styled.div`
    width: 20%;
    height: 100%;
    border: 0.063em solid rgb(217, 217, 217);
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
    span:nth-child(2) {
        color: blue;
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
    text-align: center;
    padding: 0.63em;
    p {
        margin-top: 0.313em;
        margin-bottom: 0.939em;
    }
    span {
        margin-bottom: 0.35em;
        cursor: pointer;
        border-radius: 15%;
    }
`;

const EtcBox = styled.div`
    width: 100%;
    margin-top: 1.25em;
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

    const moveWritePage = () => {
        router.push('/blog/write');
    };

    return (
        <Wrapper>
            <ProfileImgeBox>
                <span style={{ cursor: 'pointer' }} onClick={moveWritePage}>
                    <PencilToggle />
                </span>
                <ProfileImg></ProfileImg>
                <span>IceMan</span>
                <p>아이스맨 같은 개발자가 되고 싶은 사람입니다.</p>
            </ProfileImgeBox>
            <CategoriBox>
                <p>Categoris</p>
                {categoris.map((categori, i) => {
                    return (
                        <Tag
                            onClick={() => openCategori(categori.name, categori.isActive)}
                            color={categori.isActive ? '#108ee9' : ''}
                            key={i}
                        >
                            {categori.name}
                        </Tag>
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
