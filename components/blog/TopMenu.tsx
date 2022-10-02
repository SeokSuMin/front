import { Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { memo, MutableRefObject } from 'react';
import styled from 'styled-components';
import TwoSquareToggle from '../../public/2-squares.svg';
import FourSquareToggle from '../../public/4-squares.svg';
import BasicListToggle from '../../public/BasicList.svg';
import { changeCountList } from '../../reducer/blog/paging';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const { Option } = Select;

const Wrapper = styled.div`
    width: 100%;
    padding-bottom: 0.625em;
    background-color: white;
`;

const ToggleBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .ant-select-selector {
        height: 1.3rem !important;
    }
    svg {
        width: 1.2em;
        height: 1.2em;
        margin-right: 0.313em;
        cursor: pointer;

        /* fill: green; */
    }
    svg path {
        margin-top: auto;
    }
    .active {
        fill: green;
    }
`;

const Title = styled.div`
    margin-right: auto;
    /* margin-top: auto; */
    font-size: 0.875rem;
    font-weight: 900;
    /* .menu {
        font-size: 0.875rem;
        font-weight: 900;
    } */
    /* .categori {
        color: gray;
        font-size: 0.75rem;
    } */
`;

const Write = styled.div`
    font-size: 0.875rem;
    // margin-top: auto;
    padding-bottom: 5px;
    position: relative;
    span:first-child {
        font-size: 0.775rem;
        width: 3.125em;
        right: 2em;
        top: 0.288em;
        position: absolute;
        font-weight: 900;
        cursor: pointer;
        color: gray;
    }
    span:first-child:hover {
        text-decoration: underline;
    }
`;

interface ITopMenuProps {
    viewType: string;
    changeListView: (type: string) => void;
    scrollRef: MutableRefObject<HTMLDivElement | null>;
}

const TopMenu = ({ viewType, changeListView, scrollRef }: ITopMenuProps) => {
    const dispath = useAppDispatch();
    const router = useRouter();
    const { userId } = useAppSelector((state) => state.userInfo);
    const { categoriMenus, categoriTotal } = useAppSelector((state) => state.categoriMenus);
    const { countList, page } = useAppSelector((state) => state.paging);
    const { currentCategoriId } = useAppSelector((state) => state.blogToggle);
    const [menuTitle, setMenuTitle] = useState('');
    const [categoriTitle, setCategoriTitle] = useState('');
    const changeCountListValue = (value: number) => {
        // dispath(changeCountList(value));
        router.push({
            pathname: `/blog/categori_${currentCategoriId}`,
            query: { page, countList: value, type: viewType },
        });
    };

    const moveWritePage = () => {
        router.push(
            {
                pathname: '/blog/write',
                query: { categoriId: currentCategoriId, mode: 'write' },
            },
            // '/blog/write',
        );
    };

    useEffect(() => {
        if (currentCategoriId === 0) {
            setMenuTitle('전체보기');
            setCategoriTitle('');
        } else {
            for (const menu of categoriMenus) {
                const findCategori = menu.categoris.find((c) => c?.categori_id === currentCategoriId);
                if (findCategori) {
                    setMenuTitle(menu.menu_name);
                    setCategoriTitle(findCategori.categori_name);
                    break;
                }
            }
        }
    }, [currentCategoriId]);

    return (
        <Wrapper ref={scrollRef}>
            <ToggleBox>
                <Title>
                    <span className="menu">{menuTitle}</span>
                    {currentCategoriId !== 0 ? (
                        <>
                            <span>, </span>
                            <span className="categori">{categoriTitle}</span>
                        </>
                    ) : null}
                </Title>
                {userId === 'iceMan' ? (
                    <Write>
                        <span onClick={moveWritePage}>글쓰기</span>
                        <span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </Write>
                ) : null}

                <TwoSquareToggle
                    className={viewType === 'LIST' ? 'active' : ''}
                    onClick={() => changeListView('LIST')}
                />
                <FourSquareToggle
                    className={viewType === 'CARD' ? 'active' : ''}
                    onClick={() => changeListView('CARD')}
                />
                <div>
                    <Select onChange={changeCountListValue} value={countList} style={{ width: 80 }}>
                        <Option value={15}>15개씩</Option>
                        <Option value={30}>30개씩</Option>
                        <Option value={45}>45개씩</Option>
                    </Select>
                </div>
            </ToggleBox>
        </Wrapper>
    );
};

export default memo(TopMenu);
