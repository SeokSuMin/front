import styled from 'styled-components';
import NavBar from './NavBar';

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: white;
`;

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <NavBar />
            <div>{children}</div>
        </Wrapper>
    );
};

export default Layout;
