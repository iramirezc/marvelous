import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Character, Favorites } from "../../types";
import mockCharacters from "../../mocks/characters.json";
import mockFavorites from "../../mocks/favorites.json";
import charactersService from "../../services/characters";
import favoritesService from "../../services/favorites";
import { renderWithStoreProvider } from "../../tests/providers";
import CharactersPage from "./characters-page";

jest.mock("../../services/characters");

const mockCharactersService = {
  fetchCharacters: jest.mocked(charactersService.fetchCharacters),
  fetchCharactersByName: jest.mocked(charactersService.fetchCharactersByName)
};

const setupInitialLoadResponse = (characters: Character[]) => {
  mockCharactersService.fetchCharacters.mockResolvedValueOnce(characters);
};

const setupSearchResponse = (characters: Character[]) => {
  mockCharactersService.fetchCharactersByName.mockResolvedValueOnce(characters);
};

const setupFavoritesStorageService = (favorites: Favorites) => {
  favoritesService.save(favorites);
};

const renderPage = () =>
  renderWithStoreProvider(
    <MemoryRouter>
      <CharactersPage />
    </MemoryRouter>
  );

describe("<CharactersPage />", () => {
  describe("initial load", () => {
    test("renders the initial load of characters", async () => {
      setupInitialLoadResponse(mockCharacters);

      await act(renderPage);

      expect(
        screen.getByText(`${mockCharacters.length} Results`)
      ).toBeInTheDocument();
      expect(screen.getAllByRole("article")).toHaveLength(
        mockCharacters.length
      );
    });
  });

  describe("searching for characters", () => {
    test("renders the search bar", async () => {
      setupInitialLoadResponse([]);

      await act(renderPage);

      expect(screen.getByRole("searchbox")).toBeInTheDocument();
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

  describe("favorites", () => {
    test("no favorites on initial load", async () => {
      setupInitialLoadResponse(mockCharacters);

      // eslint-disable-next-line
      await act(renderPage);

      expect(screen.queryAllByText("Liked")).toHaveLength(0);
    });

    test("renders my favorites on initial load", async () => {
      setupInitialLoadResponse(mockCharacters);
      setupFavoritesStorageService(mockFavorites);

      // eslint-disable-next-line
      await act(renderPage);

      expect(screen.getAllByText("Liked")).toHaveLength(1);
    });

    test("adds and removes a character from my favorites", async () => {
      setupInitialLoadResponse(mockCharacters);

      await act(renderPage);

      // select second card from results
      const characterCard = screen.getAllByRole("article")[1];

      // assert character is not liked
      expect(within(characterCard).getByText("Not liked")).toBeInTheDocument();

      // click the like button
      await userEvent.click(
        within(characterCard).getByRole("button", {
          name: "Like"
        })
      );

      // assert character is liked
      expect(within(characterCard).getByText("Liked")).toBeInTheDocument();

      // click the unlike button
      await userEvent.click(
        within(characterCard).getByRole("button", {
          name: "Unlike"
        })
      );

      // assert character is not liked anymore
      expect(within(characterCard).getByText("Not liked")).toBeInTheDocument();
    });
  });
});
