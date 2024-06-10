import React from "react";

const defaultColor = "var(--red)";
const defaultWidth = 24;
const defaultHeight = 22;

type IconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const FilledHeartIcon = ({
  color = defaultColor,
  width = defaultWidth,
  height = defaultHeight
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 13 12"
  >
    <title>Filled heart</title>
    <path
      fill={color}
      clipRule="evenodd"
      fillRule="evenodd"
      d="m6.5 2.313-3-1.82-3 1.82v3.902l6 5.116 6-5.116V2.313l-3-1.82-3 1.82Z"
    />
  </svg>
);

export default FilledHeartIcon;
