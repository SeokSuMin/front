import styled from 'styled-components';
import wrapper from '../store/configStore';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { RadioChangeEvent } from 'antd';
import Skill from '../components/introduction/Skill';
import { motion, useScroll } from 'framer-motion';
import Library from '../components/introduction/Library';
import Banner from '../components/introduction/Banner';
import AboutMe from '../components/introduction/AboutMe';
import Progress from '../components/animation/Progress';
import Plan from '../components/introduction/Plan';
import { checkUserloginThunk } from '../thunk/userThunk';
import axios from 'axios';
import Seo from '../components/Seo';
import Rightsolid from '../public/angles-right-solid.svg';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Skills from '../components/introduction/Skills';
import SkillLevel from '../components/introduction/SkillLevel';
import PortfolioIntro from '../components/introduction/PortfolioIntro';

const Wrapper = styled(motion.div)`
    width: 100%;
`;

const MoveBlogPageTextBox = styled.div`
    width: 60%;
    font-weight: bold;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    /* h1 {
        font-size: 1.25em;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-family: 'NanumSquareRoundEB', sans-serif;
    }
    h1:hover {
        text-decoration: underline;
    }
    svg {
        width: 1em;
        margin-left: 0.313em;
    } */
`;

const BlogMoveBtn = styled.button`
    width: 150px;
    height: 50px;
    border: none;
    border-radius: 10rem;
    color: white;
    background-color: rgb(243, 94, 54);
    cursor: pointer;
    font-family: 'NanumSquareRoundEB', sans-serif;
`;

// InferGetServerSidePropsType<typeof getServerSideProps>
export default function Home() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['order', 'myLike', 'myComment', 'viewType']);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [skill, setSkill] = useState<'1' | '2'>('1');
    const { scrollYProgress } = useScroll();

    const contactBtn = () => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    const changeSkill = (e: RadioChangeEvent) => {
        setSkill(e.target.value);
    };

    // 초기페이지 오면 쿠키 초기화
    useEffect(() => {
        removeCookie('order', { path: '/' });
        removeCookie('myLike', { path: '/' });
        removeCookie('myComment', { path: '/' });
        removeCookie('viewType', { path: '/' });
    }, []);

    return (
        <Wrapper>
            <Seo title="Ice Man | 소개페이지"></Seo>
            <Progress scrollYProgress={scrollYProgress} />
            <Banner contactBtn={contactBtn} />
            <AboutMe scrollRef={scrollRef} />
            <Skills />
            <SkillLevel skill={skill} changeSkill={changeSkill} />
            <PortfolioIntro />
            <Plan />
            <MoveBlogPageTextBox>
                <BlogMoveBtn
                    onClick={() =>
                        router.push({
                            pathname: `/blog/categori_0`,
                            query: { page: '1', countList: '15', type: 'CARD' },
                        })
                    }
                >
                    블로그 방문하기 ▶{/* <Rightsolid /> */}
                </BlogMoveBtn>
            </MoveBlogPageTextBox>
        </Wrapper>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async ({ req }) => {
        const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
        axios.defaults.headers.common['Cookie'] = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
        if (req && cookie) {
            axios.defaults.headers.common['Cookie'] = cookie;
        }
        // 로그인 사용자 체크
        await dispatch(checkUserloginThunk());
        return {
            props: {},
        };
    };
});
