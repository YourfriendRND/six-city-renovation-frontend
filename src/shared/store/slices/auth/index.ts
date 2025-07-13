import { createSlice } from '@reduxjs/toolkit';

import { User } from '@/shared/types';
import { StoreNamespace } from '@/shared/constants';
import { createUser } from '../../async-actions/auth/auth-async-actions';

export type AuthState = {
    isSignUp: boolean;
    currentUser: User | null;
    errorMessage: string;    
};

export const initialState: AuthState = {
    isSignUp: false,
    currentUser: null,
    errorMessage: '',
};

export const authSlice = createSlice({
    name: StoreNamespace.Auth,
    initialState,
    reducers: {
        unsetIsSignUp: (state) => {
            state.isSignUp = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state) => {
                state.isSignUp = true;  
            })
    },
});

const { actions, reducer } = authSlice;

export const { unsetIsSignUp } = actions;

export default reducer;
