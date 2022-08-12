import { Drawer, Tag } from 'antd';
import styled from 'styled-components';
import XToggle from '../public/x-Toggle.svg';

const Wrapper = styled.div`
    width: 100%;
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

interface ICategorisDrawerProps {
    visible: boolean;
    closeDrawer: () => void;
    categoris: { name: string; isActive: boolean }[];
    openCategori: (name: string, isActive: boolean) => void;
}

const CategorisDrawer = ({ visible, closeDrawer, categoris, openCategori }: ICategorisDrawerProps) => {
    return (
        <Drawer
            title={`Categoris`}
            placement="left"
            closable={false}
            visible={visible}
            onClose={closeDrawer}
            style={{ top: 60 }}
        >
            <Wrapper>
                <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>전체보기 (23)</span>
                <Categoris>
                    <ul>
                        <li>
                            <span>• 일상의 순간</span>
                        </li>
                        <li>
                            <span>└ 여행 (10)</span>
                        </li>
                        <li>
                            <span>└ 음식 (10)</span>
                        </li>
                        <li>
                            <span>└ 운동 (10)</span>
                        </li>
                        <li>
                            <span>└ 게임 (5)</span>
                        </li>
                        <li>
                            <span>└ 영화 (90)</span>
                        </li>
                    </ul>
                </Categoris>
                <Categoris>
                    <ul>
                        <li>
                            <span>• 프로그래밍</span>
                        </li>
                        <li>
                            <span>└ java (10)</span>
                        </li>
                        <li>
                            <span>└ React.js (10)</span>
                        </li>
                        <li>
                            <span>└ Node.js (10)</span>
                        </li>
                        <li>
                            <span>└ 개발일지 (5)</span>
                        </li>
                    </ul>
                </Categoris>
            </Wrapper>
        </Drawer>
    );
};

export default CategorisDrawer;
