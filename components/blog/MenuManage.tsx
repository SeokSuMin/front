import { Checkbox, message } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateCategorisThunk } from '../../thunk/blogThunk';

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
            const updateData: { menu_name: string; sort: number; categori_id?: number | null }[] = [];
            const deleteMenuIds: string[] = [];

            for (const c of categoriMenus) {
                const cIds = c.categoris.map((c) => c.categori_id).join('_');
                if (deleteIds.find((ids) => ids === cIds)) {
                    deleteMenuIds.push(cIds);
                } else {
                    const menu_name = value[`menu${cIds}`];
                    const sort = value[`sort${cIds}`];
                    if (updateData.find((data) => data.sort === +sort)) {
                        message.warn('메뉴 정렬번호는 겹칠 수 없습니다.');
                        setError(`sort${cIds}`, { message: '' }, { shouldFocus: true });
                        return;
                    }

                    // upsert진행위해 배열로 만듬
                    for (const id of cIds.split('_')) {
                        console.log(id);
                        updateData.push({
                            menu_name,
                            sort: +sort,
                            categori_id: +id,
                        });
                    }
                }
            }
            // 추가된 메뉴있으면 적용
            for (const addNumber of addMenus) {
                const menu_name = value[`new_menu${addNumber}`];
                const sort = value[`new_sort${addNumber}`];
                updateData.push({
                    menu_name,
                    sort: +sort,
                    categori_id: null,
                });
            }

            await dispatch(updateCategorisThunk({ updateData, deleteMenuIds })).unwrap();
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

    return (
        <Wrapper>
            <ManagerForm onSubmit={handleSubmit(submit)}>
                <Checkbox.Group style={{ width: '100%' }} onChange={deleteMenu}>
                    {categoriMenus?.map((categori, i) => {
                        const allCategoriIds = categori.categoris.map((c) => c.categori_id).join('_');
                        return (
                            <InputBox key={categori.menu_name}>
                                <div className="menuBox">
                                    <label>{i + 1}</label>
                                    <input
                                        {...register('menu' + allCategoriIds, {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="메뉴 이름"
                                        defaultValue={categori.menu_name}
                                    />
                                </div>
                                <div className="sortBox">
                                    <input
                                        {...register('sort' + allCategoriIds, {
                                            required: true,
                                            min: 1,
                                        })}
                                        type="text"
                                        placeholder="번호"
                                        defaultValue={categori.sort}
                                    />
                                </div>
                                <Checkbox value={allCategoriIds} />
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
