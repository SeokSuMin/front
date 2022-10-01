import { BackTop } from 'antd';
import { useScroll } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../store/hooks';
import Progress from './animation/Progress';
import BlogLayout from './BlogLayout';
import NavBar from './NavBar';
import DashBoard from './user/DashBoard';
import UserModalView from './user/UserModalView';
import GitHub from '../public/github.svg';
import FaceBook from '../public/facebook.svg';
import Instagram from '../public/instagram.svg';
import Mail from '../public/mail.svg';

const Wrapper = styled.div`
    background-color: white;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    /* .ant-back-top {
        right: 50px;
    } */
`;

const IntroLayout = styled.div`
    width: 100%;
    max-width: 68.75rem;
    min-height: 100%;
    padding-bottom: 11.25em;
`;
const Footer = styled.div<{ path: string }>`
    width: 100%;
    /* max-width: ${(props) => (props.path === '/' ? '100%' : '68.75rem')}; */
    max-width: 100%;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #c9d6ff; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #e2e2e2, #c9d6ff); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #e2e2e2,
        #c9d6ff
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    h3 {
        margin-top: 0.938em;
        margin-bottom: 1.875em;
        color: white;
    }
`;

const IconBox = styled.div`
    svg {
        margin-top: 0.714em;
        margin-left: 0.625em;
        width: 2.188rem;
        height: 2.188rem;
        fill: white;
    }
`;

const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
};
interface ILayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const router = useRouter();
    const { scrollYProgress, scrollY } = useScroll();
    const { loginVisible, dashBoardVisible } = useAppSelector((state) => state.userToggle);
    return (
        <Wrapper>
            <Progress scrollYProgress={scrollYProgress} />
            <NavBar />
            {router.pathname !== '/' ? <BlogLayout>{children}</BlogLayout> : <IntroLayout>{children}</IntroLayout>}
            <Footer path={router.pathname}>
                <IconBox>
                    <a href="https://www.instagram.com/seoks00min/" target="_blank" rel="noreferrer">
                        <Instagram />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100004078510540" target="_blank" rel="noreferrer">
                        <FaceBook />
                    </a>
                    <a onClick={() => window.open('mailto:yahoo2344@naver.com?subject=&body=')}>
                        <Mail />
                    </a>
                    <a href="https://github.com/SeokSuMin/front" target="_blank" rel="noreferrer">
                        <GitHub />
                    </a>
                </IconBox>
                <h3>본 웹사이트는 개인이 작성한 포트폴리오 입니다. 개인 이미지 무단 복사를 금지합니다.</h3>
            </Footer>
            {/* <BackTop>
                <div style={style}>UP</div>
            </BackTop> */}
            {loginVisible ? <UserModalView {...{ isVisible: loginVisible, scrollY: scrollY.get() }} /> : null}
            {dashBoardVisible ? <DashBoard {...{ isVisible: dashBoardVisible, scrollY: scrollY.get() }} /> : null}
        </Wrapper>
    );
};

export default Layout;
