import { useDispatch, useSelector } from "react-redux";
import { serviceCall } from "../redux/features/generic/genericApiThunk";
import { setMessageState } from "../redux/features/generic/genericSlice";
import { setErrorMsg, setResult } from "../redux/features/generic/messageSlice";

// Utility function to get service details by ID
const getServiceDetailsById = (servicesData, serviceId) => {
  if (servicesData) {
    const service = servicesData.find((service) => service.id === serviceId);
    return service
      ? { url: service.url, method: service.method, name: service.name }
      : null;
  }
  return null;
};

// Function to call API services dynamically
const callApi = async (
  serviceId,
  handleClickHandler,
  dispatch,
  getState,
  payload = {},
  afterActionHandler = null,
  genericService = false,
  serviceDetails = {}
) => {
  // Fetch the latest servicesData from Redux state
  const servicesData = getState().model.servicesData;

  // Ensure servicesData is available before proceeding
  if (genericService == false && !servicesData) {
    console.error("Services data is null or undefined. Cannot make API call.");
    return; // Exit if servicesData is not available
  }

  if (Object.keys(serviceDetails).length === 0) {
    serviceDetails = getServiceDetailsById(servicesData, serviceId);
  }
  if (Object.keys(serviceDetails).length === 0) {
    console.error(`Service not found for ID: ${serviceId}`);
    return;
  }

  try {
    const { name, method, url } = serviceDetails;

    if (!url)
      throw new Error(`Please provide URL for this service: ${serviceId}`);
    if (!name)
      throw new Error(`Please provide API name for this service: ${serviceId}`);
    if (!method)
      throw new Error(
        `Please provide API method for this service: ${serviceId}`
      );
    const getTransactionsAction = serviceCall(name, method, url, payload);
    const response = await dispatch(getTransactionsAction()).unwrap();

    if (response) {
      if (handleClickHandler) {
        handleClickHandler(response);
      }

      if (afterActionHandler) {
        afterActionHandler(response);
      }
    }
  } catch (err) {
    dispatch(setMessageState(setResult("error")));
    dispatch(setMessageState(setErrorMsg(err?.message)));
  }
};

// Exported function that can be called directly
export const callApiService = (
  serviceId,
  handleClickHandler,
  payload,
  afterActionHandler = null,
  genericService,
  serviceDetails
) => {
  return async (dispatch, getState) => {
    await callApi(
      serviceId,
      handleClickHandler,
      dispatch,
      getState,
      payload,
      afterActionHandler,
      genericService,
      serviceDetails
    );
  };
};
// export default callApiService;

// import { useDispatch, useSelector } from "react-redux";
// import { serviceCall } from "../redux/features/generic/genericApiThunk";
// import { setMessageState } from "../redux/features/generic/genericSlice";
// import { setErrorMsg, setResult } from "../redux/features/generic/messageSlice";
// import { useState, useEffect } from "react";

// // Utility functions to get service details by ID
// const getServiceDetailsById = (servicesData, serviceId) => {
//   if (servicesData) {
//     const service = servicesData.find((service) => service.id === serviceId);
//     return service
//       ? { url: service.url, method: service.method, name: service.name }
//       : null;
//   }
//   return null;
// };

// // Custom hook to call API services dynamically
// const useApiServiceCall = () => {
//   const dispatch = useDispatch();
//   const servicesData = useSelector((state) => state.model.servicesData); // Moved useSelector outside callApi
//   // const [servicesData, setServicesData] = useState();
//   // const getServicesData = () => {
//   //   if (!servicesData) {
//   //     const data = useSelector((state) => state.model.servicesData);
//   //     setServicesData(data);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (!servicesData) {
//   //     // // Fetch services data if it's not available
//   //     // getServicesData();
//   //   }
//   // }, [servicesData]);

//   // const callApi = async (
//   //   serviceId,
//   //   handleRefreshClickHandler,
//   //   payload = {}
//   // ) => {

//   //   const serviceDetails = getServiceDetailsById(servicesData, serviceId);

//   //   if (!serviceDetails) {
//   //     return null;
//   //   }

//   //   try {
//   //     const { name, method, url } = serviceDetails;
//   //     if (!url)
//   //       throw new Error(`Please provide url for this service: ${serviceId}`);
//   //     if (!name)
//   //       throw new Error(
//   //         `Please provide api name for this service: ${serviceId}`
//   //       );
//   //     if (!method)
//   //       throw new Error(
//   //         `Please provide api method for this service: ${serviceId}`

//   //     const getTransactionsAction = serviceCall(name, method, url);
//   //     const response = await dispatch(getTransactionsAction()).unwrap();

//   //     if (response) {
//   //       handleRefreshClickHandler(response);
//   //     }
//   //   } catch (err) {
//   //     dispatch(setMessageState(setResult("error")));
//   //     dispatch(setMessageState(setErrorMsg(err?.message)));
//   //   }
//   // };

//   const callApi = async (
//     serviceId,
//     handleRefreshClickHandler,
//     payload = {}
//   ) => {
//     // const servicesData = useSelector((state) => state.model.servicesData);

//     // if (!servicesData) {
//     //   return; // Exit the function if servicesData is null
//     // }

//     const serviceDetails = getServiceDetailsById(servicesData, serviceId);
//     if (!serviceDetails) {
//       // return; // Exit the function if service details are not found
//       // getServicesData();
//       return;
//     }

//     try {
//       const { name, method, url } = serviceDetails;

//       if (!url)
//         throw new Error(`Please provide URL for this service: ${serviceId}`);
//       if (!name)
//         throw new Error(
//           `Please provide API name for this service: ${serviceId}`
//         );
//       if (!method)
//         throw new Error(
//           `Please provide API method for this service: ${serviceId}`
//         );

//       const getTransactionsAction = serviceCall(name, method, url);
//       const response = await dispatch(getTransactionsAction()).unwrap();

//       if (response) {
//         handleRefreshClickHandler(response);
//       }
//     } catch (err) {
//       dispatch(setMessageState(setResult("error")));
//       dispatch(setMessageState(setErrorMsg(err?.message)));
//     }
//   };

//   return { callApi };
// };

// export default useApiServiceCall;

// // import { useDispatch, useSelector } from "react-redux";
// // import apiThunk from "../redux/features/thunkAPI/apiThunk"; // Your API Thunk
// // // import { serviceCall } from "../redux/features/generic/genericApiThunk";
// // // import { serviceCall } from "./dummy";
// // import { serviceCall } from "../redux/features/generic/genericApiThunk";
// // import { setMessageState } from "../redux/features/generic/genericSlice";
// // import { setErrorMsg, setResult } from "../redux/features/generic/messageSlice";
// // import { useEffect, useState } from "react";

// // // Utility functions to get service details by ID
// // const getServiceDetailsById = (servicesData, serviceId) => {
// //   if (servicesData) {
// //     const service = servicesData.find((service) => service.id === serviceId);
// //     return service
// //       ? { url: service.url, method: service.method, name: service.name }
// //       : null;
// //   }
// //   return null;
// // };

// // // Custom hook to call API services dynamically
// // const useApiServiceCall = () => {
// //   const dispatch = useDispatch();

// //   const callApi = async (
// //     serviceId,
// //     handleRefreshClickHandler,
// //     payload = {}
// //   ) => {
// //     const servicesData = useSelector((state) => state.model.servicesData);

// //     const serviceDetails = getServiceDetailsById(servicesData, serviceId);

// //     if (!serviceDetails) {
// //       //   throw new Error(`Service not found for ID: ${serviceId}`);
// //       return null;
// //     }
// //     try {
// //       const { name, method, url } = serviceDetails;
// //       if (!url)
// //         throw new Error(`Please provide url for this service: ${serviceId}`);
// //       if (!name)
// //         throw new Error(
// //           `Please provide api name for this service: ${serviceId}`
// //         );
// //       if (!method)
// //         throw new Error(
// //           `Please provide api method for this service: ${serviceId}`
// //         );

// //       //   const response = await dispatch(serviceCall()).unwrap();
// //       const getTransactionsAction = serviceCall(name, method, url);
// //       const response = await dispatch(getTransactionsAction()).unwrap();
// //       if (response) {
// //         handleRefreshClickHandler(response);
// //       }
// //     } catch (err) {
// //       dispatch(setMessageState(setResult("error")));
// //       dispatch(setMessageState(setErrorMsg(err?.message)));
// //       //   throw err;
// //     }
// //   };

// //   return { callApi };
// // };

// // export default useApiServiceCall;

// // // // import React from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import apiThunk from "../redux/features/thunkAPI/apiThunk";
// // // // import { serviceCall } from "../redux/features/generic/genericApiThunk";
// // // // const getServiceUrlById = (servicesData, serviceId) => {
// // // //   if (servicesData) {
// // // //     const service = servicesData.find((service) => service.id === serviceId); // Find the object by id
// // // //     return service ? service.url : null; // Return the URL if found, else return null
// // // //   } else {
// // // //     return null;
// // // //   }
// // // // };
// // // // const getServiceMethodById = (servicesData, serviceId) => {
// // // //   if (servicesData) {
// // // //     const service = servicesData.find((service) => service.id === serviceId); // Find the object by id
// // // //     return service ? service.method : null; // Return the URL if found, else return null
// // // //   } else {
// // // //     return null;
// // // //   }
// // // // };
// // // // const getServiceNameById = (servicesData, serviceId) => {
// // // //   if (servicesData) {
// // // //     const service = servicesData.find((service) => service.id === serviceId); // Find the object by id
// // // //     return service ? service.name : null; // Return the URL if found, else return null
// // // //   } else {
// // // //     return null;
// // // //   }
// // // // };

// // // // // const ServiceCall = async (actionType, method, baseUrl) => {
// // // // //   const call = await apiThunk(actionType, method, baseUrl).unwrap();
// // // // //   return call;
// // // // // };

// // // // const call = async (dispatch) => {
// // // //   try {
// // // //     const response = await dispatch(serviceCall()).unwrap();
// // // //     return response;
// // // //   } catch (err) {
// // // //     return err;
// // // //   }
// // // // };

// // // // // Main Thunk
// // // // export const ApiServiceCall = (serviceId) => {
// // // //   const dispatch = useDispatch();
// // // //   try {
// // // //     // const state = getState();
// // // //     // const servicesData = state.model.servicesData; // Get servicesData from Redux state
// // // //     const servicesData = useSelector((state) => state.model.servicesData);

// // // //     const baseUrl = getServiceUrlById(servicesData, serviceId);
// // // //     const method = getServiceMethodById(servicesData, serviceId);
// // // //     const name = getServiceNameById(servicesData, serviceId);
// // // //     // if (!servicesData) throw new Error(`Please provide services `);
// // // //     if (!servicesData) return null;

// // // //     // Throw errors if the necessary data is missing
// // // //     if (!baseUrl)
// // // //       throw new Error(`Please provide url for this service: ${serviceId}`);
// // // //     if (!name)
// // // //       throw new Error(`Please provide api name for this service: ${serviceId}`);
// // // //     if (!method)
// // // //       throw new Error(
// // // //         `Please provide api method for this service: ${serviceId}`
// // // //       );

// // // //     // Make the API call using your thunk API
// // // //     // const response = await apiThunk(name, method, baseUrl).unwrap;
// // // //     // const response = await dispatch(
// // // //     //   serviceCall(name, method, baseUrl)
// // // //     // ).unwrap();
// // // //     // const response = dispatch(serviceCall()).unwrap();

// // // //     const response = call(dispatch);

// // // //     // You can dispatch some success action here if needed, or return the response
// // // //     return response;
// // // //   } catch (error) {
// // // //     // return error;
// // // //     // Handle error (you can dispatch a failure action here if needed)
// // // //     // throw error; // Re-throw error so the calling code can handle it
// // // //   }
// // // // };

// // // // export default ApiServiceCall;

// // // import { useDispatch, useSelector } from "react-redux";
// // // import { serviceCall } from "../redux/features/generic/genericApiThunk";

// // // const getServiceUrlById = (servicesData, serviceId) => {
// // //   if (servicesData) {
// // //     const service = servicesData.find((service) => service.id === serviceId);
// // //     return service ? service.url : null;
// // //   }
// // //   return null;
// // // };

// // // const getServiceMethodById = (servicesData, serviceId) => {
// // //   if (servicesData) {
// // //     const service = servicesData.find((service) => service.id === serviceId);
// // //     return service ? service.method : null;
// // //   }
// // //   return null;
// // // };

// // // const getServiceNameById = (servicesData, serviceId) => {
// // //   if (servicesData) {
// // //     const service = servicesData.find((service) => service.id === serviceId);
// // //     return service ? service.name : null;
// // //   }
// // //   return null;
// // // };

// // // // Convert into a custom hook
// // // export const useApiServiceCall = (serviceId) => {
// // //   const dispatch = useDispatch();
// // //   const servicesData = useSelector((state) => state.model.servicesData);

// // //   const callApi = async () => {
// // //     try {
// // //       const baseUrl = getServiceUrlById(servicesData, serviceId);
// // //       const method = getServiceMethodById(servicesData, serviceId);
// // //       const name = getServiceNameById(servicesData, serviceId);

// // //       if (!servicesData) return null;

// // //       if (!baseUrl)
// // //         throw new Error(`Please provide url for this service: ${serviceId}`);
// // //       if (!name)
// // //         throw new Error(
// // //           `Please provide api name for this service: ${serviceId}`
// // //         );
// // //       if (!method)
// // //         throw new Error(
// // //           `Please provide api method for this service: ${serviceId}`
// // //         );

// // //       const response = await dispatch(serviceCall(name, method, baseUrl));
// // //       return response;
// // //     } catch (error) {
// // //       return error;
// // //     }
// // //   };

// // //   return { callApi };
// // // };

// // // export default useApiServiceCall;
