import { useRouter } from 'next/router';
import wrapper from '../../store/configStore';

const Movie = () => {
    const router = useRouter();
    return <div>Movie</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => {
    return async (context) => {
        return {
            props: {},
        };
    };
});

export default Movie;
