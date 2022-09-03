import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCommentThunk, getCategoriMenuThunk, insertCommentThunk } from '../../thunk/blogThunk';

export interface IComment {
    comment_id: number | null;
    board_id: string;
    parent_id: number | null;
    content: string;
    parent_user_id: string | null;
    user_id: string;
    modify_flag: boolean;
    child_comment?: IComment[];
    strategy_type?: string;
    img_path?: string;
    createdAt?: string;
    updatedAt?: string;
    loading?: boolean;
}

export interface IComments {
    comments: IComment[];
    loading?: boolean;
    hydration?: boolean;
}

const comment = createSlice({
    name: 'comment',
    initialState: {} as IComments,
    reducers: {
        getComments: (state, action: PayloadAction<IComments>) => {
            const comments = action.payload.comments;
            return {
                ...state,
                comments,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertCommentThunk.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(insertCommentThunk.fulfilled, (state, action) => {
                const comments = action.payload.comments;
                return {
                    ...state,
                    comments,
                };
            })
            .addCase(deleteCommentThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteCommentThunk.fulfilled, (state, action) => {
                const commentId = action.payload.commentId as number;
                const parentId = action.payload.parentId as number;
                let comments = [] as IComment[];
                if (parentId) {
                    comments = state.comments.map((comment) => {
                        if (comment.comment_id === parentId) {
                            const newChildComments = comment?.child_comment?.filter(
                                (childComment) => childComment.comment_id !== commentId,
                            );
                            return {
                                ...comment,
                                child_comment: newChildComments,
                            };
                        } else {
                            return {
                                ...comment,
                            };
                        }
                    });
                } else {
                    comments = state.comments.filter((comment) => comment.comment_id !== commentId);
                }
                return {
                    ...state,
                    comments,
                    loading: false,
                };
            });
    },
});

export const { getComments } = comment.actions;
export default comment.reducer;
