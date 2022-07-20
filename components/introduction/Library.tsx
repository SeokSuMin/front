import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 300px;
    background-color: #cfd2cf;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    h3 {
        font-size: 18px;
        margin-top: 2px;
    }
`;
const LibraryBox = styled.div`
    width: 100%;
    height: 60%;
`;
const ToolBox = styled.div`
    width: 100%;
    height: 34%;
`;

const Title = styled.p`
    font-size: 10px;
    color: black;
    margin-top: 10px;
    margin-bottom: 5px;
`;

const Library = () => {
    return (
        <>
            <Wrapper>
                <LibraryBox>
                    <Title>Library</Title>
                    <h3>next js</h3>
                    <h3>react query</h3>
                    <h3>redux toolkit</h3>
                    <h3>styled-components</h3>
                    <h3>ant design</h3>
                    <h3>apexcharts</h3>
                    <h3>framer-motion</h3>
                </LibraryBox>
                <ToolBox>
                    <hr />
                    <Title>Tool</Title>
                    <h3>vs code</h3>
                    <h3>Git</h3>
                    <h3>Source Tree</h3>
                </ToolBox>
            </Wrapper>
        </>
    );
};

export default Library;
