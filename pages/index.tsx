import styled from 'styled-components';
import wrapper from '../store/configStore';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { RadioChangeEvent } from 'antd';
import Skill from '../components/introduction/Skill';
import { motion, useScroll } from 'framer-motion';
import Library from '../components/introduction/Library';
import Intro from '../components/introduction/Intro';
import Career from '../components/introduction/Career';
import Progress from '../components/animation/Progress';

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
`;

const SkillBox = styled(motion.div)`
    width: 100%;
    display: flex;
`;

const DetailSkillBox = styled.div`
    margin-top: 1.875em;
    &:first-child {
        width: 70%;
    }
    &:last-child {
        width: 30%;
    }
`;

// InferGetServerSidePropsType<typeof getServerSideProps>
export default function Home() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [skill, setSkill] = useState(1);
    const { scrollYProgress } = useScroll();

    const contactBtn = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    const changeSkill = (e: RadioChangeEvent) => {
        setSkill(e.target.value);
    };

    return (
        <Wrapper>
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
        </Wrapper>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async (context) => {
        return {
            props: {},
        };
    };
});
