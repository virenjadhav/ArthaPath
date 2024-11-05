import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { callApiService } from "../../apis/ApiServiceCall";

export const useSaveCommonCategory = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const handleCompleteHandler = (response) => {};
    const saveCommonCategory = useCallback(
      async (payload = null, afterActionHandler = null) => {
        if (!payload) {
            console.error("record is missing.");
            return;
          }
        const response = await dispatch(
          callApiService(
            "createRecord",
            handleCompleteHandler,
            payload,
            afterActionHandler
          )
        );
      },
      []
    );
  
    return { saveCommonCategory };
  };