import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { togglLogin } from '../../reducer/user';
import { useAppDispatch } from '../../store/hooks';
import XToggle from '../../public/x-Toggle.svg';
import { useRef, useState } from 'react';
import IdPwWrite from './IdPwWrite';
import JoinMenu from './JoinMenu';
import LoginEnter from './LoginEnter';
import { SwapLeftOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
    width: 100%;
`;

const LoginBox = styled(motion.div)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 77;
`;

const LoginView = styled(motion.div)`
    width: 25rem;
    border: 0.063rem solid rgb(238, 238, 239);
    border-radius: 0.625em;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 78;
    padding: 0.938em;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
`;

const Close = styled.div`
    text-align: right;
    height: 10%;
    svg {
        width: 1.125rem;
        height: 1.125rem;
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
`;

const JoinViewText = styled.div<{ checkJoinMember: boolean }>`
    text-align: center;
    font-size: 0.688rem;
    padding: 0em 0em 1.818em 0em;
    span:first-child {
        display: inline-block;
        padding: ${(props) => (props.checkJoinMember ? '2em 0em 1em 0em' : 0)};
        cursor: pointer;
    }
`;

export interface ILoginInfo {
    userId: string;
    password: string;
    password1?: string;
}

interface ILoginProps {
    isVisible: boolean;
    scrollY: number;
}

const Login = ({ isVisible, scrollY }: ILoginProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const [checkJoinMember, setCheckJoinMember] = useState(false);
    const [profileImgURL, setProfileImgURL] = useState<string | ArrayBuffer>(null);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<ILoginInfo>({
        defaultValues: {
            userId: '',
            password: '',
            password1: '',
        },
    });

    const loginView = () => {
        dispatch(togglLogin({ loginVisible: false }));
    };
    const joinMember = (joinToggle: boolean) => {
        setCheckJoinMember(joinToggle);
        setProfileImgURL(null);
        setValue('userId', '');
        setValue('password', '');
        setValue('password1', '');
        setError('userId', { message: '' });
        setError('password', { message: '' });
        setError('password1', { message: '' });
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
        };
        reader.onerror = () => {
            console.log('error!');
        };
        reader.readAsDataURL(imgFile);

        e.target.value = '';
    };

    const deleteProfileImg = () => {
        setProfileImgURL(null);
    };
    const onSubmit = (value: ILoginInfo) => {
        if (value.password !== value.password1) {
            setError('password1', { message: '비밀번호가 일치 하지 않습니다.' }, { shouldFocus: true });
        }
        try {
            dispatch();
        } catch (err) {}
    };

    return (
        <AnimatePresence initial={false}>
            {isVisible ? (
                <Wrapper>
                    <LoginBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={loginView}
                    />
                    <LoginView
                        style={{
                            top: scrollY + 230,
                        }}
                    >
                        <Content>
                            <Close>
                                <XToggle onClick={loginView}></XToggle>
                            </Close>
                            <LoginText>{checkJoinMember ? <h1>JOIN MEMBER</h1> : <h1>GUEST LOGIN</h1>}</LoginText>
                            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                                <IdPwWrite {...{ register, errors, checkJoinMember }} />
                                {checkJoinMember ? (
                                    <JoinMenu
                                        {...{
                                            register,
                                            errors,
                                            clickImgFileInput,
                                            profileImgURL,
                                            inputRef,
                                            changeImgInput,
                                            deleteProfileImg,
                                        }}
                                    />
                                ) : null}
                                <LoginEnter {...{ checkJoinMember, joinMember }} />
                            </LoginForm>
                        </Content>
                    </LoginView>
                </Wrapper>
            ) : null}
        </AnimatePresence>
    );
};

export default Login;
