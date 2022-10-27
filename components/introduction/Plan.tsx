import { Rate } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 60%;
    margin: 0 auto;
    padding: 7.5em 0px 11.25em 0px;

    h2 {
        font-size: 2.5rem;
        font-weight: bold;
        line-height: 3rem;
    }
    @media screen and (max-width: 40.625rem) {
        width: 80%;
    }
`;

const TitleBox = styled.div`
    text-align: center;
    font-size: 3.125rem;
    margin-bottom: 2em;
    h1 {
        color: black;
        font-family: 'Black Han Sans', sans-serif;
    }
`;

const TotalListBox = styled.div`
    margin-top: 3.005em;
    background-color: rgb(46, 115, 191);
    display: flex;
    padding: 1.875em 0.938em;
    border-radius: 0.625em;
    @media screen and (max-width: 40.625rem) {
        flex-direction: column;
    }
`;

const PlanList = styled.ul`
    width: 50%;
    background-color: rgb(235, 236, 240);
    padding: 0.938em;
    border-radius: 0.625em;
    &:first-child {
        margin-right: 1.875em;
    }
    @media screen and (max-width: 40.625rem) {
        width: 100%;
        &:first-child {
            margin-bottom: 1.875em;
        }
    }
`;
const PlanItem = styled.li`
    &:first-child {
        color: rgb(85, 94, 109);
        font-size: 1.25rem;
        font-weight: bold;
        text-align: left;
        margin-bottom: 1em;
        font-family: 'NanumSquareRoundEB', sans-serif;
    }
    &:not(:first-of-type) {
        color: rgb(85, 94, 109);
        padding: 0.625em;
        background-color: white;
        text-align: left;
        margin-bottom: 0.625em;
        border-radius: 0.313em;
        font-size: 0.938em;
        display: flex;
        flex-direction: column;
        font-family: 'NanumSquareRoundB', sans-serif;
    }
    span:nth-child(2) {
        text-align: right;
        margin-top: 0.625em;
        .ant-rate-star:not(:last-child) {
            margin-right: 0.125em;
        }
    }
`;

const Plan = () => {
    return (
        <Wrapper>
            <TitleBox>
                <h1>NEXT PLAN</h1>
            </TitleBox>
            <TotalListBox>
                <PlanList>
                    <PlanItem>
                        <span>계획</span>
                    </PlanItem>
                    <PlanItem>
                        <span>리액트 18버전 알아보기</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={5} />
                        </span>
                    </PlanItem>
                    <PlanItem>
                        <span>리액트 네이티브 학습</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={4} />
                        </span>
                    </PlanItem>
                    <PlanItem>
                        <span>nest js 학습 및 적용</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={4} />
                        </span>
                    </PlanItem>
                    <PlanItem>
                        <span>next js의 더 많은 기능 알아보기</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={3.5} />
                        </span>
                    </PlanItem>
                    <PlanItem>
                        <span>css grid의 정복</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={3.5} />
                        </span>
                    </PlanItem>
                </PlanList>
                <PlanList>
                    <PlanItem>
                        <span>하고 싶은 일</span>
                    </PlanItem>
                    <PlanItem>
                        <span>중대형 프로젝트 리액트, 서버 개발</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={5} />
                        </span>
                    </PlanItem>
                    <PlanItem>
                        <span>다수 협업 프로젝트 경험</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={5} />
                        </span>
                    </PlanItem>
                    <PlanItem>
                        <span>대용량 데이터의 상태관리 경험</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={4} />
                        </span>
                    </PlanItem>
                    <PlanItem>
                        <span>인터렉티브 반응형 웹 프로젝트</span>
                        <span>
                            중요도 <Rate disabled allowHalf defaultValue={3} />
                        </span>
                    </PlanItem>
                </PlanList>
            </TotalListBox>
        </Wrapper>
    );
};

export default Plan;
