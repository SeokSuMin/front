import { Button, Form, Input } from 'antd';
import { AnimatePresence, motion, MotionValue } from 'framer-motion';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { togglLogin } from '../../reducer/user';
import { useAppDispatch } from '../../store/hooks';
import XToggle from '../../public/x-Toggle.svg';
import GitHub from '../../public/github.svg';
import Google from '../../public/google.svg';
import { useRef, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

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
    width: 18.75rem;
    border: 0.063rem solid rgb(238, 238, 239);
    border-radius: 0.625rem;
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
    text-align: center;
    padding-bottom: 1em;
    font-size: 1.25rem;
    font-weight: bold;
    font-style: italic;
`;

// const Write = styled.div`
//     width: 100%;
// `;
const LoginForm = styled(Form)`
    width: 100%;
    position: relative;
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

const InputBox = styled.div`
    margin-bottom: 0.938em;
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

const Enter = styled.div`
    font-size: 0.875rem;
    div,
    button {
        width: 100%;
        padding: 0.5em 0em;
        margin-bottom: 0.725em;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0.188em 0.188em 0.188em rgb(220, 220, 220);
        height: 2.063rem;
    }
    button {
        position: relative;
        bottom: 1px;
    }
    div:nth-child(2) {
        background-color: black;
        color: white;
        position: relative;
        bottom: 0;
        svg {
            width: 0.938rem;
            height: 0.938rem;
            fill: white;
            margin-right: 0.625em;
        }
    }
    div:nth-child(3) {
        border: 0.063rem solid rgb(217, 217, 217);
        position: relative;
        bottom: 0;
        svg {
            width: 0.938rem;
            height: 0.938rem;
            margin-right: 0.625em;
        }
    }
`;

interface ILoginInfo {
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
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ILoginInfo>({
        defaultValues: {
            userId: '',
            password: '',
            password1: '',
        },
    });

    const onSubmit = (value) => {
        console.log(value);
    };
    const loginView = () => {
        dispatch(togglLogin({ loginVisible: false }));
    };
    const joinMember = (joinToggle: boolean) => {
        setCheckJoinMember(joinToggle);
        setProfileImgURL(null);
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            top: scrollY + 230,
                        }}
                    >
                        <Content>
                            <Close>
                                <XToggle onClick={loginView}></XToggle>
                            </Close>
                            <LoginText>{checkJoinMember ? <h1>JOIN MEMBER</h1> : <h1>GUEST LOGIN</h1>}</LoginText>

                            <LoginForm onFinish={handleSubmit}>
                                <InputBox>
                                    <InputBox>
                                        <Form.Item
                                            name="userId"
                                            rules={[{ required: true, message: '아이디는 필수 입니다!' }]}
                                        >
                                            <Input placeholder="아이디" />
                                        </Form.Item>
                                    </InputBox>
                                </InputBox>
                                <InputBox>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: '비밀번호는 필수 입니다!' }]}
                                    >
                                        <Input.Password placeholder="password" />
                                    </Form.Item>
                                </InputBox>
                                {checkJoinMember ? (
                                    <>
                                        <Form.Item
                                            name="password1"
                                            rules={[{ required: true, message: '비밀번호는 필수 입니다!' }]}
                                        >
                                            <Input.Password placeholder="one more password" />
                                        </Form.Item>
                                        <FileInputBox>
                                            <Button onClick={clickImgFileInput}>이미지 선택</Button>
                                            {!profileImgURL ? <span>선택된 프로필 이미지 없음.</span> : null}

                                            <input
                                                type="file"
                                                ref={inputRef}
                                                onChange={changeImgInput}
                                                hidden
                                                accept="image/*"
                                            />
                                        </FileInputBox>
                                        {profileImgURL ? (
                                            <ProfileImgBox>
                                                <ProfileImg imgURL={profileImgURL}></ProfileImg>
                                                <XToggle onClick={deleteProfileImg}></XToggle>
                                            </ProfileImgBox>
                                        ) : null}
                                    </>
                                ) : null}
                                <JoinViewText checkJoinMember={checkJoinMember}>
                                    {checkJoinMember ? (
                                        <span onClick={() => joinMember(false)}>돌아가기</span>
                                    ) : (
                                        <span onClick={() => joinMember(true)}>간편 가입하기</span>
                                    )}
                                </JoinViewText>
                                <Enter>
                                    {checkJoinMember ? (
                                        <>
                                            <Button type="primary" htmlType="submit">
                                                가입하기
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button type="primary" htmlType="submit">
                                                Login
                                            </Button>
                                            <div>
                                                <span>
                                                    <GitHub />
                                                </span>
                                                <span>Login with GitHub</span>
                                            </div>
                                            <div>
                                                <span>
                                                    <Google />
                                                </span>
                                                <span>Login with Google</span>
                                            </div>
                                        </>
                                    )}
                                </Enter>
                            </LoginForm>
                        </Content>
                    </LoginView>
                </Wrapper>
            ) : null}
        </AnimatePresence>
    );
};

export default Login;
