import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchPublishedBooks } from "../redux/books/booksThunks";
import { useSelector } from "react-redux";
import { togglePublishBook } from "../redux/books/booksSlice";
import ToggleBtn from "./ToggleBtn";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isPublished = useSelector<RootState>(
    (state) => state.books.onlyPublished
  );

  useEffect(() => {
    if (isPublished) {
      dispatch(fetchPublishedBooks());
    }
  }, [isPublished]);

  function handleChange(e: any) {
    dispatch(togglePublishBook(e.target.checked));
  }
  return (
    <header className="fixed top-0 right-0 left-0 z-30">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              BookManager
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <ToggleBtn
              lable={isPublished ? "Published" : "All"}
              handleChange={handleChange}
            />
            <Link
              className="p-2 rounded text-sm bg-blue-600 text-white ml-5"
              to={"/publish-book"}
            >
              publish book
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
