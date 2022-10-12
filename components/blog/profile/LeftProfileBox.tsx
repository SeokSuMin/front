import { CaretRightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import CategorisDrawer from './CategorisDrawer';
import Profile from './Profile';

const Wrapper = styled.div`
    width: 11.563em;
    margin-top: 2.188em;
    //width: 18%;
    //min-width: 8.125rem;
    @media screen and (max-width: 36rem) {
        width: 15%;
        min-width: 15%;
    }
`;
const LeftSideToggleBox = styled.div`
    height: 100%;
    @media screen and (min-width: 36rem) {
        display: none;
    }
`;

const LeftSideToggle = styled(motion.div)`
    width: 1.875rem;
    height: 3rem;
    border: 0.0625rem solid rgb(217, 217, 217);
    border-left: 0px;
    border-radius: 0px 0.625rem 0.625rem 0px;
    color: rgb(170, 170, 170);
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    position: sticky;
    top: 45%;
`;

interface ILeftProfileBox {
    DrawerVisible: () => void;
    closeDrawer: () => void;
    visible: boolean;
    detailViewVisible: boolean;
}

const LeftProfileBox = ({ DrawerVisible, closeDrawer, visible, detailViewVisible }: ILeftProfileBox) => {
    return (
        <>
            {detailViewVisible ? (
                <Wrapper>
                    <LeftSideToggleBox onClick={DrawerVisible}>
                        <LeftSideToggle>
                            <CaretRightOutlined />
                        </LeftSideToggle>
                    </LeftSideToggleBox>
                    <CategorisDrawer {...{ visible, closeDrawer }} />
                    <Profile />
                </Wrapper>
            ) : null}
        </>
    );
};

export default LeftProfileBox;
