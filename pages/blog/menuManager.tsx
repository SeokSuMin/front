import { DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCategoriMenu } from '../../thunk/blogThunk';

const Wrapper = styled.div`
    width: 100%;
    button {
        padding: 0.125em 0.313em;
        height: 1.875em;
        margin-left: 0.313em;
    }
`;

const ChangeWorkBox = styled.div`
    width: 100%;
    text-align: right;
    padding-bottom: 0.625em;
`;

const ManagerBox = styled.div`
    width: 100%;
    padding: 1.875em 0em 1.875em 1.875em;
`;

const ManagerForm = styled.form`
    width: 100%;
`;

const InputBox = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    margin-bottom: 2em;

    label {
        margin-right: 15px;
    }
    div {
        position: relative;
    }
    input {
        width: 100%;
        font-size: 0.875rem;
        padding-bottom: 0.214em;
        border: none;
        border-bottom: 0.0625rem solid black;
    }
    input:focus {
        outline: none;
    }
    input::placeholder {
        font-size: 0.75rem;
        color: rgb(197, 193, 208);
    }
    .menuBox {
        display: flex;
        align-items: center;
        width: 50%;
    }
    .sortBox {
        display: flex;
        align-items: center;
        width: 10%;
        margin-left: 10px;
        input {
            text-align: center;
        }
    }
    span {
        font-size: 0.75rem;
        color: rgb(160, 160, 160);
    }

    span.userId,
    span.password {
        position: absolute;
        top: 1.3rem;
        left: 0px;
        font-size: 0.688rem;
        display: flex;
        align-items: center;
        width: 80%;
        height: 1.125rem;
        color: red;
    }

    .ant-checkbox-wrapper {
        margin: 0px;
        margin-left: 0.938em;
    }
`;

const ButtonBox = styled.div`
    width: 100%;
    text-align: right;
    button {
        cursor: pointer;
        // border: none;
    }
`;

const MenuManager = () => {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();
    const dispatch = useAppDispatch();
    const { categoriMenus, loading } = useAppSelector((state) => state.blog);
    const initPage = async () => {
        await dispatch(getCategoriMenu());
    };

    useEffect(() => {
        initPage();
    }, []);

    const submit = (value) => {
        console.log(value);
    };

    return (
        <Wrapper>
            <ChangeWorkBox>
                <Button type="primary">메뉴관리</Button>
                <Button>카테고리</Button>
            </ChangeWorkBox>
            <ManagerBox>
                <ManagerForm onSubmit={handleSubmit(submit)}>
                    {categoriMenus?.map((categori, i) => {
                        return (
                            <InputBox key={categori.menu_name}>
                                <div className="menuBox">
                                    <label>{i + 1}</label>
                                    <input
                                        {...register('menu' + categori.categoris.map((c) => c.categori_id).join('_'), {
                                            required: '메뉴이름은 필수 입니다.',
                                        })}
                                        type="text"
                                        placeholder="메뉴 이름"
                                        defaultValue={categori.menu_name}
                                    />
                                    <span
                                        className={'menu' + categori.categoris.map((c) => c.categori_id).join('_')}
                                    ></span>
                                </div>
                                <div className="sortBox">
                                    <input
                                        {...register('sort' + categori.categoris.map((c) => c.categori_id).join('_'), {
                                            required: '정렬번호는 필수입니다.',
                                        })}
                                        type="text"
                                        placeholder="번호"
                                        defaultValue={categori.sort}
                                    />
                                    <span
                                        className={'menu' + categori.categoris.map((c) => c.categori_id).join('_')}
                                    ></span>
                                </div>
                                <Checkbox />
                                <span>(삭제)</span>
                            </InputBox>
                        );
                    })}
                    {/* <InputBox>
                        <div className="menuBox">
                            <label>6</label>
                            <input
                                {...register('userId', {
                                    required: '메뉴이름은 필수 입니다.',
                                })}
                                type="text"
                                placeholder="메뉴 이름"
                            />
                            <span className="userId"></span>
                        </div>
                        <div className="sortBox">
                            <input
                                {...register('userId', {
                                    required: '메뉴이름은 필수 입니다.',
                                })}
                                type="text"
                                placeholder="번호"
                            />
                            <span className="userId"></span>
                        </div>
                        <span style={{ marginLeft: '0.938em', cursor: 'pointer' }}>[ 취소 ]</span>
                    </InputBox> */}

                    <ButtonBox>
                        <button>메뉴추가</button>
                        <button type="submit">저장</button>
                    </ButtonBox>
                </ManagerForm>
            </ManagerBox>
        </Wrapper>
    );
};

export default MenuManager;
