import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    changePassowrd,
    checkUserlogin,
    deleteMember,
    joinMembers,
    loginThunk,
    logout,
    searchUser,
    updateMember,
} from '../thunk/userThunk';

export interface IUser {
    // loginVisible?: boolean;
    // dashBoardVisible?: boolean;
    userId?: string;
    email?: string;
    password?: string;
    strategyType?: string;
    profileImg?: File;
    imgPath?: string;
    loading?: boolean;
    error?: boolean;
    createdAt?: string;
    hydration?: boolean;
}

const user = createSlice({
    name: 'user',
    initialState: { loginVisible: false, dashBoardVisible: false } as IUser,
    reducers: {
        // togglLogin: (state, action: PayloadAction<IUser>) => {
        //     return { ...state, ...action.payload };
        // },
        // togglDashBoard: (state, action: PayloadAction<IUser>) => {
        //     return { ...state, ...action.payload };
        // },
        // loading: (state, action: PayloadAction<IUser>) => {
        //     return { ...state, ...action.payload };
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(joinMembers.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(joinMembers.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginVisible: true,
                };
            })
            // .addCase(loginThunk.pending, (state, action) => {
            //     return {
            //         ...state,
            //         loading: true,
            //     };
            // })
            // .addCase(loginThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
            //     return {
            //         ...state,
            //         ...action.payload,
            //         loading: false,
            //     };
            // })
            .addCase(checkUserlogin.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(checkUserlogin.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                };
            })
            .addCase(checkUserlogin.rejected, (state, action) => {
                const error = action.error.code === 'ERR_BAD_REQUEST' ? false : true;
                return {
                    ...state,
                    error,
                    loading: false,
                };
            })
            .addCase(logout.fulfilled, (state, action) => {
                return {
                    ...state,
                    userId: '',
                    password: '',
                    imgPath: '',
                    loading: false,
                };
            })
            .addCase(searchUser.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(changePassowrd.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(changePassowrd.fulfilled, (state, action) => {
                return {
                    ...state,
                    dashBoardVisible: false,
                    loginVisible: true,
                    loading: false,
                };
            })
            .addCase(updateMember.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateMember.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {
                    ...state,
                    ...action.payload,
                    loading: false,
                };
            })
            .addCase(deleteMember.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteMember.fulfilled, (state, action) => {
                return {
                    ...state,
                    userId: '',
                    password: '',
                    imgPath: '',
                    loading: false,
                };
            });
    },
});

// export const { } = user.actions;
export default user.reducer;
