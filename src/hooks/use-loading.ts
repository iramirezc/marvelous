import { setLoading as setLoadingAction } from "../store/actions";
import { useAppDispatch, useAppState } from "../store/hooks";

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
