import { DeepRequired, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { ILoginInfo } from './Login';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        width: 80%;
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
        font-size: 0.688rem;
        display: flex;
        align-items: center;
        width: 80%;
        height: 1.125rem;
        color: red;
    }
    span.compalteText {
        font-size: 0.688rem;
        display: flex;
        align-items: center;
        width: 80%;
        height: 1.125rem;
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
        top: 0.438em;
        right: 0.938em;
    }
`;

interface IIdPwWriteProps {
    register: UseFormRegister<ILoginInfo>;
    errors: FieldErrorsImpl<DeepRequired<ILoginInfo>>;
    checkJoinMember: boolean;
    checkUserId: (userId: string) => Promise<void>;
    joinUserId: string;
}

const IdPwWrite = ({ register, errors, checkJoinMember, checkUserId, joinUserId }: IIdPwWriteProps) => {
    const { loading } = useAppSelector((state) => state.user);
    return (
        <Wrapper>
            <IdInputBox>
                <input
                    {...register('userId', {
                        required: '아이디는 필수 입니다.',
                        onBlur: (e: React.FormEvent<HTMLInputElement>) => {
                            if (checkJoinMember) {
                                // 기존 유효성 통과된 아이디와 다르거나 공백이 아닐때
                                if (e.currentTarget.value !== joinUserId && e.currentTarget.value.length !== 0) {
                                    return checkUserId(e.currentTarget.value);
                                }
                            }
                        },
                    })}
                    type="text"
                    placeholder="아이디"
                />
                {checkJoinMember && loading ? <LoadingOutlined /> : null}
            </IdInputBox>
            <span className="userId">{errors?.userId?.message}</span>
            {/* {errors?.userId?.message ? (
                <span className="userId">{errors?.userId?.message}</span>
            ) : (
                <span className="compalteText">
                    {joinUserId.length !== 0 && checkIdComplate ? '사용가능한 아이디 입니다.' : ''}
                </span>
            )} */}

            <input
                {...register('password', {
                    required: '비밀번호는 필수 입니다.',
                })}
                type="password"
                placeholder="비밀번호"
            />
            <span className="password">{errors?.password?.message}</span>
            {checkJoinMember ? (
                <>
                    <input
                        {...register('password1', {
                            required: '비밀번호는 확인란은 필수 입니다.',
                        })}
                        type="password"
                        placeholder="비밀번호 확인"
                    />
                    <span className="password">{errors?.password1?.message}</span>
                </>
            ) : null}
        </Wrapper>
    );
};

export default IdPwWrite;
