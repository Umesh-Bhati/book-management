import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './books/booksSlice';
import { userReducer } from './user/usersSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;