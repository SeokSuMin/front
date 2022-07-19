import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMovies } from '../thunk/userThunk';

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
    loading?: boolean;
    hydration?: boolean;
}

const movie = createSlice({
    name: 'movie',
    initialState: { loading: true } as IPopular,
    reducers: {
        // addUser: (state, action: PayloadAction<IPopular>) => {
        //     return { ...state, ...action.payload };
        // },
        // deleteUser: (state, action: PayloadAction<IPopular>) => {
        //     return state.filter((user) => user.id !== action.payload.id);
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                    hydration: false,
                };
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                return { ...action.payload, loading: false, hydration: true };
            });
    },
});

// export const { addUser } = movie.actions;
export default movie.reducer;
