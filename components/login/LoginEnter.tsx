import styled from 'styled-components';
import GitHub from '../../public/github.svg';
import Google from '../../public/google.svg';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Enter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    button {
        width: 100%;
        height: 2.063rem;
        font-size: 0.875rem;
        margin: 0.625em 0px 1.25em 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0.188em 0.188em 0.188em rgb(220, 220, 220);
        background-color: rgb(24, 144, 255);
        border: none;
        color: white;
    }

    span {
        font-size: 0.75rem;
        color: rgb(160, 160, 160);
        cursor: pointer;
        margin: 0px 0.625em;
    }

    .hr-sect {
        width: 100%;
        display: flex;
        flex-basis: 100%;
        align-items: center;
        margin-top: 1em;
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

    button.memberJoin {
        margin: 1.5em 0px 0.625em 0px;
    }

    button:nth-child(4) {
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
    button:nth-child(5) {
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

const BackLogin = styled.span`
    margin-top: 0.625em !important;
`;

interface ILoginEnterProps {
    checkJoinMember: boolean;
    joinMember: (joinToggle: boolean) => void;
}

const LoginEnter = ({ checkJoinMember, joinMember }: ILoginEnterProps) => {
    return (
        <Wrapper>
            <Enter>
                {checkJoinMember ? (
                    <>
                        <button className="memberJoin" type="submit">
                            가입하기
                        </button>
                        <BackLogin onClick={() => joinMember(false)}>로그인 화면으로 돌아가기</BackLogin>
                    </>
                ) : (
                    <>
                        <button type="submit">Login</button>
                        <span onClick={() => joinMember(true)}>가입하기</span>
                        <div className="hr-sect">
                            <span>or</span>
                        </div>
                        <button>
                            <span>
                                <GitHub />
                            </span>
                            <span>Login with GitHub</span>
                        </button>
                        <button>
                            <span>
                                <Google />
                            </span>
                            <span>Login with Google</span>
                        </button>
                    </>
                )}
            </Enter>
        </Wrapper>
    );
};

export default LoginEnter;
