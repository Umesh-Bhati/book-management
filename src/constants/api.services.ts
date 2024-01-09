import axios from "axios";

export const apiEndPints = {
    books: {
        GET_PUBLISHED_LIST: 'books/published',
        GET_ALL_LIST: 'books/user',
        PUBLISH: 'books/publish',
        UNPUBLISH: (bookId: string) => `books/unpublish/${bookId}`,
        SEARCH: (query: string) => `books/search?title=${query}`
    },
    user: {
        SIGNUP: 'auth/signup',
        LOGIN: 'auth/login'
    }
};


export const defaultAxiosSetup = () => {
    axios.defaults.baseURL = "https://book-management-718f.onrender.com/api/v1/"
    axios.defaults.withCredentials = true
}