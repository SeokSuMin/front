import { useRouter } from 'next/router';
import wrapper from '../../store/configStore';

const Freeboard = () => {
    const router = useRouter();
    return <div>Freeboard</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async (context) => {
        return {
            props: {},
        };
    };
});

export default Freeboard;
