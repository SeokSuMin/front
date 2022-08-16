import { Input, InputRef, Select } from 'antd';
import { memo, useState } from 'react';
import styled from 'styled-components';

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
    width: 8%;
    text-align: left;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 0.725em;
    margin-left: 0.725em;
`;

const CategoriBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.9em;
`;
const WriteInput = styled(Input)`
    height: 1.7rem;
    width: 80%;

    &:nth-child(3),
    &:nth-child(4) {
        width: 20%;
        margin-left: 0.625em;
    }
`;

interface IWriteInputProps {
    // title: string;
    // changeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
    titleInputRef: React.MutableRefObject<InputRef>;
    categoriInputRef: React.MutableRefObject<InputRef>;
    menuInputRef: React.MutableRefObject<InputRef>;
    menu: string;
    categoriMenus: {
        menu_categori: string;
        categoris: [
            {
                [key: string]: string;
            },
        ];
    }[];
    categoris: [
        {
            [key: string]: string;
        },
    ];
    categoriId: string;
    changeMenu: (value: string) => void;
    changeCategori: (value: string) => void;
}

const WriteTtile = ({
    titleInputRef,
    menuInputRef,
    categoriInputRef,
    menu,
    categoriMenus,
    categoris,
    categoriId,
    changeMenu,
    changeCategori,
}: IWriteInputProps) => {
    return (
        <Wrapper>
            <TitleBox>
                <Lable>제목</Lable>
                <WriteInput ref={titleInputRef} placeholder="Write Title ..." />
            </TitleBox>
            <CategoriBox>
                <Lable>메뉴명</Lable>
                <Select value={menu} onChange={changeMenu}>
                    {categoriMenus?.map((categoriMenu) => (
                        <Option key={categoriMenu.menu_categori} value={categoriMenu.menu_categori}>
                            {categoriMenu.menu_categori}
                        </Option>
                    ))}
                    <Option value="direct">직접입력</Option>
                </Select>
                {menu === 'direct' ? <WriteInput ref={menuInputRef} placeholder="메뉴이름" /> : null}
            </CategoriBox>
            <CategoriBox>
                <Lable>카테고리</Lable>
                <Select style={{ minWidth: 80 }} value={categoriId} onChange={changeCategori}>
                    {categoris?.map((categori) => {
                        const categoriName = Object.keys(categori)[0];
                        return <Option key={categoriName}>{categoriName}</Option>;
                    })}
                    <Option value="direct">직접입력</Option>
                </Select>
                {categoriId === 'direct' ? <WriteInput ref={categoriInputRef} placeholder="카테고리" /> : null}
            </CategoriBox>
        </Wrapper>
    );
};

export default memo(WriteTtile);
