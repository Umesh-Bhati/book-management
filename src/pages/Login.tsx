// LoginForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../redux/user/usersThunks";
import { useDispatch } from "react-redux";
import { IUser } from "../types/models";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isAuthenticated = useSelector<RootState>(
    (state) => state.user.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: Omit<IUser, "name">) => {
    dispatch(login(data));
  };

  if (isAuthenticated)
    return <Navigate to="/" state={{ from: "/login" }} replace />;

  return (
    <div className="max-w-xs mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
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
        </div>
        {<p className="text-red-500 text-sm">{errors.email?.message}</p>}

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
        </div>
        {<p className="text-red-500 text-sm">{errors.password?.message}</p>}
        <div className=" flex flex-col">
          <button
            className="bg-blue-500 text-white font-bold my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <Link to={"/signup"}>
            I haven't an account?{" "}
            <span className="underline text-sm text-blue-500">Sign Up</span>{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
