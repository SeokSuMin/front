import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    name: string;
    age: number;
    hydration?: boolean;
}

const user = createSlice({
    name: 'user',
    initialState: {} as IUser,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload, hydration: true };
        },
    },
});

export const { addUser } = user.actions;
export default user.reducer;
