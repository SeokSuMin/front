import { Checkbox, message, Radio, RadioChangeEvent, Space } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateCategorisThunk } from '../../thunk/blogThunk';

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
    const [menuId, setMenuId] = useState(categoriMenus[0]?.menu_id);
    const [deleteIds, setDeleteIds] = useState<number[]>([]);
    const [addCategoris, setAddCategoris] = useState<number[]>([]);

    const changeMenu = (e: RadioChangeEvent) => {
        categoriMenus
            ?.find((menuObj) => menuObj.menu_id === menuId)
            ?.categoris.map((categori, i) => {
                if (categori?.categori_id) {
                    unregister(`${categori.categori_id}`);
                }
            });
        addCategoris.map((addNumber) => {
            unregister(`new_categori${addNumber}`);
            unregister(`new_sort${addNumber}`);
        });
        setAddCategoris([]);
        setMenuId(e.target.value);
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
        unregister(`new_categori${cancelNumber}`);
        unregister(`new_sort${cancelNumber}`);
    };

    const submit = async (value: { [key: string]: string }) => {
        try {
            const updateData: { categori_id: number | null; menu_id: number; categori_name: string; sort: number }[] =
                [];
            const deleteCategoriIds: number[] = [];
            const categoris = categoriMenus.find((c) => c.menu_id === menuId)?.categoris;
            if (categoris) {
                if (categoris[0] !== null) {
                    for (const categori of categoris) {
                        const categori_id = categori.categori_id;
                        if (deleteIds.find((id) => +id === categori_id)) {
                            deleteCategoriIds.push(categori_id);
                        } else {
                            const result = insertUpdateData('', updateData, value, categori_id);
                            if (!result) {
                                return;
                            } else {
                                updateData.push(result);
                            }
                        }
                    }
                }
                // 추가된 메뉴있으면 적용
                for (const addNumber of addCategoris) {
                    const result = insertUpdateData('new_', updateData, value, addNumber);
                    if (!result) {
                        return;
                    } else {
                        updateData.push(result);
                    }
                }
            }

            await dispatch(updateCategorisThunk({ updateData, deleteCategoriIds })).unwrap();
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

    const insertUpdateData = (
        valueName: string,
        updateData: { categori_id: number | null; menu_id: number; categori_name: string; sort: number }[],
        value: { [key: string]: string },
        categori_id: number,
    ) => {
        const categori_name = value[`${valueName}categori${categori_id}`];
        const sort = +value[`${valueName}sort${categori_id}`];
        if (updateData.find((data) => data.sort === sort)) {
            message.warn('카테고리 정렬번호는 겹칠 수 없습니다.');
            setError(`${valueName}sort${categori_id}`, { message: '' }, { shouldFocus: true });
            return false;
        } else {
            return {
                categori_id: valueName === 'new_' ? null : categori_id,
                menu_id: menuId,
                categori_name,
                sort,
            };
        }
    };

    return (
        <Wrapper>
            <ManegeBox>
                <ChoiceMenuBox>
                    <span className="menuText">메뉴 목록</span>
                    <Radio.Group value={menuId} onChange={changeMenu}>
                        <Space direction="vertical">
                            {categoriMenus?.map((categori, i) => {
                                return (
                                    <>
                                        <Radio key={categori.menu_id} value={categori.menu_id}>
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
                                ?.find((menuObj) => menuObj.menu_id === menuId)
                                ?.categoris?.map((categori, i) => {
                                    if (categori !== null) {
                                        return (
                                            <InputBox key={categori.categori_id}>
                                                <div className="menuBox">
                                                    <label>{i + 1}</label>
                                                    <input
                                                        {...register(`categori${categori.categori_id}`, {
                                                            required: true,
                                                        })}
                                                        type="text"
                                                        placeholder="카테고리 이름"
                                                        defaultValue={categori.categori_name}
                                                    />
                                                </div>
                                                <div className="sortBox">
                                                    <input
                                                        {...register(`sort${categori.categori_id}`, {
                                                            required: true,
                                                            min: 1,
                                                        })}
                                                        type="text"
                                                        placeholder="번호"
                                                        defaultValue={categori.sort}
                                                    />
                                                </div>
                                                <Checkbox value={categori.categori_id} />
                                                <span style={{ marginLeft: 2 }}>(삭제)</span>
                                            </InputBox>
                                        );
                                    }
                                })}
                        </Checkbox.Group>
                        {addCategoris.map((v) => {
                            return (
                                <InputBox key={v}>
                                    <div className="menuBox">
                                        <label>+</label>
                                        <input
                                            {...register(`new_categori${v}`, {
                                                required: true,
                                            })}
                                            type="text"
                                            placeholder="카테고리 이름"
                                        />
                                    </div>
                                    <div className="sortBox">
                                        <input
                                            {...register(`new_sort${v}`, {
                                                required: true,
                                                min: 1,
                                            })}
                                            type="text"
                                            placeholder="번호"
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
