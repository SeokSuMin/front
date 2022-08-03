import { Select } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';
import TwoSquareToggle from '../../public/2-squares.svg';
import FourSquareToggle from '../../public/4-squares.svg';
import BasicListToggle from '../../public/BasicList.svg';

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
        padding-left: 10px;
    }
    svg {
        width: 20px;
        height: 30px;
        margin-right: 5px;
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
}

const TopMenu = ({ viewType, changeListView }: ITopMenuProps) => {
    return (
        <Wrapper>
            <ToggleBox>
                {/* <BasicListToggle className={viewType === 2 ? 'active' : ''} onClick={() => changeListView(1)} /> */}
                <TwoSquareToggle className={viewType === 2 ? 'active' : ''} onClick={() => changeListView(2)} />
                <FourSquareToggle className={viewType === 1 ? 'active' : ''} onClick={() => changeListView(1)} />
                <div>
                    <Select defaultValue="all" style={{ width: 100 }}>
                        <Option value="all">전체</Option>
                        <Option value="10">10개씩</Option>
                        <Option value="20">20개씩</Option>
                        <Option value="30">30개씩</Option>
                    </Select>
                </div>
            </ToggleBox>
        </Wrapper>
    );
};

export default memo(TopMenu);
