// // import axios from "axios";
// // import { setLoading, setError } from "../redux/features/generic/genericSlice";

// // // create a axios instance
// // const axiosService = axios.create({
// //   baseURL: "http://localhost:5000",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // // Add request  interceptors
// // axiosService.interceptors.request.use(
// //   (config) => {
// //     //Dispatch loading action
// //     config.store.dispatch(setLoading(true));
// //     return config;
// //   },
// //   (error) => {
// //     // Dispatch loading action and error action
// //     error.config.store.dispatch(setLoading(false));
// //     error.config.store.dispatch(setError(error.message));
// //     return Promise.reject(error);
// //   }
// // );

// // // Add response interceptor
// // axiosService.interceptors.response.use(
// //   (response) => {
// //     // Dispatch Loading function
// //     response.config.store.dispatch(setLoading(false));
// //     return response;
// //   },
// //   (error) => {
// //     // Dispatch loading action and error action
// //     error.config.store.dispatch(setLoading(false));
// //     error.config.store.dispatch(setError(error.message));
// //     return Promise.reject(error);
// //   }
// // );

// // export default axiosService;

// // // with use of context

// // // import axios from 'axios';
// // // import { useContext } from 'react';
// // // import { LoadingContext } from '../hooks/contexts/LoadingContext';

// // // const axiosService = axios.create({
// // //   baseURL: 'http://localhost:5000',
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// // // });

// // // export const useAxiosInterceptor = () => {
// // //   const { setIsLoading } = useContext(LoadingContext);

// // //   axiosService.interceptors.request.use((config) => {
// // //     setIsLoading(true);  // Start loading
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   }, (error) => {
// // //     setIsLoading(false);  // Stop loading on error
// // //     return Promise.reject(error);
// // //   });

// // //   axiosService.interceptors.response.use((response) => {
// // //     setIsLoading(false);  // Stop loading
// // //     return response;
// // //   }, (error) => {
// // //     setIsLoading(false);  // Stop loading on error
// // //     return Promise.reject(error);
// // //   });
// // // };

// // // export default axiosService;

// // // // // Set up a request interceptor to dynamically add the Authorization header
// // // // axiosService.interceptors.request.use((config) => {
// // // //   const token = localStorage.getItem('token'); // Or retrieve it from another source
// // // //   if (token) {
// // // //     config.headers.Authorization = `Bearer ${token}`;
// // // //   }
// // // //   return config;
// // // // }, (error) => {
// // // //   return Promise.reject(error);
// // // // });

// // // // export default axiosService;

// // // // // import axios from 'axios';

// // // // // // Set base URL and content-type globally
// // // // // axios.defaults.baseURL = 'https://your-api-base-url.com';
// // // // // axios.defaults.headers.common['Content-Type'] = 'application/json';

// // // // // // Optionally, you can set default headers here if you don't use an instance for certain headers
// // // // // const token = localStorage.getItem('token'); // Or retrieve it from another source
// // // // // if (token) {
// // // // //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// // // // // }
// // AxiosService.js
// import axios from "axios";
// import { useDispatchContext } from "./DispatchContext";

// const axiosService = axios.create({
//   baseURL: "http://localhost:5000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const useAxiosInterceptor = () => {
//   const dispatch = useDispatchContext();

//   axiosService.interceptors.request.use(
//     (config) => {
//       dispatch(setLoading(true)); // Dispatch loading action
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       dispatch(setLoading(false)); // Stop loading on error
//       dispatch(setError(error.message));
//       return Promise.reject(error);
//     }
//   );

//   axiosService.interceptors.response.use(
//     (response) => {
//       dispatch(setLoading(false)); // Stop loading
//       return response;
//     },
//     (error) => {
//       dispatch(setLoading(false)); // Stop loading on error
//       dispatch(setError(error.message));
//       return Promise.reject(error);
//     }
//   );
// };

// export default axiosService;
