import { useScroll } from 'framer-motion';
import styled from 'styled-components';
import Progress from './animation/Progress';
import LeftProfile from './blog/LeftProfile';

const Wrapper = styled.div`
    width: 100%;
    max-width: 68.75rem;
    display: flex;
    flex-direction: column;
    padding-bottom: 11.25em;
    min-height: 100%;
`;

const TopImageBox = styled.div`
    width: 100%;
    height: 21.875rem;
    background-image: url('/topImage.jpg');
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
`;
const TitleBox = styled.div`
    text-align: center;
    margin-left: 6.25em;
    font-style: italic;
    h1 {
        font-size: 2.188rem;
    }
    h2 {
        font-size: 1.875rem;
        margin-top: 0.667em;
    }
`;

const BodyBox = styled.div`
    width: 100%;
    margin-top: 3.75em;
    position: relative;
    display: flex;
`;

const BlogLayout = ({ children }) => {
    const { scrollYProgress } = useScroll();
    return (
        <Wrapper>
            <Progress scrollYProgress={scrollYProgress} />
            <TopImageBox>
                <TitleBox>
                    <h1>REACT PROJECT</h1>
                    <h2>MY BLOG</h2>
                </TitleBox>
            </TopImageBox>
            <BodyBox>
                <LeftProfile />
                {children}
            </BodyBox>
        </Wrapper>
    );
};

export default BlogLayout;
