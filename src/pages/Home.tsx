import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { IBookState } from "../redux/books/booksSlice";
import { useDispatch } from "react-redux";
import { fetchBooks, searchBooks } from "../redux/books/booksThunks";
import { useForm } from "react-hook-form";
import BookCard from "../components/BookCard";

const Home = () => {
  const { books, isLoading, searchBooksList, onlyPublished, publishBooks } =
    useSelector<RootState>((state) => state.books) as IBookState;
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const onSearch = (query: { search: string }) => {
    if (query.search?.length > 0) {
      return dispatch(searchBooks(query.search));
    }
    alert("please write something");
  };

  const booksList =
    watch("search")?.length > 0
      ? onlyPublished
        ? searchBooksList.filter((item) => item.published)
        : searchBooksList
      : onlyPublished
      ? publishBooks
      : books;

      
  return (
    <main className="px-10 md:px-32 py-16 min-h-screen flex-grow m-aut ">
      {isLoading && (
        <div className="absolute flex items-center justify-center m-auto top-0 right-0 left-0 bottom-0 z-10 bg-[#626262]">
          <h1 className="text-black m-auto font-bold text-2xl text-center">
            Loading ...
          </h1>
        </div>
      )}

      {books?.length > 0 && (
        <form className="mt-3" onSubmit={handleSubmit(onSearch)}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search your fav book..."
              {...register("search")}
            />
            <button
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      )}
      {booksList?.length > 0 ? (
        <div className="grid mt-6 md:grid-cols-3 grid-cols-1 gap-3">
          {booksList.map((item) => (
            <BookCard key={item._id} {...item} />
          ))}
        </div>
      ) : (
        <h1 className="text-black text-base m-auto text-center">
          {watch("search")?.length > 0
            ? " No books found"
            : "You haven't publish a book yet"}
        </h1>
      )}
    </main>
  );
};

export default Home;
