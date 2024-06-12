import { useContext } from "react";
import { AppContext } from "../context";

export const useAppState = () => {
  const state = useContext(AppContext);

  return state;
};
