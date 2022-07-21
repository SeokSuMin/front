import { useRouter } from 'next/router';
import styled from 'styled-components';
import wrapper from '../../store/configStore';
import TwoSquareToggle from '../../public/2-squares.svg';
import FourSquareToggle from '../../public/4-squares.svg';
import BasicListToggle from '../../public/BasicList.svg';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { Card, Col, List, Row, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Meta from 'antd/lib/card/Meta';

const { Option } = Select;

const Wrapper = styled.div`
    width: 100%;
`;

const TopMenuBox = styled.div`
    width: 800px;
    margin: 0 auto;
    margin-top: 180px;
    padding: 10px;
`;

const BoardNameBox = styled.div`
    h1 {
        font-size: 20px;
        font-weight: bold;
        height: 20px;
    }
`;
const ToggleBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 70px;
    & > div {
        padding-left: 10px;
    }
    svg {
        width: 20px;
        height: 30px;
        margin-right: 5px;
        cursor: pointer;
        /* fill: green; */
    }
    .active {
        fill: green;
    }
`;

const Search = styled.form`
    /* color: white; */
    display: flex;
    position: relative;
    align-items: center;
    svg {
        position: absolute;
        right: 0;
        width: 20px;
        height: 30px;
        margin-right: 5px;
        cursor: pointer;
        z-index: 1;
    }
`;

const Input = styled(motion.input)`
    position: relative;
    font-size: 13px;
    /* left: 0; */
    /* transform-origin: left center; */
    padding: 6px 8px;
    padding-right: 30px;
    height: 32px;
    border: 1px solid rgb(217, 217, 217);
`;

const BoardBox = styled.div`
    width: 800px;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
`;

const BoardTable = styled(Table)`
    thead > tr > .ant-table-cell {
        font-size: 15px;
        font-weight: bold;
    }
    tbody > tr td {
        font-size: 15px;
    }
`;

const SearchBox = styled.div`
    width: 800px;
    margin: 0 auto;
    padding: 10px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(249, 249, 248);
    .ant-select-single {
        margin-right: 10px;
    }
`;

interface IForm {
    word: string;
}

interface IColumn {
    key: React.Key;
    no: number;
    title: string;
    writer: string;
    date: string;
    searchCount: number;
}

const columns: ColumnsType<IColumn> = [
    { title: '', dataIndex: 'no', key: 'no', align: 'center' },
    {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        width: '60%',
        align: 'center',
        render: (text: string) => (
            <div style={{ textAlign: 'left' }}>
                <a>
                    {text} <span>(3)</span>
                </a>
            </div>
        ),
    },
    { title: '작성자', dataIndex: 'writer', key: 'writer', align: 'center' },
    { title: '작성일', dataIndex: 'date', key: 'date', align: 'center' },
    { title: '조회수', dataIndex: 'searchCount', key: 'searchCount', align: 'center' },
];

const data: IColumn[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
    return {
        key: v,
        no: v,
        title: v + 'John Brown shark  Brown shark',
        writer: 'shark',
        date: '2022-07-21',
        searchCount: v + 1,
    };
});

const fourBox = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.15,
            type: 'linear',
        },
    },
    exit: { y: -20, opacity: 0 },
};

const fourBoxItem = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const twoBox = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            staggerChildren: 0.15,
            type: 'linear',
        },
    },
    exit: { y: -20, opacity: 0 },
};

const twoBoxItem = {
    hidden: { x: -10, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
    },
};

const Freeboard = () => {
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [viewType, setViewType] = useState(1);
    const [leaving, setLeaving] = useState(false);
    const inputAnimation = useAnimation();
    const { register, setValue, handleSubmit } = useForm<IForm>();

    const toggleSerch = () => {
        if (searchOpen) {
            inputAnimation.start({
                scaleX: 0,
            });
        } else {
            inputAnimation.start({
                scaleX: 1,
            });
        }
        setSearchOpen((prev) => !prev);
    };

    const changeListView = (type: number) => {
        if (type === viewType) {
            return;
        }
        if (leaving) {
            return;
        }
        setViewType(type);
        setLeaving(true);
    };
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };

    return (
        <Wrapper>
            <TopMenuBox>
                <BoardNameBox>
                    <h1>자유게시판</h1>
                </BoardNameBox>
                <ToggleBox>
                    <TwoSquareToggle className={viewType === 3 ? 'active' : ''} onClick={() => changeListView(3)} />
                    <FourSquareToggle className={viewType === 2 ? 'active' : ''} onClick={() => changeListView(2)} />
                    <BasicListToggle className={viewType === 1 ? 'active' : ''} onClick={() => changeListView(1)} />
                    <div>
                        <Select defaultValue="15" style={{ width: 100 }}>
                            <Option value="15">15개씩</Option>
                            <Option value="30">30개씩</Option>
                            <Option value="45">45개씩</Option>
                            <Option value="50">50개씩</Option>
                        </Select>
                    </div>
                </ToggleBox>
            </TopMenuBox>
            <BoardBox>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    {viewType === 1 && !leaving ? (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ type: 'linear' }}
                        >
                            <BoardTable columns={columns} dataSource={data} />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    {viewType === 2 && !leaving ? (
                        <motion.div variants={fourBox} initial="hidden" animate="visible" exit="exit">
                            <Row gutter={16}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
                                    return (
                                        <Col key={v} span={6}>
                                            <motion.div variants={fourBoxItem}>
                                                <Card
                                                    style={{ marginBottom: '20px' }}
                                                    hoverable
                                                    bordered={false}
                                                    cover={
                                                        <img
                                                            style={{ height: '200px' }}
                                                            alt="example"
                                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                                        />
                                                    }
                                                >
                                                    <Meta title="Europe Street beat" description="www.instagram.com" />
                                                </Card>
                                            </motion.div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    {viewType === 3 && !leaving ? (
                        <motion.div variants={twoBox} initial="hidden" animate="visible" exit="exit">
                            <List
                                size="small"
                                itemLayout="vertical"
                                dataSource={data}
                                renderItem={(item) => (
                                    <motion.div
                                        variants={twoBoxItem}
                                        style={{ marginBottom: '10px', borderBottom: '1px solid black' }}
                                    >
                                        <List.Item
                                            key={item.title}
                                            extra={
                                                <img
                                                    style={{ width: '150px', height: '100px' }}
                                                    alt="logo"
                                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                                />
                                            }
                                            style={{ padding: 0 }}
                                        >
                                            <List.Item.Meta title={<a href="https://ant.design">{item.title}</a>} />
                                        </List.Item>
                                    </motion.div>
                                )}
                            />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </BoardBox>
            <SearchBox>
                <Select defaultValue={'all'}>
                    <Option value="all">전체기간</Option>
                </Select>
                <Select defaultValue={'title'}>
                    <Option value="title">제목만</Option>
                </Select>
                <Search>
                    <motion.svg
                        // onClick={toggleSerch}
                        fill="currentColor"
                        // animate={{ x: searchOpen ? 160 : 30 }}
                        // transition={{ type: 'linear' }}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <Input
                        {...register('word', {
                            required: true,
                            minLength: { value: 2, message: '최소 2글자 이상!' },
                        })}
                        placeholder="Search for Board..."
                        // initial={{ scaleX: 0 }}
                        // animate={inputAnimation}
                        // transition={{ type: 'linear' }}
                    />
                </Search>
            </SearchBox>
        </Wrapper>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async (context) => {
        return {
            props: {},
        };
    };
});

export default Freeboard;
