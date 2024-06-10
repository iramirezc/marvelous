import React from "react";
import "./loader.css";

type Props = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: Props) =>
  isLoading ? (
    <div className="loader" role="status" aria-label="Loading" />
  ) : null;

export default Loader;
