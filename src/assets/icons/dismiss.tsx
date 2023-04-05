import React from "react";

type Props = {
  color?: string;
};

const Dismiss = ({ color }: Props) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.21903 0.780999L0.780029 2.22L9.56303 11L0.780029 19.781L2.22003 21.22L11 12.437L19.781 21.219L21.219 19.781L12.437 11L21.219 2.219L19.78 0.779999L11 9.563L2.21903 0.780999Z"
      fill={color ? color : "white"}
    />
  </svg>
);

export default Dismiss;
