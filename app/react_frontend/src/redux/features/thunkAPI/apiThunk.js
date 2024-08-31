import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../../apis/axiosService";

const apiThunk = (actionType, method, url) => {
  return createAsyncThunk(
    actionType,
    async (params = {}, { rejectWithValue }) => {
      let response;
      const { data, session } = params;
      try {
        switch (method) {
          case "get":
            //   response = await axiosService.get(url);
            response = await axiosService.get(url, { params: data }); // Pass data as query parameters
            break;
          case "post":
            //   response = await axiosService.post(url, data);
            response = await axiosService.post(url, { ...data, session }); // Pass data and session in the body
            break;
          case "put":
            //   response = await axiosService.put(url, data);
            response = await axiosService.put(url, { ...data, session }); // Pass data and session in the body
            break;
          case "delete":
            //   response = await axiosService.delete(url, { data });
            response = await axiosService.delete(url, { data }); // Pass data in the body
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
};

export default apiThunk;
