import React from "react";
import { act, screen } from "@testing-library/react";
import { renderWithStoreProvider } from "../../tests/providers";
import type { PreloadedState } from "../../tests/providers";
import charactersService from "../../services/characters";
import mockCharacters from "../../mocks/characters.json";
import { Character } from "../../types";
import CharactersPage from "./characters-page";

jest.mock("../../services/characters");

const mockFetchCharactersService = jest.mocked(
  charactersService.fetchCharacters
);

const setupPage = (characters: Character[] = []) => {
  mockFetchCharactersService.mockResolvedValueOnce(characters);
};

const renderPage = (preloadedState?: PreloadedState) =>
  renderWithStoreProvider(<CharactersPage />, preloadedState);

describe("<CharactersPage />", () => {
  test("renders the <SearchBar /> component", async () => {
    setupPage();

    await act(renderPage);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  test("renders the total results fetched", async () => {
    setupPage(mockCharacters);

    await act(renderPage);

    expect(
      screen.getByText(`${mockCharacters.length} Results`)
    ).toBeInTheDocument();
  });

  test("renders the <CharactersList /> component with the fetched characters", async () => {
    setupPage(mockCharacters);

    await act(renderPage);

    expect(screen.getAllByRole("article")).toHaveLength(mockCharacters.length);
  });
});
