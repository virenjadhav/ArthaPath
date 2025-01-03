import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import AuthProvider from "./hooks/contexts/AuthContext";
// import { LoadingProvider } from "./hooks/contexts/LoadingContext";
import { Provider } from "react-redux";
import store from "./redux/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <AuthProvider>
      <App />
    </AuthProvider> */}
    {/* <LoadingProvider> */}
    {/* <AuthProvider> */}
    {/* <App /> */}
    {/* </AuthProvider> */}
    {/* </LoadingProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../features/user/userSlice';
// import financeReducer from '../features/finance/financeSlice';

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     finance: financeReducer,
//   },
// });
