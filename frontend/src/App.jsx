import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  const [tokenExpiryExist, setTokenExpiryExist] = useState(false);

  useEffect(() => {
    if (authUser) {
      const expirationTime = new Date(authUser.tokenExpirationDate).getTime();
      const currentTime = Date.now();
      setTokenExpiryExist(expirationTime > currentTime);
    }
  }, [authUser]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser && tokenExpiryExist ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            authUser && tokenExpiryExist ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            authUser && tokenExpiryExist ? <Navigate to="/" /> : <Signup />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
