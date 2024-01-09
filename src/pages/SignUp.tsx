// LoginForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { signup } from "../redux/user/usersThunks";
import { IUser } from "../types/models";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const isAuthenticated = useSelector<RootState>(
    (state) => state.user.isAuthenticated
  );

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: IUser) => {
    dispatch(signup(data));
  };

  if (isAuthenticated)
    return <Navigate to="/" state={{ from: "/signup" }} replace />;

  return (
    <div className="max-w-xs mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name:
          </label>
          <input
            className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 4, message: "name is invailid" },
            })}
          />
          {<p className="text-red-500 text-sm">{errors.name?.message}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "email is invailid",
              },
            })}
          />
          {<p className="text-red-500 text-sm">{errors.email?.message}</p>}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
          />
          {<p className="text-red-500 text-sm">{errors.password?.message}</p>}
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
