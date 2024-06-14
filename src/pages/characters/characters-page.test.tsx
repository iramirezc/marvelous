import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Character, Favorites } from "../../types";
import mockCharacters from "../../mocks/characters.json";
import mockFavorites from "../../mocks/favorites.json";
import charactersService from "../../services/characters";
import favoritesService from "../../services/favorites";
import { FakeHeader, renderWithStoreProvider } from "../../tests/providers";
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
      <FakeHeader />
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
    // There are two characters that start with "Spider-Girl"
    const searchResults = mockCharacters.filter((character) =>
      character.name.startsWith("Spider-Girl")
    );

    test("renders the status of 'Searching' when user starts typing", async () => {
      setupInitialLoadResponse([]);

      await act(renderPage);

      await userEvent.type(screen.getByRole("searchbox"), "X");

      expect(screen.getByLabelText("Searching")).toBeInTheDocument();
    });

    test("renders search results and then goes back to initial load after searchbox is cleared", async () => {
      setupInitialLoadResponse(mockCharacters);
      setupSearchResponse(searchResults);

      await act(renderPage);

      await userEvent.type(screen.getByRole("searchbox"), "Spider-Girl");

      await waitFor(() => screen.findByText("2 Results"));

      // assert search results are rendered
      expect(screen.getAllByRole("article")).toHaveLength(searchResults.length);

      // clear search criteria
      await userEvent.clear(screen.getByRole("searchbox"));

      // assert first load characters are rendered
      expect(screen.getAllByRole("article")).toHaveLength(
        mockCharacters.length
      );
    });
  });

  describe("liked characters", () => {
    beforeEach(() => {
      setupInitialLoadResponse(mockCharacters);
    });

    test("renders all characters as not liked on initial load", async () => {
      await act(renderPage);

      expect(screen.queryAllByText("Liked")).toHaveLength(0);
      expect(screen.queryAllByText("Not liked")).toHaveLength(
        mockCharacters.length
      );
    });

    test("renders favorites characters as liked on initial load", async () => {
      setupFavoritesStorageService(mockFavorites);

      await act(renderPage);

      expect(screen.getAllByText("Liked")).toHaveLength(1);
      expect(screen.queryAllByText("Not liked")).toHaveLength(
        mockCharacters.length - 1
      );
    });

    test("toggles like state on a character", async () => {
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

  describe("navigation", () => {
    test("shows favorite characters and then shows first load characters", async () => {
      setupInitialLoadResponse(mockCharacters);
      setupFavoritesStorageService(mockFavorites);

      await act(renderPage);

      // assert first load characters are rendered
      expect(screen.getAllByRole("article")).toHaveLength(
        mockCharacters.length
      );

      // navigate to favorites
      await userEvent.click(screen.getByRole("button", { name: "Favorites" }));

      // assert favorite characters are rendered
      expect(screen.getAllByRole("article")).toHaveLength(1);

      // navigate back to first load characters
      await userEvent.click(screen.getByRole("button", { name: "Logo" }));

      // assert first load characters are rendered again
      expect(screen.getAllByRole("article")).toHaveLength(
        mockCharacters.length
      );
    });
  });
});
