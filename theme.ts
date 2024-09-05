import {  MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(0, 170, 40)",
      accent: "rgb(0, 40, 40)",
      lightGray: "rgb(240, 240, 240)",
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 32,
      xl: 64,
    },
  };