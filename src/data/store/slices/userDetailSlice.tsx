import { createSlice } from '@reduxjs/toolkit';
// import { GetPosts, UserLoggedIn, UserRegistration, forgotPassword } from '../thunks/authThunk';

export const initialState = {
    userData: [],
};

const userDetailSlice = createSlice({
    name: 'userDetailSlice',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userData = action?.payload;
        },
        resetUserSlice: state => {
            state.userData = [];
        },
    },
    extraReducers: {

    },
});

export const { setUserInfo, resetUserSlice } =
    userDetailSlice.actions;
export default userDetailSlice.reducer;
