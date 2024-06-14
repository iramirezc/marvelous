import React from "react";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import character from "../../mocks/miles-morales-character.json";
import { renderWithStoreProvider } from "../../tests/providers";
import favoritesService from "../../services/favorites";
import CharacterDetailPage from "./character-detail-page";

const renderPage = () =>
  renderWithStoreProvider(
    <MemoryRouter initialEntries={[{ state: { character } }]}>
      <CharacterDetailPage />
    </MemoryRouter>
  );

describe("<CharacterDetailPage />", () => {
  afterEach(() => {
    favoritesService.clear();
  });

  test("renders the character details from router state", async () => {
    renderPage();

    expect(screen.getByText("Spider-Man (Miles Morales)")).toBeInTheDocument();
    expect(screen.getByText(character.description)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toHaveAttribute(
      "src",
      character.picture
    );
  });

  test("toggles the like state when the like button is clicked", async () => {
    renderPage();

    expect(screen.getByText("Not liked")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Like" }));

    expect(screen.getByText("Liked")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Unlike" }));

    expect(screen.getByText("Not liked")).toBeInTheDocument();
  });

  test("stores the character in the favorites storage", async () => {
    renderPage();

    expect(favoritesService.get()).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "Like" }));

    expect(favoritesService.get()).toBeTruthy();
  });
});
