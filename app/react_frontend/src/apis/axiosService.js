import axios from "axios";

const axiosService = axios.create({
  withCredentials: true, // Ensures cookies are sent with every request
});

// Function to dynamically set `baseURL` and headers
export const configureAxios = ({ baseURL, contentType }) => {
  axiosService.defaults.baseURL = baseURL || "http://localhost:8000"; // Default to localhost
  axiosService.defaults.headers["Content-Type"] =
    contentType || "application/json"; // Default to JSON
};

// Axios Interceptors
export const useAxiosInterceptor = () => {
  axiosService.interceptors.request.use(
    (config) => {
      // You can modify request config here if needed
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosService.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Optionally handle errors globally
      return Promise.reject(error);
    }
  );
};

export default axiosService;


// import axios from "axios";

// const axiosService = axios.create({
//   baseURL: "http://localhost:8000",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // This ensures cookies are sent with every request
// });

// export const useAxiosInterceptor = () => {
//   axiosService.interceptors.request.use(
//     (config) => {
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axiosService.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// };

// export default axiosService;
