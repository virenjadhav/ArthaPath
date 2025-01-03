import React, { useState, useEffect } from "react";
import "../assets/css/Login.scss";
// import { AuthContext } from "../hooks/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { message } from "antd";
// import {
//   login,
//   setLoggedIn,
//   signup,
// } from "../redux/features/generic/genericSlice";
// import { login, signup } from "../redux/features/generic/genericApiThunk";
// import { setLoggedIn, setUser } from "../redux/features/generic/genericSlice";
import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
import { setMessageState } from "../redux/features/generic/genericSlice";
import {
  setErrorMsg,
  setResult,
  // setSuccessMsg,
} from "../redux/features/generic/messageSlice";
import {
  useLoginAction,
  // useLogoutAction,
  useSignupAction,
} from "../components/Services/CommonServices";
import { Col, Row } from "antd";

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
  const { loginAction } = useLoginAction();
  const { signupAction } = useSignupAction();

  useEffect(() => {
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
      // const response = await dispatch(
      //   login({
      //     session: { email, password },
      //   })
      // ).unwrap();
      const payload = {
        session: { email, password },
      };
      await loginAction(payload);
      // const loginAction = login("generic/login", "post", "/login", payload);
      // const response = await dispatch(loginAction()).unwrap();
      // message.success({
      //   content: "Login successful!",
      //   duration: 5, // Duration in seconds
      //   style: {
      //     fontSize: "18px", // Larger font size
      //   },
      // });
      // dispatch(setResult("success"));
      // dispatch(setMessageState(setResult("success")));
      // // dispatch(setSuccessMsg("Login successful!"));
      // dispatch(setMessageState(setSuccessMsg("Login successful!")));
      // dispatch(setUser(response.user));
      // dispatch(setLoggedIn(true));
      // navigate("/");
    } catch (error) {
      // Handle login failure
      // message.error({
      //   content: `Login failed : ${error?.error?.join(",")}`,
      //   duration: 5, // Duration in seconds
      //   style: {
      //     fontSize: "18px", // Larger font size
      //   },
      // });

      dispatch(setMessageState(setResult("error")));
      dispatch(setMessageState(setErrorMsg(`Login failed : ${error?.error}`)));
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
      // const response = await dispatch(
      //   signup({
      //     data: {
      //       user: {
      //         email,
      //         password,
      //         password_confirmation: confirmPassword,
      //         name,
      //       },
      //     },
      //   })
      // ).unwrap();
      // // message.success({
      // //   content: "Account Created Successfully.",
      // //   duration: 5, // Duration in seconds
      // //   style: {
      // //     fontSize: "18px", // Larger font size
      // //   },
      // // });
      // // dispatch(setResult("success"));
      // dispatch(setMessageState(setResult("success")));
      // // dispatch(setSuccessMsg("Account Created Successfully."));
      // dispatch(setMessageState(setSuccessMsg("Account Created Successfully.")));
      // dispatch(setUser(response.user));
      // dispatch(setLoggedIn(true));
      // navigate("/");
      const payload = {
        data: {
          user: {
            email,
            password,
            password_confirmation: confirmPassword,
            name,
          },
        },
      };
      await signupAction(payload);
    } catch (error) {
      // message.error({
      //   content: `Sign up failed : ${error?.error?.join(",")}`,
      //   duration: 5, // Duration in seconds
      //   style: {
      //     fontSize: "18px", // Larger font size
      //   },
      // });
      dispatch(setMessageState(setResult("error")));
      dispatch(
        setMessageState(setErrorMsg(`Sign up failed : ${error?.error}`))
      );
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };
  return (
    <>
      {/* <Row justify={"center"} align={"middle"} height="100vh"> 
      <Col >
      </Col>
    </Row> */}
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
