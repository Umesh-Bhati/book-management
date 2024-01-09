import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import BookPublish from "./pages/BookPublish";
import ProtectedRoute from "./components/ProtectedRoutes";
import { getUser } from "./redux/user/usersThunks";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish-book"
          element={
            <ProtectedRoute>
              <BookPublish />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
