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
}

const WriteTtile = ({ titleInputRef, menuInputRef, categoriInputRef }: IWriteInputProps) => {
    const menuData = [
        { menu: '일상의 순간', categoris: ['여행', '음식', '운동', '게임', '영화'] },
        { menu: '프로그래밍', categoris: ['Java', 'React Js', 'Node Js', '개발일지'] },
    ];

    const [menu, setMenu] = useState(menuData[0].menu);
    const [categoris, setCategoris] = useState(menuData[0].categoris);
    const [categoriId, setCategoriId] = useState(menuData[0].categoris[0]);

    const changeMenu = (value: string) => {
        setMenu(value);
        if (value !== 'direct') {
            setCategoris(menuData?.find((mData) => mData.menu === value).categoris);
            setCategoriId(menuData?.find((mData) => mData.menu === value)?.categoris[0] ?? '');
        }
    };

    const changeCategori = (value: string) => {
        setCategoriId(value);
    };

    return (
        <Wrapper>
            <TitleBox>
                <Lable>제목</Lable>
                <WriteInput ref={titleInputRef} placeholder="Write Title ..." />
            </TitleBox>
            <CategoriBox>
                <Lable>메뉴</Lable>
                <Select value={menu} onChange={changeMenu}>
                    {menuData?.map((data) => (
                        <Option key={data.menu} value={data.menu}>
                            {data.menu}
                        </Option>
                    ))}
                    <Option value="direct">직접입력</Option>
                </Select>
                {menu === 'direct' ? <WriteInput ref={menuInputRef} placeholder="메뉴이름" /> : null}
            </CategoriBox>
            <CategoriBox>
                <Lable>카테고리</Lable>
                <Select style={{ minWidth: 80 }} value={categoriId} onChange={changeCategori}>
                    {categoris?.map((categori) => (
                        <Option key={categori}>{categori}</Option>
                    ))}
                    <Option value="direct">직접입력</Option>
                </Select>
                {categoriId === 'direct' ? <WriteInput ref={menuInputRef} placeholder="카테고리" /> : null}
            </CategoriBox>
        </Wrapper>
    );
};

export default memo(WriteTtile);
