import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { joinMember } from '../thunk/userThunk';

interface IUserInfo {
    userId: string;
    imgPath: string;
}

export interface IUser {
    loginVisible: boolean;
    userInfo?: IUserInfo;
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
            .addCase(joinMember.pending, (state, action) => {
                return {
                    ...state,
                    hydration: false,
                };
            })
            .addCase(joinMember.fulfilled, (state, action) => {
                return {
                    ...state,
                    ...action.payload,
                    loginVisible: true,
                    hydration: true,
                };
            });
    },
});

export const { togglLogin } = user.actions;
export default user.reducer;
