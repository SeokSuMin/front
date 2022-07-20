import { useRouter } from 'next/router';
import styled from 'styled-components';
import wrapper from '../../store/configStore';
import TwoSquare from '../../public/2-squares.svg';
import FourSquare from '../../public/4-squares.svg';
import BasicList from '../../public/BasicList.svg';
import { useForm } from 'react-hook-form';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled.div`
    width: 100%;
`;

const TopMenuBox = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 200px;
    padding: 15px;
    border: 1px solid red;
`;

const SearchBox = styled.div`
    display: flex;
    align-items: center;
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
    margin-top: 40px;
    svg {
        width: 20px;
        height: 30px;
        margin-right: 5px;
        cursor: pointer;
        /* fill: green; */
    }
`;

const Search = styled.form`
    /* color: white; */
    display: flex;
    position: relative;
    margin-left: auto;
    align-items: center;
    svg {
        width: 20px;
        height: 30px;
        margin-right: 5px;
        cursor: pointer;
        z-index: 1;
    }
`;

const Input = styled(motion.input)`
    position: absolute;
    font-size: 13px;
    right: 0;
    transform-origin: right center;
    background-color: transparent;
    padding: 6px 8px;
    padding-left: 30px;
`;

const BoardBox = styled.div``;

interface IForm {
    keyword: string;
}

const Freeboard = () => {
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
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

    return (
        <Wrapper>
            <TopMenuBox>
                <SearchBox>
                    <h1>자유게시판</h1>
                    <Search>
                        <motion.svg
                            onClick={toggleSerch}
                            fill="currentColor"
                            animate={{ x: searchOpen ? -160 : 0 }}
                            transition={{ type: 'linear' }}
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
                            {...register('keyword', {
                                required: true,
                                minLength: { value: 2, message: '최소 2글자 이상!' },
                            })}
                            placeholder="Search for Board..."
                            initial={{ scaleX: 0 }}
                            animate={inputAnimation}
                            transition={{ type: 'linear' }}
                        />
                    </Search>
                </SearchBox>
                <ToggleBox>
                    <TwoSquare />
                    <FourSquare />
                    <BasicList />
                </ToggleBox>
            </TopMenuBox>
            <BoardBox></BoardBox>
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
