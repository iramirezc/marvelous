import React from "react";
import { render, screen } from "@testing-library/react";
import ComicCard from "./comic-card";

const defaultProps: React.ComponentProps<typeof ComicCard> = {
  title: "The Amazing Spider-Man (2022) #50",
  image: "https://via.placeholder.com/164x246",
  year: "2024"
};

const renderComponent = (props = defaultProps) =>
  render(<ComicCard {...props} />);

describe("<ComicCard />", () => {
  test("renders the comic title", () => {
    const title = "X-Men (2021) #1";

    renderComponent({ ...defaultProps, title });

    expect(screen.getByText("X-Men (2021) #1")).toBeInTheDocument();
  });

  test("renders the comic image", () => {
    const title = "Blood Hunt (2024) #1";
    const image = "https://via.placeholder.com/164x246";

    renderComponent({ ...defaultProps, title, image });

    expect(screen.getByAltText("Blood Hunt (2024) #1")).toBeInTheDocument();
    expect(screen.getByAltText("Blood Hunt (2024) #1")).toHaveAttribute(
      "src",
      image
    );
  });

  test("renders the comic year", () => {
    const year = "2025";

    renderComponent({ ...defaultProps, year });

    expect(screen.getByText("2025")).toBeInTheDocument();
  });
});
