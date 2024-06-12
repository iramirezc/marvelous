import React from "react";
import { render, screen } from "@testing-library/react";
import ComicsList from "./comics-list";
import comics from "../../mocks/comics.json";

describe("<ComicsList />", () => {
  test("renders empty", () => {
    render(<ComicsList comics={[]} />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test("renders the comic cards", () => {
    render(<ComicsList comics={comics} />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(comics.length);
  });

  test("displays the correct comic information", () => {
    const [comic] = comics;

    render(<ComicsList comics={[comic]} />);

    expect(screen.getByAltText(comic.title)).toBeInTheDocument();
    expect(screen.getByText(comic.title)).toBeInTheDocument();
    expect(screen.getByText(comic.year)).toBeInTheDocument();
  });
});
