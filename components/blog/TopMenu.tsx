import { Select } from 'antd';
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
    & > div {
        padding-left: 0.625em;
    }
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

interface ITopMenuProps {
    viewType: string;
    changeListView: (type: string) => void;
    scrollRef: MutableRefObject<HTMLDivElement | null>;
}

const TopMenu = ({ viewType, changeListView, scrollRef }: ITopMenuProps) => {
    const dispath = useAppDispatch();
    const { countList } = useAppSelector((state) => state.paging);
    const changeCountListValue = (value: number) => {
        dispath(changeCountList(value));
    };
    return (
        <Wrapper ref={scrollRef}>
            <ToggleBox>
                {/* <BasicListToggle className={viewType === 2 ? 'active' : ''} onClick={() => changeListView(1)} /> */}
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
