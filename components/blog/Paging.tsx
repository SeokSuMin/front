import styled from 'styled-components';
import { goPage } from '../../reducer/blog';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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
    const dispath = useAppDispatch();
    const { paging } = useAppSelector((state) => state.blog);

    const movePageFunc = (prevPageNum: number, newPageNum: number) => {
        if (prevPageNum !== newPageNum) {
            dispath(goPage(newPageNum));
        }
        return;
    };

    return (
        <Wrapper>
            <PagingBox>
                <PagingList>
                    {paging.startPage > 1 ? (
                        <PagingItem onClick={() => movePageFunc(paging.page, 1)}>
                            <div>&lt;&lt;</div>
                        </PagingItem>
                    ) : null}
                    {paging.page > 1 ? (
                        <PagingItem onClick={() => movePageFunc(paging.page, paging.endPage - 10)}>
                            <div>&lt;</div>
                        </PagingItem>
                    ) : null}
                    {[...Array(paging.endPage + 1).keys()]
                        .filter((pageNum) => pageNum >= paging.startPage)
                        .map((pageNum) => {
                            return (
                                <PagingItem key={pageNum} onClick={() => movePageFunc(paging.page, pageNum)}>
                                    <div className={pageNum === paging.page ? 'active' : ''}>{pageNum}</div>
                                </PagingItem>
                            );
                        })}
                    {paging.page < paging.totalPage ? (
                        <PagingItem onClick={() => movePageFunc(paging.page, paging.startPage + 10)}>
                            <div>&gt;</div>
                        </PagingItem>
                    ) : null}
                    {paging.endPage < paging.totalPage ? (
                        <PagingItem onClick={() => movePageFunc(paging.page, paging.totalPage)}>
                            <div>&gt;&gt;</div>
                        </PagingItem>
                    ) : null}
                </PagingList>
            </PagingBox>
        </Wrapper>
    );
};

export default Paging;
// https://zepinos.tistory.com/28