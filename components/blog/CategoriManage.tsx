import { Checkbox, message, Radio, RadioChangeEvent, Space } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateCategoris } from '../../thunk/blogThunk';

const Wrapper = styled.div`
    width: 100%;
`;

const ManegeBox = styled.div`
    display: flex;
    .menuText {
        font-size: 0.875rem;
        margin-bottom: 1.25em;
    }
`;

const ChoiceMenuBox = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const ModifyCategoriBox = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const ManagerForm = styled.form`
    width: 100%;
`;

const InputBox = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    margin-bottom: 2em;

    label {
        margin-right: 15px;
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
    span {
        font-size: 0.75rem;
        color: rgb(160, 160, 160);
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

const CategoriManage = () => {
    const {
        register,
        handleSubmit,
        unregister,
        setError,
        setValue,
        formState: { errors },
    } = useForm<{ [key: string]: string }>();
    const { categoriMenus } = useAppSelector((state) => state.categoriMenus);
    const dispatch = useAppDispatch();
    const [menu, setMenu] = useState(categoriMenus[0]?.menu_name);
    const [deleteIds, setDeleteIds] = useState<number[]>([]);
    const [addCategoris, setAddCategoris] = useState<number[]>([]);

    const changeMenu = (e: RadioChangeEvent) => {
        categoriMenus
            ?.find((menuObj) => menuObj.menu_name === menu)
            ?.categoris.map((categori, i) => {
                unregister(`${categori.categori_id}`);
            });
        setMenu(e.target.value);
    };

    const deleteCategori = (checkedValues: CheckboxValueType[]) => {
        setDeleteIds((prev) => {
            return [...(checkedValues as number[])];
        });
    };

    const addCategori = () => {
        if (!addCategoris.length) {
            setAddCategoris([0]);
        } else {
            setAddCategoris((prev) => [...prev, addCategoris[prev.length - 1] + 1]);
        }
    };

    const cancelCategori = (cancelNumber: number) => {
        setAddCategoris((prev) => [...prev.filter((v) => v !== cancelNumber)]);
        unregister(`new${cancelNumber}`);
    };

    const submit = async (value: { [key: string]: string }) => {
        try {
            const updateData: { menu_name: string; categori_name: string; sort: number; categori_id: number | null }[] =
                [];
            const deleteMenuIds: string[] = [];
            const sort = categoriMenus.find((categori) => categori.menu_name === menu)?.sort as number;
            for (const key in value) {
                if (!key.includes('new')) {
                    if (deleteIds.find((id) => id === +key)) {
                        deleteMenuIds.push(key);
                    } else {
                        updateData.push({
                            categori_id: +key,
                            menu_name: menu,
                            sort,
                            categori_name: value[key],
                        });
                    }
                }
            }
            for (const addNumber of addCategoris) {
                const categori_name = value[`new${addNumber}`];
                updateData.push({
                    categori_id: null,
                    menu_name: menu,
                    sort,
                    categori_name,
                });
            }
            await dispatch(updateCategoris({ updateData, deleteMenuIds })).unwrap();
            addCategoris.map((number) => cancelCategori(number));
            message.success('저장하였습니다.');
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                message.error(err.message);
            } else {
                message.error(err as string);
            }
        }
    };

    return (
        <Wrapper>
            <ManegeBox>
                <ChoiceMenuBox>
                    <span className="menuText">메뉴 목록</span>
                    <Radio.Group value={menu} onChange={changeMenu}>
                        <Space direction="vertical">
                            {categoriMenus?.map((categori) => {
                                return (
                                    <>
                                        <Radio key={categori.menu_name} value={categori.menu_name}>
                                            {categori.menu_name}
                                        </Radio>
                                        <br />
                                    </>
                                );
                            })}
                        </Space>
                    </Radio.Group>
                </ChoiceMenuBox>
                <ModifyCategoriBox>
                    <span className="menuText">카테고리 목록</span>
                    <ManagerForm onSubmit={handleSubmit(submit)}>
                        <Checkbox.Group style={{ width: '100%' }} onChange={deleteCategori}>
                            {categoriMenus
                                ?.find((menuObj) => menuObj.menu_name === menu)
                                ?.categoris.map((categori, i) => {
                                    return (
                                        <InputBox key={categori.categori_id}>
                                            <div className="menuBox">
                                                <label>{i + 1}</label>
                                                <input
                                                    {...register(`${categori.categori_id}`, {
                                                        required: true,
                                                    })}
                                                    type="text"
                                                    placeholder="카테고리 이름"
                                                    defaultValue={Object.keys(categori)[0]}
                                                />
                                            </div>
                                            <Checkbox value={categori.categori_id} />
                                            <span style={{ marginLeft: 2 }}>(삭제)</span>
                                        </InputBox>
                                    );
                                })}
                        </Checkbox.Group>
                        {addCategoris.map((v) => {
                            return (
                                <InputBox key={v}>
                                    <div className="menuBox">
                                        <label>+</label>
                                        <input
                                            {...register(`new${v}`, {
                                                required: true,
                                            })}
                                            type="text"
                                            placeholder="카테고리 이름"
                                        />
                                    </div>
                                    <span
                                        onClick={() => cancelCategori(v)}
                                        style={{ marginLeft: '0.938em', cursor: 'pointer' }}
                                    >
                                        [ 취소 ]
                                    </span>
                                </InputBox>
                            );
                        })}

                        <ButtonBox>
                            <button type="button" onClick={addCategori}>
                                카테고리 추가
                            </button>
                            <button type="submit">저장</button>
                        </ButtonBox>
                    </ManagerForm>
                </ModifyCategoriBox>
            </ManegeBox>
        </Wrapper>
    );
};

export default CategoriManage;
