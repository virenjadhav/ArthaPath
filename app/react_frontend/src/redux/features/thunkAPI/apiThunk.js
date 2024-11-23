import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../../apis/axiosService";

const apiThunk = (actionType, method, baseUrl, payload = {}) => {
  return createAsyncThunk(
    actionType,
    async ({ id1, data1, session1 } = {}, { rejectWithValue }) => {
      const { id, data, session } = payload;
      let response;
      // const params = {
      //   body: Array.isArray(data) ? data : [data], // Ensure data is always an array
      // };
      const params = {
        body: Array.isArray(data) ? data : data,
        session: session,
        id: id,
      };
      try {
        switch (method) {
          case "get":
            response = await axiosService.get(baseUrl, { params });
            break;
          case "post":
            response = await axiosService.post(baseUrl, params);
            break;
          case "put":
            const url = id ? `${baseUrl}/${id}` : baseUrl;
            response = await axiosService.put(url, params);
            break;
          case "delete":
            const deleteUrl = id ? `${baseUrl}/${id}` : baseUrl;
            response = await axiosService.delete(deleteUrl, { params });
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
