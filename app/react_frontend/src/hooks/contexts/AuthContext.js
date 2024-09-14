// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
// import axios from 'axios';
import axiosService from "../../apis/axiosService";
// import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : // null
        null,
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    if (authState.token) {
      axiosService.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authState.token}`;
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
      }));
    }
  }, [authState.token]);

  const login = async (email, password) => {
    try {
      const response = await axiosService.post("/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({
        isAuthenticated: true,
        token,
        user: user, // Optionally fetch user data
      });
      // <Navigate to="/" />
      // navigate('/');
      return { success: true };
    } catch (error) {
      // Handle login error (e.g., show a message to the user)
      return { success: false, error: error.response.data.error };
    }
  };

  const signup = async (email, password, passwordConfirmation, name) => {
    try {
      // const response = await axiosService.post('/signup', { email, password, password_confirmation: passwordConfirmation, name });
      const response = await axiosService.post("/signup", {
        user: {
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
          name: name,
        },
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({
        isAuthenticated: true,
        token,
        user: user, // Optionally fetch user data
      });
      // Navigate to home page
      // navigate('/');
      // navigate('/');
      // <Navigate to="/" />
      return { success: true };
    } catch (error) {
      // Handle signup error (e.g., show a message to the user)
      return { success: false, error: error.response.data.error };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axiosService.defaults.headers.common["Authorization"] = "";
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
