import styled from 'styled-components';
import Star from '../../../public/star.svg';
import StarSolid from '../../../public/star-solid.svg';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
    margin-left: 0.63em;
    margin-top: 2.5em;
    display: flex;
    align-items: center;
    svg {
        width: 1.2em;
        fill: rgb(250, 225, 0);
        cursor: pointer;
    }
    span {
        color: black;
        margin-left: 0.313em;
    }
`;

interface IFavoriteBoxProps {
    favoriteToggle: (type: string) => void;
    favorite: boolean;
}

const FavoriteBox = ({ favoriteToggle, favorite }: IFavoriteBoxProps) => {
    return (
        <Wrapper>
            <motion.div
                whileHover={{
                    scale: 1.2,
                    //scaleX: 1.01,
                }}
            >
                {favorite ? (
                    <StarSolid onClick={() => favoriteToggle('unfavorite')} />
                ) : (
                    <Star onClick={() => favoriteToggle('favorite')} />
                )}
            </motion.div>
            <span>Favorite</span>
        </Wrapper>
    );
};
export default FavoriteBox;
