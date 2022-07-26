import { MutableRefObject } from 'react';
import styled from 'styled-components';

const CareerBox = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 9.375em;
    padding: 0.938em;
    font-weight: bold;
`;

const CareerText = styled.div`
    text-align: center;
    h2 {
        font-size: 2.5rem;
        margin-bottom: 1.25em;
    }
    P {
        font-size: 1.25rem;
        line-height: 1.7rem;
        margin-top: 1.25em;
    }
`;

const Careers = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 3.125em;
`;

const CareerView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h2 {
        font-size: 1.875rem;
        margin-top: 0.333em;
    }
    h3 {
        margin-top: 0.313em;
    }
`;

const CareerIcon = styled.svg`
    width: 6.875rem;
    height: 6.875rem;
    fill: rgb(105, 160, 199);
`;

interface ICareer {
    scrollRef: MutableRefObject<HTMLDivElement>;
}

const Career = ({ scrollRef }: ICareer) => {
    return (
        <CareerBox ref={scrollRef}>
            <CareerText>
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
            </Careers>
        </CareerBox>
    );
};

export default Career;
