import { Button, message } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fileBackUrl } from '../../config';
import XToggle from '../../public/x-Toggle.svg';
import { togglDashBoard } from '../../reducer/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as path from 'path';
import dayjs from 'dayjs';
import { rlto } from '../../util';
import { updateMember } from '../../thunk/userThunk';

const Wrapper = styled.div`
    width: 100%;
`;

const Overlay = styled(motion.div)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
`;

const ModalView = styled(motion.div)`
    width: 25rem;
    border: 0.063rem solid rgb(238, 238, 239);
    border-radius: 0.625em;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 100;
    padding: 0.938em;
`;

const Close = styled.div`
    text-align: right;
    height: 10%;
    svg {
        width: 1.125rem;
        height: 1.125rem;
    }
`;

const DashBoardText = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 1.563em;
    font-size: 1.25rem;
    font-weight: bold;
    div {
        display: flex;
        width: 80%;
        text-align: center;
    }
`;

const DashBoardBox = styled.div`
    width: 100%;
    display: flex;
`;
const PropfileImgBox = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    span img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
    }
    button {
        padding: 0px 0.357em;
        font-size: 0.75rem;
        height: 1.5rem;
        margin-top: 0.938em;
    }
`;

const DashBoardForm = styled.form`
    width: 70%;
    padding: 0px 1.5em;
    div {
        margin-bottom: 0.625em;
        display: flex;
        align-items: center;
    }
    label {
        font-size: 0.875rem;
        margin-right: 0.5em;
        display: inline-block;
        width: 2.5rem;
    }
    input {
        font-size: 0.875rem;
        padding-bottom: 0.214em;
        border: none;
        border-bottom: 0.0625rem solid black;
    }
    input:focus {
        outline: none;
    }
    input::placeholder {
        font-size: 0.75rem;
        color: rgb(197, 193, 208);
    }
`;

const ButtonBox = styled.div`
    text-align: right;
    margin-top: 1.5em;
    button {
        font-size: 0.875rem;
        padding: 0.5em;
        color: white;
        cursor: pointer;
    }
    button:first-child {
        margin-right: 0.625em;
        background-color: transparent;
        color: rgb(255, 77, 79);
        border: 1px solid rgb(255, 77, 79);
    }
    button:nth-child(2) {
        background-color: rgb(24, 144, 255);
        border: 1px solid rgb(24, 144, 255);
    }
`;

interface IDashBoardProps {
    isVisible: boolean;
    scrollY: number;
}

export interface IUserInfo {
    email?: string;
    password?: string;
    password1?: string;
}

const DashBoard = ({ isVisible, scrollY }: IDashBoardProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [profileImgURL, setProfileImgURL] = useState<string | ArrayBuffer>(fileBackUrl + user.imgPath);
    const [extName, setExtName] = useState<string>(null);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<IUserInfo>({
        defaultValues: {
            email: user.email,
        },
    });
    const dashBoardView = () => {
        dispatch(togglDashBoard({ dashBoardVisible: false }));
    };

    const clickImgFileInput = () => {
        inputRef.current.click();
    };
    const changeImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const imgFile = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImgURL(reader.result);
            setExtName(path.extname(imgFile.name));
        };
        reader.onerror = () => {
            message.error('프로필 이미지 로딩중 에러가 발생했습니다.');
        };
        reader.readAsDataURL(imgFile);

        e.target.value = '';
    };

    const dashBoardSubmit = async (value: IUserInfo) => {
        try {
            if (value.password !== value.password1) {
                setError('password1', { message: '비밀번호가 일치 하지 않습니다.' }, { shouldFocus: true });
            } else {
                const userInfoObj = {
                    userId: user.userId,
                    email: value.email,
                    password: value.password,
                    profileImg: null,
                };
                if (profileImgURL) {
                    const fileName =
                        dayjs().valueOf() + (profileImgURL as string).slice(-8).replace(/\//g, '') + `${extName}`;
                    const convertIamgeFile = await rlto(profileImgURL as string, fileName, {
                        type: 'image/png',
                    });
                    userInfoObj.profileImg = convertIamgeFile;
                }
                await dispatch(updateMember(userInfoObj)).unwrap();
                message.success('저장되었습니다.');
            }
        } catch (err) {
            message.error(err);
        }
    };

    return (
        <AnimatePresence initial={false}>
            {isVisible ? (
                <Wrapper>
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={dashBoardView}
                    />
                    <ModalView
                        style={{
                            top: scrollY + 200,
                        }}
                    >
                        <Close>
                            <XToggle onClick={dashBoardView}></XToggle>
                        </Close>
                        <DashBoardText>
                            <h1>DASH BOARD</h1>
                        </DashBoardText>
                        <DashBoardBox>
                            <PropfileImgBox>
                                <span>
                                    <img src={profileImgURL as string}></img>
                                </span>
                                <Button onClick={clickImgFileInput}>이미지 변경</Button>
                            </PropfileImgBox>
                            <DashBoardForm onSubmit={handleSubmit(dashBoardSubmit)}>
                                <div>
                                    <label>ID</label>
                                    <span>{user.userId}</span>
                                </div>
                                <div>
                                    <label>EMAIL</label>
                                    <input {...register('email', {})} type="text" placeholder="선택사항" />
                                </div>
                                <div>
                                    <label>PW</label>
                                    <input {...register('email', {})} type="text" placeholder="PASSWORD" />
                                </div>
                                <div>
                                    <label>RE_PW</label>
                                    <input {...register('email', {})} type="text" placeholder="RE PASSWORD" />
                                </div>
                                {/* <input
                                    {...register('password', {
                                        required: '비밀번호는 필수 입니다.',
                                    })}
                                    type="password"
                                    placeholder="비밀번호"
                                />
                                <span className="password">{errors?.password?.message}</span>
                                <input
                                    {...register('password1', {
                                        required: '확인란은 필수 입니다.',
                                    })}
                                    type="password"
                                    placeholder="비밀번호 확인"
                                />
                                <span className="password">{errors?.password1?.message}</span> */}
                                <ButtonBox>
                                    <button type="button">계정탈퇴</button>
                                    <button type="submit">저장</button>
                                </ButtonBox>
                            </DashBoardForm>
                        </DashBoardBox>
                    </ModalView>
                </Wrapper>
            ) : null}
            <input type="file" ref={inputRef} onChange={changeImgInput} hidden accept="image/*" />
        </AnimatePresence>
    );
};

export default DashBoard;
