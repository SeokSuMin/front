import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { useRouter } from 'next/router';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import styled from 'styled-components';
import { goPage, initTotalCount } from '../../../reducer/blog/paging';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { deleteBoardThunk } from '../../../thunk/blogThunk';
const { confirm } = Modal;

const Wrapper = styled.div`
    width: 97%;
    display: flex;
    // justify-content: space-between;
    justify-content: flex-end;
    padding-bottom: 0.688em;
    button {
        margin-left: 0.357em;
        border: none;
        border-radius: 0.357em;
        padding: 0.5em 0.714em;
        font-size: 0.75rem;
        font-weight: bold;
        cursor: pointer;
    }
    button:active {
        background-color: rgb(210, 210, 210);
    }
    @media screen and (max-width: 39.375rem) {
        width: 100%;
    }
`;

const Title = styled.div`
    margin-right: auto;
    margin-top: auto;
    font-size: 0.875rem;
    font-weight: 900;
`;

interface ITopMenuProps {
    menuTitle: string;
    categoriId: string;
    categoriTitle: string;
    setDeleteFlag: Dispatch<SetStateAction<boolean>>;
    commentDivRef: MutableRefObject<HTMLDivElement | null>;
}

const MoveBoardButtonBox = styled.div``;
const ModifyBoardButtonBox = styled.div``;

const TopMenu = ({ menuTitle, categoriId, categoriTitle, setDeleteFlag, commentDivRef }: ITopMenuProps) => {
    const router = useRouter();
    const detailBoard = useAppSelector((state) => state.boardData);
    const { userId } = useAppSelector((state) => state.userInfo);
    const { page, countList, totalCount } = useAppSelector((state) => state.paging);
    const { viewType } = useAppSelector((state) => state.blogToggle);
    const dispatch = useAppDispatch();

    const moveDetailBoard = async (boardId: string) => {
        router.push(`/blog/categori_${categoriId}/${boardId}`);
    };

    const deletefirm = (boardId: string) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: '게시글 삭제',
            content: <p>해당 게시글 및 파일이 모두 삭제됩니다.</p>,
            okText: '삭제',
            cancelText: '취소',
            async onOk() {
                try {
                    await dispatch(deleteBoardThunk(boardId)).unwrap();
                    dispatch(initTotalCount(totalCount - 1));
                    dispatch(goPage(page));
                    setDeleteFlag(true);
                    // router.push({
                    //     pathname: `/blog/categori_${currentCategoriId}`,
                    //     query: { page, countList, type: viewType },
                    // });
                } catch (err) {
                    if (err instanceof Error) {
                        console.log(err.message);
                        message.error(err.message);
                    } else {
                        message.error(err as string);
                    }
                }
            },
            onCancel() {
                // Modal.destroyAll();
            },
        });
    };

    const moveMainPage = () => {
        router.push({
            pathname: `/blog/categori_${categoriId}`,
            query: { page, countList, type: viewType },
        });
    };

    return (
        <Wrapper>
            <Title>
                <span className="menu">{menuTitle}</span>
                {categoriId !== '0' && categoriId !== 'favorite' ? (
                    <>
                        <span>, </span>
                        <span className="categori">{categoriTitle}</span>
                    </>
                ) : null}
            </Title>
            <ModifyBoardButtonBox>
                {userId === 'iceMan' ? (
                    <>
                        <button
                            onClick={() =>
                                router.push(
                                    {
                                        pathname: '/blog/write',
                                        query: {
                                            mode: 'modify',
                                            categoriId,
                                            detail: router.query.detail as string,
                                        },
                                    },
                                    '/blog/write',
                                )
                            }
                        >
                            수정
                        </button>
                        <button onClick={() => deletefirm(detailBoard.board_id)}>삭제</button>
                    </>
                ) : null}
            </ModifyBoardButtonBox>
            <button onClick={() => commentDivRef?.current?.scrollIntoView({ behavior: 'smooth' })}>댓글 ▼</button>
            <MoveBoardButtonBox>
                {detailBoard?.nextBoardId ? (
                    <button onClick={() => moveDetailBoard(detailBoard.nextBoardId as string)}>다음글</button>
                ) : null}
                {detailBoard?.prevBoardId ? (
                    <button onClick={() => moveDetailBoard(detailBoard.prevBoardId as string)}>이전글</button>
                ) : null}
                <button onClick={moveMainPage}>목록</button>
            </MoveBoardButtonBox>
        </Wrapper>
    );
};
export default TopMenu;
