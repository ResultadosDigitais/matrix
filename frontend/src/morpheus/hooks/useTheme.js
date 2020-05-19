import { useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const dark = createMuiTheme({
  palette: {
    primary: { main: blue[50] },
    type: "dark"
  }
});

const light = createMuiTheme({
  palette: {
    type: "light",
    background: { default: "#e1f5fe" }
  }
});

const colors = { light, dark };
const defaultColor = "light";

function getBrowserColor() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").match;

  return isDarkMode ? "dark" : "light";
}

export default function useTheme() {
  const [color, setColor] = useState(defaultColor);

  function setColorAndStore(newColor) {
    setColor(newColor);
    window.localStorage.setItem("color-scheme", newColor);
  }

  function toggleColor() {
    setColorAndStore(color === "light" ? "dark" : "light");
  }

  useEffect(() => {
    const preferredColor =
      window.localStorage.getItem("color-scheme") || getBrowserColor();

    setColorAndStore(preferredColor);
  }, []);

  return [colors[color], toggleColor];
}
