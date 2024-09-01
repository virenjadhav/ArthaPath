import React, { useState, useContext, useEffect } from "react";
import "../assets/css/Login.scss";
import { AuthContext } from "../hooks/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
// import {
//   login,
//   setLoggedIn,
//   signup,
// } from "../redux/features/generic/genericSlice";
import { login, signup } from "../redux/features/generic/genericApiThunk";
import { setLoggedIn, setUser } from "../redux/features/generic/genericSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  // const { login, signup } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logged_in = useSelector((state) => state.generic.logged_in);

  useEffect(() => {
    // console.log("logged_in flag");
    // console.log(logged_in);
    if (logged_in == false) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [logged_in]);

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // const response = await login(email, password);
      // const response = await dispatch(login({ email, password })).unwrap();
      const response = await dispatch(
        login({
          session: { email, password },
        })
      ).unwrap();

      message.success({
        content: "Login successful!",
        duration: 5, // Duration in seconds
        style: {
          fontSize: "18px", // Larger font size
        },
      });
      dispatch(setUser(response.user));
      dispatch(setLoggedIn(true));
      navigate("/");
    } catch (error) {
      // Handle login failure
      message.error({
        content: `Login failed : ${error?.error?.join(",")}`,
        duration: 5, // Duration in seconds
        style: {
          fontSize: "18px", // Larger font size
        },
      });
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // const response = dispatch(signup(email, password, confirmPassword, name));
    try {
      const response = await dispatch(
        signup({
          data: {
            user: {
              email,
              password,
              password_confirmation: confirmPassword,
              name,
            },
          },
        })
      ).unwrap();
      message.success({
        content: "Account Created Successfully.",
        duration: 5, // Duration in seconds
        style: {
          fontSize: "18px", // Larger font size
        },
      });
      dispatch(setUser(response.user));
      dispatch(setLoggedIn(true));
      navigate("/");
    } catch (error) {
      message.error({
        content: `Sign up failed : ${error?.error?.join(",")}`,
        duration: 5, // Duration in seconds
        style: {
          fontSize: "18px", // Larger font size
        },
      });
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };
  return (
    <>
      <div className={`cont ${isSignup ? "s--signup" : ""}`}>
        <div class="form sign-in">
          <h2>Welcome</h2>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
          </label>
          <p class="forgot-pass">Forgot password?</p>
          <button type="button" class="submit" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
        <div class="sub-cont">
          <div class="img">
            <div class="img__text m--up">
              <h3>Don't have an account? Please Sign up!</h3>
            </div>
            <div class="img__text m--in">
              <h3>If you already has an account, just sign in.</h3>
            </div>
            <div class="img__btn" onClick={handleToggle}>
              <span class="m--up">Sign Up</span>
              <span class="m--in">Sign In</span>
            </div>
          </div>
          <div class="form sign-up">
            <h2>Create your Account</h2>
            <label>
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              <span>Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <button type="button" class="submit" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// // src/components/LoginPage.js
// import React, { useState, useContext } from 'react';
// // import { AuthContext } from '../contexts/AuthContext';
// import { AuthContext } from '../hooks/contexts/AuthContext.js';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(email, password);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginPage;
