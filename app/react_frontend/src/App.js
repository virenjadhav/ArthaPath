// src/App.js
import React, {useContext} from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
// import AuthProvider from './contexts/AuthContext';
import 'antd/dist/reset.css';
import AuthProvider from './hooks/contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import { AuthContext } from './hooks/contexts/AuthContext';
import LoadingOverlay from './components/LoadingOverlay';
import { useAxiosInterceptor } from './apis/axiosService';



const App = () => {
  // const isAuthenticated = false;
  const { authState } = useContext(AuthContext);
  useAxiosInterceptor(); // This will apply the Axios interceptor
  // console.log('Auth State:', authState); // Debugging log
  
  return (
    // <AuthProvider>
  //   <LoginPage />
  //   <ProtectedRoute />
  // </AuthProvider>
  // <SignupPage />
  // <AuthProvider>
  <>
  <LoadingOverlay />
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={
          authState.isAuthenticated ? <Home /> : <Navigate to="/login" />
          // <Home />
          } />
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} /> */}
        <Route path="*" element={
          authState.isAuthenticated ? <PageNotFound /> : <Navigate to="/login" />
          } />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
    </>
  );
  
};

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
