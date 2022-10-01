import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LeftProfileBox from './blog/LeftProfileBox';
import { BackTop } from 'antd';

const Wrapper = styled.div`
    width: 100%;
    max-width: 70.625rem;
    display: flex;
    flex-direction: column;
    padding-bottom: 11.25em;
    padding-left: 3em;
    padding-right: 3em;
    min-height: 100%;
    position: relative;
    .ant-back-top {
        right: 50px;
        //position: absolute;
    }
`;

const TopImageBox = styled.div`
    width: 100%;
    height: 25rem;
    background-image: url('/topImage2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    font-family: 'Mukta', sans-serif;
    font-family: 'Roboto Slab', serif;
    font-family: 'Source Sans Pro', sans-serif;
`;
const TitleBox = styled.div`
    text-align: center;
    margin-left: 6.25em;
    font-weight: bold;
    h1 {
        font-size: 2.188rem;
        color: white;
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

const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: 'rgb(203, 92, 222)',
    color: '#fff',
    textAlign: 'center',
};

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
                    <h1>My own universe</h1>
                </TitleBox>
            </TopImageBox>
            <BodyBox>
                <LeftProfileBox {...{ DrawerVisible, closeDrawer, visible }} />
                {children}
            </BodyBox>
            <BackTop>
                <div style={style}>UP</div>
            </BackTop>
        </Wrapper>
    );
};

export default BlogLayout;
