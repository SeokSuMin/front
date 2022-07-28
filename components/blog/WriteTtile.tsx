import { Input, InputRef } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';

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
    width: 80%;
`;

interface IWriteInputProps {
    // title: string;
    // changeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
    titleInputRef: React.MutableRefObject<InputRef>;
    categoriInputRef: React.MutableRefObject<InputRef>;
}

const WriteTtile = ({ titleInputRef, categoriInputRef }: IWriteInputProps) => {
    return (
        <>
            <TitleBox>
                <Lable>제목</Lable>
                <WriteInput ref={titleInputRef} placeholder="Write Title ..." />
            </TitleBox>
            <CategoriBox>
                <Lable>카테고리</Lable>
                <WriteInput ref={categoriInputRef} placeholder="Write Categori ..." />
            </CategoriBox>
        </>
    );
};

export default memo(WriteTtile);
