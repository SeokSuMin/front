import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 18.75rem;
    background-color: rgb(245, 245, 245);
    border-radius: 0.625em;
    display: flex;
    flex-direction: column;
    h3 {
        font-size: 1.125rem;
        margin-top: 0.111em;
    }
`;
const LibraryBox = styled.div`
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const ToolBox = styled.div`
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top: 0.063em solid rgb(207, 210, 207);
`;

const Title = styled.span`
    font-size: 1.25rem;
    margin-bottom: 0.25em;
    font-weight: bold;
    color: black;
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
