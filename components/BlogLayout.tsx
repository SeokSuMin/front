import { motion, useScroll } from 'framer-motion';
import styled from 'styled-components';
import Progress from './animation/Progress';
import LeftProfile from './blog/LeftProfile';
import { CaretRightOutlined } from '@ant-design/icons';
import { Drawer, Tag } from 'antd';
import { useEffect, useState } from 'react';
import CategorisDrawer from './blog/CategorisDrawer';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
    width: 100%;
    max-width: 68.75rem;
    display: flex;
    flex-direction: column;
    padding-bottom: 11.25em;
    min-height: 100%;
    position: relative;
`;

const TopImageBox = styled.div`
    width: 100%;
    height: 21.875rem;
    background-image: url('/topImage.jpg');
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
`;
const TitleBox = styled.div`
    text-align: center;
    margin-left: 6.25em;
    font-style: italic;
    h1 {
        font-size: 2.188rem;
    }
    h2 {
        font-size: 1.875rem;
        margin-top: 0.667em;
    }
`;

const BodyBox = styled.div`
    width: 100%;
    margin-top: 3.125em;
    position: relative;
    display: flex;
`;

const LeftSideToggleBox = styled.div`
    width: 8%;
    height: 100%;
    position: sticky;
    top: 45%;
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
`;

interface IBlogLayoutProps {
    children?: React.ReactNode;
}

const BlogLayout: React.FC<IBlogLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const DrawerVisible = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    useEffect(() => {
        const windowResize = () => {
            if (window.innerWidth > 575) {
                setVisible(false);
            }
        };
        window.addEventListener(`resize`, windowResize);

        return () => {
            window.removeEventListener(`resize`, windowResize);
        };
    }, []);

    return (
        <Wrapper>
            <TopImageBox onClick={() => router.push('/blog')}>
                <TitleBox>
                    <h1>REACT PROJECT</h1>
                    <h2>MY BLOG</h2>
                </TitleBox>
            </TopImageBox>
            <BodyBox>
                <LeftSideToggleBox onClick={DrawerVisible}>
                    <LeftSideToggle>
                        <CaretRightOutlined />
                    </LeftSideToggle>
                </LeftSideToggleBox>
                <CategorisDrawer {...{ visible, closeDrawer }} />
                <LeftProfile />
                {children}
            </BodyBox>
        </Wrapper>
    );
};

export default BlogLayout;
