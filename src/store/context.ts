import { createContext } from "react";
import { initialState } from "./initial-state";
import { Action } from "./types";

export const AppContext = createContext(initialState);

export const AppDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);
