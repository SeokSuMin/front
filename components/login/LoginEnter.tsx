import styled from 'styled-components';
import GitHub from '../../public/github.svg';
import Google from '../../public/google.svg';

const Wrapper = styled.div`
    width: 100%;
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
        background-color: rgb(24, 144, 255);
        border: none;
        color: white;
        position: relative;
        bottom: 0.063em;
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

interface ILoginEnterProps {
    checkJoinMember: boolean;
}

const LoginEnter = ({ checkJoinMember }: ILoginEnterProps) => {
    return (
        <Wrapper>
            <Enter>
                {checkJoinMember ? (
                    <>
                        <button type="submit">가입하기</button>
                    </>
                ) : (
                    <>
                        <button type="submit">Login</button>
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
        </Wrapper>
    );
};

export default LoginEnter;
