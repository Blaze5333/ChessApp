/*eslint-disable*/
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: null,
  userAddress:null,
  userId:null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const {
  setName,
  setUserAddress,
    setUserId
} = userSlice.actions;

export default userSlice.reducer;