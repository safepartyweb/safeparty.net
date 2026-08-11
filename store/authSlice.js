'use client'
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/authApi';


// const initialState = {
//   userInfo: typeof window !== 'undefined' && localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null
// };

const initialState = {
  userInfo: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // console.log("Payload", action.payload)
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },

    logout: (state) => {
      console.log("Logiing out!")
      state.userInfo = null;
      localStorage.removeItem('userInfo')
    },

  },

  /*
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload?.user || null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload?.user || null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.user = payload?.user || null;
      }
    );
  },

  */
 
});

export const { logout,setCredentials } = authSlice.actions;
export default authSlice.reducer;