import { Drawer, Tag } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { changeCurrentCategoriId } from '../../reducer/blog';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import XToggle from '../public/x-Toggle.svg';

const Wrapper = styled.div`
    width: 100%;
`;
const Categoris = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1.25em;
    margin-bottom: 0.938em;
    &:last-child {
        margin-bottom: 0px;
        margin-top: 0px;
    }
    ul {
        width: 100%;
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    li:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    li:first-child {
        margin-bottom: 0.625em;
        font-weight: bold;
        pointer-events: none;
    }
    li:not(:first-of-type) {
        margin-bottom: 0.5em;
    }
    .active {
        font-weight: bold;
        text-decoration: underline;
    }
`;

interface ICategorisDrawerProps {
    visible: boolean;
    closeDrawer: () => void;
}

const CategorisDrawer = ({ visible, closeDrawer }: ICategorisDrawerProps) => {
    const router = useRouter();
    const { categoriMenus, loading, currentCategoriId, categoriTotal } = useAppSelector((state) => state.blog);
    const dispatch = useAppDispatch();

    const moveCategoriBoards = (currentCategoriId: number, newCategoriId: number) => {
        if (router.pathname !== '/blog' || currentCategoriId !== newCategoriId) {
            closeDrawer();
            dispatch(changeCurrentCategoriId(newCategoriId));
            if (router.pathname !== '/blog') {
                router.push('/blog');
            }
        }
    };
    return (
        <Drawer
            title={`Categoris`}
            placement="left"
            closable={false}
            visible={visible}
            onClose={closeDrawer}
            style={{ top: 60 }}
        >
            <Wrapper>
                <span
                    onClick={() => moveCategoriBoards(currentCategoriId, 0)}
                    style={{
                        textDecoration: currentCategoriId === 0 ? 'underline' : '',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                >
                    전체보기 ({categoriTotal})
                </span>
                {categoriMenus?.map((categoriMenu, i) => {
                    return (
                        <Categoris key={i}>
                            <ul>
                                <li>
                                    <span>• {categoriMenu.menu_name}</span>
                                </li>
                                {categoriMenu.categoris?.map((categori) => {
                                    const categoriName = Object.keys(categori)[0];
                                    const totalCount = Object.values(categori)[0];
                                    return (
                                        <li
                                            className={currentCategoriId == categori.categori_id ? 'active' : ''}
                                            onClick={() => moveCategoriBoards(currentCategoriId, categori.categori_id)}
                                            key={categoriName}
                                        >
                                            <span>
                                                └ {categoriName} ({totalCount})
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Categoris>
                    );
                })}
            </Wrapper>
        </Drawer>
    );
};

export default CategorisDrawer;
