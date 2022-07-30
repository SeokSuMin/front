import { AnimatePresence, motion, MotionValue } from 'framer-motion';
import styled from 'styled-components';

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
    width: 400px;
    height: 300px;
    border: 1px solid rgb(238, 238, 239);
    border-radius: 10px;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 78;
`;

interface ILoginProps {
    isVisible: boolean;
    scrollY: number;
    loginView: (visible: boolean) => void;
}

const Login = ({ isVisible, scrollY, loginView }: ILoginProps) => {
    return (
        <AnimatePresence initial={false}>
            {isVisible ? (
                <Wrapper>
                    <LoginBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => loginView(false)}
                    />
                    <LoginView
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            top: scrollY + 230,
                        }}
                    ></LoginView>
                </Wrapper>
            ) : null}
        </AnimatePresence>
    );
};

export default Login;
