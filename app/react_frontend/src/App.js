import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUser } from "./redux/features/generic/genericSlice";
import { isUserLoggedIn } from "./redux/features/generic/genericApiThunk";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import Message from "./components/Message";
import Layout from "./routes/Layout";
import routes from "./routes/routes";
import { clearModelReducer } from "./redux/features/generic/modelSlice";

const App = () => {
  // const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <LocationBasedContent />
    </BrowserRouter>
  );
};

const LocationBasedContent = () => {
  const { pathname } = useLocation(); // useLocation now inside BrowserRouter
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await dispatch(isUserLoggedIn()).unwrap();
        dispatch(setUser(response.user));
        dispatch(setLoggedIn(true));
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, [dispatch]);

  useEffect(() => {
    // Reset the model state on route change
    dispatch(clearModelReducer());
  }, [pathname, dispatch]);
  const addChildrenElementToRoutes = (route) => {
    return route.children?.map((child, idx) => (
      <Route key={idx} path={child.path} element={child.element}>
        {child.children && addChildrenElementToRoutes(child)}
      </Route>
    ));
  };
  return (
    <>
      <LoadingOverlay />
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 2000 }}>
        <Message />
      </div>
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children && addChildrenElementToRoutes(route)}
            </Route>
          ))}
        </Routes>
      </Layout>
    </>
  );
};

export default App;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoggedIn, setUser } from "./redux/features/generic/genericSlice";
// import { isUserLoggedIn } from "./redux/features/generic/genericApiThunk";
// import {
//   BrowserRouter,
//   Route,
//   Routes,
//   Navigate,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import Home from "./pages/Home";
// import PageNotFound from "./pages/PageNotFound";
// import LoadingOverlay from "./components/LoadingOverlay";

// import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/transaction/Transactions";
// import Message from "./components/Message";
// import Profile from "./pages/profile/Profile";
// import HeaderComponent from "./components/Header";
// import Footer from "./components/Footer";
// import Finance from "./pages/Finance/Finance";

// // This component is responsible for conditionally rendering Header and Footer
// const Layout = ({ children }) => {
//   const location = useLocation();
//   const shouldShowHeaderFooter = location.pathname !== "/login"; // Hide Header/Footer for login page

//   return (
//     <>
//       {shouldShowHeaderFooter && <HeaderComponent />}
//       <div style={{ marginTop: "60px" }}>{children}</div>

//       {/* {shouldShowHeaderFooter && <Footer />} */}
//     </>
//   );
// };

// const App = () => {
//   const dispatch = useDispatch();
//   const logged_in = useSelector((state) => state.generic.logged_in);

//   // const navigate = useNavigate();

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         // Dispatch the async thunk to check login status
//         const response = await dispatch(isUserLoggedIn()).unwrap();

//         // Dispatch actions to set user and logged-in status
//         dispatch(setUser(response.user));
//         dispatch(setLoggedIn(true));
//       } catch (error) {}
//     };

//     checkLoginStatus();
//   }, [dispatch]);

//   // Debugging the logged_in state
//   // useEffect(() => {

//   // }, [logged_in]);

//   // useEffect(() => {
//   //   if (logged_in == false) {
//   //     <Navigate to="/login" replace />;
//   //   } else {
//   //     <Navigate to="/" replace />;
//   //   }
//   // }, [logged_in]);

//   return (
//     <BrowserRouter>
//       <LoadingOverlay />
//       {/* <Message /> */}
//       <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 2000 }}>
//         <Message />
//       </div>
//       {/* Display messages globally */}
//       <Layout>
//         <Routes>
//           <Route
//             path="/"
//             element={logged_in ? <Home /> : <Navigate to="/login" replace />}
//             // element={<Home />}
//           />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/transactions" element={<Transactions />} />
//           <Route path="/budgets" element={<Transactions />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/finance" element={<Finance />} />
//           <Route
//             path="*"
//             element={
//               logged_in ? <PageNotFound /> : <Navigate to="/login" replace />
//             }
//           />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// };

// export default App;

// // src/App.js
// import React, { useContext, useEffect } from "react";
// import {
//   BrowserRouter,
//   Route,
//   Routes,
//   Link,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// // import AuthProvider from './contexts/AuthContext';
// import "antd/dist/reset.css";
// import AuthProvider from "./hooks/contexts/AuthContext";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PageNotFound from "./pages/PageNotFound";
// import Home from "./pages/Home";
// // import { AuthContext } from "./hooks/contexts/AuthContext";
// import LoadingOverlay from "./components/LoadingOverlay";
// // import { useAxiosInterceptor } from "./apis/axiosService";
// import Header from "./components/Header";
// import {
//   isUserLoggedIn,
//   setLoading,
//   setLoggedIn,
//   setUser,
// } from "./redux/features/generic/genericSlice";
// import { useDispatch, useSelector } from "react-redux";

// const App = () => {
//   // const isAuthenticated = false;
//   // const { authState } = useContext(AuthContext);
//   // useAxiosInterceptor(); // This will apply the Axios interceptor
//   const dispatch = useDispatch();
//   // const logged_in = useSelector((state) => state.generic.logged_in);
//   const logged_in = useSelector((state) => state.generic.logged_in);
//   // const navigate = useNavigate();

//   useEffect(() => {
//     const isUserlogIn = async () => {
//       try {
//         const response = await dispatch(isUserLoggedIn()).unwrap();
//         dispatch(setUser(response.user));
//         dispatch(setLoggedIn(true));
//       } catch (error) {
//       }
//     };

//     isUserlogIn();
//   }, [dispatch]);

//   useEffect(() => {
//   }, [logged_in]);

//   // return (
//   //   // <AuthProvider>
//   //   //   <LoginPage />
//   //   //   <ProtectedRoute />
//   //   // </AuthProvider>
//   //   // <SignupPage />
//   //   // <AuthProvider>
//   //   <>
//   //     <LoadingOverlay />
//   //     <BrowserRouter>
//   //       {/* <Header /> */}
//   //       <Routes>
//   //         <Route
//   //           path="/"
//   //           element={
//   //             logged_in ? <Home /> : <Navigate to="/login" replace />
//   //             // <Home />
//   //           }
//   //         />
//   //         <Route path="/login" element={<LoginPage />} />
//   //         {/* <Route path="/:mediaType/:id" element={<Details />} />
//   //       <Route path="/search/:query" element={<SearchResult />} />
//   //       <Route path="/explore/:mediaType" element={<Explore />} /> */}
//   //         <Route
//   //           path="*"
//   //           element={logged_in ? <PageNotFound /> : <Navigate to="/login" />}
//   //         />
//   //       </Routes>
//   //       {/* <Footer /> */}
//   //     </BrowserRouter>
//   //   </>
//   // );
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={logged_in ? <Home /> : <Navigate to="/login" replace />}
//         />
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="*"
//           element={
//             logged_in ? <PageNotFound /> : <Navigate to="/login" replace />
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
