import React, { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterDetailCard from "./character-detail-card";

const defaultProps: ComponentProps<typeof CharacterDetailCard> = {
  id: "1016181",
  name: "Spider-Man (Miles Morales)",
  picture: "https://via.placeholder.com/150",
  liked: false,
  description:
    "Teenager Miles Morales grew up in Brooklyn, New York. Recently, Miles took on the controversial and pressured role of Spider-Man shortly after the death of the original. Morales made his debut against The Kangaroo, much to the surprise and disapproval of many present at the confrontation.",
  onLike: jest.fn()
};

const renderComponent = (props = defaultProps) =>
  render(<CharacterDetailCard {...props} />);

describe("<CharacterDetailCard />", () => {
  test("renders the character name and description", () => {
    const name = "Peter Parker";
    const description = "Bitten by a radioactive spider";

    renderComponent({ ...defaultProps, name, description });

    expect(screen.getByText("Peter Parker")).toBeInTheDocument();
    expect(
      screen.getByText("Bitten by a radioactive spider")
    ).toBeInTheDocument();
  });

  test("renders the character picture", () => {
    const name = "Spider-Man";
    const picture = "https://via.placeholder.com/150";

    renderComponent({ ...defaultProps, name, picture });

    expect(screen.getByAltText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByAltText("Spider-Man")).toHaveAttribute("src", picture);
  });

  test("calls the onLike function when the like button is clicked", async () => {
    const id = "1";
    const onLike = jest.fn();

    renderComponent({ ...defaultProps, id, onLike });

    await userEvent.click(screen.getByRole("button"));

    expect(onLike).toHaveBeenCalledTimes(1);
    expect(onLike).toHaveBeenCalledWith(id);
  });
});
