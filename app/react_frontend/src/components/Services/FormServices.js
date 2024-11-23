import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessageState } from "../../redux/features/generic/genericSlice";
import {
  setData,
  setIsEditing,
  setIsModelVisible,
  setSelectedRecord,
} from "../../redux/features/generic/modelSlice";
import {
  setResult,
  setSuccessMsg,
} from "../../redux/features/generic/messageSlice";
import { callApiService } from "../../apis/ApiServiceCall";

export const useFormRefreshAction = () => {
  // const { callApi } = useApiServiceCall();
  const user_id = useSelector((state) => state.generic.user?.user_id);
  const dispatch = useDispatch();
  const handleRefreshClickHandler = (response) => {
    dispatch(setData(response?.data));
    dispatch(setMessageState(setResult("success")));
    dispatch(setMessageState(setSuccessMsg(response?.message)));
    // dispatch(setIsModelVisible(false));
    // dispatch(setIsEditing(false));
    // dispatch(setSelectedRecord(null));
  };
  const formRefreshAction = useCallback(
    async (data = {}, afterActionHandler = null) => {
      // const response = await callApi("getList", handleRefreshClickHandler);
      let payload = {
        data: {
          ...data,
          user_id: user_id,
        },
      };
      const response = await dispatch(
        callApiService(
          "getList",
          handleRefreshClickHandler,
          payload,
          afterActionHandler
        )
      );
    },
    []
  );

  return { formRefreshAction };
};

export const useFormDeleteAction = () => {
  // const { callApi } = useApiServiceCall();
  // useEffect(() => {}, [callApi]);
  const { formRefreshAction } = useFormRefreshAction();
  const dispatch = useDispatch();
  // const selectedRecord = useSelector((state) => state.model.selectedRecord);
  const handleDeleteClickHandler = (response) => {
    dispatch(setMessageState(setResult("success")));
    dispatch(setMessageState(setSuccessMsg(response?.message)));
    dispatch(setIsModelVisible(false));
    dispatch(setIsEditing(false));
    dispatch(setSelectedRecord(null));
    // dispatch(refreshAction);
    formRefreshAction();
  };
  const formDeleteAction = useCallback(async (record) => {
    // await callApi("deleteRecord", handleDeleteClickHandler, {
    //   id: selectedRecord.id,
    // });
    if (!record) {
      console.error("Selected record is missing.");
      return;
    }
    const response = await dispatch(
      callApiService("deleteRecord", handleDeleteClickHandler, {
        id: record?.id,
      })
    );
  }, []);

  return { formDeleteAction };
};

export const useFormCreateAction = () => {
  // const { callApi } = useApiServiceCall();
  const dispatch = useDispatch();
  const handleFormCreateClickHandler = (response) => {};
  const formCreateAction = useCallback(
    async (payload, afterActionHandler = null) => {
      if (!payload) {
        console.error("record is missing.");
        return;
      }
      const response = await dispatch(
        callApiService(
          "createRecord",
          handleFormCreateClickHandler,
          payload,
          afterActionHandler
        )
      );
    },
    []
  );

  return { formCreateAction };
};

export const useFormUpdateAction = () => {
  // const { callApi } = useApiServiceCall();
  const dispatch = useDispatch();
  const handleFormUpdateClickHandler = (response) => {};
  const formUpdateAction = useCallback(
    async (payload, afterActionHandler = null) => {
      // await callApi(
      //   "updateRecord",
      //   handleFormUpdateClickHandler,
      //   afterActionHandler
      // );
      if (!payload) {
        console.error("record is missing.");
        return;
      }
      const response = await dispatch(
        callApiService(
          "updateRecord",
          handleFormUpdateClickHandler,
          payload,
          afterActionHandler
        )
      );
    },
    []
  );

  return { formUpdateAction };
};
