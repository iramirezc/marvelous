import React, { ComponentProps } from "react";

import { render, screen } from "@testing-library/react";

import SearchBar from "./search-bar";
import userEvent from "@testing-library/user-event";

const defaultProps: ComponentProps<typeof SearchBar> = {
  value: "",
  results: 0,
  onChange: jest.fn()
};

const renderComponent = (props = defaultProps) =>
  render(<SearchBar {...props} />);

describe("<SearchBar />", () => {
  test("renders a search bar with a search icon and input field", () => {
    renderComponent();

    expect(screen.getByAltText("Search")).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  test("renders a search bar with the placeholder", () => {
    renderComponent();

    expect(
      screen.getByPlaceholderText("Search a character...")
    ).toBeInTheDocument();
  });

  test("renders only one result", () => {
    renderComponent({ ...defaultProps, results: 1 });

    expect(screen.getByText("1 Result")).toBeInTheDocument();
  });

  test("renders the number of results", () => {
    renderComponent({ ...defaultProps, results: 3 });

    expect(screen.getByText("3 Results")).toBeInTheDocument();
  });

  test("calls the onChange callback when the input value changes", async () => {
    const onChange = jest.fn();

    const ControlledSearchBar = () => {
      const [value, setValue] = React.useState("");

      return (
        <SearchBar
          value={value}
          results={0}
          onChange={(value) => {
            onChange(value);
            setValue(value);
          }}
        />
      );
    };

    render(<ControlledSearchBar />);

    await userEvent.type(screen.getByRole("searchbox"), "Miles Morales");

    expect(onChange).toHaveBeenCalledWith("Miles Morales");
    expect(onChange).toHaveBeenCalledTimes("Miles Morales".length);
  });
});
