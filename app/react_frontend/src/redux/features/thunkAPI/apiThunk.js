import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../../apis/axiosService";

const apiThunk = (actionType, method, baseUrl) => {
  return createAsyncThunk(
    actionType,
    async ({ id, data, session } = {}, { rejectWithValue }) => {
      let response;
      try {
        switch (method) {
          case "get":
            response = await axiosService.get(baseUrl, { params: data });
            break;
          case "post":
            response = await axiosService.post(baseUrl, { ...data, session });
            break;
          case "put":
            const url = id ? `${baseUrl}/${id}` : baseUrl;
            response = await axiosService.put(url, { ...data, session });
            break;
          case "delete":
            const deleteUrl = id ? `${baseUrl}/${id}` : baseUrl;
            response = await axiosService.delete(deleteUrl, { data });
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
