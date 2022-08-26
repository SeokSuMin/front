import { DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import CategoriManage from '../../components/blog/CategoriManage';
import MenuManage from '../../components/blog/MenuManage';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCategoriMenu, updateCategoris } from '../../thunk/blogThunk';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
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

const MenuManager = () => {
    const dispatch = useAppDispatch();
    const [manageType, setManageType] = useState(1);

    const changeManageType = (type: number) => {
        setManageType(type);
    };

    const initPage = async () => {
        await dispatch(getCategoriMenu());
    };

    useEffect(() => {
        initPage();
    }, []);

    return (
        <Wrapper>
            <ChangeWorkBox>
                <Button onClick={() => changeManageType(1)} type={manageType === 1 ? 'primary' : 'default'}>
                    메뉴관리
                </Button>
                <Button onClick={() => changeManageType(2)} type={manageType === 2 ? 'primary' : 'default'}>
                    카테고리
                </Button>
            </ChangeWorkBox>
            <ManagerBox>
                {manageType === 1 ? <MenuManage /> : null}
                {manageType === 2 ? <CategoriManage /> : null}
            </ManagerBox>
        </Wrapper>
    );
};

export default MenuManager;
