import { Alert, Avatar, Button, message } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fileBackUrl } from '../../config';
import XToggle from '../../public/x-Toggle.svg';
import { togglDashBoard } from '../../reducer/userToggle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as path from 'path';
import dayjs from 'dayjs';
import { IUser } from '../../reducer/user';
import { rlto } from '../../util';
import { changePassowrd, updateMember, logout } from '../../thunk/userThunk';
import { UserOutlined } from '@ant-design/icons';

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

const DashBoardModalView = styled(motion.div)`
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
    justify-content: center;
`;
const PropfileImgBox = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    span.photo {
        position: relative;
    }
    span.photo img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
    }
    span.photo .xtoggle {
        position: absolute;
        right: 0px;
        top: -0.625em;
        width: 1rem;
        height: 1rem;
    }
    .imageBtn {
        padding: 0px 0.357em;
        font-size: 0.75rem;
        height: 1.5rem;
        margin-top: 1em;
    }
`;

const DashBoardForm = styled.form<{ mode: string }>`
    width: 70%;
    padding: 0px 1.5em;
    div:not(:last-of-type) {
        position: relative;
        margin-bottom: 0.938em;
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
    span.password {
        position: absolute;
        top: 1.3rem;
        left: 2.9rem;
        font-size: 0.688rem;
        display: flex;
        align-items: center;
        width: 80%;
        height: 1.125rem;
        color: red;
    }
`;

const ButtonBox = styled.div`
    text-align: right;
    margin-top: 1.5em;
    button {
        font-size: 0.875rem;
        padding: 0.4em;
        color: white;
        cursor: pointer;
        margin-top: 1.25em;
    }
    button.passwordBtn {
        margin-right: 0.625em;
        background-color: transparent;
        color: rgb(24, 144, 255);
        border: 1px solid rgb(24, 144, 255);
    }
    button.save {
        background-color: rgb(24, 144, 255);
        border: 1px solid rgb(24, 144, 255);
    }
`;

interface IDashBoardProps {
    isVisible: boolean;
    scrollY: number;
}

export interface IUserInfo {
    email: string;
    password: string;
    password1: string;
}

const DashBoard = ({ isVisible, scrollY }: IDashBoardProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [profileImgURL, setProfileImgURL] = useState<string | ArrayBuffer | undefined>(
        user?.strategyType !== 'local' ? user?.imgPath : user?.imgPath ? fileBackUrl + user?.imgPath : '',
    );
    const [extName, setExtName] = useState<string>('');
    const [viewMode, setViewMode] = useState('user');
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<IUserInfo>({
        defaultValues: {
            email: user.email,
            password: '',
            password1: '',
        },
    });
    const dashBoardView = () => {
        dispatch(togglDashBoard({ dashBoardVisible: false, loginVisible: false }));
    };

    const clickImgFileInput = () => {
        inputRef?.current?.click();
    };
    const changeImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const imgFile = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result) {
                setProfileImgURL(reader.result);
                setExtName(path.extname(imgFile.name));
            }
        };
        reader.onerror = () => {
            message.error('프로필 이미지 로딩중 에러가 발생했습니다.');
        };
        reader.readAsDataURL(imgFile);

        e.target.value = '';
    };

    const changeViewMode = () => {
        if (viewMode === 'user') {
            setViewMode('password');
            setValue('password', '');
            setValue('password1', '');
            setError('password', { message: '' });
            setError('password1', { message: '' });
        } else {
            setViewMode('user');
            setValue('email', user.email as string);
        }
    };

    const deleteImg = () => {
        setProfileImgURL('');
    };

    const dashBoardSubmit = async (value: IUserInfo) => {
        try {
            if (viewMode === 'user') {
                const userInfoObj = {
                    userId: user.userId,
                    email: value.email,
                } as IUser;

                const prevFileName = fileBackUrl + user.imgPath;
                if (profileImgURL !== '' && profileImgURL !== prevFileName) {
                    const fileName =
                        dayjs().valueOf() + (profileImgURL as string).slice(-8).replace(/\//g, '') + `${extName}`;
                    const convertIamgeFile = await rlto(profileImgURL as string, fileName, {
                        type: 'image/png',
                    });
                    userInfoObj.profileImg = convertIamgeFile;
                } else {
                    userInfoObj.imgPath = profileImgURL !== '' ? user.imgPath : '';
                }

                await dispatch(updateMember(userInfoObj)).unwrap();
                message.success('저장되었습니다.');
            } else {
                if (value.password !== value.password1) {
                    console.log('비밀번호 다름');
                    setError('password1', { message: '비밀번호가 일치 하지 않습니다.' }, { shouldFocus: true });
                } else {
                    const userInfoObj = {
                        userId: user.userId,
                        password: value.password,
                    } as IUser;
                    await dispatch(changePassowrd(userInfoObj)).unwrap();
                    message.success('비밀번호가 변경되어 자동 로그아웃 합니다.');
                    await dispatch(logout()).unwrap();
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                message.error(err.message);
            } else {
                message.error(err as string);
            }
        }
    };

    useEffect(() => {
        if (user?.strategyType) {
            setProfileImgURL(
                user?.strategyType !== 'local' ? user?.imgPath : user?.imgPath ? fileBackUrl + user?.imgPath : '',
            );
        }
    }, []);

    return (
        <AnimatePresence initial={false}>
            {isVisible ? (
                <Wrapper key="dashBoard">
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={dashBoardView}
                    />
                    <DashBoardModalView
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
                            {viewMode === 'user' ? (
                                <PropfileImgBox>
                                    <span className="photo">
                                        {profileImgURL ? (
                                            <>
                                                {user.strategyType === 'local' ? (
                                                    <XToggle className="xtoggle" onClick={deleteImg}></XToggle>
                                                ) : null}
                                                <img src={profileImgURL as string}></img>
                                            </>
                                        ) : (
                                            <Avatar size="large" icon={<UserOutlined />} />
                                        )}
                                    </span>
                                    {user.strategyType === 'local' && (
                                        <Button className="imageBtn" onClick={clickImgFileInput}>
                                            이미지 변경
                                        </Button>
                                    )}
                                </PropfileImgBox>
                            ) : null}
                            <DashBoardForm mode={viewMode} onSubmit={handleSubmit(dashBoardSubmit)}>
                                {viewMode === 'user' ? (
                                    <>
                                        <div>
                                            <label>ID</label>
                                            <span>
                                                {user.strategyType === 'local'
                                                    ? user?.userId
                                                    : user?.userId?.split('_')[1]}
                                            </span>
                                        </div>
                                        <div>
                                            <label>EMAIL</label>
                                            <input
                                                disabled={user.strategyType !== 'local'}
                                                {...register('email', {})}
                                                type="text"
                                                placeholder="선택사항"
                                            />
                                        </div>
                                        <div>
                                            <label>REGIST</label>
                                            <span>{dayjs(user.createdAt).format('YYYY. MM. DD HH:mm')}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label>PW</label>
                                            <input
                                                {...register('password', {
                                                    required: '비밀번호는 필수 입니다.',
                                                })}
                                                type="password"
                                                placeholder="비밀번호"
                                            />
                                            <span className="password">{errors?.password?.message}</span>
                                        </div>
                                        <div>
                                            <label>RE_PW</label>
                                            <input
                                                {...register('password1', {
                                                    required: '확인란은 필수 입니다.',
                                                })}
                                                type="password"
                                                placeholder="비밀번호 확인"
                                            />
                                            <span className="password">{errors?.password1?.message}</span>
                                        </div>
                                    </>
                                )}
                                <ButtonBox>
                                    {user.strategyType === 'local' && (
                                        <>
                                            <button onClick={changeViewMode} className="passwordBtn" type="button">
                                                {viewMode === 'user' ? '비밀번호 변경' : '돌아가기'}
                                            </button>
                                            <button className="save" type="submit">
                                                저장
                                            </button>
                                        </>
                                    )}
                                </ButtonBox>
                            </DashBoardForm>
                        </DashBoardBox>
                    </DashBoardModalView>
                </Wrapper>
            ) : null}
            <input type="file" ref={inputRef} onChange={changeImgInput} hidden accept="image/*" />
        </AnimatePresence>
    );
};

export default DashBoard;
