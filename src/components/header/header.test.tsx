import React, { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import Header from "./header";

const defaultProps: ComponentProps<typeof Header> = {
  favoritesCount: 0,
  onLogoClick: jest.fn(),
  onFavoritesClick: jest.fn()
};

const renderComponent = (props = defaultProps) => render(<Header {...props} />);

describe("<Header />", () => {
  test("renders header with logo and favorites", () => {
    renderComponent({ ...defaultProps, favoritesCount: 0 });

    expect(screen.getByAltText("Marvel logo")).toBeInTheDocument();
  });

  test("renders header with favorites count", () => {
    renderComponent({ ...defaultProps, favoritesCount: 5 });

    expect(screen.getByText("My favorites 5")).toBeInTheDocument();
  });

  test("calls onLogoClick when logo is clicked", () => {
    const onLogoClick = jest.fn();

    renderComponent({ ...defaultProps, onLogoClick });

    screen.getByAltText("Marvel logo").click();

    expect(onLogoClick).toHaveBeenCalledTimes(1);
  });

  test("calls onFavoritesClick when favorites is clicked", () => {
    const onFavoritesClick = jest.fn();

    renderComponent({ ...defaultProps, onFavoritesClick });

    screen.getByText("My favorites 0").click();

    expect(onFavoritesClick).toHaveBeenCalledTimes(1);
  });
});
