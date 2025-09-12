import { createSlice } from '@reduxjs/toolkit';

import { User } from '@/shared/types';
import { StoreNamespace } from '@/shared/constants';
import { createUser, loginUser } from '../../async-actions/auth/auth-async-actions';
import { whoAmI } from '../../async-actions/auth/auth-async-actions';

export type AuthState = {
    isSignUp: boolean;
    currentUser: User | null;
    errorMessage: string;
    isLoggingProcess: boolean;
    isAuthorized: boolean;
};

export const initialState: AuthState = {
    isSignUp: false,
    currentUser: null,
    errorMessage: '',
    isLoggingProcess: false,
    isAuthorized: false,
};

export const authSlice = createSlice({
    name: StoreNamespace.Auth,
    initialState,
    reducers: {
        unsetIsSignUp: (state) => {
            state.isSignUp = false;
        },
        startLoggingProcess: (state) => {
            state.isLoggingProcess = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state) => {
                state.isSignUp = true;  
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoggingProcess = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoggingProcess = false;
            })
            .addCase(whoAmI.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isAuthorized = true;
            })
            .addCase(whoAmI.rejected, (state) => {
                state.isAuthorized = false;
                state.currentUser = null;
            })
    },
});

const { actions, reducer } = authSlice;

export const { unsetIsSignUp } = actions;

export default reducer;
