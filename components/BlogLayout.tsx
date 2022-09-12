import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LeftProfileBox from './blog/LeftProfileBox';

const Wrapper = styled.div`
    width: 100%;
    max-width: 68.75rem;
    display: flex;
    flex-direction: column;
    padding-bottom: 11.25em;
    min-height: 100%;
    position: relative;
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
    margin-top: 3.125em;
    position: relative;
    display: flex;
`;

interface IBlogLayoutProps {
    children?: React.ReactNode;
}

const BlogLayout: React.FC<IBlogLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const DrawerVisible = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    useEffect(() => {
        const windowResize = () => {
            if (window.innerWidth > 575) {
                setVisible(false);
            }
        };
        window.addEventListener(`resize`, windowResize);

        return () => {
            window.removeEventListener(`resize`, windowResize);
        };
    }, []);

    return (
        <Wrapper>
            <TopImageBox
                onClick={() =>
                    router.push({
                        pathname: `/blog/categori_0`,
                        query: { page: '1', countList: '15', type: 'CARD' },
                    })
                }
            >
                <TitleBox>
                    <h1>REACT PROJECT</h1>
                    <h2>MY BLOG</h2>
                </TitleBox>
            </TopImageBox>
            <BodyBox>
                <LeftProfileBox {...{ DrawerVisible, closeDrawer, visible }} />
                {children}
            </BodyBox>
        </Wrapper>
    );
};

export default BlogLayout;
