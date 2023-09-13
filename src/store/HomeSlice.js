import { createSlice } from '@reduxjs/toolkit'



export const HomeSlice = createSlice({
  name: 'Home',
  initialState: {
    url: {},
    genres : {},
    imdb_id : {},
  },
  reducers: {
    getApiConfig: (state, action) => {
        state.url = action.payload;
    },
    getGenres: (state, action) => {
        state.genres = action.payload;
    },
    setImbdb: (state, action) => {
      state.imdb_id = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getApiConfig, getGenres, setImbdb } = HomeSlice.actions

export default HomeSlice