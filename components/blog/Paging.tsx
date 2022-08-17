import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';

const Wrapper = styled.div`
    width: 100%;
    margin-top: 40px;
`;

const PagingBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const PagingList = styled.ul`
    display: flex;
    align-items: center;
`;

const PagingItem = styled.li`
    margin-left: 0.313em;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    div {
        padding: 5px;
        border: 1px solid rgb(217, 217, 217);
        border-radius: 3px;
    }
    .active {
        color: white;
        border: 1px solid rgb(24, 144, 255);
        background-color: rgb(24, 144, 255);
    }
`;
const Paging = () => {
    const { paging } = useAppSelector((state) => state.blog);
    return (
        <Wrapper>
            <PagingBox>
                <PagingList>
                    <PagingItem>
                        <div>처음</div>
                    </PagingItem>
                    <PagingItem>
                        <div>이전</div>
                    </PagingItem>
                    <PagingItem>
                        <div className="active">1</div>
                    </PagingItem>
                    <PagingItem>
                        <div>2</div>
                    </PagingItem>
                    <PagingItem>
                        <div>3</div>
                    </PagingItem>
                    <PagingItem>
                        <div>다음</div>
                    </PagingItem>
                    <PagingItem>
                        <div>마지막</div>
                    </PagingItem>
                </PagingList>
            </PagingBox>
        </Wrapper>
    );
};

export default Paging;
// https://zepinos.tistory.com/28
