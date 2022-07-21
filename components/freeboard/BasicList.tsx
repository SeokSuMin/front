import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

interface IBasicListProps {
    viewType: number;
    leaving: boolean;
    toggleLeaving: () => void;
}

interface IColumn {
    key: React.Key;
    no: number;
    title: string;
    writer: string;
    date: string;
    searchCount: number;
}

const BoardTable = styled(Table)`
    thead > tr > .ant-table-cell {
        font-size: 15px;
        font-weight: bold;
    }
    tbody > tr td {
        font-size: 15px;
    }
`;

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

const BasicList = ({ viewType, leaving, toggleLeaving }: IBasicListProps) => {
    return (
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
    );
};

export default BasicList;
