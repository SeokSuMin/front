import axios, { AxiosResponse } from 'axios';
interface IPopularResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IPopular {
    page: number;
    results: IPopularResult[];
    total_pages: number;
    total_results: number;
}
const getPopularMovies = async (): Promise<AxiosResponse<IPopular>> => {
    return await axios.get(`http://localhost:3001/api/movies`);
};

export { getPopularMovies };
