import { DeepRequired, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { ILoginInfo } from './Login';

const Wrapper = styled.div`
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
    span.userId,
    span.password {
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        width: 100%;
        height: 1.563rem;
        color: red;
    }
`;

interface IIdPwWriteProps {
    register: UseFormRegister<ILoginInfo>;
    errors: FieldErrorsImpl<DeepRequired<ILoginInfo>>;
}

const IdPwWrite = ({ register, errors }: IIdPwWriteProps) => {
    return (
        <Wrapper>
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
        </Wrapper>
    );
};

export default IdPwWrite;
