import { Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

interface ICategoris {
    name: string;
    isActive: boolean;
}

const Wrapper = styled.div`
    width: 20%;
    height: 100%;
    border: 0.063em solid rgb(217, 217, 217);
    border-radius: 0.63em;
    margin-right: 0.63em;
    padding: 0.938em;
    position: sticky;
    top: 3.8em;
`;

const ProfileImgeBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.63em;
    span:first-child {
        text-decoration: underline;
    }
    span:nth-child(2) {
        color: blue;
    }
    p {
        font-size: 0.813rem;
        line-height: 1.2rem;
        margin-top: 1.538em;
    }
`;

const ProfileImg = styled.div`
    width: 4.735rem;
    height: 4.735rem;
    background-image: url('/profile.png');
    background-position: center;
    background-size: contain;
    border-radius: 50%;
    margin-top: 0.625em;
    margin-bottom: 0.625em;
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

const LeftProfile = () => {
    const router = useRouter();
    const [categoris, setCategoris] = useState<ICategoris[]>([
        { name: '전체', isActive: true },
        { name: '여행', isActive: false },
        { name: '공부', isActive: false },
        { name: '유머', isActive: false },
        { name: '육아지식', isActive: false },
        { name: '요리', isActive: false },
        { name: '맛집탐방', isActive: false },
        { name: '게임', isActive: false },
        { name: '기타', isActive: false },
    ]);

    const openCategori = (name: string, isActive: boolean) => {
        if (isActive) {
            return;
        }
        setCategoris((prevCategoris) =>
            prevCategoris.map((categori) => {
                if (categori.name === name) {
                    return { name: categori.name, isActive: true };
                } else {
                    return { name: categori.name, isActive: false };
                }
            }),
        );
    };

    const moveWritePage = () => {
        router.push('/blog/write');
    };

    return (
        <Wrapper>
            <ProfileImgeBox>
                <span style={{ cursor: 'pointer' }} onClick={moveWritePage}>
                    About Me
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </svg>
                </a>
            </EtcBox>
        </Wrapper>
    );
};

export default LeftProfile;
