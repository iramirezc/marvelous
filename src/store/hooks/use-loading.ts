import { setLoading as setLoadingAction } from "../actions";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppState } from "./use-app-state";

export const useLoading = () => {
  const { loading } = useAppState();
  const dispatch = useAppDispatch();

  const setLoading = (...args: Parameters<typeof setLoadingAction>) => {
    dispatch(setLoadingAction(...args));
  };

  return {
    loading,
    setLoading
  };
};
