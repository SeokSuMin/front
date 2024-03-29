import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';

const Wrapper = styled.div`
    width: 100%;
    margin-top: 11em;
`;

const PagingBox = styled.div`
    display: flex;
    justify-content: center;
`;

const PagingList = styled.ul`
    display: flex;
    align-items: center;
`;

const PagingItem = styled.li`
    margin-left: 0.313em;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
        padding: 0.313em;
        // border: 1px solid rgb(217, 217, 217);
        border-radius: 0.188em;
    }
    .active {
        font-weight: bold;
        font-size: 1rem;
        /* color: white;
        border: 1px solid rgb(24, 144, 255);
        background-color: rgb(24, 144, 255); */
    }
`;

const Paging = () => {
    const router = useRouter();
    const paging = useAppSelector((state) => state.paging);
    const { currentCategoriId, viewType } = useAppSelector((state) => state.blogToggle);
    const movePageFunc = (prevPageNum: number, newPageNum: number) => {
        if (prevPageNum !== newPageNum) {
            // dispath(goPage(newPageNum));
            let movePage = newPageNum > paging.endPage ? paging.endPage : newPageNum;
            movePage = movePage < 1 ? 1 : movePage;
            router.push({
                pathname: `/blog/categori_${currentCategoriId}`,
                query: { page: movePage, countList: paging.countList, type: viewType },
            });
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
