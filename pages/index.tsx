import styled from 'styled-components';
import wrapper from '../store/configStore';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { RadioChangeEvent, Rate } from 'antd';
import Skill from '../components/introduction/Skill';
import { motion, useScroll } from 'framer-motion';
import Library from '../components/introduction/Library';
import Intro from '../components/introduction/Intro';
import Career from '../components/introduction/Career';
import Progress from '../components/animation/Progress';
import Plan from '../components/introduction/Plan';
import { checkUserloginThunk } from '../thunk/userThunk';
import axios from 'axios';
import Seo from '../components/Seo';

const Chart = dynamic(() => import('../components/introduction/Chart'), { ssr: false });

const Wrapper = styled(motion.div)`
    width: 100%;
`;

const CurrentUseSkillBox = styled(motion.div)`
    width: 70%;
    margin: 0 auto;
    margin-top: 12.5em;
    padding: 0.938em;
    text-align: center;
    h2 {
        font-size: 2.5rem;
        font-weight: bold;
    }
    p {
        margin-top: 0.938em;
        font-size: 1.25rem;
        font-weight: bold;
    }
    @media screen and (max-width: 40.625rem) {
        width: 80%;
    }
`;

const SkillBox = styled(motion.div)`
    width: 100%;
    display: flex;
    @media screen and (max-width: 40.625rem) {
        flex-direction: column;
    }
`;

const DetailSkillBox = styled.div`
    margin-top: 1.875em;
    &:first-child {
        width: 70%;
    }
    &:last-child {
        width: 30%;
    }
    @media screen and (max-width: 40.625rem) {
        &:first-child {
            width: 100%;
        }
        &:last-child {
            width: 100%;
        }
    }
`;

// InferGetServerSidePropsType<typeof getServerSideProps>
export default function Home() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [skill, setSkill] = useState<'1' | '2'>('1');
    const { scrollYProgress } = useScroll();

    const contactBtn = () => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    const changeSkill = (e: RadioChangeEvent) => {
        setSkill(e.target.value);
    };

    return (
        <Wrapper>
            <Seo title="Ice Man | 소개페이지"></Seo>
            <Progress scrollYProgress={scrollYProgress} />
            <Intro contactBtn={contactBtn} />
            <Career scrollRef={scrollRef} />
            <Chart skill={skill} changeSkill={changeSkill} />
            <CurrentUseSkillBox>
                <h2>Current App Use Skill</h2>
                <p>아이콘을 움직여 보세요!</p>
                <SkillBox>
                    <DetailSkillBox>
                        <Skill />
                    </DetailSkillBox>
                    <DetailSkillBox>
                        <Library />
                    </DetailSkillBox>
                </SkillBox>
            </CurrentUseSkillBox>
            <Plan />
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
