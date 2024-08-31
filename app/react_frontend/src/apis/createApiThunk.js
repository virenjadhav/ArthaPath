import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "./axiosService";

const createApiThunk = (name, method, url) => {
  return createAsyncThunk(name, async (payload, { getState }) => {
    console.log("inside api thunk");
    console.log(payload);
    console.log(getState);
    console.log(method);
    console.log(name);
    console.log(url);
    const config = {
      method,
      url,
      store: getState().store,
    };
    if (method.toLowerCase() !== "get") {
      config.data = payload;
    }
    const response = await axiosService(config);
    // const response = await axiosService({
    //   method,
    //   url,
    //   data: payload,
    //   store: getState().generic,
    // });
    console.log("response");
    console.log(response);
    return response.data;
  });
};

export default createApiThunk;
