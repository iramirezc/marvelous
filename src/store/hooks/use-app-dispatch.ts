import { useContext } from "react";
import { AppDispatchContext } from "../context";

export const useAppDispatch = () => {
  const dispatch = useContext(AppDispatchContext);

  return dispatch;
};
