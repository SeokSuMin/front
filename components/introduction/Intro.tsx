import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    // min-height: 25rem;
`;

const IntroBox = styled.div`
    width: 100%;
    height: 500px;
    background-image: url('/banner1.png');
    // background-size: contain;
    // background-repeat: no-repeat;
    // background-position: center;
    // background-image: linear-gradient(135deg, #ef16f2 0%, #a5c4fc 100%);
    display: flex;

    align-items: center;
`;

const ProfileBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const ProfileImage = styled.div`
    width: 9.375rem;
    height: 9.375rem;
    background-image: url('/profile.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    border: 0.125em solid white;
`;

const IntroText = styled.div`
    color: white;
    font-size: 1.125rem;
    font-weight: bold;
    text-align: center;
    margin-top: 1.875em;
    p:first-child {
        font-size: 1.875rem;
        line-height: 2.3rem;
    }
`;

const ViewBtn = styled.button`
    background-color: transparent;
    border: 0.125em solid white;
    border-radius: 0.313em;
    color: white;
    font-size: 1.25rem;
    margin-top: 2em;
    padding: 0.312em;
    line-height: 1.25rem;
    cursor: pointer;
`;

interface IIntro {
    contactBtn: () => void;
}

const Intro = ({ contactBtn }: IIntro) => {
    return (
        <Wrapper>
            <IntroBox>
                <ProfileBox>
                    <ProfileImage />
                    <IntroText>
                        <p>2년차 풀스택 프론트엔드 개발자 입니다.</p>
                        <br />
                        <p>주력은 리액트이며 서버는 노드를 사용하고 있습니다.</p>
                    </IntroText>
                    <ViewBtn onClick={contactBtn}>contact me</ViewBtn>
                </ProfileBox>
            </IntroBox>
        </Wrapper>
    );
};

export default Intro;
