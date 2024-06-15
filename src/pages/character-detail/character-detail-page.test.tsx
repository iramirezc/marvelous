import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Comic } from "../../types";
import character from "../../mocks/miles-morales-character.json";
import comics from "../../mocks/comics.json";
import charactersService from "../../services/characters";
import favoritesService from "../../services/favorites";
import { renderWithStoreProvider } from "../../tests/providers";
import CharacterDetailPage from "./character-detail-page";

jest.mock("../../services/characters");

const mockCharactersService = {
  fetchComicsByCharacterId: jest.mocked(
    charactersService.fetchComicsByCharacterId
  )
};

const setupComicsResponse = (comics: Comic[]) => {
  mockCharactersService.fetchComicsByCharacterId.mockResolvedValueOnce(comics);
};

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
    setupComicsResponse([]);

    await act(renderPage);

    expect(screen.getByText("Spider-Man (Miles Morales)")).toBeInTheDocument();
    expect(screen.getByText(character.description)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toHaveAttribute(
      "src",
      character.picture
    );
  });

  test("toggles the like state when the like button is clicked", async () => {
    setupComicsResponse([]);

    await act(renderPage);

    expect(screen.getByText("Not liked")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Like" }));

    expect(screen.getByText("Liked")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Unlike" }));

    expect(screen.getByText("Not liked")).toBeInTheDocument();
  });

  test("stores the character in the favorites storage", async () => {
    setupComicsResponse([]);

    await act(renderPage);

    expect(favoritesService.get()).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "Like" }));

    expect(favoritesService.get()).toBeTruthy();
  });

  test("renders the comics list", async () => {
    setupComicsResponse(comics);

    await act(renderPage);

    expect(screen.queryAllByRole("listitem")).toHaveLength(20);
  });
});
