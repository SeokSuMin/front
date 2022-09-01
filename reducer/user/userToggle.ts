import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserToggle {
    loginVisible: boolean;
    dashBoardVisible: boolean;
    hydration?: boolean;
}

const userToggle = createSlice({
    name: 'userToggle',
    initialState: { loginVisible: false, dashBoardVisible: false } as IUserToggle,
    reducers: {
        togglLogin: (state, action: PayloadAction<IUserToggle>) => {
            return { ...state, ...action.payload };
        },
        togglDashBoard: (state, action: PayloadAction<IUserToggle>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { togglLogin, togglDashBoard } = userToggle.actions;
export default userToggle.reducer;
