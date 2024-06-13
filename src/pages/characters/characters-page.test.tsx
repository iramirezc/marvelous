import React from "react";
import { act, screen, waitFor } from "@testing-library/react";
import { renderWithStoreProvider } from "../../tests/providers";
import type { PreloadedState } from "../../tests/providers";
import charactersService from "../../services/characters";
import mockCharacters from "../../mocks/characters.json";
import type { Character } from "../../types";
import CharactersPage from "./characters-page";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/characters");

const mockFetchCharacters = jest.mocked(charactersService.fetchCharacters);
const mockFetchCharactersByName = jest.mocked(
  charactersService.fetchCharactersByName
);

const setupInitialLoadResponse = (characters: Character[]) => {
  mockFetchCharacters.mockResolvedValueOnce(characters);
};

const setupSearchResponse = (characters: Character[]) => {
  mockFetchCharactersByName.mockResolvedValueOnce(characters);
};

const renderPage = (preloadedState?: PreloadedState) =>
  renderWithStoreProvider(<CharactersPage />, preloadedState);

describe("<CharactersPage />", () => {
  test("renders the search bar", async () => {
    setupInitialLoadResponse([]);

    await act(renderPage);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  test("renders the initial load of characters", async () => {
    setupInitialLoadResponse(mockCharacters);

    await act(renderPage);

    expect(
      screen.getByText(`${mockCharacters.length} Results`)
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(mockCharacters.length);
  });

  test("renders the status of 'Searching' when user starts typing", async () => {
    setupInitialLoadResponse([]);

    await act(renderPage);

    await userEvent.type(screen.getByRole("searchbox"), "X");

    expect(screen.getByLabelText("Searching")).toBeInTheDocument();
  });

  test("renders the search results whe user ends typing", async () => {
    const filteredCharacters = mockCharacters.filter((character) =>
      character.name.startsWith("Spider-Girl")
    );
    setupInitialLoadResponse(mockCharacters);
    setupSearchResponse(filteredCharacters);

    await act(renderPage);

    await userEvent.type(screen.getByRole("searchbox"), "Spider-Girl");

    await waitFor(() => screen.findByText("2 Results"));

    expect(screen.getAllByRole("article")).toHaveLength(
      filteredCharacters.length
    );
  });
});
