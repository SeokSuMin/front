import { Select } from 'antd';
import styled from 'styled-components';
import TwoSquareToggle from '../../public/2-squares.svg';
import FourSquareToggle from '../../public/4-squares.svg';
import BasicListToggle from '../../public/BasicList.svg';

const { Option } = Select;

const TopMenuBox = styled.div`
    width: 800px;
    margin: 0 auto;
    margin-top: 180px;
    padding: 10px;
`;

const BoardNameBox = styled.div`
    h1 {
        font-size: 20px;
        font-weight: bold;
        height: 20px;
    }
`;
const ToggleBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 70px;
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
        <TopMenuBox>
            <BoardNameBox>
                <h1>자유게시판</h1>
            </BoardNameBox>
            <ToggleBox>
                <TwoSquareToggle className={viewType === 3 ? 'active' : ''} onClick={() => changeListView(3)} />
                <FourSquareToggle className={viewType === 2 ? 'active' : ''} onClick={() => changeListView(2)} />
                <BasicListToggle className={viewType === 1 ? 'active' : ''} onClick={() => changeListView(1)} />
                <div>
                    <Select defaultValue="15" style={{ width: 100 }}>
                        <Option value="15">15개씩</Option>
                        <Option value="30">30개씩</Option>
                        <Option value="45">45개씩</Option>
                        <Option value="50">50개씩</Option>
                    </Select>
                </div>
            </ToggleBox>
        </TopMenuBox>
    );
};

export default TopMenu;
