import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk } from '../../thunk/userThunk';

interface IUser {
    userId: string;
    email: string;
    strategyType: string;
    imgPath: string;
    updatedAt: string;
    createdAt: string;
}

export interface ILogin {
    userId: string;
    email: string;
    password: string;
    loading?: boolean;
    hydration?: boolean;
}

const login = createSlice({
    name: 'login',
    initialState: { hydration: false } as ILogin,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                console.log(action.payload);
                return {
                    loading: true,
                    ...state,
                };
            })
            .addCase(loginThunk.rejected, (state, action) => {
                console.log(action.payload);
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                    loading: false,
                };
            });
    },
});

// export const { togglLogin, togglDashBoard, loading } = login.actions;
export default login.reducer;
