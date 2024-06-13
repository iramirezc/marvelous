import React from "react";
import { render, screen } from "@testing-library/react";
import PageLayout from "./page-layout";
import { TestStoreProvider } from "../../tests/providers";
import type { PreloadedState } from "../../tests/providers";

const renderPage = (preloadedState?: PreloadedState) =>
  render(<PageLayout />, {
    wrapper: ({ children }) => (
      <TestStoreProvider preloadedState={preloadedState}>
        {children}
      </TestStoreProvider>
    )
  });

describe("<PageLayout />", () => {
  test("renders the <Header /> component", () => {
    renderPage();

    expect(screen.getByAltText("Marvel logo")).toBeInTheDocument();
    expect(screen.getByText("My favorites 0")).toBeInTheDocument();
  });

  test("renders the <Loader /> component", () => {
    renderPage({ loading: true });

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
