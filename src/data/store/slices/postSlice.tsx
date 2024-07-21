// src/features/posts/postsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postThunk } from '../thunks/postThunk';


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postThunk.fulfilled, (state, action) => {
      
      console.log("action data", action.payload);
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(postThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
