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
    /* & > div {
        padding-left: 0.625em;
    } */
    svg {
        width: 1.125em;
        height: 1.563em;
        margin-right: 0.313em;
        cursor: pointer;
        /* fill: green; */
    }
    .active {
        fill: green;
    }
`;

const Title = styled.div`
    margin-right: auto;
    .menu {
        font-weight: 900;
        font-size: 0.875rem;
    }
    .categori {
        color: gray;
        font-size: 0.75rem;
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
                            <span> - </span>
                            <span className="categori">({categoriTitle})</span>
                        </>
                    ) : null}
                </Title>
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
