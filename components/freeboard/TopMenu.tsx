import { Select } from 'antd';
import { memo, MutableRefObject } from 'react';
import styled from 'styled-components';
import TwoSquareToggle from '../../public/2-squares.svg';
import FourSquareToggle from '../../public/4-squares.svg';
import BasicListToggle from '../../public/BasicList.svg';
import { changeCountList, goPage } from '../../reducer/blog';
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
    viewType: number;
    changeListView: (type: number) => void;
    scrollRef: MutableRefObject<HTMLDivElement>;
}

const TopMenu = ({ viewType, changeListView, scrollRef }: ITopMenuProps) => {
    const dispath = useAppDispatch();
    const {
        paging: { countList },
    } = useAppSelector((state) => state.blog);
    const changeCountListValue = (value: number) => {
        dispath(changeCountList(value));
    };

    return (
        <Wrapper ref={scrollRef}>
            <ToggleBox>
                {/* <BasicListToggle className={viewType === 2 ? 'active' : ''} onClick={() => changeListView(1)} /> */}
                <TwoSquareToggle className={viewType === 2 ? 'active' : ''} onClick={() => changeListView(2)} />
                <FourSquareToggle className={viewType === 1 ? 'active' : ''} onClick={() => changeListView(1)} />
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
