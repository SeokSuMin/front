import styled from 'styled-components';
import Slider from 'react-slick';

const Wrapper = styled.div`
    width: 100%;
    /* margin-top: 6.25em; */
    padding: 7.5em 0px 7.5em 0px;
    background-color: rgb(41, 131, 59);
`;

const IntroBackgroundBox = styled.div`
    width: 75%;
    // 590
    min-width: 59.375rem;
    margin: 0 auto;
    padding: 6.25em 0px 6.25em 0px;
    // max-height: 800px;
    //max-width: 59.375rem;
    background-color: rgb(41, 131, 59);
    border-radius: 5rem;
    @media screen and (max-width: 60.625rem) {
        width: 90%;
        min-width: 0px;
        // max-height: 0px;
        // flex-direction: column;
    }
`;

const TitleBox = styled.div`
    text-align: center;
    font-size: 3.125rem;
    margin-bottom: 2em;
    h1 {
        // color: rgb(64, 64, 64);
        color: white;
        // TitleBox
        font-family: 'NanumSquareRoundEB', sans-serif;
    }
    @media screen and (max-width: 51.125rem) {
        font-size: 3rem;
    }
`;

const IntroBox = styled.div`
    width: 60%;
    min-width: 53.125rem;
    background-color: white;
    margin: 0 auto;
    padding: 0.938em;
    display: flex;
    justify-content: space-between;
    border-radius: 2rem;
    .boundary {
        width: 100%;
        border-bottom: 0.0625rem solid gray;
        margin-bottom: 0.625em;
    }
    @media screen and (max-width: 55.938rem) {
        width: 80%;
        flex-direction: column;
        min-width: 0px;
    }
    @media screen and (max-width: 40.625rem) {
        width: 95%;
    }
`;

const ImgBox = styled.div`
    width: 55%;
    height: 100%;
    position: relative;
    p {
        margin-left: 0.625em;
        margin-bottom: 0.625em;
        color: rgb(64, 64, 64);
        font-family: 'NanumSquareRoundEB', sans-serif;
    }
    img {
        width: 100%;
    }

    .slick-dots {
        position: static;
    }
    /* 이전, 다음 화살표 */
    .slick-prev,
    .slick-next {
        top: 98.5%;
    }
    .slick-prev {
        left: 35%;
        @media screen and (max-width: 37.5rem) {
            left: 30%;
        }
    }
    .slick-next {
        right: 35%;
        @media screen and (max-width: 37.5rem) {
            right: 30%;
        }
    }

    .slick-prev:before,
    .slick-next:before {
        color: gray;
    }
    // 중앙 아래 점
    .slick-dots li {
        margin: 0px;
    }
    img {
        max-height: 37.5rem;
        min-height: 34.375rem;
    }
    @media screen and (max-width: 55.938rem) {
        width: 100%;
    }
`;

const ContentBox = styled.div`
    width: 40%;
    padding: 0px 1.8em 0.625em 0px;
    margin-top: 2.188em;
    display: flex;
    flex-direction: column;
    color: rgb(64, 64, 64);
    @media screen and (max-width: 55.938rem) {
        width: 100%;
    }
`;

const UseDescriptionBox = styled.div`
    padding-bottom: 1.25em;
    p {
        font-family: 'NanumSquareRoundB', sans-serif;
        line-height: 1.256rem;
        font-size: 0.813rem;
    }
`;
const UseSkillcriptionBox = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 0.625em;
    display: flex;
    flex-direction: column;
    label {
        font-family: 'NanumSquareRoundEB', sans-serif;
        font-weight: bold;
    }
    span {
        font-family: 'NanumSquareRoundB', sans-serif;
        font-size: 0.875rem;
    }
`;

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const PortfolioIntro = () => {
    return (
        <Wrapper>
            <TitleBox>
                <h1>포트폴리오 사이트 소개</h1>
            </TitleBox>
            {/* <IntroBackgroundBox> */}
            <IntroBox>
                <ImgBox>
                    <p>화면소개</p>
                    <div className="boundary"></div>
                    <Slider {...settings}>
                        <div>
                            <img src="/mainView1.jpg" />
                        </div>
                        <div>
                            <img src="/mainView2.jpg" />
                        </div>
                        <div>
                            <img src="/detailView.jpg" />
                        </div>
                        <div>
                            <img src="/login.jpg" />
                        </div>
                        <div>
                            <img src="/write.jpg" />
                        </div>
                    </Slider>
                </ImgBox>
                <ContentBox>
                    <UseDescriptionBox>
                        <p>원하는 정보를 포스팅하여 공유할 수 있는 블로그 입니다.</p>
                        <br />
                        <p>지식이나 정보를 나만의 공간에 기록하고 싶어 만들게 되었습니다.</p>
                        <p>제가 배운 경험이나 지식을 모두에게 공유할 수 있는 그날이 오길 기대합니다.</p>
                        <br />
                        <p>CSR, SSR을 사용해 서버 데이터를 받아오도록 구현했습니다.</p>
                        <p>REDUX TOOLKIT을 통해 전역 상태를 관리하고, NEXT.JS의 라우팅 기능을 사용했습니다.</p>
                        <p>
                            로그인 전략은 PASSPORT를 사용했고, 각 프론트 - 서버간의 통신은 REST API를 통해 진행했습니다.
                        </p>
                    </UseDescriptionBox>
                    <div className="boundary"></div>
                    <UseSkillcriptionBox>
                        <label>FrontEnd</label>
                        <br />
                        <span>React.js, TypeScript, ReduxToolkit, Next.js</span>
                        <br />
                        <label>BackEnd</label>
                        <br />
                        <span>Node.js, TypeScript, Postgresql, AWS, Docker</span>
                    </UseSkillcriptionBox>
                </ContentBox>
            </IntroBox>
            {/* </IntroBackgroundBox> */}
        </Wrapper>
    );
};

export default PortfolioIntro;
