import { Button } from 'antd';
import { MutableRefObject } from 'react';
import { DeepRequired, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import XToggle from '../../public/x-Toggle.svg';
import { ILoginInfo } from './Login';

const Wrapper = styled.div`
    width: 100%;
    input {
        width: 100%;
        padding: 0.313em 0.625em;
        border: 0.063rem solid rgb(217, 217, 217);
        border-radius: 0.126rem;
    }
    input:focus {
        outline: none;
        box-shadow: 0.063em 0.063em 0.063em 0.063em rgb(209, 233, 255);
        border: 0.063rem solid rgb(64, 169, 255);
    }
    input::placeholder {
        color: rgb(197, 193, 208);
    }
    span.userId,
    span.password {
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        width: 100%;
        height: 1.563rem;
        color: red;
    }
`;

const FileInputBox = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.75rem;
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
    svg {
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
`;

interface IJoinMenuProps {
    register: UseFormRegister<ILoginInfo>;
    errors: FieldErrorsImpl<DeepRequired<ILoginInfo>>;
    clickImgFileInput: () => void;
    profileImgURL: string | ArrayBuffer;
    inputRef: MutableRefObject<HTMLInputElement>;
    changeImgInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    deleteProfileImg: () => void;
}

const JoinMenu = ({
    register,
    errors,
    clickImgFileInput,
    profileImgURL,
    inputRef,
    changeImgInput,
    deleteProfileImg,
}: IJoinMenuProps) => {
    return (
        <Wrapper>
            <input
                {...register('password1', {
                    required: '비밀번호는 확인란은 입니다.',
                })}
                type="password"
                placeholder="비밀번호 확인"
            />
            <span className="password">{errors?.password1?.message}</span>
            <FileInputBox>
                <Button onClick={clickImgFileInput}>이미지 선택</Button>
                {!profileImgURL ? <span>선택된 프로필 이미지 없음.</span> : null}

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
