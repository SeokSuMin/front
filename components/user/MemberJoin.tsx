import { LoadingOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import {
    DeepRequired,
    FieldErrorsImpl,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetError,
    UseFormSetValue,
} from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import JoinMenu from './JoinMenu';
import { ILoginInfo } from './UserModalView';
import * as path from 'path';
import { message } from 'antd';
import { IUser, loading } from '../../reducer/user';
import { checkExUser, joinMembers } from '../../thunk/userThunk';
import dayjs from 'dayjs';
import { rlto } from '../../util';
dayjs().format();

const Wrapper = styled.div`
    width: 80%;
    button.join {
        width: 100%;
        height: 2.063rem;
        font-size: 0.875rem;
        margin-bottom: 0.938em;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0.188em 0.188em 0.188em rgb(220, 220, 220);
        background-color: rgb(24, 144, 255);
        border: none;
        color: white;
    }
`;
const JoinText = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 1.563em;
    font-size: 1.25rem;
    font-weight: bold;
    font-style: italic;
    div {
        display: flex;
        width: 80%;
        text-align: center;
    }
`;

const LoginForm = styled.form`
    width: 100%;
    div {
        position: relative;
        margin-bottom: 0.938em;
        display: flex;
        align-items: center;
    }
    input {
        width: 100%;
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

    span {
        font-size: 0.75rem;
        color: rgb(160, 160, 160);
    }
    span.userId,
    span.password,
    span.email {
        position: absolute;
        top: 1.3rem;
        left: 0px;
        font-size: 0.688rem;
        display: flex;
        align-items: center;
        width: 80%;
        height: 1.125rem;
        color: red;
    }
    span.email {
        color: blue;
    }
`;

const IdInputBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 0px !important;
    .anticon-spin {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0.5em;
        right: 0.3em;
    }
`;

const BackLogin = styled.span`
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 0.75rem;
    color: rgb(160, 160, 160);
    cursor: pointer;
`;

interface IMemberJoinProps {
    register: UseFormRegister<ILoginInfo>;
    handleSubmit: UseFormHandleSubmit<ILoginInfo>;
    errors: FieldErrorsImpl<DeepRequired<ILoginInfo>>;
    setValue: UseFormSetValue<ILoginInfo>;
    setError: UseFormSetError<ILoginInfo>;
    moveTypeView: (type: string) => void;
}

const MemberJoin = ({ register, handleSubmit, errors, setValue, setError, moveTypeView }: IMemberJoinProps) => {
    const joinButton = useRef<HTMLButtonElement>(null);
    const state = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [joinUserId, setJoinUserId] = useState('');
    const [profileImgURL, setProfileImgURL] = useState<string | ArrayBuffer>('');
    const [extName, setExtName] = useState<string>('');

    const moveLoginView = () => {
        setProfileImgURL('');
        setJoinUserId('');
        setValue('userId', '');
        setValue('password', '');
        setValue('password1', '');
        setError('userId', { message: '' });
        setError('password', { message: '' });
        setError('password1', { message: '' });
        moveTypeView('login');
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
    const deleteProfileImg = () => {
        setProfileImgURL('');
    };

    const checkUserId = async (userId: string) => {
        try {
            dispatch(loading({ loading: true }));
            await dispatch(checkExUser(userId)).unwrap();
            setError('userId', { message: '' });
            return true;
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                message.error(err.message);
            } else {
                if ((err as string).includes('이미 사용중인')) {
                    return false;
                } else {
                    message.error(err as string);
                }
            }
        } finally {
            dispatch(loading({ loading: false }));
        }
    };

    const joinSubmit = async (value: ILoginInfo) => {
        try {
            if (joinUserId !== value.userId && (await checkUserId(value.userId))) {
                if (value.password !== value.password1) {
                    setError('password1', { message: '비밀번호가 일치 하지 않습니다.' }, { shouldFocus: true });
                } else {
                    const userInfoObj = {
                        userId: value.userId,
                        email: value.email,
                        password: value.password,
                    } as IUser;
                    if (profileImgURL) {
                        const fileName =
                            dayjs().valueOf() + (profileImgURL as string).slice(-8).replace(/\//g, '') + `${extName}`;
                        const convertIamgeFile = await rlto(profileImgURL as string, fileName, {
                            type: 'image/png',
                        });
                        userInfoObj.profileImg = convertIamgeFile;
                    }
                    const memberJoinResult = await dispatch(joinMembers(userInfoObj)).unwrap();
                    if (memberJoinResult) {
                        moveLoginView();
                        message.success('가입이 완료되었습니다.');
                    }
                }
            } else {
                setJoinUserId(value.userId);
                setError('userId', { message: '이미 사용중인 아이디 입니다.' }, { shouldFocus: true });
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                message.error(err.message);
            } else {
                message.error(err as string);
            }
        } finally {
            dispatch(loading({ loading: false }));
        }
    };

    return (
        <Wrapper>
            <JoinText>
                <h1>JOIN MEMBER</h1>
            </JoinText>
            <LoginForm onSubmit={handleSubmit(joinSubmit)}>
                <div>
                    <IdInputBox>
                        <input
                            {...register('userId', {
                                required: '아이디는 필수 입니다.',
                                pattern: {
                                    value: /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/,
                                    message: '4~20자, 대 소문자로 작성되어야 합니다',
                                },
                            })}
                            type="text"
                            placeholder="아이디"
                        />
                    </IdInputBox>
                    <span className="userId">{errors?.userId?.message}</span>
                </div>
                <div>
                    <input {...register('email', {})} type="text" placeholder="이메일 (필수x)" />
                    <span className="email">계정 정보를 찾을때 사용됩니다.</span>
                </div>
                <div>
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
                    <input
                        {...register('password1', {
                            required: '비밀번호는 확인란은 필수 입니다.',
                        })}
                        type="password"
                        placeholder="비밀번호 확인"
                    />
                    <span className="password">{errors?.password1?.message}</span>
                </div>
                <JoinMenu
                    {...{
                        errors,
                        clickImgFileInput,
                        profileImgURL,
                        inputRef,
                        changeImgInput,
                        deleteProfileImg,
                    }}
                />
                <button ref={joinButton} disabled={state.loading} className="join" type="submit">
                    가입하기
                </button>
            </LoginForm>
            <BackLogin onClick={() => moveLoginView()}>로그인 화면으로 돌아가기</BackLogin>
        </Wrapper>
    );
};

export default MemberJoin;
