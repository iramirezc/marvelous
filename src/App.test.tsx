import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/header", () => ({
  __esModule: true,
  default: () => <header>Header</header>
}));

describe("App", () => {
  test("renders header", () => {
    render(<App />);

    expect(screen.getByText("Header")).toBeInTheDocument();
  });
});
