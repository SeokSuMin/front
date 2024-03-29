import { motion, MotionValue } from 'framer-motion';
import { memo } from 'react';
import styled from 'styled-components';

interface IProgressBarProps {
    scrollYProgress: MotionValue<number>;
}

const ProgressBar = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 0.625rem;
    background: rgb(104, 135, 148);
    transform-origin: 0%;
    z-index: 999;
`;

const Progress = ({ scrollYProgress }: IProgressBarProps) => {
    return <ProgressBar style={{ scaleX: scrollYProgress }} />;
};

export default memo(Progress);
