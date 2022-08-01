import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    loginVisible: boolean;
    hydration?: boolean;
}

const user = createSlice({
    name: 'user',
    initialState: { loginVisible: false } as IUser,
    reducers: {
        togglLogin: (state, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { togglLogin } = user.actions;
export default user.reducer;
