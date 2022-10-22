import styled from 'styled-components';
import Html from '../../public/intro/html-icon.svg';
import Css from '../../public/intro/css-icon.svg';
import Js from '../../public/intro/javascript-programming-language-icon.svg';
import TypeScript from '../../public/intro/typescript-programming-language-icon.svg';
import ReactJs from '../../public/intro/react-js-icon.svg';
import NextJs from '../../public/intro/nextjs-icon.svg';
import Redux from '../../public/intro/redux-icon.svg';
import Mobx from '../../public/intro/mobx.svg';
import SC from '../../public/intro/styled-components-1.svg';
import NodeJs from '../../public/intro/nodejs.svg';
import AWS from '../../public/intro/aws-icon.svg';
import Docker from '../../public/intro/docker-icon.svg';
import RestApi from '../../public/intro/rest-api-icon.svg';
import Postgresql from '../../public/intro/postgresql-icon.svg';
import Git from '../../public/intro/git-icon.svg';
import GitHub from '../../public/github.svg';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
    width: 100%;
    margin-top: 6.25em;
    padding: 120px 0px 120px 0px;
    background-color: rgb(0, 41, 122);
`;

const TitleBox = styled.div`
    text-align: center;
    font-size: 3.125rem;
    margin-bottom: 100px;
    h1 {
        color: white;
    }
`;

const SkillBox = styled.div`
    width: 50rem;
    height: 502px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    /* align-items: flex-start; */
`;

const MainSkillBox = styled.div`
    width: 25rem;
    /* height: 100%; */
    margin-right: 5em;
    padding: 1.25em;
    background-color: white;
    border-radius: 1.25rem;
`;

const MainSkillContent = styled(motion.div)`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SkillTitle = styled.div`
    width: 15.875rem;
    color: rgb(255, 102, 0);
    font-weight: bold;
    font-size: 1.563rem;
    border-bottom: 0.125rem solid rgb(161, 161, 161);
    padding: 0.2em 0px 0.2em 0px;
`;

const SubSkillBox = styled.div`
    width: 25rem;
`;

const SubSkill = styled.div`
    width: 100%;
    margin-bottom: 1.875em;
    background-color: white;
    padding: 1.25em;
    border-radius: 1.25rem;
    &:last-child {
        margin-bottom: 0px;
    }
`;

const SubSkillContent = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const IconBox = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.25em;
    div {
        width: 28%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    div:last-child {
        margin-right: 0px;
    }
    span {
        padding: 0.313em;
        font-weight: bold;
        cursor: default;
    }
    svg {
        width: 3.75rem;
        height: 3.75rem;
        cursor: pointer;
    }
`;

const Skills = () => {
    const frontEndBoxRef = useRef<HTMLDivElement>(null);
    const backEndBoxRef = useRef<HTMLDivElement>(null);
    const versionToolBoxRef = useRef<HTMLDivElement>(null);
    const [rerenderFlag, setRerenderFlag] = useState(false);
    useEffect(() => {
        // 드래그 버그때문에 강제 리렌더 한번 더
        setRerenderFlag((prev) => !prev);
    }, []);

    return (
        <>
            {rerenderFlag ? (
                <Wrapper>
                    <TitleBox>
                        <h1>SKILLS</h1>
                    </TitleBox>
                    <SkillBox>
                        <MainSkillBox>
                            <SkillTitle>
                                <span>Frontend</span>
                            </SkillTitle>
                            <MainSkillContent ref={frontEndBoxRef}>
                                <IconBox>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <Html />
                                        <span>HTML5</span>
                                    </motion.div>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <Css />
                                        <span>CSS3</span>
                                    </motion.div>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <Js />
                                        <span>JS</span>
                                    </motion.div>
                                </IconBox>
                                <IconBox>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <TypeScript />
                                        <span>TS</span>
                                    </motion.div>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <ReactJs />
                                        <span>REACT.JS</span>
                                    </motion.div>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <NextJs />
                                        <span>NEXT.JS</span>
                                    </motion.div>
                                </IconBox>
                                <IconBox>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <Redux />
                                        <span>REDUX</span>
                                    </motion.div>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <Mobx />
                                        <span>MOBX</span>
                                    </motion.div>
                                    <motion.div drag dragConstraints={frontEndBoxRef} dragElastic={1}>
                                        <SC />
                                        <span>SC</span>
                                    </motion.div>
                                </IconBox>
                            </MainSkillContent>
                        </MainSkillBox>
                        <SubSkillBox>
                            <SubSkill>
                                <SkillTitle>
                                    <span>Backend</span>
                                </SkillTitle>
                                <SubSkillContent ref={backEndBoxRef}>
                                    <IconBox>
                                        <motion.div drag dragConstraints={backEndBoxRef} dragElastic={1}>
                                            <NodeJs />
                                            <span>NODE.JS</span>
                                        </motion.div>
                                        <motion.div drag dragConstraints={backEndBoxRef} dragElastic={1}>
                                            <RestApi />
                                            <span>RESTAPI</span>
                                        </motion.div>
                                        <motion.div drag dragConstraints={backEndBoxRef} dragElastic={1}>
                                            <Postgresql />
                                            <span>POSTGRESQL</span>
                                        </motion.div>
                                    </IconBox>
                                    <IconBox>
                                        <motion.div drag dragConstraints={backEndBoxRef} dragElastic={1}>
                                            <AWS />
                                            <span>AWS</span>
                                        </motion.div>
                                        <motion.div drag dragConstraints={backEndBoxRef} dragElastic={1}>
                                            <Docker />
                                            <span>DOCKER</span>
                                        </motion.div>
                                    </IconBox>
                                </SubSkillContent>
                            </SubSkill>
                            <SubSkill>
                                <SkillTitle>
                                    <span>Version Tool</span>
                                </SkillTitle>
                                <SubSkillContent ref={versionToolBoxRef}>
                                    <IconBox>
                                        <motion.div drag dragConstraints={versionToolBoxRef} dragElastic={1}>
                                            <Git />
                                            <span>GIT</span>
                                        </motion.div>
                                        <motion.div drag dragConstraints={versionToolBoxRef} dragElastic={1}>
                                            <GitHub />
                                            <span>GITHUB</span>
                                        </motion.div>
                                    </IconBox>
                                </SubSkillContent>
                            </SubSkill>
                        </SubSkillBox>
                    </SkillBox>
                </Wrapper>
            ) : null}
        </>
    );
};

export default Skills;
