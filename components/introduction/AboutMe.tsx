import { MutableRefObject } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 55%;
    max-width: 59.375rem;
    min-width: 40.625rem;
    margin: 0 auto;
    padding: 7.5em 0px 7.5em 0px;
    // padding: 0.938em;
    //padding-top: 6.25em;
    font-weight: bold;
    @media screen and (max-width: 41.875rem) {
        min-width: 25rem;
    }
`;

const TitleBox = styled.div`
    text-align: center;
    font-size: 3.125rem;
    margin-bottom: 2em;
    font-family: 'Black Han Sans', sans-serif;
`;

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    @media screen and (max-width: 41.875rem) {
        flex-direction: column;
        align-items: center;
    }
`;

const MyPhotoBox = styled.div`
    width: 45%;
    // margin-right: 5%;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 41.875rem) {
        width: 100%;
        margin-bottom: 3.215em;
    }
`;

const ProfileImage = styled.div`
    width: 12.5rem;
    height: 12.5rem;
    background-image: url('/profile.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    border: 0.125em solid white;
`;

const MyProfileBox = styled.div`
    width: 50%;
    min-width: 390px;
    font-family: 'NanumSquareRoundEB', sans-serif;
    label {
        display: inline-block;
        width: 9rem;
        color: rgb(0, 41, 122);
        // text-shadow: 0.062rem 0.062rem rgb(133, 139, 151);
        font-size: 1.563rem;
    }
    span {
        font-size: 1.3rem;
    }
    @media screen and (max-width: 41.875rem) {
        width: 90%;
    }
`;

const ProfileText = styled.div`
    margin-bottom: 1.875em;
    display: flex;
    align-items: center;
`;

interface ICareer {
    scrollRef: MutableRefObject<HTMLDivElement | null>;
}

const AboutMe = ({ scrollRef }: ICareer) => {
    return (
        <Wrapper ref={scrollRef}>
            <TitleBox>
                <h1>ABOUT ME</h1>
            </TitleBox>
            <ContentBox>
                <MyPhotoBox>
                    <ProfileImage />
                </MyPhotoBox>
                <MyProfileBox>
                    <ProfileText>
                        <label>이름</label>
                        <span>석수민</span>
                    </ProfileText>
                    <ProfileText>
                        <label>생년월일</label>
                        <span>1992.01.18</span>
                    </ProfileText>
                    <ProfileText>
                        <label>연락처</label>
                        <span>010-7280-5999</span>
                    </ProfileText>
                    <ProfileText style={{ alignItems: 'flex-start' }}>
                        <label>이메일</label>
                        <span>yahoo2344@naver.com</span>
                    </ProfileText>
                    <ProfileText>
                        <label>개발경력</label>
                        <span>2년</span>
                    </ProfileText>
                </MyProfileBox>
            </ContentBox>
            {/* <CareerText>
                <h2>About me</h2>
                <p>2년간 사내 웹 서비스, 웹 크롤링, 외부 API 수집 관련 업무를 진행했습니다.</p>
                <p>프론트는 리액트, 서버는 노드와 AWS를 사용하여 구성하였습니다.</p>
            </CareerText>
            <Careers>
                <CareerView>
                    <CareerIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
                    </CareerIcon>

                    <h2>Front end</h2>
                    <h3>HTML, CSS, JavaScript, TypeScript, React</h3>
                </CareerView>
                <CareerView>
                    <CareerIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M480 288H32c-17.62 0-32 14.38-32 32v128c0 17.62 14.38 32 32 32h448c17.62 0 32-14.38 32-32v-128C512 302.4 497.6 288 480 288zM352 408c-13.25 0-24-10.75-24-24s10.75-24 24-24s24 10.75 24 24S365.3 408 352 408zM416 408c-13.25 0-24-10.75-24-24s10.75-24 24-24s24 10.75 24 24S429.3 408 416 408zM480 32H32C14.38 32 0 46.38 0 64v128c0 17.62 14.38 32 32 32h448c17.62 0 32-14.38 32-32V64C512 46.38 497.6 32 480 32zM352 152c-13.25 0-24-10.75-24-24S338.8 104 352 104S376 114.8 376 128S365.3 152 352 152zM416 152c-13.25 0-24-10.75-24-24S402.8 104 416 104S440 114.8 440 128S429.3 152 416 152z" />
                    </CareerIcon>
                    <h2>Back end</h2>
                    <h3>JavaScript, Node JS, Rest Api, Postgresql, AWS</h3>
                </CareerView>
            </Careers> */}
        </Wrapper>
    );
};

export default AboutMe;
