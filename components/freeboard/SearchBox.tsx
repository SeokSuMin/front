import { Select } from 'antd';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface IForm {
    word: string;
}

const Wrapper = styled.div`
    width: 800px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SearchBoardBox = styled.div`
    /* margin: 0 auto; */
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-select-single {
        margin-right: 10px;
    }
    background-color: rgb(249, 249, 248);
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

const { Option } = Select;

const SearchBox = () => {
    const { register, setValue, handleSubmit } = useForm<IForm>();

    return (
        <Wrapper>
            <SearchBoardBox>
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
            </SearchBoardBox>
        </Wrapper>
    );
};

export default SearchBox;
