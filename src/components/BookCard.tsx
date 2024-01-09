import React from "react";
import { IBook } from "../types/models";
import bookImage from "../assets/myfavbook.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { publishBook, unpublishBook } from "../redux/books/booksThunks";
const BookCard: React.FC<IBook> = ({ title, author, _id, published }) => {
  const dispatch = useDispatch<AppDispatch>();

  const unpublishHandle = () => {
    if (published) return dispatch(unpublishBook(_id));
    dispatch(publishBook({ bookId: _id }));
  };

  return (
    <div className="flex flex-col  w-full h-96 bg-white border border-gray-200 rounded-lg shadow overflow-hidden  dark:border-gray-700 dark:bg-gray-800 ">
      <img className="object-cover w-full h-[60%]" src={bookImage} alt="book" />
      <div className="flex flex-col w-full h-[40%] items-center  p-4 leading-normal">
        <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          written by: {author}
        </p>
        <button
          onClick={unpublishHandle}
          className="p-2 rounded text-base font-bold text-white bg-blue-500"
        >
          {published ? "Unpublish" : "Publish"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
