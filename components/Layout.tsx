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

const Wrapper = styled.div`
    background-color: white;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .ant-back-top {
        right: 50px;
    }
`;

const IntroLayout = styled.div`
    width: 100%;
    /* max-width: 68.75rem; */
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
    h1 {
        color: white;
        font-size: 1.563rem;
        margin-top: 1.2em;
    }
    svg {
        margin-top: 0.714em;
        width: 2.188rem;
        height: 2.188rem;
        fill: white;
    }
    h3 {
        margin-top: 0.938em;
        margin-bottom: 1.875em;
        color: white;
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
                <h1>Mail Address: yahoo2344@naver.com</h1>
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </svg>
                </a>
                <h3>본 웹사이트는 개인이 작성한 포트폴리오 입니다. 상단 개인 이미지 무단 복사를 금지합니다.</h3>
            </Footer>
            <BackTop>
                <div style={style}>UP</div>
            </BackTop>
            {loginVisible ? <UserModalView {...{ isVisible: loginVisible, scrollY: scrollY.get() }} /> : null}
            {dashBoardVisible ? <DashBoard {...{ isVisible: dashBoardVisible, scrollY: scrollY.get() }} /> : null}
        </Wrapper>
    );
};

export default Layout;
