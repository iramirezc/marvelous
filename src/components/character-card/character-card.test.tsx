import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterCard from "./character-card";

const defaultProps: React.ComponentProps<typeof CharacterCard> = {
  id: "1016181",
  name: "Spider-Man (Miles Morales)",
  thumbnail: "https://via.placeholder.com/150",
  liked: false,
  onClick: jest.fn(),
  onLike: jest.fn()
};

const renderComponent = (props = defaultProps) =>
  render(<CharacterCard {...props} />);

describe("<CharacterCard />", () => {
  test("renders the character info", () => {
    const name = "Peter Parker";

    renderComponent({ ...defaultProps, name });

    expect(screen.getByText("Peter Parker")).toBeInTheDocument();
  });

  test("renders the character thumbnail", () => {
    const name = "Spider-Man";
    const thumbnail = "https://via.placeholder.com/150";

    renderComponent({ ...defaultProps, name, thumbnail });

    expect(screen.getByAltText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByAltText("Spider-Man")).toHaveAttribute("src", thumbnail);
  });

  test("calls the onClick function when card is clicked", async () => {
    const onClick = jest.fn();

    renderComponent({ ...defaultProps, onClick });

    await userEvent.click(screen.getByRole("article"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("calls the onLike function when like button is clicked", async () => {
    const onLike = jest.fn();

    renderComponent({ ...defaultProps, onLike });

    await userEvent.click(screen.getByRole("button"));

    expect(onLike).toHaveBeenCalledTimes(1);
  });

  test("renders the liked icon when character is liked", () => {
    renderComponent({ ...defaultProps, liked: true });

    expect(screen.getByText("Liked")).toBeInTheDocument();
  });

  test("renders the not liked icon when character is not liked", () => {
    renderComponent({ ...defaultProps, liked: false });

    expect(screen.getByText("Not liked")).toBeInTheDocument();
  });

  test("renders the unlike button when character is liked", () => {
    renderComponent({ ...defaultProps, liked: true });

    expect(screen.getByText("Unlike")).toBeInTheDocument();
  });

  test("renders the like button when character is not liked", () => {
    renderComponent({ ...defaultProps, liked: false });

    expect(screen.getByText("Like")).toBeInTheDocument();
  });
});
