import { AnimatePresence, motion, useScroll } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
`;

const DetailInfoBox = styled(motion.div)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const BoardInfo = styled(motion.div)`
    width: 800px;
    height: 700px;
    border: 1px solid rgb(238, 238, 239);
    border-radius: 10px;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1;
`;

const Title = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 15px 10px 15px;
    border-bottom: 1px solid rgb(238, 238, 239);
    h1 {
        font-size: 22px;
        font-weight: 900;
        max-width: 95%;
    }
    h2 {
        margin-top: 15px;
    }
`;

const SubTitle = styled.div`
    font-size: 15px;
    display: flex;
    margin-top: 8px;
    h3 {
        margin-right: 10px;
    }
    span {
        margin-left: auto;
        cursor: pointer;
        color: rgb(4, 89, 193);
    }
    span:hover {
        color: blue;
    }
`;

const Content = styled.div`
    width: 100%;
    height: 85%;
    padding: 15px;
    overflow: auto;
`;

interface IDetailInfoProps {
    boardId: null | number;
    scrollY: number;
    openDetailInfo: (boardId: null | number) => void;
    detailViewExitComplate: () => void;
}

const DetailInfo = ({ boardId, scrollY, openDetailInfo, detailViewExitComplate }: IDetailInfoProps) => {
    return (
        <AnimatePresence initial={false} onExitComplete={detailViewExitComplate}>
            {boardId ? (
                <Wrapper>
                    <DetailInfoBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => openDetailInfo(null)}
                    ></DetailInfoBox>
                    <BoardInfo
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            top: scrollY + 130,
                        }}
                    >
                        <Title>
                            <h1>안녕하세요 처음뵙겠습니다.안녕하세요 처음뵙겠습니다. 안녕하세요 처음</h1>
                            <h2>니노막시무스</h2>
                            <SubTitle>
                                <h3>2022-07-23</h3>
                                <h3>조회 53</h3>
                                <span>첨부파일</span>
                            </SubTitle>
                        </Title>
                        <Content>
                            {[1, 2, 3, 4, 5].map((v) => {
                                return (
                                    <React.Fragment key={v}>
                                        <p>
                                            안녕하세요 처음뵙겠습니다.안녕하세요 처음뵙겠습니다.안녕하세요
                                            처음뵙겠습니다.안녕하세요 처음뵙겠습니다.
                                        </p>
                                        <br />
                                    </React.Fragment>
                                );
                            })}
                            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                        </Content>
                    </BoardInfo>
                </Wrapper>
            ) : null}
        </AnimatePresence>
    );
};

export default DetailInfo;
