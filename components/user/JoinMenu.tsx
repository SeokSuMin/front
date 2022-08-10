import { Button } from 'antd';
import { MutableRefObject } from 'react';
import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
import styled from 'styled-components';
import XToggle from '../../public/x-Toggle.svg';
import { ILoginInfo } from './UserModalView';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 1.25em 0px !important;
`;

const FileInputBox = styled.div`
    width: 100%;
    margin-bottom: 0px !important;
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    margin-top: 0.35em;
    button {
        font-size: 0.75rem;
        padding: 0.25em 0.417em;
        height: 100%;
    }
    span:nth-child(2) {
        margin-left: 1.25em;
    }
`;

const ProfileImgBox = styled.div`
    width: 100%;
    padding: 0.625em 0;
    display: flex;
    margin-bottom: 0px !important;
    position: relative;
    svg {
        position: absolute;
        top: 0.5em;
        left: 3.8em;
        width: 0.9rem;
        height: 0.9rem;
    }
`;

const ProfileImg = styled.div<{ imgURL: string | ArrayBuffer }>`
    width: 4rem;
    height: 4rem;
    background-image: url(${(props) => `${props.imgURL}`});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50%;
    border: 0.063rem solid rgb(217, 217, 217);
    margin-bottom: 0px !important;
`;

interface IJoinMenuProps {
    errors: FieldErrorsImpl<DeepRequired<ILoginInfo>>;
    clickImgFileInput: () => void;
    profileImgURL: string | ArrayBuffer;
    inputRef: MutableRefObject<HTMLInputElement>;
    changeImgInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    deleteProfileImg: () => void;
}

const JoinMenu = ({ clickImgFileInput, profileImgURL, inputRef, changeImgInput, deleteProfileImg }: IJoinMenuProps) => {
    return (
        <Wrapper>
            <FileInputBox>
                <Button onClick={clickImgFileInput}>이미지 선택</Button>
                {!profileImgURL ? <span>프로필 이미지 없음.</span> : null}
                <input type="file" ref={inputRef} onChange={changeImgInput} hidden accept="image/*" />
            </FileInputBox>
            {profileImgURL ? (
                <ProfileImgBox>
                    <ProfileImg imgURL={profileImgURL}></ProfileImg>
                    <XToggle onClick={deleteProfileImg}></XToggle>
                </ProfileImgBox>
            ) : null}
        </Wrapper>
    );
};

export default JoinMenu;
