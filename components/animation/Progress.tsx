import { motion, MotionValue } from 'framer-motion';
import styled from 'styled-components';

interface IProgressBarProps {
    scrollYProgress: MotionValue<number>;
}

const ProgressBar = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: #f9ceee;
    transform-origin: 0%;
    z-index: 100;
`;

const Progress = ({ scrollYProgress }: IProgressBarProps) => {
    return <ProgressBar style={{ scaleX: scrollYProgress }} />;
};

export default Progress;
