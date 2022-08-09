import { message } from 'antd';
import Search from 'antd/lib/input/Search';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
    DeepRequired,
    FieldErrorsImpl,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetError,
    UseFormSetValue,
} from 'react-hook-form';
import styled from 'styled-components';
import { loading } from '../../reducer/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changePassowrd, searchUser } from '../../thunk/userThunk';
import { ILoginInfo } from './UserModalView';

const Wrapper = styled.div`
    width: 80%;
`;

const SearchText = styled.div`
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

const UserInfoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1.25em;
    div:first-child {
        padding: 5px 5px;
        margin-bottom: 0.938em;
    }
    span {
        font-size: 0.813rem;
        padding: 0.357em 0px;
        margin-right: 0.357em;
    }
    span:first-child {
        margin-bottom: 0.625em;
    }
`;

const BackLogin = styled.span`
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 1.5em !important;
    font-size: 0.75rem;
    color: rgb(160, 160, 160);
    cursor: pointer;
`;

const LoginForm = styled.form`
    width: 100%;
    margin-top: 1.5em;
    display: flex;
    flex-direction: column;
    input {
        width: 70%;
        padding: 0.213em 0.625em;
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
    span.password {
        font-size: 0.688rem;
        display: flex;
        align-items: center;
        width: 80%;
        height: 1.125rem;
        color: red;
    }
    span:first-child {
        margin-bottom: 1em;
    }
    button {
        width: 50%;
        margin-top: 0.525em;
        border: none;
        padding: 5px;
        color: white;
        background-color: rgb(24, 144, 255);
        cursor: pointer;
        font-size: 14px;
    }
`;

interface IIdSearchProps {
    register: UseFormRegister<ILoginInfo>;
    handleSubmit: UseFormHandleSubmit<ILoginInfo>;
    errors: FieldErrorsImpl<DeepRequired<ILoginInfo>>;
    setValue: UseFormSetValue<ILoginInfo>;
    setError: UseFormSetError<ILoginInfo>;
    moveTypeView: (type: string) => void;
}

const IdSearch = ({ handleSubmit, register, setValue, setError, errors, moveTypeView }: IIdSearchProps) => {
    const dispatch = useAppDispatch();
    const { loading: searchLoading } = useAppSelector((state) => state.user);
    const [user, setUser] = useState<{ userId: string; registerDate: string }>(null);

    const search = async (email: string) => {
        try {
            const fineUser = await dispatch(searchUser(email)).unwrap();
            setUser((prev) => {
                return {
                    userId: fineUser.userId,
                    registerDate: fineUser.createdAt,
                };
            });
        } catch (err) {
            dispatch(loading({ loading: false }));
            setUser((prev) => null);
            message.warn(err);
        } finally {
            setValue('password', '');
            setValue('password1', '');
            setError('password', { message: '' });
            setError('password1', { message: '' });
        }
    };

    const changeSubmit = async (value: ILoginInfo) => {
        try {
            if (value.password !== value.password1) {
                setError('password1', { message: '비밀번호가 일치 하지 않습니다.' }, { shouldFocus: true });
            } else {
                dispatch(changePassowrd({ userId: user.userId, password: value.password }));
                message.success('비밀번호가 변경 되었습니다.');
                setValue('password', '');
                setValue('password1', '');
                setError('password', { message: '' });
                setError('password1', { message: '' });
                moveTypeView('login');
            }
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(loading({ loading: false }));
        }
    };

    return (
        <Wrapper>
            <SearchText>
                <h1>SEARCH USERINFO</h1>
            </SearchText>
            <Search placeholder="Write Email" onSearch={search} enterButton />
            <UserInfoBox>
                {searchLoading ? <span>사용자 정보를 검색중 입니다</span> : null}
                {user?.userId ? <span>아래 등록된 사용자 정보 입니다.</span> : null}
                {user?.userId ? (
                    <>
                        <div>
                            <span>아이디:</span>
                            <span>{user?.userId}</span>
                        </div>
                        <div>
                            <span>가입일: </span>
                            <span>{dayjs(user?.registerDate).format('YYYY-MM-DD HH:mm')}</span>
                        </div>
                    </>
                ) : null}
            </UserInfoBox>
            {user?.userId ? (
                <LoginForm onSubmit={handleSubmit(changeSubmit)}>
                    <span>비밀번호 변경</span>
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
                            required: '확인란은 필수 입니다.',
                        })}
                        type="password"
                        placeholder="비밀번호 확인"
                    />
                    <span className="password">{errors?.password1?.message}</span>
                    <button type="submit">변경하기</button>
                </LoginForm>
            ) : null}

            <BackLogin onClick={() => moveTypeView('login')}>로그인 화면으로 돌아가기</BackLogin>
        </Wrapper>
    );
};

export default IdSearch;
