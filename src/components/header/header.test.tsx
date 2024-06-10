import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./header";

describe("Header", () => {
  test("renders header with logo and favorites", () => {
    render(<Header favoritesCount={0} />);

    expect(screen.getByAltText("Marvelous logo")).toBeInTheDocument();
  });

  test("renders header with favorites count", () => {
    render(<Header favoritesCount={5} />);

    const myFavorites = screen.getByLabelText("My favorites");

    expect(myFavorites).toBeInTheDocument();
    expect(myFavorites).toHaveTextContent("5");
  });
});
