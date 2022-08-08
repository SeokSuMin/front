import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
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
import { loading } from '../../reducer/user';
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
        margin: 1.25em 0px;
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
    input {
        width: 100%;
        padding: 0.313em 0.625em;
        border: 0.063rem solid rgb(217, 217, 217);
        border-radius: 0.126em;
    }
    input:focus {
        outline: none;
        box-shadow: 0.063em 0.063em 0.063em 0.063em rgb(209, 233, 255);
        border: 0.063rem solid rgb(64, 169, 255);
    }
    input::placeholder {
        color: rgb(197, 193, 208);
    }

    span {
        font-size: 0.75rem;
        color: rgb(160, 160, 160);
    }

    span.userId,
    span.password,
    span.email {
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
    .anticon-spin {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0.8em;
        right: 0.7em;
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
    setError: UseFormSetError<ILoginInfo>;
    moveTypeView: (type: string) => void;
}

const MemberJoin = ({ register, handleSubmit, errors, setError, moveTypeView }: IMemberJoinProps) => {
    const state = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [joinUserId, setJoinUserId] = useState('');
    const [checkIdComplate, setCheckIdComplate] = useState(false);
    const [profileImgURL, setProfileImgURL] = useState<string | ArrayBuffer>(null);
    const [extName, setExtName] = useState<string>(null);

    const moveLoginView = () => {
        setProfileImgURL(null);
        setJoinUserId('');
        moveTypeView('login');
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
    const deleteProfileImg = () => {
        setProfileImgURL(null);
    };

    const checkUserId = async (userId: string) => {
        try {
            dispatch(loading({ loading: true }));
            await dispatch(checkExUser(userId)).unwrap();
            setError('userId', { message: '' });
            setCheckIdComplate(true);
        } catch (err) {
            if (err.includes('이미 사용중인')) {
                setError(
                    'joinUserId',
                    { type: 'custom', message: '이미 사용중인 아이디 입니다.' },
                    { shouldFocus: true },
                );
            } else {
                message.error(err);
            }
            setCheckIdComplate(false);
        } finally {
            setJoinUserId(userId);
            dispatch(loading({ loading: false }));
        }
    };

    const joinSubmit = async (value: ILoginInfo) => {
        try {
            if (checkIdComplate) {
                if (value.password !== value.password1) {
                    setError('password1', { message: '비밀번호가 일치 하지 않습니다.' }, { shouldFocus: true });
                } else {
                    const userInfoObj = {
                        userId: value.joinUserId,
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
                    const memberJoinResult = await dispatch(joinMembers(userInfoObj)).unwrap();
                    if (memberJoinResult) {
                        message.success('가입이 완료되었습니다.');
                        setCheckIdComplate(false);
                        moveLoginView();
                    }
                }
            } else {
                setError(
                    'joinUserId',
                    { type: 'custom', message: '이미 사용중인 아이디 입니다.' },
                    { shouldFocus: true },
                );
            }
        } catch (err) {
            message.error(err);
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
                <IdInputBox>
                    <input
                        {...register('joinUserId', {
                            required: '아이디는 필수 입니다.',
                            onBlur: (e: React.FormEvent<HTMLInputElement>) => {
                                // 기존 유효성 통과된 아이디와 다르거나 공백이 아닐때
                                if (e.currentTarget.value !== joinUserId && e.currentTarget.value.length !== 0) {
                                    return checkUserId(e.currentTarget.value);
                                }
                            },
                        })}
                        type="text"
                        placeholder="아이디"
                    />
                    {!checkIdComplate && state.loading ? <LoadingOutlined /> : null}
                </IdInputBox>
                <span className="userId">{errors?.joinUserId?.message}</span>

                <input {...register('email', {})} type="text" placeholder="이메일 (필수x)" />
                <span className="email">계정 정보를 찾을때 사용됩니다.</span>
                <input
                    {...register('password', {
                        required: '비밀번호는 필수 입니다.',
                    })}
                    type="password"
                    placeholder="비밀번호"
                />
                <span className="password">{errors?.password?.message}</span>
                <input
                    {...register('password1', {
                        required: '비밀번호는 확인란은 필수 입니다.',
                    })}
                    type="password"
                    placeholder="비밀번호 확인"
                />
                <span className="password">{errors?.password1?.message}</span>
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
                <button disabled={state.loading} className="join" type="submit">
                    가입하기
                </button>
            </LoginForm>
            <BackLogin onClick={() => moveLoginView()}>로그인 화면으로 돌아가기</BackLogin>
        </Wrapper>
    );
};

export default MemberJoin;
