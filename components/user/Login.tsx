import styled from 'styled-components';
import GitHub from '../../public/github.svg';
import Google from '../../public/google.svg';
import {
    DeepRequired,
    FieldErrorsImpl,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetError,
    UseFormSetValue,
} from 'react-hook-form';
import { ILoginInfo } from './UserModalView';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkExUser, login } from '../../thunk/userThunk';
import { message } from 'antd';
import { loading } from '../../reducer/user';

const Wrapper = styled.div`
    width: 80%;
    button {
        width: 100%;
        height: 2.063rem;
        font-size: 0.875rem;
        margin: 0.313em 0px 1.25em 0px;
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

const LoginText = styled.div`
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
    span.password {
        font-size: 0.688rem;
        display: flex;
        align-items: center;
        width: 80%;
        height: 1.125rem;
        color: red;
    }
`;

const MemberJoinBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    span {
        cursor: pointer;
        font-size: 0.688rem;
    }
    span:nth-child(2) {
        cursor: initial;
        margin-left: 0.313em;
        margin-right: 0.313em;
    }
`;

const EtcLogin = styled.div`
    width: 100%;
    .hr-sect {
        width: 100%;
        display: flex;
        flex-basis: 100%;
        align-items: center;
        margin-top: 1em;
        span {
            margin: 0px 0.625em;
            font-size: 0.75rem;
            color: rgb(160, 160, 160);
        }
    }
    .hr-sect::before,
    .hr-sect::after {
        content: '';
        flex-grow: 1;
        background: rgba(0, 0, 0, 0.35);
        height: 0.063rem;
        font-size: 0px;
        line-height: 0px;
    }
    button.git {
        background-color: black;
        margin: 1.25em 0px 0.625em 0px;
        svg {
            width: 0.938rem;
            height: 0.938rem;
            fill: white;
        }
        span {
            color: white;
            font-size: 0.875rem;
        }
    }
    button.google {
        background-color: white;
        margin: 0px 0px 0.625em 0px;
        border: 0.063rem solid rgb(217, 217, 217);
        svg {
            width: 0.938rem;
            height: 0.938rem;
        }
        span {
            color: black;
            font-size: 0.875rem;
        }
    }
`;

interface ILoginProps {
    register: UseFormRegister<ILoginInfo>;
    handleSubmit: UseFormHandleSubmit<ILoginInfo>;
    errors: FieldErrorsImpl<DeepRequired<ILoginInfo>>;
    setValue: UseFormSetValue<ILoginInfo>;
    loginView: () => void;
    moveTypeView: (type: string) => void;
}

const Login = ({ register, handleSubmit, errors, setValue, loginView, moveTypeView }: ILoginProps) => {
    useEffect(() => {
        setValue('userId', '');
        setValue('password', '');
    }, []);

    const gitLoginRef = useRef<HTMLAnchorElement>(null);
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.user);

    const move = (type: string) => {
        moveTypeView(type);
    };

    const loginSubmit = async (value: ILoginInfo) => {
        try {
            console.log(value);

            await dispatch(login(value)).unwrap();
            loginView();
        } catch (err) {
            message.error(err);
        } finally {
            dispatch(loading({ loading: false }));
        }
    };

    return (
        <Wrapper>
            <LoginText>
                <h1>GUEST LOGIN</h1>
            </LoginText>
            <LoginForm onSubmit={handleSubmit(loginSubmit)}>
                <input
                    {...register('userId', {
                        required: '아이디는 필수 입니다.',
                    })}
                    type="text"
                    placeholder="아이디"
                />
                <span className="userId">{errors?.userId?.message}</span>
                <input
                    {...register('password', {
                        required: '비밀번호는 필수 입니다.',
                    })}
                    type="password"
                    placeholder="비밀번호"
                />
                <span className="password">{errors?.password?.message}</span>

                <button disabled={state.loading} type="submit">
                    Login
                </button>
                <MemberJoinBox>
                    <span onClick={() => move('join')}>가입하기</span>
                    <span> | </span>
                    <span onClick={() => move('search')}>아이디 찾기</span>
                </MemberJoinBox>
            </LoginForm>
            <EtcLogin>
                <div className="hr-sect">
                    <span>or</span>
                </div>
                <button onClick={() => gitLoginRef.current.click()} className="git">
                    <span>
                        <GitHub />
                    </span>
                    <span>Login with GitHub</span>
                    <a ref={gitLoginRef} href="http://localhost:3004/api/user/github/login" hidden />
                </button>
                <button className="google">
                    <span>
                        <Google />
                    </span>
                    <span>Login with Google</span>
                </button>
            </EtcLogin>
        </Wrapper>
    );
};

export default Login;
