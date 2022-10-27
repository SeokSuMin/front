import { RadioChangeEvent } from 'antd';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
const Chart = dynamic(() => import('./Chart'), { ssr: false });

const Wrapper = styled.div`
    width: 100%;
    height: 800px;
    padding: 7.5em 0px 7.5em 0px;
    background-image: url('/skillLevel.jpg');
`;

const TitleBox = styled.div`
    text-align: center;
    font-size: 3.125rem;
    margin-bottom: 2em;
    h1 {
        color: rgb(70, 35, 0);
        font-family: 'Black Han Sans', sans-serif;
    }
`;
interface ISkillChart {
    skill: '1' | '2';
    changeSkill: (e: RadioChangeEvent) => void;
}

const SkillLevel = ({ skill, changeSkill }: ISkillChart) => {
    return (
        <Wrapper>
            <TitleBox>
                <h1>SKILL LEVEL</h1>
            </TitleBox>
            <Chart skill={skill} changeSkill={changeSkill} />
        </Wrapper>
    );
};

export default SkillLevel;
