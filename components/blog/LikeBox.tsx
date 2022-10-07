import styled from 'styled-components';
import Heart from '../../public/heart.svg';
import HeartSolid from '../../public/heart-solid.svg';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';

const Wrapper = styled.div`
    margin-top: 2.5em;
    display: flex;
    align-items: center;
    svg {
        width: 1.2em;
        fill: rgb(195, 0, 16);
        cursor: pointer;
    }
    span {
        color: black;
        margin-left: 0.313em;
    }
`;

interface LikeBoxProps {
    likeToggle: (type: string) => void;
    like: boolean;
    likeCount: number;
}

const LikeBox = ({ likeToggle, like, likeCount }: LikeBoxProps) => {
    return (
        <Wrapper>
            <motion.div
                whileHover={{
                    scale: 1.2,
                    //scaleX: 1.01,
                }}
            >
                {like ? (
                    <HeartSolid onClick={() => likeToggle('unlike')} />
                ) : (
                    <Heart onClick={() => likeToggle('like')} />
                )}
            </motion.div>
            <span>Like {likeCount}</span>
        </Wrapper>
    );
};
export default LikeBox;
