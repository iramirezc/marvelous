import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./header";

describe("Header", () => {
  test("renders header with logo and favorites", () => {
    render(<Header favoritesCount={0} />);

    expect(screen.getByAltText("Marvel logo")).toBeInTheDocument();
  });

  test("renders header with favorites count", () => {
    render(<Header favoritesCount={5} />);

    expect(screen.getByText("My favorites 5")).toBeInTheDocument();
  });
});
