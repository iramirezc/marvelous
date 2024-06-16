import React from "react";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import type { PreloadedState } from "../../store/state";
import { renderWithStoreProvider } from "../../tests/providers";
import PageLayout from "./page-layout";

const renderPage = (preloadedState?: PreloadedState) =>
  renderWithStoreProvider(
    <MemoryRouter>
      <PageLayout />
    </MemoryRouter>,
    preloadedState
  );

describe("<PageLayout />", () => {
  test("renders the <Header /> component", () => {
    renderPage();

    expect(screen.getByAltText("Marvel logo")).toBeInTheDocument();
    expect(screen.getByText("My favorites 0")).toBeInTheDocument();
  });
});
