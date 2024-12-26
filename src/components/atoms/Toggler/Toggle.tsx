import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";

function Toggle() {
  const htmlElement = document.documentElement;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(
    () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      setIsDarkMode(currentTheme === "dark");
    },
    [htmlElement]
  );

  function handleMode() {
    const newTheme = isDarkMode ? "light" : "dark";
    htmlElement.setAttribute("data-theme", newTheme);
    setIsDarkMode(!isDarkMode);
  }

  return (
    <Icon
      size="sm"
      src={
        isDarkMode
          ? "../../../../public/assets/icon-sun.svg"
          : "../../../../public/assets/icon-moon.svg"
      }
      alt={isDarkMode ? "image of sun" : "image of moon"}
      onClick={handleMode}
    />
  );
}

export default Toggle;
