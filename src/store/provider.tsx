import React, { PropsWithChildren, useReducer } from "react";
import { AppContext, AppDispatchContext } from "./context";
import { initialState } from "./initial-state";
import { reducer } from "./reducer";

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default StoreProvider;
