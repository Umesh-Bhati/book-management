import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiEndPints } from '../../constants/api.services';
import axios from 'axios';
import { IBook } from '../../types/models';

const { books } = apiEndPints;

export const fetchBooks = createAsyncThunk('books/getBooks', async () => {
  try {
    const response = await axios.get(books.GET_ALL_LIST);
    return response.data
  } catch (error) {
    return error
  }
});
export const fetchPublishedBooks = createAsyncThunk('books/getPublishedBooks', async () => {
  try {
    const response = await axios.get(books.GET_PUBLISHED_LIST);
    return response.data
  } catch (error) {
    return error
  }
});
export const searchBooks = createAsyncThunk('books/searchBooks', async (query: string) => {
  try {
    const response = await axios.get(books.SEARCH(query));
    return response.data

  } catch (error) {
    return error
  }
});

export const publishBook = createAsyncThunk(
  'books/publishBook',
  async (booksInput: Omit<IBook, "_id"> | { bookId: string }) => {
    try {
      const response = await axios.post(books.PUBLISH, booksInput)
      return response.data
    } catch (error: unknown) {
      return error
    }
  }
);
export const unpublishBook = createAsyncThunk(
  'books/unpublishBook',
  async (bookId: string) => {
    try {
      await axios.put(books.UNPUBLISH(bookId))
      return bookId
    } catch (error: unknown) {
      return error
    }
  }
);