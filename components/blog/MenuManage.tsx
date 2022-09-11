import { Checkbox, message } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateMenuThunk } from '../../thunk/blogThunk';

const Wrapper = styled.div``;

const ManagerForm = styled.form`
    width: 100%;
    height: 100%;
`;

const InputBox = styled.div`
    width: 60%;
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

const MenuManage = () => {
    const {
        register,
        handleSubmit,
        unregister,
        setError,
        setValue,
        formState: { errors },
    } = useForm<{ [key: string]: string }>();
    const dispatch = useAppDispatch();
    const { categoriMenus } = useAppSelector((state) => state.categoriMenus);
    const [deleteIds, setDeleteIds] = useState<string[]>([]);
    const [addMenus, setAddMenus] = useState<number[]>([]);

    const deleteMenu = (checkedValues: CheckboxValueType[]) => {
        setDeleteIds((prev) => {
            return [...(checkedValues as string[])];
        });
    };

    const addMenu = () => {
        if (!addMenus.length) {
            setAddMenus([0]);
        } else {
            setAddMenus((prev) => [...prev, addMenus[prev.length - 1] + 1]);
        }
    };

    const cancelMenu = (cancelNumber: number) => {
        setAddMenus((prev) => [...prev.filter((v) => v !== cancelNumber)]);
        unregister(`new_menu${cancelNumber}`);
        unregister(`new_sort${cancelNumber}`);
    };

    // 업데이트 및 메뉴 삭제진행
    const submit = async (value: { [key: string]: string }) => {
        try {
            const updateData: { menu_id: number | null; menu_name: string; sort: number }[] = [];
            const deleteMenuIds: number[] = [];

            for (const menu of categoriMenus) {
                const menu_id = menu.menu_id;
                if (deleteIds.find((id) => +id === menu_id)) {
                    deleteMenuIds.push(menu_id);
                } else {
                    const result = insertUpdateData('', updateData, value, menu_id);
                    if (!result) {
                        return;
                    } else {
                        updateData.push(result);
                    }
                }
            }
            // 추가된 메뉴있으면 적용
            for (const addNumber of addMenus) {
                const result = insertUpdateData('new_', updateData, value, addNumber);
                if (!result) {
                    return;
                } else {
                    updateData.push(result);
                }
            }

            await dispatch(updateMenuThunk({ updateData, deleteMenuIds })).unwrap();
            addMenus.map((number) => cancelMenu(number));
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
        updateData: { menu_id: number | null; menu_name: string; sort: number }[],
        value: { [key: string]: string },
        menu_id: number,
    ) => {
        const menu_name = value[`${valueName}menu${menu_id}`];
        const sort = +value[`${valueName}sort${menu_id}`];
        if (updateData.find((data) => data.sort === sort)) {
            message.warn('메뉴 정렬번호는 겹칠 수 없습니다.');
            setError(`${valueName}sort${menu_id}`, { message: '' }, { shouldFocus: true });
            return false;
        } else {
            return {
                menu_id: valueName === 'new_' ? null : menu_id,
                menu_name,
                sort,
            };
        }
    };

    return (
        <Wrapper>
            <ManagerForm onSubmit={handleSubmit(submit)}>
                <Checkbox.Group style={{ width: '100%' }} onChange={deleteMenu}>
                    {categoriMenus?.map((categori, i) => {
                        const menu_id = categori.menu_id;
                        return (
                            <InputBox key={categori.menu_name}>
                                <div className="menuBox">
                                    <label>{i + 1}</label>
                                    <input
                                        {...register(`menu${menu_id}`, {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="메뉴 이름"
                                        defaultValue={categori.menu_name}
                                    />
                                </div>
                                <div className="sortBox">
                                    <input
                                        {...register(`sort${menu_id}`, {
                                            required: true,
                                            min: 1,
                                        })}
                                        type="text"
                                        placeholder="번호"
                                        defaultValue={categori.sort}
                                    />
                                </div>
                                <Checkbox value={menu_id} />
                                <span style={{ marginLeft: 2 }}>(삭제)</span>
                            </InputBox>
                        );
                    })}
                </Checkbox.Group>
                {/* 신규 추가 메뉴가 일을때만 디스플레이 */}
                {addMenus.map((v) => {
                    return (
                        <InputBox key={v}>
                            <div className="menuBox">
                                <label>+</label>
                                <input
                                    {...register(`new_menu${v}`, {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="메뉴 이름"
                                />
                            </div>
                            <div className="sortBox">
                                <input
                                    {...register(`new_sort${v}`, {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="번호"
                                />
                            </div>
                            <span onClick={() => cancelMenu(v)} style={{ marginLeft: '0.938em', cursor: 'pointer' }}>
                                [ 취소 ]
                            </span>
                        </InputBox>
                    );
                })}

                <ButtonBox>
                    <button type="button" onClick={addMenu}>
                        메뉴추가
                    </button>
                    <button type="submit">저장</button>
                </ButtonBox>
            </ManagerForm>
        </Wrapper>
    );
};

export default MenuManage;
