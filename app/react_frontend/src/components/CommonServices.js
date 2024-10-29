import { useDispatch } from "react-redux";
import { useFormRefreshAction } from "./FormComponent/FormServices";
import {
  setLoggedIn,
  setMessageState,
  setUser,
} from "../redux/features/generic/genericSlice";
import {
  setResult,
  setSuccessMsg,
} from "../redux/features/generic/messageSlice";
import {
  setIsEditing,
  setIsModelVisible,
  setSelectedRecord,
} from "../redux/features/generic/modelSlice";
import { callApiService } from "../apis/ApiServiceCall";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

export const useLoginAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginHandler = (response) => {
    dispatch(setMessageState(setResult("success")));
    dispatch(setMessageState(setSuccessMsg("Login successful!")));
    dispatch(setUser(response.user));
    dispatch(setLoggedIn(true));
    navigate("/");
  };
  const loginAction = useCallback(async (payload) => {
    if (!payload) {
      console.error("record is missing.");
      return;
    }
    const serviceDetail = {
      id: "login",
      url: "/login",
      key: "login",
      name: "generic/login",
      method: "post",
    };
    const response = await dispatch(
      callApiService(
        "login",
        handleLoginHandler,
        payload,
        null,
        true,
        serviceDetail
      )
    );
  }, []);

  return { loginAction };
};

export const useSignupAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignupHandler = (response) => {
    dispatch(setMessageState(setResult("success")));
    dispatch(setMessageState(setSuccessMsg("Account Created Successfully.")));
    dispatch(setUser(response.user));
    dispatch(setLoggedIn(true));
    navigate("/");
  };
  const signupAction = useCallback(async (payload) => {
    if (!payload) {
      console.error("record is missing.");
      return;
    }
    const serviceDetail = {
      id: "signup",
      url: "/signup",
      key: "signup",
      name: "generic/signup",
      method: "post",
    };
    const response = await dispatch(
      callApiService(
        "signup",
        handleSignupHandler,
        payload,
        null,
        true,
        serviceDetail
      )
    );
  }, []);

  return { signupAction };
};

export const useLogoutAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutHandler = (response) => {
    dispatch(setLoggedIn(false));
    navigate("/login");
  };
  const logoutAction = useCallback(async (payload) => {
    if (!payload) {
      console.error("record is missing.");
      return;
    }
    const serviceDetail = {
      id: "logout",
      url: "/logout",
      key: "logout",
      name: "generic/logout",
      method: "delete",
    };
    const response = await dispatch(
      callApiService(
        "logout",
        handleLogoutHandler,
        payload,
        null,
        true,
        serviceDetail
      )
    );
  }, []);

  return { logoutAction };
};

export const useLookupRecordAction = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleLookupRecordHandler = (response) => {};
  const lookupRecordAction = useCallback(
    async (payload, afterActionHandler = null) => {
      if (!payload) {
        console.error("record is missing.");
        return;
      }
      const serviceDetail = {
        id: "get_lookup_record",
        url: "/get_lookup_record",
        key: "get_lookup_record",
        name: "generic/get_lookup_record",
        method: "get",
      };
      const response = await dispatch(
        callApiService(
          "get_lookup_record",
          handleLookupRecordHandler,
          payload,
          afterActionHandler,
          true,
          serviceDetail
        )
      );
    },
    []
  );

  return { lookupRecordAction };
};

export const useValidateLookupRecordAction = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleValidateLookupRecordHandler = (response) => {};
  const validateLookupRecordAction = useCallback(
    async (payload, afterActionHandler = null) => {
      if (!payload) {
        console.error("record is missing.");
        return;
      }
      const serviceDetail = {
        id: "validate_lookup_value",
        url: "/validate_lookup_value",
        key: "validate_lookup_value",
        name: "generic/validate_lookup_value",
        method: "post",
      };
      const response = await dispatch(
        callApiService(
          "validate_lookup_value",
          handleValidateLookupRecordHandler,
          payload,
          afterActionHandler,
          true,
          serviceDetail
        )
      );
    },
    []
  );

  return { validateLookupRecordAction };
};
