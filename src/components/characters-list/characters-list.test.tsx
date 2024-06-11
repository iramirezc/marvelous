import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharactersList from "./characters-list";
import characters from "./mocks/characters.json";

describe("<CharactersList />", () => {
  test("renders the characters cards", () => {
    render(
      <CharactersList
        characters={characters}
        onCharacterClick={jest.fn()}
        onCharacterLike={jest.fn()}
      />
    );

    const charactersList = screen.getAllByRole("article");

    expect(charactersList).toHaveLength(characters.length);
  });

  test("displays the correct character information", () => {
    render(
      <CharactersList
        characters={characters}
        onCharacterClick={jest.fn()}
        onCharacterLike={jest.fn()}
      />
    );

    const characterName = screen.getByText("Spider-Man (Peter Parker)");

    expect(characterName).toBeInTheDocument();
  });

  test("calls onCharacterClick when a character card is clicked", async () => {
    const onCharacterClick = jest.fn();

    render(
      <CharactersList
        characters={[characters[0]]}
        onCharacterClick={onCharacterClick}
        onCharacterLike={jest.fn()}
      />
    );

    await userEvent.click(screen.getByRole("article"));

    expect(onCharacterClick).toHaveBeenCalledTimes(1);
    expect(onCharacterClick).toBeCalledWith(characters[0].id);
  });

  test("calls onCharacterLike when a character card is liked", async () => {
    const onCharacterLike = jest.fn();

    render(
      <CharactersList
        characters={[characters[0]]}
        onCharacterClick={jest.fn()}
        onCharacterLike={onCharacterLike}
      />
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onCharacterLike).toHaveBeenCalledTimes(1);
    expect(onCharacterLike).toHaveBeenCalledWith(characters[0].id);
  });
});
