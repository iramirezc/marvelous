import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./loader";

describe("<Loader />", () => {
  test("renders loader when isLoading is true", () => {
    render(<Loader isLoading={true} />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("does not render loader when isLoading is false", () => {
    render(<Loader isLoading={false} />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
