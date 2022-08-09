import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import XToggle from '../../public/x-Toggle.svg';
import { togglLogin } from '../../reducer/user';
import { useAppDispatch } from '../../store/hooks';
import IdSearch from './IdSearch';
import Login from './Login';
import MemberJoin from './MemberJoin';

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
    z-index: 77;
`;

const ModalView = styled(motion.div)`
    width: 22rem;
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
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Close = styled.div`
    text-align: right;
    height: 10%;
    svg {
        width: 1.125rem;
        height: 1.125rem;
    }
`;

interface ILoginProps {
    isVisible: boolean;
    scrollY: number;
}

export interface ILoginInfo {
    userId?: string;
    joinUserId?: string;
    email?: string;
    password?: string;
    password1?: string;
}
const UserModalView = ({ isVisible, scrollY }: ILoginProps) => {
    const dispatch = useAppDispatch();
    const [viewType, setViewType] = useState('login');
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<ILoginInfo>();
    const loginView = () => {
        dispatch(togglLogin({ loginVisible: false }));
    };
    const moveTypeView = (type: string) => {
        setViewType(type);
    };

    return (
        <AnimatePresence initial={false}>
            {isVisible ? (
                <Wrapper>
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={loginView}
                    />
                    <ModalView
                        style={{
                            top: scrollY + 200,
                        }}
                    >
                        <Close>
                            <XToggle onClick={loginView}></XToggle>
                        </Close>
                        <Content>
                            {viewType === 'login' ? (
                                <Login
                                    {...{ register, handleSubmit, errors, setValue, setError, loginView, moveTypeView }}
                                />
                            ) : null}
                            {viewType === 'join' ? (
                                <MemberJoin {...{ register, handleSubmit, errors, setValue, setError, moveTypeView }} />
                            ) : null}
                            {viewType === 'search' ? (
                                <IdSearch {...{ register, handleSubmit, errors, setValue, setError, moveTypeView }} />
                            ) : null}
                        </Content>
                    </ModalView>
                </Wrapper>
            ) : null}
        </AnimatePresence>
    );
};

export default UserModalView;
