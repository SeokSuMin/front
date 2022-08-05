import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkExUser, joinMembers, login } from '../thunk/userThunk';

export interface IUser {
    loginVisible?: boolean;
    userId?: string;
    password?: string;
    profileImg?: File | null;
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
    extraReducers: (builder) => {
        builder
            // .addCase(checkExUser.fulfilled, (state, action) => {
            //     console.log('액션', action.payload);
            //     return {
            //         ...state,
            //         hydration: true,
            //     };
            // })
            .addCase(joinMembers.pending, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                    hydration: false,
                };
            })
            .addCase(joinMembers.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginVisible: true,
                    hydration: true,
                };
            })
            .addCase(login.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(login.fulfilled, (state, action) => {
                return {
                    ...state,
                };
            });
    },
});

export const { togglLogin } = user.actions;
export default user.reducer;
