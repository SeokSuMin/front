import styled from 'styled-components';
import wrapper from '../store/configStore';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { RadioChangeEvent } from 'antd';
import Skill from '../components/introduction/Skill';
import { motion, Variants } from 'framer-motion';
import Library from '../components/introduction/Library';

const Chart = dynamic(() => import('../components/introduction/Chart'), { ssr: false });

const Wrapper = styled(motion.div)`
    width: 100%;
`;

const IntroBox = styled.div`
    width: 100%;
    height: 600px;
    background-image: url('/banner1.png');
    // background-image: linear-gradient(135deg, #ef16f2 0%, #a5c4fc 100%);
    display: flex;
    align-items: center;
`;

const ProfileBox = styled.div`
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const ProfileImage = styled.div`
    width: 150px;
    height: 150px;
    background-image: url('/profile.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    border: 2px solid white;
`;

const IntroText = styled.div`
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 30px;
    p:first-child {
        font-size: 30px;
    }
`;

const ViewBtn = styled.button`
    background-color: transparent;
    border: 2px solid white;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    margin-top: 40px;
    padding: 5px;
    cursor: pointer;
`;
const CareerBox = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 150px;
    padding: 15px;
    font-weight: bold;
`;

const CareerText = styled.div`
    text-align: center;
    h2 {
        font-size: 40px;
        margin-bottom: 50px;
    }
    P {
        margin-top: 25px;
        font-size: 20px;
    }
`;

const Careers = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
`;

const CareerView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h2 {
        margin-top: 10px;
        font-size: 30px;
    }
    h3 {
        margin-top: 5px;
    }
`;

const CareerIcon = styled.svg`
    width: 110px;
    height: 110px;
    fill: rgb(105, 160, 199);
`;

const ChartBox = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 150px;
    padding: 15px;
    text-align: center;
    h2 {
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 40px;
        font-weight: bold;
    }
    div {
        text-align: right;
    }
`;

const CurrentUseSkillBox = styled(motion.div)`
    width: 70%;
    margin: 0 auto;
    margin-top: 150px;
    padding: 15px;
    text-align: center;
    h2 {
        font-size: 40px;
        font-weight: bold;
    }
    p {
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
    }
`;

const SkillBox = styled(motion.div)`
    width: 100%;
    display: flex;
`;

const DetailSkillBox = styled.div`
    margin-top: 30px;
    &:first-child {
        width: 70%;
    }
    &:last-child {
        width: 30%;
    }
`;

// const cardVariants: Variants = {
//     offscreen: {
//         y: 200,
//         opacity: 0,
//     },
//     onscreen: {
//         y: 50,
//         opacity: 1,
//         rotate: 0,
//         transition: {
//             type: 'spring',
//             bounce: 0.3,
//             duration: 0.5,
//         },
//     },
// };

// InferGetServerSidePropsType<typeof getServerSideProps>
export default function Home() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [skill, setSkill] = useState(1);
    const changeSkill = (e: RadioChangeEvent) => {
        setSkill(e.target.value);
    };

    return (
        <Wrapper>
            <IntroBox>
                <ProfileBox>
                    <ProfileImage />
                    <IntroText>
                        <p>2년차 풀스택 프론트엔드 개발자 입니다.</p>
                        <br />
                        <p>주력은 리액트이며 서버는 노드를 사용하고 있습니다.</p>
                    </IntroText>
                    <ViewBtn>contact me</ViewBtn>
                </ProfileBox>
            </IntroBox>
            <CareerBox>
                <CareerText>
                    <h2>About me</h2>
                    <p>2년간 사내 웹 서비스, 웹 크롤링, 외부 API 수집 관련 업무를 진행했습니다.</p>
                    <p>프론트는 리액트, 서버는 노드와 AWS를 사용하여 구성하였습니다.</p>
                </CareerText>
                <Careers>
                    <CareerView>
                        <CareerIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
                        </CareerIcon>

                        <h2>Front end</h2>
                        <h3>HTML, CSS, JavaScript, TypeScript, React</h3>
                    </CareerView>
                    <CareerView>
                        <CareerIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M480 288H32c-17.62 0-32 14.38-32 32v128c0 17.62 14.38 32 32 32h448c17.62 0 32-14.38 32-32v-128C512 302.4 497.6 288 480 288zM352 408c-13.25 0-24-10.75-24-24s10.75-24 24-24s24 10.75 24 24S365.3 408 352 408zM416 408c-13.25 0-24-10.75-24-24s10.75-24 24-24s24 10.75 24 24S429.3 408 416 408zM480 32H32C14.38 32 0 46.38 0 64v128c0 17.62 14.38 32 32 32h448c17.62 0 32-14.38 32-32V64C512 46.38 497.6 32 480 32zM352 152c-13.25 0-24-10.75-24-24S338.8 104 352 104S376 114.8 376 128S365.3 152 352 152zM416 152c-13.25 0-24-10.75-24-24S402.8 104 416 104S440 114.8 440 128S429.3 152 416 152z" />
                        </CareerIcon>
                        <h2>Back end</h2>
                        <h3>JavaScript, Node JS, Rest Api, Postgresql, AWS</h3>
                    </CareerView>
                </Careers>
            </CareerBox>
            <ChartBox>
                <Chart skill={skill} changeSkill={changeSkill} />
            </ChartBox>
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
