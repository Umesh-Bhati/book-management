import { createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../types/models';
import { fetchBooks, fetchPublishedBooks, publishBook, searchBooks, unpublishBook } from './booksThunks';

export interface IBookState {
  books: IBook[];
  publishBooks: IBook[]
  searchBooksList: IBook[];
  onlyPublished?: boolean;
  isLoading: boolean;
  error?: string | null;
}

const initialState: IBookState = {
  books: [],
  publishBooks: [],
  searchBooksList: [],
  isLoading: false,
  onlyPublished: false,
  error: "",
}



const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    togglePublishBook: (state, action) => {
      state.onlyPublished = action.payload
    }

  },
  extraReducers(builder) {
    builder.addCase(fetchBooks.pending, state => {
      state.isLoading = true;
    })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload?.data;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

    // fetch published books
    builder.addCase(fetchPublishedBooks.pending, state => {
      state.isLoading = true;
    })
      .addCase(fetchPublishedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publishBooks = action.payload?.data;
      })
      .addCase(fetchPublishedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

    //publish book  
    builder.addCase(publishBook.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(publishBook.fulfilled, (state, action) => {
        const publishedBook = action.payload.data
        const { _id } = publishedBook
        const publishMapFunc = (item: IBook) => item._id === _id && !item.published ? { ...item, published: true } : item
        if (state.publishBooks.some(item => item._id !== _id)) {
          state.publishBooks = [...state.publishBooks, publishedBook]
        }
        state.searchBooksList = state.searchBooksList.map(publishMapFunc)
        state.books = state.books.map(publishMapFunc)
        state.isLoading = false;
      })
      .addCase(publishBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

    //unpublish book  
    builder.addCase(unpublishBook.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(unpublishBook.fulfilled, (state, action) => {
        const bookId = action.payload as string
        const mapFunc = (item: IBook) => item._id === bookId ? { ...item, published: false } : item
        state.isLoading = false;
        state.publishBooks = state.publishBooks.filter(item => item._id !== bookId)
        state.books = state.books.map(mapFunc)
        state.searchBooksList = state.searchBooksList.map(mapFunc)
      })
      .addCase(unpublishBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

    //search books  
    builder.addCase(searchBooks.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchBooksList = action.payload?.data
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export const booksReducer = booksSlice.reducer;

export const { togglePublishBook } = booksSlice.actions
