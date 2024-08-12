import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favorite';
export const store = configureStore({
  reducer: {
    fav:favoritesReducer
  },
})