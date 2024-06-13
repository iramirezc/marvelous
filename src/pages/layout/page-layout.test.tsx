import React from "react";
import { screen } from "@testing-library/react";
import { renderWithStoreProvider } from "../../tests/providers";
import type { PreloadedState } from "../../tests/providers";
import PageLayout from "./page-layout";

const renderPage = (preloadedState?: PreloadedState) =>
  renderWithStoreProvider(<PageLayout />, preloadedState);

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
