import React, { PropsWithChildren } from "react";
import StoreProvider from "../store/provider";
import type { PreloadedState } from "../store/state";
import { render } from "@testing-library/react";

type Props = PropsWithChildren<{ preloadedState?: PreloadedState }>;

export const TestStoreProvider = ({ children, preloadedState }: Props) => (
  <StoreProvider preloadedState={preloadedState}>{children}</StoreProvider>
);

export const renderWithStoreProvider = (
  ui: JSX.Element,
  preloadedState?: PreloadedState
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <TestStoreProvider preloadedState={preloadedState}>
        {children}
      </TestStoreProvider>
    )
  });

export type { PreloadedState };
