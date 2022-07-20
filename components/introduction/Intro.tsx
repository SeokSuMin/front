import styled from 'styled-components';

const IntroBox = styled.div`
    width: 100%;
    height: 600px;
    background-image: url('/banner1.png');
    // background-image: linear-gradient(135deg, #ef16f2 0%, #a5c4fc 100%);
    display: flex;
    align-items: center;
`;

const ProfileBox = styled.div`
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const ProfileImage = styled.div`
    width: 150px;
    height: 150px;
    background-image: url('/profile.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    border: 2px solid white;
`;

const IntroText = styled.div`
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 30px;
    p:first-child {
        font-size: 30px;
    }
`;

const ViewBtn = styled.button`
    background-color: transparent;
    border: 2px solid white;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    margin-top: 40px;
    padding: 5px;
    cursor: pointer;
`;

interface IIntro {
    contactBtn: () => void;
}

const Intro = ({ contactBtn }: IIntro) => {
    return (
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
    );
};

export default Intro;
