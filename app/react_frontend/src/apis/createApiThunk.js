import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "./axiosService";

const createApiThunk = (name, method, url) => {
  return createAsyncThunk(name, async (payload, { getState }) => {
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
    return response.data;
  });
};

export default createApiThunk;
