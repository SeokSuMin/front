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

const PlanBox = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 12.5em;
    padding: 0.938em;
    text-align: center;
    h2 {
        font-size: 2.5rem;
        font-weight: bold;
        line-height: 3rem;
    }
    @media screen and (max-width: 40.625rem) {
        width: 80%;
    }
`;

const TotalListBox = styled.div`
    margin-top: 3.005em;
    background-color: rgb(46, 115, 191);
    display: flex;
    padding: 1.875em 0.938em;
    border-radius: 0.625em;
    @media screen and (max-width: 40.625rem) {
        flex-direction: column;
    }
`;

const PlanList = styled.ul`
    width: 50%;
    background-color: rgb(235, 236, 240);
    padding: 0.938em;
    border-radius: 0.625em;
    &:first-child {
        margin-right: 1.875em;
    }
    @media screen and (max-width: 40.625rem) {
        width: 100%;
        &:first-child {
            margin-bottom: 1.875em;
        }
    }
`;
const PlanItem = styled.li`
    &:first-child {
        color: rgb(85, 94, 109);
        font-size: 1.25rem;
        font-weight: bold;
        text-align: left;
        margin-bottom: 1em;
    }
    &:not(:first-of-type) {
        color: rgb(85, 94, 109);
        padding: 0.625em;
        background-color: white;
        text-align: left;
        margin-bottom: 0.625em;
        border-radius: 0.313em;
        font-size: 0.938em;
        display: flex;
        flex-direction: column;
    }
    span:nth-child(2) {
        text-align: right;
        margin-top: 0.625em;
        .ant-rate-star:not(:last-child) {
            margin-right: 0.125em;
        }
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
            <PlanBox>
                <h2>다음 계획 및 하고싶은 일</h2>
                <TotalListBox>
                    <PlanList>
                        <PlanItem>
                            <span>계획</span>
                        </PlanItem>
                        <PlanItem>
                            <span>리액트 18버전 알아보기</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={5} />
                            </span>
                        </PlanItem>
                        <PlanItem>
                            <span>리액트 네이티브 학습</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={4} />
                            </span>
                        </PlanItem>
                        <PlanItem>
                            <span>nest js 학습 및 적용</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={4} />
                            </span>
                        </PlanItem>
                        <PlanItem>
                            <span>next js의 더 많은 기능 알아보기</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={3.5} />
                            </span>
                        </PlanItem>
                        <PlanItem>
                            <span>css grid의 정복</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={3.5} />
                            </span>
                        </PlanItem>
                    </PlanList>
                    <PlanList>
                        <PlanItem>
                            <span>하고 싶은 일</span>
                        </PlanItem>
                        <PlanItem>
                            <span>중대형 프로젝트 리액트, 서버 개발</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={5} />
                            </span>
                        </PlanItem>
                        <PlanItem>
                            <span>다수 협업 프로젝트 경험</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={5} />
                            </span>
                        </PlanItem>
                        <PlanItem>
                            <span>대용량 데이터의 상태관리 경험</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={4} />
                            </span>
                        </PlanItem>
                        <PlanItem>
                            <span>인터렉티브 반응형 웹 프로젝트</span>
                            <span>
                                중요도 <Rate disabled allowHalf defaultValue={3} />
                            </span>
                        </PlanItem>
                    </PlanList>
                </TotalListBox>
            </PlanBox>
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
