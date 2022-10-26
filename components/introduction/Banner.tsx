import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    // min-height: 25rem;
`;

const IntroBox = styled.div`
    width: 100%;
    height: 40.625rem;
    background-image: url('/banner2.png');
    background-size: cover;
    background-repeat: no-repeat;
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
    font-weight: bold;
    text-align: center;
    margin-top: 2.5em;
    /* padding: 0.625em; */
    h1 {
        font-size: 4.063rem;
        color: white;
        display: flex;
        justify-content: flex-start;
        font-family: 'NanumSquareRoundEB', sans-serif;
        @media screen and (max-width: 37.625rem) {
            font-size: 3.125rem;
        }
    }
    div {
        width: 50%;
        border-top: 0.188rem solid white;
        margin-top: 5em;
        margin-bottom: 2.5em;
    }
    p {
        font-size: 1.125rem;
        color: white;
        line-height: 2.222rem;
        display: flex;
        justify-content: flex-start;
        font-family: 'NanumSquareRoundB', sans-serif;
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

interface IBannerProps {
    contactBtn: () => void;
}

const Banner = ({ contactBtn }: IBannerProps) => {
    return (
        <Wrapper>
            <IntroBox>
                <ProfileBox>
                    <IntroText>
                        <h1>웹 개발자 포트폴리오</h1>
                        <div></div>
                        <p>안녕하세요.</p>
                        <p>프론트엔드 개발자 석수민 입니다.</p>
                        <p>늦게 시작했지만 누구보다 큰 꿈과 목표가 있습니다.</p>
                        <p>변화를 두려워하지 않고 무엇이든 공부할 자세가 되어있습니다.</p>
                    </IntroText>
                    {/* <ViewBtn onClick={contactBtn}>contact me</ViewBtn> */}
                </ProfileBox>
            </IntroBox>
        </Wrapper>
    );
};

export default Banner;
