import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import type { PreloadedState } from "../store/state";
import StoreProvider from "../store/provider";

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

export const FakeHeader = () => {
  const navigate = useNavigate();

  return (
    <header>
      <button onClick={() => navigate("/")}>Logo</button>
      <button onClick={() => navigate("/", { state: { favorites: true } })}>
        Favorites
      </button>
    </header>
  );
};
