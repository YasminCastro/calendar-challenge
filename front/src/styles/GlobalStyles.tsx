import { createGlobalStyle } from "styled-components";

export const colors = {
  white: "#FFFFFF",
  grey50: "#e8e8e8",
  grey100: "#d2d2d2",
  grey125: "#bebebe",
  grey150: "#ababab",
  grey200: "#999999",
  grey350: "#898989",
  grey400: "#797979",
  grey500: "#6b6b6b",
  grey600: "#5d5d5d",
  grey800: "#4f4f4f",
  grey850: "#414141",
  grey900: "#333333",

  darkRed: "#8e352e",
};

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration:none;
  }

  li, ul {
    list-style: none;
  }

`;
