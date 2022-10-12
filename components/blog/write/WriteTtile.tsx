import { Input, InputRef, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../store/hooks';

const { Option } = Select;

const Wrapper = styled.div`
    width: 100%;
`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.8em;
`;

const Lable = styled.label`
    width: 10%;
    text-align: left;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 0.725em;
`;

const CategoriBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.9em;
`;
const WriteInput = styled(Input)`
    height: 1.7rem;
    width: 90%;

    &:nth-child(3),
    &:nth-child(4) {
        width: 20%;
        margin-left: 0.625em;
    }
`;

interface IWriteInputProps {
    titleInputRef: React.MutableRefObject<InputRef | null>;
    menuId: number | undefined;
    categoriMenus: {
        menu_id: number;
        menu_name: string;
        sort: number;
        categoris: [{ categori_id: number; menu_id: number; sort: number; categori_name: string; total_count: number }];
    }[];
    categoriId: number;
    changeMenu: (value: number) => void;
    changeCategori: (value: number) => void;
}

const WriteTtile = ({
    titleInputRef,
    menuId,
    categoriMenus,
    categoriId,
    changeMenu,
    changeCategori,
}: IWriteInputProps) => {
    const router = useRouter();
    const detailBoard = useAppSelector((state) => state.boardData);
    const [title, setTitile] = useState<string>('');

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitile(e.currentTarget.value);
    };

    useEffect(() => {
        if (router?.query?.mode === 'modify') {
            setTitile(detailBoard?.title ? detailBoard?.title : '');
        } else {
            setTitile('');
        }
    }, [router.query.mode, detailBoard?.title]);

    return (
        <Wrapper>
            <TitleBox>
                <Lable>제목</Lable>
                <WriteInput value={title} onChange={changeTitle} ref={titleInputRef} placeholder="Write Title ..." />
            </TitleBox>
            <CategoriBox>
                <Lable>메뉴명</Lable>
                <Select value={menuId} onChange={changeMenu}>
                    {categoriMenus?.map((categoriMenu) => {
                        if (categoriMenu.categoris[0] !== null) {
                            return (
                                <Option key={categoriMenu.menu_id} value={categoriMenu.menu_id}>
                                    {categoriMenu.menu_name}
                                </Option>
                            );
                        }
                    })}
                </Select>
            </CategoriBox>
            <CategoriBox>
                <Lable>카테고리</Lable>
                <Select style={{ minWidth: 80 }} value={categoriId} onChange={changeCategori}>
                    {categoriMenus
                        ?.find((mData) => mData.menu_id === menuId)
                        ?.categoris.map((categori) => {
                            if (categori !== null) {
                                return (
                                    <Option key={categori.categori_id} value={categori.categori_id}>
                                        {categori.categori_name}
                                    </Option>
                                );
                            }
                        })}
                </Select>
            </CategoriBox>
        </Wrapper>
    );
};

export default memo(WriteTtile);
