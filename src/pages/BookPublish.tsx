// LoginForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { publishBook } from "../redux/books/booksThunks";
import { IBook } from "../types/models";
import { useNavigate } from "react-router-dom";

const BookPublish: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: Omit<IBook, "_id">) => {
    dispatch(publishBook(data));
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <main className="flex h-screen flex-grow items-center justify-center" >
      <div className="max-w-xs  m-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Publish a Book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Book Title:
            </label>
            <input
              className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 4, message: "Min Length is 4" },
              })}
            />
            {<p className="text-red-500 text-sm">{errors.title?.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Author Name:
            </label>
            <input
              className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              {...register("author", {
                required: "Author is required",
                minLength: { value: 4, message: "Min length is 4" },
              })}
            />
            {<p className="text-red-500 text-sm">{errors.author?.message}</p>}
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Publish Book
          </button>
        </form>
      </div>
    </main>
  );
};

export default BookPublish;
