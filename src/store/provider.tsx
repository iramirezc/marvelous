import React, { PropsWithChildren, useReducer } from "react";
import { AppContext, AppDispatchContext } from "./context";
import { initialState } from "./state";
import type { PreloadedState } from "./state";
import { reducer } from "./reducer";

type Props = PropsWithChildren<{ preloadedState?: PreloadedState }>;

const StoreProvider = ({ children, preloadedState = {} }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...preloadedState
  });

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default StoreProvider;
